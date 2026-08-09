import type { DefaultSession } from "next-auth";
import type { AppRole } from "@/lib/roles";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string | null;
      role: AppRole;
      companyId: string;
      dealerId: string | null;
      impersonatorEmail: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    name: string | null;
    role: AppRole;
    companyId: string;
    dealerId: string | null;
  }
}

interface StashedIdentity {
  id: string;
  name: string | null;
  email: string;
  role: AppRole;
  companyId: string;
  dealerId: string | null;
}

declare module "next-auth/jwt" {
  interface JWT {
    name: string | null;
    role: AppRole;
    companyId: string;
    dealerId: string | null;
    impersonator?: StashedIdentity | null;
  }
}
