import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    const { pathname, origin } = req.nextUrl;
    if (
      req.nextUrl.pathname.includes("/dashboard") &&
      req.nextauth.token?.name?.length == 0
    ) {
      return NextResponse.redirect(new URL(`/`));
    }
  },
  {
    callbacks: {
      authorized: (params) => {
        let { token } = params;
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/cart/:path*"],
};
