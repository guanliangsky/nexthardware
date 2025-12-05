import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "nexthardware2024";
const SESSION_COOKIE_NAME = "admin_session";
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || "nexthardware-secret-key-change-me";

// Simple session token (in production, use JWT or proper session management)
function createSessionToken(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2);
  return Buffer.from(`${timestamp}-${random}-${SESSION_SECRET}`).toString("base64");
}

function verifySessionToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    return decoded.includes(SESSION_SECRET);
  } catch {
    return false;
  }
}

export async function authenticateAdmin(password: string): Promise<boolean> {
  const trimmedPassword = password.trim();
  const trimmedAdminPassword = ADMIN_PASSWORD.trim();
  return trimmedPassword === trimmedAdminPassword;
}

export async function createAdminSession(): Promise<string> {
  const token = createSessionToken();
  return token;
}

export async function verifyAdminSession(request: NextRequest): Promise<boolean> {
  const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  
  if (!sessionToken) {
    return false;
  }
  
  return verifySessionToken(sessionToken);
}

export async function getAdminSessionFromCookies(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    return cookieStore.get(SESSION_COOKIE_NAME)?.value || null;
  } catch {
    return null;
  }
}

export function getSessionCookieName(): string {
  return SESSION_COOKIE_NAME;
}

