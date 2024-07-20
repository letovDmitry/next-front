import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token");
  const isBooster = req.cookies.get("isBooster")?.value === "true";
  console.log(isBooster);
  if (
    token &&
    (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/register")
  ) {
    if (isBooster) return NextResponse.redirect(new URL("/booster", req.url));
    else return NextResponse.redirect(new URL("/member", req.url));
  }

  if (
    !token &&
    req.nextUrl.pathname !== "/login" &&
    req.nextUrl.pathname !== "/register"
  )
    return NextResponse.redirect(new URL("/login", req.url));

  if (isBooster && req.nextUrl.pathname === "/member")
    return NextResponse.redirect(new URL("/booster", req.url));
  if (!isBooster && req.nextUrl.pathname === "/booster")
    return NextResponse.redirect(new URL("/member", req.url));
}

export const config = {
  matcher: [
    "/login/:path*",
    "/register/:path*",
    "/member/:path*",
    "/booster/:path*",
    "/checkout/:path*",
  ],
};
