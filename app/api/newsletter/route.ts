import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendNewsletterSubscriptionNotification } from "@/lib/formspree";

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

        // Send email notification via Formspree (non-blocking)
        console.log("📧 Sending newsletter subscription notification via Formspree...");
        sendNewsletterSubscriptionNotification(normalizedEmail).catch((err) => {
          console.error("Failed to send newsletter notification:", err);
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
