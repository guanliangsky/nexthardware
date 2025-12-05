# Newsletter Integration Guide

## Current Implementation

The newsletter component is set up and ready to integrate with your preferred newsletter service. Currently, it uses a placeholder API endpoint.

## Integration Options

### Option 1: Mailchimp (Recommended for Beginners)

1. **Sign up for Mailchimp** at https://mailchimp.com
2. **Get your API key** from Account → Extras → API keys
3. **Get your Audience ID** from Audience → Settings → Audience name and defaults
4. **Update the API route:**

```typescript
// app/api/newsletter/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    
    const response = await fetch(
      `https://${process.env.MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_AUDIENCE_ID}/members`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.MAILCHIMP_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: email,
          status: 'subscribed',
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Subscription failed');
    }

    return NextResponse.json({ message: 'Successfully subscribed' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}
```

5. **Add to `.env.local`:**
```
MAILCHIMP_API_KEY=your_api_key_here
MAILCHIMP_SERVER_PREFIX=us1 (or your server prefix)
MAILCHIMP_AUDIENCE_ID=your_audience_id_here
```

### Option 2: ConvertKit

1. **Sign up for ConvertKit** at https://convertkit.com
2. **Get your API key** from Settings → Advanced → API Secret
3. **Get your Form ID** from Forms
4. **Update the API route:**

```typescript
const response = await fetch(
  `https://api.convertkit.com/v3/forms/${process.env.CONVERTKIT_FORM_ID}/subscribe`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      api_key: process.env.CONVERTKIT_API_KEY,
      email: email,
    }),
  }
);
```

### Option 3: Resend (Simple Email API)

1. **Sign up for Resend** at https://resend.com
2. **Get your API key** from API Keys
3. **Update the API route:**

```typescript
const response = await fetch('https://api.resend.com/emails', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    from: 'newsletter@nexthardware.io',
    to: email,
    subject: 'Welcome to Next Hardware Newsletter',
    html: '<p>Thank you for subscribing!</p>',
  }),
});
```

### Option 4: SendGrid

1. **Sign up for SendGrid** at https://sendgrid.com
2. **Get your API key** from Settings → API Keys
3. **Update the API route:**

```typescript
const response = await fetch('https://api.sendgrid.com/v3/marketing/contacts', {
  method: 'PUT',
  headers: {
    'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    contacts: [{ email }],
  }),
});
```

## Environment Variables

Add to your `.env.local` file:

```env
# Choose one based on your service:
MAILCHIMP_API_KEY=your_key_here
MAILCHIMP_SERVER_PREFIX=us1
MAILCHIMP_AUDIENCE_ID=your_id_here

# OR
CONVERTKIT_API_KEY=your_key_here
CONVERTKIT_FORM_ID=your_form_id_here

# OR
RESEND_API_KEY=your_key_here

# OR
SENDGRID_API_KEY=your_key_here
```

## Privacy Compliance

The newsletter component:
- ✅ Only collects email addresses
- ✅ Includes privacy notice
- ✅ Mentions unsubscribe option
- ✅ Complies with CAN-SPAM Act
- ✅ Ready for GDPR compliance (add consent checkbox if needed)

## Testing

1. Test the form submission
2. Verify emails are received
3. Test error handling
4. Verify unsubscribe links work (from your email service)

## Next Steps

1. Choose a newsletter service
2. Update `app/api/newsletter/route.ts` with your service's API
3. Add environment variables
4. Test the integration
5. Update Privacy Policy if you collect additional data

---

**Current Status:** ✅ Component ready, needs API integration

