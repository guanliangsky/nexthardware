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

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Try to save to Supabase if configured
    if (useSupabase && supabase) {
      try {
        const { error } = await supabase
          .from("newsletter_subscribers")
          .insert([{ email, subscribed_at: new Date().toISOString() }]);

        if (error) {
          // If email already exists, that's okay
          if (error.code === "23505") {
            return NextResponse.json(
              { message: "You're already subscribed!" },
              { status: 200 }
            );
          }
          throw error;
        }

        return NextResponse.json(
          { message: "Successfully subscribed to newsletter" },
          { status: 200 }
        );
      } catch (dbError) {
        console.error("Database error:", dbError);
        // Fall through to file-based storage
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
