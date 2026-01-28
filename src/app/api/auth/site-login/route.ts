import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const sitePassword = process.env.NEXT_PUBLIC_SITE_PASSWORD;

    // Check if site password is configured
    if (!sitePassword) {
      return NextResponse.json(
        { error: 'Site password not configured' },
        { status: 500 }
      );
    }

    // Validate password
    if (password !== sitePassword) {
      return NextResponse.json(
        { error: 'Incorrect password' },
        { status: 401 }
      );
    }

    // Password is correct - create response with cookie
    const response = NextResponse.json({ success: true });

    response.cookies.set('site-access-token', sitePassword, {
      path: '/',
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}
