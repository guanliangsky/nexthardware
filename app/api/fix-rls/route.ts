import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export async function POST(request: NextRequest) {
  try {
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: "Supabase not configured" },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Execute SQL to disable RLS
    // Note: Supabase client doesn't support direct SQL execution
    // We need to use the REST API or psql
    
    // Try using Supabase REST API
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
      method: "POST",
      headers: {
        "apikey": supabaseKey,
        "Authorization": `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: "ALTER TABLE newsletter_subscribers DISABLE ROW LEVEL SECURITY;"
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { 
          error: "Failed to execute SQL",
          details: errorText,
          message: "Please run this SQL in Supabase Dashboard SQL Editor: ALTER TABLE newsletter_subscribers DISABLE ROW LEVEL SECURITY;"
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "RLS disabled successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fix RLS error:", error);
    return NextResponse.json(
      { 
        error: "Failed to fix RLS",
        details: error instanceof Error ? error.message : "Unknown error",
        message: "Please run this SQL in Supabase Dashboard SQL Editor: ALTER TABLE newsletter_subscribers DISABLE ROW LEVEL SECURITY;"
      },
      { status: 500 }
    );
  }
}

