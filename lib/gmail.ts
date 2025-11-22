import { google } from "googleapis";
import { readFileSync } from "fs";
import { join } from "path";

// Gmail API email sending function
export async function sendEmailViaGmail(options: {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}): Promise<boolean> {
  try {
    // Load service account credentials
    // Try environment variable first (for Vercel), then local file (for development)
    let credentials;
    
    // Option 1: From environment variable (Vercel/production) - base64 encoded
    const gmailServiceAccountJsonBase64 = process.env.GMAIL_SERVICE_ACCOUNT_JSON_BASE64;
    if (gmailServiceAccountJsonBase64) {
      try {
        const decoded = Buffer.from(gmailServiceAccountJsonBase64, "base64").toString("utf8");
        credentials = JSON.parse(decoded);
        console.log("✅ Loaded Gmail credentials from environment variable (base64)");
      } catch (error) {
        console.error("❌ Failed to decode/parse GMAIL_SERVICE_ACCOUNT_JSON_BASE64:", error);
        return false;
      }
    } else {
      // Option 2: From local file (development)
      const credentialsPath = join(process.cwd(), "credentials", "gmail-service-account.json");
      try {
        const credentialsFile = readFileSync(credentialsPath, "utf8");
        credentials = JSON.parse(credentialsFile);
        console.log("✅ Loaded Gmail credentials from local file");
      } catch (error) {
        console.error("❌ Failed to load Gmail service account credentials:", error);
        console.error("❌ Make sure credentials/gmail-service-account.json exists or GMAIL_SERVICE_ACCOUNT_JSON env var is set");
        return false;
      }
    }

    // Create JWT client for service account
    const auth = new google.auth.JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: ["https://www.googleapis.com/auth/gmail.send"],
    });

    // Get access token
    await auth.authorize();

    // Create Gmail API client
    const gmail = google.gmail({ version: "v1", auth });

    // Create email message
    const message = [
      `To: ${options.to}`,
      `Subject: ${options.subject}`,
      `Content-Type: text/html; charset=utf-8`,
      options.replyTo ? `Reply-To: ${options.replyTo}` : "",
      "",
      options.html,
    ]
      .filter((line) => line !== "")
      .join("\n");

    // Encode message in base64url format
    const encodedMessage = Buffer.from(message)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    // Send email
    const response = await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedMessage,
      },
    });

    if (response.data.id) {
      console.log("✅ Gmail API: Email sent successfully");
      console.log("✅ Message ID:", response.data.id);
      return true;
    }

    console.error("❌ Gmail API: No message ID returned");
    return false;
  } catch (error: any) {
    console.error("❌ Gmail API error:", error);
    console.error("❌ Error details:", error.message);
    
    // Check for common errors
    if (error.message?.includes("delegation")) {
      console.error("⚠️  Domain-wide delegation might be required");
      console.error("⚠️  Or use OAuth2 for personal Gmail accounts");
    }
    
    return false;
  }
}

