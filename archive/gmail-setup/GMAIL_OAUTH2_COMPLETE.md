# ✅ Gmail OAuth2 Setup Complete

## Summary

Gmail API has been successfully configured using OAuth2 for personal Gmail account (`liangoptics@gmail.com`).

## What Was Done

### 1. OAuth2 Client Setup
- Created OAuth2 client in Google Cloud Console
- Client ID: `139200018654-schou2gof9cgh6m0merqcslba84terps.apps.googleusercontent.com`
- Configured redirect URIs:
  - `http://localhost:3000/api/auth/gmail/callback` (local)
  - `https://nexthardware.io/api/auth/gmail/callback` (production)

### 2. OAuth2 Consent Screen
- Configured OAuth consent screen
- Added test user: `liangoptics@gmail.com`
- Requested scope: `https://www.googleapis.com/auth/gmail.send`

### 3. Refresh Token
- Obtained refresh token with correct `gmail.send` scope
- Token saved to `.env.local` and Vercel environment variables

### 4. Environment Variables

**Local (`.env.local`):**
```
GMAIL_CLIENT_ID=YOUR_GMAIL_CLIENT_ID
GMAIL_CLIENT_SECRET=YOUR_GMAIL_CLIENT_SECRET
GMAIL_REFRESH_TOKEN=YOUR_GMAIL_REFRESH_TOKEN
GMAIL_SENDER_EMAIL=YOUR_GMAIL_SENDER_EMAIL
```

**Vercel (Production):**
- All variables added to production and preview environments

### 5. Code Implementation
- `lib/gmail.ts`: Updated to use OAuth2 authentication
- `app/api/auth/gmail/callback/route.ts`: OAuth2 callback endpoint
- `get-gmail-refresh-token-production.js`: Script to obtain refresh tokens

### 6. Testing
- ✅ Access token refresh: Working
- ✅ Gmail send scope: Verified (`https://www.googleapis.com/auth/gmail.send`)
- ✅ Test email sent: Success (Message ID: 19aafe53b8cf3e94)

## How It Works

1. **Contact Form Submission** → `app/api/contact/route.ts`
2. **Email Sending** → `lib/gmail.ts` → `sendEmailViaGmail()`
3. **OAuth2 Authentication**:
   - Uses refresh token to get access token
   - Access token has `gmail.send` scope
   - Sends email via Gmail API

## Files Created/Modified

### New Files
- `get-gmail-refresh-token-production.js` - Script to get refresh tokens
- `app/api/auth/gmail/callback/route.ts` - OAuth2 callback endpoint
- `test-gmail-send-scope.js` - Test script for Gmail send scope
- `diagnose-gmail-oauth2.js` - Diagnostic script

### Modified Files
- `lib/gmail.ts` - Updated to use OAuth2 instead of service account
- `.env.local` - Added OAuth2 credentials

## Troubleshooting

### If emails fail to send:

1. **Check refresh token is valid:**
   ```bash
   node diagnose-gmail-oauth2.js
   ```

2. **Test Gmail send scope:**
   ```bash
   node test-gmail-send-scope.js
   ```

3. **Get new refresh token (if needed):**
   ```bash
   node get-gmail-refresh-token-production.js
   ```

4. **Check Vercel logs:**
   ```bash
   vercel logs --follow
   ```

### Common Issues

- **403 Insufficient Permissions**: Refresh token doesn't have correct scope → Get new refresh token
- **401 Invalid Grant**: Refresh token expired or revoked → Get new refresh token
- **Redirect URI Mismatch**: Check redirect URIs in Google Cloud Console

## Next Steps

1. ✅ Test contact form at: https://nexthardware.io/contact
2. ✅ Monitor email delivery
3. ✅ Check spam folder if emails don't arrive
4. ✅ Monitor Vercel logs for any errors

## Notes

- The refresh token is long-lived and doesn't expire unless revoked
- Access tokens are short-lived (1 hour) and automatically refreshed
- The OAuth2 client is in "Testing" mode - only `liangoptics@gmail.com` can authorize
- To add more users, add them as test users in Google Cloud Console
- To make it public, submit for verification in Google Cloud Console
