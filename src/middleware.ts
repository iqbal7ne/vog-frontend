import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req: any) {
  console.log("Middleware running for path:", req.nextUrl.pathname);
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log("Token found in middleware:", token);
  const { pathname } = req.nextUrl;

  // Allow requests if the following is true...
  // 1) It's a request for next-auth session & provider fetching
  if (pathname.includes("/api/auth")) {
    return NextResponse.next();
  }

  // Redirect them to login if they don't have token and are requesting a protected route
  if (!token && pathname !== "/login") {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Protect section-post route - only allow manager, supervisor, or staff
  if (pathname.includes("/dashboard/section-post")) {
    const allowedTitles = ["manager", "supervisor", "staff"];
    const userTitle = (token as any)?.title;

    if (!userTitle || !allowedTitles.includes(userTitle.toLowerCase())) {
      const url = req.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/master/:path*",
    "/training/:path*",
    "/profile",
  ], // proteksi semua halaman di bawah /dashboard, /master, /training, dan /profile
};
