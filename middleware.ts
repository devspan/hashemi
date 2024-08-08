import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";

function redirectMobileUsers(request: NextRequest) {
  const userAgent = request.headers.get('user-agent');
  const isMobile = userAgent && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

  if (isMobile && !request.nextUrl.pathname.startsWith('/mobile')) {
    return NextResponse.redirect(new URL('/mobile', request.url));
  }

  return NextResponse.next();
}

export default function middleware(request: NextRequest) {
  // First, check if it's a mobile user and redirect if necessary
  const mobileResponse = redirectMobileUsers(request);
  if (mobileResponse !== NextResponse.next()) {
    return mobileResponse;
  }

  // If not redirected, proceed with Kinde authentication
  return withAuth(request);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    '/dashboard/:path*',
    '/profile/:path*',
    '/orders/:path*',
    '/settings/:path*'
  ],
};
