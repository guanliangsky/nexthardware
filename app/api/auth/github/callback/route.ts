import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createMemberSession, getMemberSessionCookieName } from "@/lib/memberAuth";

export const dynamic = 'force-dynamic';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

let supabase: any = null;
if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const storedState = request.cookies.get("oauth_state")?.value;

    if (!code || !state || state !== storedState) {
      return NextResponse.redirect("/login?error=oauth_failed");
    }

    // Exchange code for access token
    const clientId = process.env.GITHUB_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;
    const redirectUri = process.env.GITHUB_REDIRECT_URI || `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/auth/github/callback`;

    const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: redirectUri,
      }),
    });

    if (!tokenResponse.ok) {
      return NextResponse.redirect("/login?error=oauth_failed");
    }

    const tokens = await tokenResponse.json();
    const accessToken = tokens.access_token;

    if (!accessToken) {
      return NextResponse.redirect("/login?error=oauth_failed");
    }

    // Get user info from GitHub
    const userResponse = await fetch("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!userResponse.ok) {
      return NextResponse.redirect("/login?error=oauth_failed");
    }

    const userData = await userResponse.json();
    const { login, name, email, avatar_url, id } = userData;

    // GitHub might not return email in user endpoint, try email endpoint
    let userEmail = email;
    if (!userEmail) {
      const emailResponse = await fetch("https://api.github.com/user/emails", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (emailResponse.ok) {
        const emails = await emailResponse.json();
        const primaryEmail = emails.find((e: any) => e.primary) || emails[0];
        userEmail = primaryEmail?.email;
      }
    }

    if (!userEmail) {
      return NextResponse.redirect("/login?error=no_email");
    }

    // Find or create member
    if (!supabase) {
      return NextResponse.redirect("/login?error=db_error");
    }

    const normalizedEmail = userEmail.toLowerCase().trim();
    const displayName = name || login;

    // Check if member exists
    let { data: existingMember } = await supabase
      .from("community_members")
      .select("id, email, name")
      .eq("email", normalizedEmail)
      .limit(1)
      .single();

    let memberId: number;

    if (existingMember) {
      memberId = existingMember.id;
      // Update name if provided
      if (displayName && displayName !== existingMember.name) {
        await supabase
          .from("community_members")
          .update({ name: displayName })
          .eq("id", memberId);
      }
    } else {
      // Create new member
      const { data: newMember, error } = await supabase
        .from("community_members")
        .insert([
          {
            name: displayName,
            email: normalizedEmail,
            phone: null,
            password_hash: null, // OAuth users don't have passwords
            registered_at: new Date().toISOString(),
            discord_invite_sent: false,
            oauth_provider: "github",
            oauth_id: id.toString(),
          },
        ])
        .select()
        .single();

      if (error || !newMember) {
        console.error("Error creating member:", error);
        return NextResponse.redirect("/login?error=registration_failed");
      }

      memberId = newMember.id;

      // Send welcome email
      try {
        const { sendMemberWelcomeEmailViaResend } = await import("@/lib/resend");
        await sendMemberWelcomeEmailViaResend({
          name: displayName,
          email: normalizedEmail,
          phone: null,
        });
      } catch (emailError) {
        console.error("Failed to send welcome email:", emailError);
      }
    }

    // Create session
    const sessionToken = await createMemberSession(memberId, normalizedEmail);

    const response = NextResponse.redirect("/membership");
    response.cookies.delete("oauth_state");
    response.cookies.set(getMemberSessionCookieName(), sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("GitHub OAuth error:", error);
    return NextResponse.redirect("/login?error=oauth_failed");
  }
}

