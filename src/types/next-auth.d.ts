import type { DefaultSession } from "next-auth";
import type { AppRole } from "@/lib/roles";

declare module "next-auth" {
  interface Session {
    user: {
      role: AppRole;
      companyId: string;
      dealerId: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    role: AppRole;
    companyId: string;
    dealerId: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: AppRole;
    companyId: string;
    dealerId: string | null;
  }
}
