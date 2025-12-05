# ⚡ 快速配置参考

## 🔑 关键信息

**Supabase Redirect URI（需要添加到 Google 和 GitHub）:**
```
https://snpmvpsoxeieguojlwzv.supabase.co/auth/v1/callback
```

**Google OAuth (从环境变量获取，不要把真实值写在仓库里):**
- Client ID: `YOUR_GOOGLE_CLIENT_ID`
- Client Secret: `YOUR_GOOGLE_CLIENT_SECRET`

**GitHub OAuth (同样从环境变量读取):**
- Client ID: `YOUR_GITHUB_CLIENT_ID`
- Client Secret: `YOUR_GITHUB_CLIENT_SECRET`

---

## 📍 快速链接

### Supabase Dashboard
- **Providers:** https://supabase.com/dashboard/project/snpmvpsoxeieguojlwzv/auth/providers
- **URL Config:** https://supabase.com/dashboard/project/snpmvpsoxeieguojlwzv/auth/url-configuration

### Google Cloud Console
- **Credentials:** https://console.cloud.google.com/apis/credentials?project=next-hardware-email

### GitHub
- **OAuth Apps:** https://github.com/settings/developers

---

## ✅ 配置步骤（快速版）

1. **Supabase → Providers:**
   - 启用 Google，填入 Client ID 和 Secret
   - 启用 GitHub，填入 Client ID 和 Secret

2. **Google Cloud Console:**
   - 编辑 OAuth Client ID
   - 添加 redirect URI: `https://snpmvpsoxeieguojlwzv.supabase.co/auth/v1/callback`

3. **GitHub OAuth App:**
   - 编辑 OAuth App
   - 添加 callback URL: `https://snpmvpsoxeieguojlwzv.supabase.co/auth/v1/callback`

4. **Supabase → URL Configuration:**
   - Site URL: `https://nexthardware.io`
   - Redirect URLs: `https://nexthardware.io/auth/callback`

5. **测试:** https://nexthardware.io/login

---

详细步骤请查看：`SUPABASE_OAUTH_CONFIGURATION_GUIDE.md`

