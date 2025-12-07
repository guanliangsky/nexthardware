import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  
  // Determine redirect URI based on environment
  let redirectUri = process.env.GOOGLE_REDIRECT_URI;
  
  // If not set, construct from request origin
  if (!redirectUri) {
    const origin = request.headers.get('origin') || request.headers.get('host');
    if (origin) {
      const protocol = origin.includes('localhost') ? 'http' : 'https';
      const host = origin.replace(/^https?:\/\//, '').replace(/^localhost/, 'localhost:3000');
      redirectUri = `${protocol}://${host}/api/auth/google/callback`;
    } else {
      redirectUri = process.env.NEXT_PUBLIC_SITE_URL 
        ? `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/google/callback`
        : 'https://nexthardware.io/api/auth/google/callback';
    }
  }
  
  // Log for debugging (remove in production)
  console.log('🔍 Google OAuth redirect_uri:', redirectUri);
  console.log('🔍 Google OAuth client_id:', clientId ? `${clientId.substring(0, 20)}...` : 'NOT SET');
  
  if (!clientId) {
    return NextResponse.json(
      { error: "Google OAuth not configured" },
      { status: 500 }
    );
  }

  const scope = "openid email profile";
  const state = Math.random().toString(36).substring(7); // Simple state for CSRF protection
  
  // Store state in cookie for verification
  const response = NextResponse.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scope)}&state=${state}&access_type=offline&prompt=consent`
  );
  
  response.cookies.set('oauth_state', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 600, // 10 minutes
    path: "/",
  });

  return response;
}

