// Resend email utility for sending emails to users
// Resend free tier: 100 emails/day, 3,000 emails/month

interface ResendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text: string;
  from?: string;
  replyTo?: string;
}

/**
 * Send email via Resend API
 * Free tier: 100 emails/day, 3,000/month
 */
export async function sendEmailViaResend(
  options: ResendEmailOptions
): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn("⚠️  RESEND_API_KEY not configured. Skipping email.");
    return false;
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: options.from || "Next Hardware <onboarding@resend.dev>",
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
        reply_to: options.replyTo,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("❌ Resend API error:", errorData);
      return false;
    }

    const data = await response.json();
    console.log("✅ Resend email sent successfully:", data.id);
    return true;
  } catch (error) {
    console.error("❌ Resend API error:", error);
    return false;
  }
}

/**
 * Send welcome email to new member via Resend
 */
export async function sendMemberWelcomeEmailViaResend(memberData: {
  name: string;
  email: string;
  phone?: string | null;
}): Promise<boolean> {
  const discordLink = "https://discord.gg/d5dTjjVD";
  const adminEmail = process.env.CONTACT_EMAIL || "liangoptics@gmail.com";

  return sendEmailViaResend({
    to: memberData.email,
    subject: "Welcome to Next Hardware Community! 🎉",
    html: `
      <h2>Welcome to Next Hardware, ${memberData.name}!</h2>
      <p>Thank you for joining our Silicon Valley hardware community. We're excited to have you!</p>
      <p><strong>Join our Discord community to start collaborating:</strong></p>
      <p style="text-align: center; margin: 30px 0;">
        <a href="${discordLink}" style="display: inline-block; padding: 12px 24px; background-color: #5865F2; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
          Join Discord Community
        </a>
      </p>
      <p><a href="${discordLink}">${discordLink}</a></p>
      <hr>
      <p><strong>What's next?</strong></p>
      <ul>
        <li>Join our Discord to connect with other members</li>
        <li>Check out our upcoming events on <a href="https://luma.com/NextHardware">Luma</a></li>
        <li>Follow us on <a href="https://x.com/nexthardware">X/Twitter</a> for updates</li>
      </ul>
      <p>See you in the community!</p>
      <p>— The Next Hardware Team</p>
    `,
    text: `
Welcome to Next Hardware, ${memberData.name}!

Thank you for joining our Silicon Valley hardware community. We're excited to have you!

Join our Discord community to start collaborating:
${discordLink}

What's next?
- Join our Discord to connect with other members
- Check out our upcoming events on Luma: https://luma.com/NextHardware
- Follow us on X/Twitter: https://x.com/nexthardware

See you in the community!
— The Next Hardware Team
    `,
    replyTo: adminEmail,
  });
}


