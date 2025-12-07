import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendMemberWelcomeEmail } from "@/lib/formspree";
import { hashPassword } from "@/lib/memberAuth";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const useSupabase = supabaseUrl && supabaseKey;

let supabase: any = null;
if (useSupabase) {
  supabase = createClient(supabaseUrl, supabaseKey);
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, company, position, password } = await request.json();

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Validate company and position are required
    if (!company || !company.trim()) {
      return NextResponse.json(
        { error: "Company is required" },
        { status: 400 }
      );
    }

    if (!position || !position.trim()) {
      return NextResponse.json(
        { error: "Position is required" },
        { status: 400 }
      );
    }

    // Password is required for full registration
    if (!password || typeof password !== 'string' || password.trim().length < 6) {
      return NextResponse.json(
        { error: "Password is required and must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Normalize email
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedName = name.trim();
    const normalizedPhone = phone ? phone.trim() : null;
    const normalizedCompany = company.trim(); // Required, so no null check
    const normalizedPosition = position.trim(); // Required, so no null check

    // Hash password
    const passwordHash = await hashPassword(password);

    // Try to save to Supabase if configured
    if (useSupabase && supabase) {
      try {
        const { data, error } = await supabase
          .from("community_members")
          .insert([
            {
              name: normalizedName,
              email: normalizedEmail,
              phone: normalizedPhone,
              company: normalizedCompany,
              position: normalizedPosition,
              password_hash: passwordHash,
              registered_at: new Date().toISOString(),
              discord_invite_sent: false,
            },
          ])
          .select();

        if (error) {
          // If email already exists
          if (error.code === "23505") {
            return NextResponse.json(
              { error: "Email already registered. Please login instead." },
              { status: 409 }
            );
          }
          console.error("Supabase insert error:", error);
          return NextResponse.json(
            { error: "Failed to save registration to database", details: error.message },
            { status: 500 }
          );
        }

        // Verify data was inserted
        if (!data || data.length === 0) {
          console.error("No data returned from insert");
          return NextResponse.json(
            { error: "Registration not saved" },
            { status: 500 }
          );
        }

        // Send Discord invite email via Formspree (non-blocking)
        console.log("📧 Sending Discord invite email via Formspree...");
        sendMemberWelcomeEmail({
          name: normalizedName,
          email: normalizedEmail,
          phone: normalizedPhone,
        }).catch((err) => {
          console.error("Failed to send Discord invite email:", err);
        });

        // Update discord_invite_sent flag (non-blocking)
        if (data[0]?.id) {
          supabase
            .from("community_members")
            .update({ discord_invite_sent: true })
            .eq("id", data[0].id)
            .then(() => {
              console.log("✅ Updated discord_invite_sent flag");
            })
            .catch((err: unknown) => {
              console.error("Failed to update discord_invite_sent flag:", err);
            });
        }

        return NextResponse.json(
          { 
            message: "Successfully registered! You can now login to access your membership dashboard.",
            memberId: data[0].id 
          },
          { status: 200 }
        );
      } catch (dbError) {
        console.error("Database error:", dbError);
        return NextResponse.json(
          { error: "Database connection failed", details: dbError instanceof Error ? dbError.message : "Unknown error" },
          { status: 500 }
        );
      }
    }

    // Fallback: Log to console (for development)
    console.log("Community member registration (not saved to DB):", { name, email, phone });
    console.log("⚠️  Set up Supabase to save registrations. See .env.example for instructions.");

    // Return success even if not saved (for development)
    return NextResponse.json(
      { message: "Successfully registered! You can now login." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Member registration error:", error);
    return NextResponse.json(
      { error: "Failed to register" },
      { status: 500 }
    );
  }
}

