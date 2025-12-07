// Create a simple API endpoint to view contact messages
// This will help verify database entries

const fs = require('fs');
const path = require('path');

const apiRoute = `import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

let supabase: any = null;
if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
}

export async function GET(request: NextRequest) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase not configured" },
        { status: 500 }
      );
    }

    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);

    if (error) {
      return NextResponse.json(
        { error: "Failed to fetch messages", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      count: data?.length || 0,
      messages: data || [],
    });
  } catch (error) {
    console.error("Error fetching contact messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}
`;

const filePath = path.join(__dirname, 'app', 'api', 'contact', 'messages', 'route.ts');
const dirPath = path.dirname(filePath);

// Create directory if it doesn't exist
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true });
}

// Write the file
fs.writeFileSync(filePath, apiRoute);
console.log('✅ Created /api/contact/messages endpoint');
console.log('   You can now check: http://localhost:3000/api/contact/messages');

