import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req: any) {
  console.log("Middleware running for path:", req.nextUrl.pathname);
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log("Token found in middleware:", token);
  const { pathname } = req.nextUrl;

  // Allow requests if the following is true...
  // 1) It's a request for next-auth session & provider fetching
  // 2) The token exists
  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  // Redirect them to login if they don't have token and are requesting a protected route
  if (!token && pathname !== "/login") {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/master/:path*", "/training/:path*"], // proteksi semua halaman di bawah /dashboard, /master, dan /training
};
