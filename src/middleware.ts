import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import type { NextRequestWithAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    if (
      req.nextUrl.pathname.startsWith("/brotherhood/classes") &&
      req.nextauth.token?.alumn
    ) {
      return NextResponse.redirect(new URL("/brotherhood", req.url));
    }

    return NextResponse.next();
  },
  {
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
      signIn: "/login",
      error: "/login",
    },
  }
);

export const config = {
  matcher: ["/brotherhood/:path*"],
};
