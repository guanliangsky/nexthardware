import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export async function PATCH(request: NextRequest) {
  try {
    // Verify user is authenticated
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const userEmail = session.user.email;
    if (!userEmail) {
      return NextResponse.json(
        { error: "User email not found" },
        { status: 400 }
      );
    }

    // Get update data from request
    const { phone, company, position } = await request.json();

    // Validate required fields
    if (company === undefined || !company || !company.trim()) {
      return NextResponse.json(
        { error: "Company is required" },
        { status: 400 }
      );
    }

    if (position === undefined || !position || !position.trim()) {
      return NextResponse.json(
        { error: "Position is required" },
        { status: 400 }
      );
    }

    // Use service role key for database update
    if (!supabaseServiceKey) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 500 }
      );
    }

    const supabaseService = createClient(supabaseUrl, supabaseServiceKey);
    const normalizedEmail = userEmail.toLowerCase().trim();

    // Build update object
    const updateData: any = {
      company: company.trim(), // Required
      position: position.trim(), // Required
    };
    if (phone !== undefined) {
      updateData.phone = phone ? phone.trim() : null;
    }

    // Update member info
    const { data, error } = await supabaseService
      .from("community_members")
      .update(updateData)
      .eq("email", normalizedEmail)
      .select()
      .single();

    if (error) {
      console.error("Error updating member:", error);
      return NextResponse.json(
        { error: "Failed to update member information", details: error.message },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: "Member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        message: "Member information updated successfully",
        member: data
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update member error:", error);
    return NextResponse.json(
      { error: "Failed to update member information" },
      { status: 500 }
    );
  }
}

