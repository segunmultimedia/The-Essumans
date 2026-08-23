import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SESSION_COOKIE_NAME = "essuman_admin_session";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Only protect /admin routes
  if (pathname.startsWith("/admin")) {
    
    // Allow public access to login page
    if (pathname === "/admin/login") {
      const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;
      if (sessionToken) {
        // Redirect to /admin if already logged in
        try {
          const secretStr = process.env.ADMIN_SESSION_SECRET;
          if (!secretStr) throw new Error("Missing ADMIN_SESSION_SECRET");
          const secret = new TextEncoder().encode(secretStr);
          await jwtVerify(sessionToken, secret);
          return NextResponse.redirect(new URL("/admin", request.url));
        } catch (error) {
          // Token invalid, let them see the login page
          return NextResponse.next();
        }
      }
      return NextResponse.next();
    }
    
    // For all other /admin routes, require valid session
    const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    if (!sessionToken) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    
    try {
      const secretStr = process.env.ADMIN_SESSION_SECRET;
      if (!secretStr) throw new Error("Missing ADMIN_SESSION_SECRET");
      const secret = new TextEncoder().encode(secretStr);
      await jwtVerify(sessionToken, secret);
      return NextResponse.next();
    } catch (error) {
      // Invalid or expired token
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
