import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { verifyPassword, createMemberSession, getMemberSessionCookieName, verifyMemberSession } from "@/lib/memberAuth";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const useSupabase = supabaseUrl && supabaseKey;

let supabase: any = null;
if (useSupabase) {
  supabase = createClient(supabaseUrl, supabaseKey);
}

// Login endpoint
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Normalize email
    const normalizedEmail = email.trim().toLowerCase();

    if (!useSupabase || !supabase) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 500 }
      );
    }

    // Find member by email
    const { data: members, error } = await supabase
      .from("community_members")
      .select("id, email, name, password_hash")
      .eq("email", normalizedEmail)
      .limit(1);

    if (error) {
      console.error("Supabase query error:", error);
      return NextResponse.json(
        { error: "Database error" },
        { status: 500 }
      );
    }

    if (!members || members.length === 0) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const member = members[0];

    // Check if member has a password (old registrations might not have one)
    if (!member.password_hash) {
      return NextResponse.json(
        { error: "Account not set up with password. Please register again with a password." },
        { status: 401 }
      );
    }

    // Verify password
    const isValid = await verifyPassword(password, member.password_hash);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Create session
    const sessionToken = await createMemberSession(member.id, member.email);

    // Set secure HTTP-only cookie
    const response = NextResponse.json({ 
      success: true,
      member: {
        id: member.id,
        name: member.name,
        email: member.email,
      }
    });
    
    response.cookies.set(getMemberSessionCookieName(), sessionToken, {
      httpOnly: true, // Prevents JavaScript access
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      sameSite: "strict", // CSRF protection
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Login failed" },
      { status: 500 }
    );
  }
}

// Get current member session
export async function GET(request: NextRequest) {
  try {
    const session = await verifyMemberSession(request);

    if (!session) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }

    // Get member details
    if (!useSupabase || !supabase) {
      return NextResponse.json(
        { authenticated: false },
        { status: 500 }
      );
    }

    const { data: member, error } = await supabase
      .from("community_members")
      .select("id, name, email, phone, registered_at")
      .eq("id", session.memberId)
      .eq("email", session.email)
      .single();

    if (error || !member) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }

    return NextResponse.json({
      authenticated: true,
      member: {
        id: member.id,
        name: member.name,
        email: member.email,
        phone: member.phone,
        registeredAt: member.registered_at,
      }
    });
  } catch (error) {
    console.error("Session check error:", error);
    return NextResponse.json(
      { authenticated: false },
      { status: 500 }
    );
  }
}

// Logout endpoint
export async function DELETE(request: NextRequest) {
  const response = NextResponse.json({ success: true });
  response.cookies.delete(getMemberSessionCookieName());
  return response;
}


