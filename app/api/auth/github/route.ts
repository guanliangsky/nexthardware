import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const redirectUri = process.env.GITHUB_REDIRECT_URI || `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/auth/github/callback`;
  
  if (!clientId) {
    return NextResponse.json(
      { error: "GitHub OAuth not configured" },
      { status: 500 }
    );
  }

  const scope = "user:email";
  const state = Math.random().toString(36).substring(7); // Simple state for CSRF protection
  
  // Store state in cookie for verification
  const response = NextResponse.redirect(
    `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&state=${state}`
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

