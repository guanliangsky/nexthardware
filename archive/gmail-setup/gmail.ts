import { google } from "googleapis";
import { readFileSync } from "fs";
import { join } from "path";

// Gmail API email sending function
// Supports both OAuth2 (for personal Gmail) and Service Accounts (for Google Workspace)
export async function sendEmailViaGmail(options: {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}): Promise<boolean> {
  try {
    const senderEmail = process.env.GMAIL_SENDER_EMAIL || "liangoptics@gmail.com";
    let auth: any;
    
    console.log("📧 Gmail API: Starting email send");
    console.log("📧 Sender email:", senderEmail);
    console.log("📧 Recipient:", options.to);

    // Try OAuth2 first (for personal Gmail accounts)
    const clientId = process.env.GMAIL_CLIENT_ID;
    const clientSecret = process.env.GMAIL_CLIENT_SECRET;
    const refreshToken = process.env.GMAIL_REFRESH_TOKEN;

    if (clientId && clientSecret && refreshToken) {
      // Use OAuth2 (for personal Gmail)
      console.log("📧 Using OAuth2 authentication (personal Gmail)");
      console.log("📧 Client ID present:", !!clientId);
      console.log("📧 Client Secret present:", !!clientSecret);
      console.log("📧 Refresh Token present:", !!refreshToken);
      
      const oauth2Client = new google.auth.OAuth2(
        clientId,
        clientSecret,
        'https://nexthardware.io/api/auth/gmail/callback' // Redirect URI (not used for refresh token flow)
      );

      // Set credentials with refresh token
      oauth2Client.setCredentials({
        refresh_token: refreshToken,
      });
      
      console.log("📧 Refresh token length:", refreshToken.length);
      console.log("📧 Refresh token starts with:", refreshToken.substring(0, 20) + "...");

      // Get access token from refresh token
      // Note: The scope is determined by the refresh token itself
      // If this fails with insufficient scopes, we need a new refresh token
      try {
        console.log("📧 Attempting to refresh access token...");
        const { credentials } = await oauth2Client.refreshAccessToken();
        oauth2Client.setCredentials(credentials);
        console.log("✅ Gmail OAuth2: Access token obtained");
        console.log("✅ Access token expires at:", credentials.expiry_date ? new Date(credentials.expiry_date).toISOString() : "N/A");
        auth = oauth2Client;
      } catch (error: any) {
        console.error("❌ Failed to refresh OAuth2 access token:", error.message);
        console.error("❌ Error code:", error.code);
        console.error("❌ Error response:", error.response?.data || "No response data");
        console.error("⚠️  Check that GMAIL_REFRESH_TOKEN is valid");
        console.error("⚠️  Full error:", JSON.stringify(error, null, 2));
        return false;
      }
    } else {
      // Fallback to Service Account (for Google Workspace with domain-wide delegation)
      console.log("📧 Using Service Account authentication (Google Workspace)");
      
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
          console.error("❌ For personal Gmail, use OAuth2 (GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REFRESH_TOKEN)");
          console.error("❌ For Google Workspace, use service account with domain-wide delegation");
          return false;
        }
      }

      // Create JWT client for service account
      const authConfig: any = {
        email: credentials.client_email,
        key: credentials.private_key,
        scopes: ["https://www.googleapis.com/auth/gmail.send"],
      };
      
      // Add subject (user to impersonate) if sender email is provided
      // This enables domain-wide delegation
      if (senderEmail && senderEmail.includes("@")) {
        authConfig.subject = senderEmail;
        console.log(`📧 Using domain-wide delegation to send as: ${senderEmail}`);
      }

      const jwtAuth = new google.auth.JWT(authConfig);
      await jwtAuth.authorize();
      auth = jwtAuth;
    }

    // Create Gmail API client
    const gmail = google.gmail({ version: "v1", auth });

    // Create email message with proper From header
    const message = [
      `From: ${senderEmail}`,
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
      userId: "me", // "me" refers to the authenticated user
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
    console.error("❌ Error code:", error.code);
    console.error("❌ Error response:", error.response?.data || "No response data");
    console.error("❌ Full error:", JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
    
    // Check for common errors
    if (error.message?.includes("delegation")) {
      console.error("⚠️  Domain-wide delegation might be required (for Google Workspace)");
      console.error("⚠️  Or use OAuth2 for personal Gmail accounts");
    }
    
    if (error.message?.includes("invalid_grant") || error.message?.includes("invalid_token")) {
      console.error("⚠️  OAuth2 refresh token might be invalid or expired");
      console.error("⚠️  Get a new refresh token using: node get-gmail-refresh-token.js");
    }
    
    if (error.code === 401 || error.message?.includes("unauthorized")) {
      console.error("⚠️  Authentication failed - check OAuth2 credentials");
    }
    
    if (error.code === 403 || error.message?.includes("forbidden")) {
      console.error("⚠️  Permission denied - check Gmail API permissions");
    }
    
    return false;
  }
}

