import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendContactFormNotification } from "@/lib/formspree";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const useSupabase = supabaseUrl && supabaseKey;

let supabase: any = null;
if (useSupabase) {
  supabase = createClient(supabaseUrl, supabaseKey);
}

// Verify reCAPTCHA token
async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  
  if (!secretKey) {
    // If reCAPTCHA is not configured, allow the request (for development)
    console.warn("⚠️  reCAPTCHA secret key not configured. Skipping verification.");
    return true;
  }

  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();
    return data.success === true && data.score >= 0.5; // reCAPTCHA v3 score threshold
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    return false;
  }
}


export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message, recaptchaToken } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
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

    // Verify reCAPTCHA if token is provided
    if (recaptchaToken) {
      const isValidRecaptcha = await verifyRecaptcha(recaptchaToken);
      if (!isValidRecaptcha) {
        return NextResponse.json(
          { error: "reCAPTCHA verification failed. Please try again." },
          { status: 400 }
        );
      }
    }

    const formData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject?.trim() || "",
      message: message.trim(),
    };

    // Store in Supabase if configured
    if (useSupabase && supabase) {
      try {
        const { data, error } = await supabase
          .from("contact_messages")
          .insert([formData])
          .select();

        if (error) {
          console.error("Supabase insert error:", error);
          return NextResponse.json(
            { error: "Failed to save message to database", details: error.message },
            { status: 500 }
          );
        }

        // Send email notification via Formspree (non-blocking)
        console.log("📧 Sending contact form notification via Formspree...");
        sendContactFormNotification(formData).catch((err) => {
          console.error("Failed to send contact form notification:", err);
        });

        return NextResponse.json(
          { message: "Your message has been sent successfully!" },
          { status: 200 }
        );
      } catch (dbError) {
        console.error("Database error:", dbError);
        return NextResponse.json(
          { error: "Database connection failed", details: (dbError as Error).message },
          { status: 500 }
        );
      }
    }

    // Fallback: Log to console if Supabase is not configured
    console.log("Contact form submission (not saved):", formData);
    console.log("⚠️  Set up Supabase to save messages.");

    return NextResponse.json(
      { message: "Your message has been received. We'll get back to you soon!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form API error:", error);
    return NextResponse.json(
      { error: "Failed to send message", details: (error as Error).message },
      { status: 500 }
    );
  }
}

