import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";

const MEMBER_SESSION_COOKIE_NAME = "member_session";
const MEMBER_SESSION_SECRET = process.env.MEMBER_SESSION_SECRET || "nexthardware-member-secret-key-change-me";

// Create session token for members
function createMemberSessionToken(memberId: number, email: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2);
  const payload = `${memberId}-${email}-${timestamp}-${random}`;
  return Buffer.from(`${payload}-${MEMBER_SESSION_SECRET}`).toString("base64");
}

// Verify session token
function verifyMemberSessionToken(token: string): { memberId: number; email: string } | null {
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    if (!decoded.includes(MEMBER_SESSION_SECRET)) {
      return null;
    }
    
    // Extract member info from token
    const parts = decoded.split("-");
    if (parts.length < 4) {
      return null;
    }
    
    const memberId = parseInt(parts[0], 10);
    const email = parts[1];
    
    if (isNaN(memberId) || !email) {
      return null;
    }
    
    return { memberId, email };
  } catch {
    return null;
  }
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

// Verify password
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Create member session
export async function createMemberSession(memberId: number, email: string): Promise<string> {
  return createMemberSessionToken(memberId, email);
}

// Verify member session from request
export async function verifyMemberSession(request: NextRequest): Promise<{ memberId: number; email: string } | null> {
  const sessionToken = request.cookies.get(MEMBER_SESSION_COOKIE_NAME)?.value;
  
  if (!sessionToken) {
    return null;
  }
  
  return verifyMemberSessionToken(sessionToken);
}

// Get session cookie name
export function getMemberSessionCookieName(): string {
  return MEMBER_SESSION_COOKIE_NAME;
}


