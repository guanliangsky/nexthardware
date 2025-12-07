# 🚀 OAuth Setup - Quick Reference

## 📝 Quick Checklist

### Google OAuth (5 steps)
1. ✅ Go to https://console.cloud.google.com
2. ✅ Create project → Enable Google+ API
3. ✅ Configure OAuth consent screen
4. ✅ Create OAuth client ID
5. ✅ Copy Client ID & Secret

### GitHub OAuth (3 steps)
1. ✅ Go to https://github.com/settings/developers
2. ✅ Create new OAuth App
3. ✅ Copy Client ID & Secret

### Environment Variables (2 steps)
1. ✅ Add to `.env.local` (local)
2. ✅ Add to Vercel (production)

### Database (1 step)
1. ✅ Run SQL migration in Supabase

---

## 🔑 Required Environment Variables

### Local (.env.local)
```bash
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_REDIRECT_URI=http://localhost:3000/api/auth/github/callback
```

### Vercel (Production)
Same variables, but use:
- `GOOGLE_REDIRECT_URI=https://nexthardware.io/api/auth/google/callback`
- `GITHUB_REDIRECT_URI=https://nexthardware.io/api/auth/github/callback`

---

## 🔗 Important URLs

### Google OAuth
- **Console:** https://console.cloud.google.com
- **Redirect URI:** `https://nexthardware.io/api/auth/google/callback`

### GitHub OAuth
- **Settings:** https://github.com/settings/developers
- **Redirect URI:** `https://nexthardware.io/api/auth/github/callback`

### Supabase
- **Dashboard:** https://supabase.com/dashboard
- **SQL Editor:** Run migration to add OAuth fields

---

## 📋 SQL Migration

Run this in Supabase SQL Editor:

```sql
ALTER TABLE community_members 
ADD COLUMN IF NOT EXISTS oauth_provider TEXT,
ADD COLUMN IF NOT EXISTS oauth_id TEXT;

CREATE INDEX IF NOT EXISTS idx_community_members_oauth 
ON community_members(oauth_provider, oauth_id);
```

---

## ✅ Test Checklist

- [ ] Google login works locally
- [ ] GitHub login works locally
- [ ] Google login works in production
- [ ] GitHub login works in production
- [ ] New users get welcome emails
- [ ] Existing users can login with OAuth

---

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| "OAuth not configured" | Check env variables are set |
| "Redirect URI mismatch" | Verify URIs match exactly |
| "No email" error | Grant email permissions |
| Database error | Run SQL migration |

---

**📖 Full guide:** See `OAUTH_STEP_BY_STEP.md` for detailed instructions


