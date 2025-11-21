import { NextRequest, NextResponse } from "next/server";
import { authenticateAdmin, createAdminSession, getSessionCookieName } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { error: "Password required" },
        { status: 400 }
      );
    }

    // Verify password
    const isValid = await authenticateAdmin(password);

    if (!isValid) {
      return NextResponse.json(
        { error: "Incorrect password" },
        { status: 401 }
      );
    }

    // Create secure session token
    const sessionToken = await createAdminSession();

    // Set secure HTTP-only cookie
    const response = NextResponse.json({ success: true });
    response.cookies.set(getSessionCookieName(), sessionToken, {
      httpOnly: true, // Prevents JavaScript access
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      sameSite: "strict", // CSRF protection
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}

// Logout endpoint
export async function DELETE(request: NextRequest) {
  const response = NextResponse.json({ success: true });
  response.cookies.delete(getSessionCookieName());
  return response;
}

