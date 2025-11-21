import { NextRequest, NextResponse } from "next/server";

// Admin password - stored server-side only (NOT exposed to client)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "nexthardware2024";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { error: "Password required" },
        { status: 400 }
      );
    }

    // Trim whitespace from input password
    const trimmedPassword = password.trim();
    const trimmedAdminPassword = ADMIN_PASSWORD.trim();

    // Compare passwords (trimmed to handle whitespace issues)
    const isValid = trimmedPassword === trimmedAdminPassword;

    // Debug logging (only in development)
    if (process.env.NODE_ENV === "development") {
      console.log("Password check:", {
        inputLength: trimmedPassword.length,
        expectedLength: trimmedAdminPassword.length,
        match: isValid,
      });
    }

    if (!isValid) {
      return NextResponse.json(
        { error: "Incorrect password" },
        { status: 401 }
      );
    }

    // Return success (you could add session/JWT here for better security)
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}

