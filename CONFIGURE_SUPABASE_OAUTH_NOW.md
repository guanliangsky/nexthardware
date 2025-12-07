# 🚀 配置 Supabase OAuth - 立即开始

## ✅ 代码已更新并准备部署

代码已经更新完成，现在需要在 Supabase Dashboard 中配置 OAuth providers。

---

## 📋 快速配置步骤（5分钟）

### Step 1: 在 Supabase Dashboard 启用 OAuth Providers

👉 **打开：** https://supabase.com/dashboard/project/snpmvpsoxeieguojlwzv/auth/providers

#### 1.1 启用 Google Provider
1. 找到 **"Google"** provider
2. 点击开关 **启用**
3. 填写（使用你本地 `.env.local` 中的值，不要把真实密钥提交到 GitHub）：
   - **Client ID (for OAuth):** `YOUR_GOOGLE_CLIENT_ID`
   - **Client Secret (for OAuth):** `YOUR_GOOGLE_CLIENT_SECRET`
4. 点击 **"Save"**

#### 1.2 启用 GitHub Provider
1. 找到 **"GitHub"** provider
2. 点击开关 **启用**
3. 填写（使用你本地 `.env.local` 中的值）：
   - **Client ID:** `YOUR_GITHUB_CLIENT_ID`
   - **Client Secret:** `YOUR_GITHUB_CLIENT_SECRET`
4. 点击 **"Save"**

---

### Step 2: 配置 Google Cloud Console

👉 **打开：** https://console.cloud.google.com/apis/credentials?project=next-hardware-email

1. 找到你的 **OAuth 2.0 Client ID**（Web client 1）
2. 点击 **编辑**
3. 在 **"Authorized redirect URIs"** 中添加：
   ```
   https://snpmvpsoxeieguojlwzv.supabase.co/auth/v1/callback
   ```
4. 点击 **"SAVE"**

---

### Step 3: 配置 GitHub OAuth App

👉 **打开：** https://github.com/settings/developers

1. 找到你的 OAuth App（"Next Hardware"）
2. 点击 **"Edit"**
3. 在 **"Authorization callback URL"** 中添加：
   ```
   https://snpmvpsoxeieguojlwzv.supabase.co/auth/v1/callback
   ```
4. 点击 **"Update application"**

---

### Step 4: 配置 Supabase URL Settings

👉 **打开：** https://supabase.com/dashboard/project/snpmvpsoxeieguojlwzv/auth/url-configuration

1. **Site URL:** `https://nexthardware.io`
2. **Redirect URLs:** 添加以下 URL
   - `https://nexthardware.io/auth/callback`
   - `http://localhost:3000/auth/callback`
3. 点击 **"Save"**

---

### Step 5: 部署代码

代码已经准备好，Vercel 会自动部署（如果已连接 GitHub）。

或者手动部署：
```bash
vercel --prod
```

---

### Step 6: 测试

1. 访问：https://nexthardware.io/login
2. 点击 **"Login with Google"** 或 **"Login with GitHub"**
3. 应该会重定向到 OAuth provider
4. 授权后应该会重定向回 `/membership` 页面

---

## 🔍 重要信息

**Supabase Redirect URI:**
```
https://snpmvpsoxeieguojlwzv.supabase.co/auth/v1/callback
```

这个 URI 需要添加到：
- ✅ Google Cloud Console → OAuth 2.0 Client → Authorized redirect URIs
- ✅ GitHub OAuth App → Authorization callback URL

---

## ✅ 检查清单

- [ ] Supabase Google Provider 已启用并配置
- [ ] Supabase GitHub Provider 已启用并配置
- [ ] Google Cloud Console 中已添加 Supabase redirect URI
- [ ] GitHub OAuth App 中已更新 callback URL
- [ ] Supabase URL Configuration 已设置
- [ ] 代码已部署
- [ ] OAuth 登录测试成功

---

## 🐛 如果遇到问题

1. **OAuth 重定向失败：** 检查 Google/GitHub 中的 redirect URI 是否正确
2. **Session 丢失：** 确保 `NEXT_PUBLIC_SUPABASE_ANON_KEY` 已在 Vercel 环境变量中设置
3. **用户信息缺失：** 检查 `community_members` 表是否正确创建

