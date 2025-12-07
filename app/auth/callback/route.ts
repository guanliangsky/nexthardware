import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createClient } from "@supabase/supabase-js";
import { sendMemberWelcomeEmailViaResend } from "@/lib/resend";

export const dynamic = 'force-dynamic';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');

    if (code) {
      const supabase = createRouteHandlerClient({ cookies });
      const { data: { session }, error: authError } = await supabase.auth.exchangeCodeForSession(code);

      if (authError || !session) {
        console.error("Supabase auth error:", authError);
        return NextResponse.redirect(requestUrl.origin + '/auth?error=oauth_failed');
      }

      const { user } = session;
      const email = user.email;
      const name = user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split("@")[0] || "User";
      const provider = user.app_metadata?.provider || "unknown";

      if (!email) {
        return NextResponse.redirect(requestUrl.origin + '/auth?error=no_email');
      }

      // Sync user to community_members table (for compatibility with existing system)
      if (supabaseServiceKey) {
        const supabaseService = createClient(supabaseUrl, supabaseServiceKey);
        const normalizedEmail = email.toLowerCase().trim();

        // Check if member exists
        let { data: existingMember } = await supabaseService
          .from("community_members")
          .select("id, email, name")
          .eq("email", normalizedEmail)
          .limit(1)
          .single();

        if (existingMember) {
          // Update name if provided
          if (name && name !== existingMember.name) {
            await supabaseService
              .from("community_members")
              .update({ name })
              .eq("id", existingMember.id);
          }
        } else {
          // Create new member
          const { error: insertError } = await supabaseService
            .from("community_members")
            .insert([
              {
                name,
                email: normalizedEmail,
                phone: null,
                company: null, // OAuth doesn't provide company info
                position: null, // OAuth doesn't provide position info
                password_hash: null, // OAuth users don't have passwords
                registered_at: new Date().toISOString(),
                discord_invite_sent: false,
                oauth_provider: provider,
                oauth_id: user.id,
              },
            ]);

          if (insertError) {
            console.error("Error creating member:", insertError);
            // Continue anyway - Supabase Auth session is still valid
          } else {
            // Send welcome email for new members
            try {
              await sendMemberWelcomeEmailViaResend({
                name,
                email: normalizedEmail,
                phone: null,
              });
            } catch (emailError) {
              console.error("Failed to send welcome email:", emailError);
            }
          }
        }
      }
    }

    // URL to redirect to after sign in process completes
    return NextResponse.redirect(requestUrl.origin + '/membership');
  } catch (error) {
    console.error("OAuth callback error:", error);
    const requestUrl = new URL(request.url);
    return NextResponse.redirect(requestUrl.origin + '/auth?error=oauth_failed');
  }
}

