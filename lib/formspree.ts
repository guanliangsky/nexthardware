// Formspree email utility
// Formspree endpoint format: https://formspree.io/f/{form_id}

interface FormspreeEmailOptions {
  to?: string; // Optional: override default recipient
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}

/**
 * Send email via Formspree
 * @param formId - Your Formspree form ID (from environment variable or passed directly)
 * @param options - Email options
 */
export async function sendEmailViaFormspree(
  formId: string,
  options: FormspreeEmailOptions
): Promise<boolean> {
  try {
    // Formspree accepts form fields directly
    // For autoresponse emails, include 'email' field and Formspree will send to that address
    // The recipient in dashboard receives the notification
    const body: Record<string, string> = {
      _subject: options.subject,
      message: options.html || options.text,
    };

    // Add optional fields
    // Include email field - Formspree uses this for autoresponse if configured
    if (options.to) {
      body.email = options.to; // This field triggers autoresponse to the user
    }
    if (options.replyTo) {
      body._replyto = options.replyTo;
    }

    const response = await fetch(`https://formspree.io/f/${formId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("❌ Formspree API error:", errorData);
      return false;
    }

    const data = await response.json();
    console.log("✅ Formspree email sent successfully");
    return true;
  } catch (error) {
    console.error("❌ Formspree API error:", error);
    return false;
  }
}

/**
 * Send contact form notification email
 */
export async function sendContactFormNotification(formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<boolean> {
  const formId = process.env.FORMSPREE_CONTACT_FORM_ID;
  
  if (!formId) {
    console.warn("⚠️  FORMSPREE_CONTACT_FORM_ID not configured. Skipping email notification.");
    return false;
  }

  const recipientEmail = process.env.CONTACT_EMAIL || "hello@nexthardware.io";

  return sendEmailViaFormspree(formId, {
    to: recipientEmail,
    subject: formData.subject || `Contact Form: ${formData.name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Subject:</strong> ${formData.subject || "No subject"}</p>
      <hr>
      <p><strong>Message:</strong></p>
      <p>${formData.message.replace(/\n/g, "<br>")}</p>
    `,
    text: `
New Contact Form Submission

Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject || "No subject"}

Message:
${formData.message}
    `,
    replyTo: formData.email,
  });
}

/**
 * Send newsletter subscription notification email
 */
export async function sendNewsletterSubscriptionNotification(email: string): Promise<boolean> {
  const formId = process.env.FORMSPREE_NEWSLETTER_FORM_ID || process.env.FORMSPREE_CONTACT_FORM_ID;
  
  if (!formId) {
    console.warn("⚠️  FORMSPREE_NEWSLETTER_FORM_ID not configured. Skipping email notification.");
    return false;
  }

  const recipientEmail = process.env.CONTACT_EMAIL || "hello@nexthardware.io";

  return sendEmailViaFormspree(formId, {
    to: recipientEmail,
    subject: "New Newsletter Subscriber",
    html: `
      <h2>New Newsletter Subscriber</h2>
      <p>A new person has subscribed to your newsletter!</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subscribed at:</strong> ${new Date().toLocaleString()}</p>
      <hr>
      <p><small>You can manage subscribers at: <a href="https://nexthardware.io/admin/subscribers">Admin Dashboard</a></small></p>
    `,
    text: `
New Newsletter Subscriber

A new person has subscribed to your newsletter!

Email: ${email}
Subscribed at: ${new Date().toLocaleString()}

You can manage subscribers at: https://nexthardware.io/admin/subscribers
    `,
  });
}

/**
 * Send member welcome email with Discord invite link
 * Uses Resend (free tier) for user emails, Formspree for admin notifications
 */
export async function sendMemberWelcomeEmail(memberData: {
  name: string;
  email: string;
  phone?: string | null;
}): Promise<boolean> {
  const formId = process.env.FORMSPREE_CONTACT_FORM_ID;
  const recipientEmail = process.env.CONTACT_EMAIL || "liangoptics@gmail.com";

  // Import Resend function dynamically to avoid circular dependencies
  const { sendMemberWelcomeEmailViaResend } = await import("@/lib/resend");

  // Send welcome email to the new member via Resend (free tier)
  console.log("📧 Sending welcome email to member via Resend...");
  const memberEmailSent = await sendMemberWelcomeEmailViaResend(memberData);

  // Also notify admin about new member registration via Formspree (free tier)
  let adminNotificationSent = true;
  if (formId) {
    console.log("📧 Sending admin notification via Formspree...");
    adminNotificationSent = await sendEmailViaFormspree(formId, {
      to: recipientEmail,
      subject: `New Community Member: ${memberData.name}`,
      html: `
        <h2>New Community Member Registration</h2>
        <p>A new member has joined the Next Hardware community!</p>
        <p><strong>Name:</strong> ${memberData.name}</p>
        <p><strong>Email:</strong> ${memberData.email}</p>
        ${memberData.phone ? `<p><strong>Phone:</strong> ${memberData.phone}</p>` : ''}
        <p><strong>Registered at:</strong> ${new Date().toLocaleString()}</p>
        <hr>
        <p><small>Welcome email with Discord invite has been sent to the member's email.</small></p>
      `,
      text: `
New Community Member Registration

A new member has joined the Next Hardware community!

Name: ${memberData.name}
Email: ${memberData.email}
${memberData.phone ? `Phone: ${memberData.phone}` : ''}
Registered at: ${new Date().toLocaleString()}

Welcome email with Discord invite has been sent to the member's email.
      `,
      replyTo: memberData.email,
    });
  } else {
    console.warn("⚠️  FORMSPREE_CONTACT_FORM_ID not configured. Skipping admin notification.");
  }

  return memberEmailSent && adminNotificationSent;
}

