import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { verifyAdminSession } from "@/lib/auth";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

let supabase: any = null;
if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // SECURITY: Verify admin session
    const isAuthenticated = await verifyAdminSession(request);
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: "Unauthorized - Admin authentication required" },
        { status: 401 }
      );
    }

    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase not configured" },
        { status: 500 }
      );
    }

    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid subscriber ID" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("newsletter_subscribers")
      .delete()
      .eq("id", id);

    if (error) {
      throw error;
    }

    return NextResponse.json({ message: "Subscriber deleted successfully" });
  } catch (error) {
    console.error("Error deleting subscriber:", error);
    return NextResponse.json(
      { error: "Failed to delete subscriber" },
      { status: 500 }
    );
  }
}

