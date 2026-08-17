import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";
import { resolveCompanyByCodeOrName } from "@/lib/companies";
import type { AppRole } from "@/lib/roles";

const ADMIN_ROLES: AppRole[] = ["company_admin", "brand_manager"];

export const { handlers, signIn, signOut, auth, unstable_update } = NextAuth({
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "E-posta", type: "email" },
        password: { label: "Şifre", type: "password" },
        companyCode: { label: "Firma Kodu", type: "text" },
      },
      authorize: async (credentials) => {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;
        const companyCode = credentials?.companyCode as string | undefined;
        if (!email || !password || !companyCode) return null;

        const company = await resolveCompanyByCodeOrName(companyCode);
        if (!company) return null;

        const [user] = await db
          .select()
          .from(users)
          .where(and(eq(users.email, email), eq(users.companyId, company.id)))
          .limit(1);
        if (!user) return null;
        if (!user.isActive) return null;

        const passwordMatches = await compare(password, user.passwordHash);
        if (!passwordMatches) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          companyId: user.companyId,
          dealerId: user.dealerId,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.name = user.name;
        token.role = user.role;
        token.companyId = user.companyId;
        token.dealerId = user.dealerId;
      }

      if (trigger === "update" && session && typeof session === "object") {
        const update = session as { impersonateUserId?: string; stopImpersonation?: boolean };

        // Impersonation olması gereken kimlik değişimini token içinde tutuyoruz;
        // kaynak (mevcut admin rolü + hedefin şirket/rol eşleşmesi) burada,
        // sunucu tarafında doğrulanıyor — client'tan gelen trigger verisine
        // güvenilmiyor.
        if (
          update.impersonateUserId &&
          !token.impersonator &&
          ADMIN_ROLES.includes(token.role as AppRole)
        ) {
          const [target] = await db
            .select()
            .from(users)
            .where(eq(users.id, update.impersonateUserId))
            .limit(1);

          if (
            target &&
            target.role === "dealer_user" &&
            target.companyId === token.companyId &&
            target.isActive
          ) {
            token.impersonator = {
              id: token.sub as string,
              name: token.name as string | null,
              email: token.email as string,
              role: token.role as AppRole,
              companyId: token.companyId as string,
              dealerId: token.dealerId as string | null,
            };
            token.sub = target.id;
            token.name = target.name;
            token.email = target.email;
            token.role = target.role;
            token.companyId = target.companyId;
            token.dealerId = target.dealerId;
          }
        }

        const stashedIdentity = token.impersonator as {
          id: string;
          name: string | null;
          email: string;
          role: AppRole;
          companyId: string;
          dealerId: string | null;
        } | null | undefined;

        if (update.stopImpersonation && stashedIdentity) {
          token.sub = stashedIdentity.id;
          token.name = stashedIdentity.name;
          token.email = stashedIdentity.email;
          token.role = stashedIdentity.role;
          token.companyId = stashedIdentity.companyId;
          token.dealerId = stashedIdentity.dealerId;
          token.impersonator = null;
        }
      }

      return token;
    },
    session({ session, token }) {
      session.user.id = token.sub as string;
      session.user.name = (token.name as string | null) ?? null;
      session.user.role = token.role as AppRole;
      session.user.companyId = token.companyId as string;
      session.user.dealerId = (token.dealerId as string | null) ?? null;
      session.user.impersonatorEmail =
        (token.impersonator as { email: string } | null | undefined)?.email ?? null;
      return session;
    },
  },
});
