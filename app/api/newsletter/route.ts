import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
// Get these from https://supabase.com/dashboard after creating a project
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

// If Supabase is not configured, we'll use a simple file-based fallback
const useSupabase = supabaseUrl && supabaseKey;

let supabase: any = null;
if (useSupabase) {
  supabase = createClient(supabaseUrl, supabaseKey);
}

// Send notification email to admin when someone subscribes
async function sendNotificationEmail(email: string): Promise<boolean> {
  const resendApiKey = process.env.RESEND_API_KEY;
  const adminEmail = process.env.CONTACT_EMAIL || "hello@nexthardware.io";

  if (!resendApiKey) {
    console.warn("⚠️  Resend API key not configured. Email notification skipped.");
    return false;
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "Next Hardware <onboarding@resend.dev>",
        to: adminEmail,
        subject: "New Newsletter Subscriber",
        html: `
          <h2>New Newsletter Subscriber</h2>
          <p>A new person has subscribed to your newsletter!</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subscribed at:</strong> ${new Date().toLocaleString()}</p>
          <hr>
          <p><small>You can manage subscribers at: <a href="https://nexthardware.io/admin/subscribers">Admin Dashboard</a></small></p>
        `,
        text: `
New Newsletter Subscriber

A new person has subscribed to your newsletter!

Email: ${email}
Subscribed at: ${new Date().toLocaleString()}

You can manage subscribers at: https://nexthardware.io/admin/subscribers
        `,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Resend API error:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Email sending error:", error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }
    
    // Trim and lowercase email for consistency
    const normalizedEmail = email.trim().toLowerCase();

    // Try to save to Supabase if configured
    if (useSupabase && supabase) {
      try {
        const { data, error } = await supabase
          .from("newsletter_subscribers")
          .insert([{ email: normalizedEmail, subscribed_at: new Date().toISOString() }])
          .select();

        if (error) {
          // If email already exists, that's okay
          if (error.code === "23505") {
            return NextResponse.json(
              { message: "You're already subscribed!" },
              { status: 200 }
            );
          }
          // Log the actual error for debugging
          console.error("Supabase insert error:", error);
          console.error("Error details:", JSON.stringify(error, null, 2));
          // Return error instead of falling through
          return NextResponse.json(
            { error: "Failed to save subscription to database", details: error.message },
            { status: 500 }
          );
        }

        // Verify data was inserted
        if (!data || data.length === 0) {
          console.error("No data returned from insert");
          return NextResponse.json(
            { error: "Subscription not saved" },
            { status: 500 }
          );
        }

        // Send notification email to admin (non-blocking)
        sendNotificationEmail(normalizedEmail).catch((err) => {
          console.error("Failed to send notification email:", err);
        });

        return NextResponse.json(
          { message: "Successfully subscribed to newsletter" },
          { status: 200 }
        );
      } catch (dbError) {
        console.error("Database error:", dbError);
        // Return error instead of falling through silently
        return NextResponse.json(
          { error: "Database connection failed", details: dbError instanceof Error ? dbError.message : "Unknown error" },
          { status: 500 }
        );
      }
    }

    // Fallback: Log to console (for development)
    // In production, you should set up Supabase or another service
    console.log("Newsletter subscription (not saved to DB):", email);
    console.log("⚠️  Set up Supabase to save emails. See .env.example for instructions.");

    // Return success even if not saved (for development)
    return NextResponse.json(
      { message: "Successfully subscribed to newsletter" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe to newsletter" },
      { status: 500 }
    );
  }
}
