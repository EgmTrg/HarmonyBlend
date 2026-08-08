import { NextResponse } from "next/server";
import { auth } from "@/auth";

const ADMIN_ROLES = new Set(["company_admin", "brand_manager"]);

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const role = req.auth?.user?.role;

  if (pathname.startsWith("/admin")) {
    if (!req.auth) return NextResponse.redirect(new URL("/login", req.url));
    if (!role || !ADMIN_ROLES.has(role)) return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname.startsWith("/dealer")) {
    if (!req.auth) return NextResponse.redirect(new URL("/login", req.url));
    if (role !== "dealer_user") return NextResponse.redirect(new URL("/", req.url));
  }
});

export const config = {
  matcher: ["/admin/:path*", "/dealer/:path*"],
};
