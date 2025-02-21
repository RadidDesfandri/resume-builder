import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const guestOnlyRoutes = ['/login'];
  const protectedRoutes = ['/dashboard'];

  const isProtectedRoute = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );
  const isGuestOnlyRoute = guestOnlyRoutes.includes(req.nextUrl.pathname);

  // **Jika user tidak login dan akses halaman terlarang → Redirect ke login**
  if (!session && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // **Jika user sudah login dan akses halaman login → Redirect ke dashboard**
  if (session && isGuestOnlyRoute) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
