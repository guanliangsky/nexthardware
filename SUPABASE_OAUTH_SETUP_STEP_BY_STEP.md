# 🚀 Supabase OAuth 配置 - 详细步骤

## 📋 你的信息

**Supabase 项目 ID:** `snpmvpsoxeieguojlwzv`  
**Supabase Redirect URI:** `https://snpmvpsoxeieguojlwzv.supabase.co/auth/v1/callback`

**Google OAuth:**
- Client ID: `[你的 Google Client ID]`
- Client Secret: `[你的 Google Client Secret]`

**GitHub OAuth:**
- Client ID: `Ov23liNjItQx0wsxePKh`
- Client Secret: `eadf4130aa951421a5c4d7ed9e62c248871e8f1c`

---

## ✅ Step 1: 在 Supabase Dashboard 启用 OAuth Providers

### 1.1 打开 Supabase Dashboard
👉 https://supabase.com/dashboard/project/snpmvpsoxeieguojlwzv/auth/providers

### 1.2 启用 Google Provider
1. 找到 **"Google"** provider
2. 点击开关 **启用**
3. 填写以下信息：
   - **Client ID (for OAuth):** `[你的 Google Client ID]`
   - **Client Secret (for OAuth):** `[你的 Google Client Secret]`
4. 点击 **"Save"** 保存

### 1.3 启用 GitHub Provider
1. 找到 **"GitHub"** provider
2. 点击开关 **启用**
3. 填写以下信息：
   - **Client ID:** `Ov23liNjItQx0wsxePKh`
   - **Client Secret:** `eadf4130aa951421a5c4d7ed9e62c248871e8f1c`
4. 点击 **"Save"** 保存

---

## ✅ Step 2: 配置 Google Cloud Console

### 2.1 打开 Google Cloud Console
👉 https://console.cloud.google.com/apis/credentials?project=next-hardware-email

### 2.2 编辑 OAuth 2.0 Client ID
1. 找到你的 OAuth 2.0 Client ID（Web client 1）
2. 点击 **编辑**（铅笔图标）

### 2.3 添加 Supabase Redirect URI
在 **"Authorized redirect URIs"** 部分：
1. 点击 **"+ ADD URI"**
2. 添加：`https://snpmvpsoxeieguojlwzv.supabase.co/auth/v1/callback`
3. 确保以下 URI 也存在（如果还没有）：
   - `https://nexthardware.io/auth/callback`
   - `http://localhost:3000/auth/callback`（用于本地开发）
4. 点击 **"SAVE"** 保存

---

## ✅ Step 3: 配置 GitHub OAuth App

### 3.1 打开 GitHub Developer Settings
👉 https://github.com/settings/developers

### 3.2 编辑 OAuth App
1. 找到你的 OAuth App（应该是 "Next Hardware"）
2. 点击 **"Edit"**

### 3.3 更新 Authorization Callback URL
在 **"Authorization callback URL"** 字段：
1. 添加或更新为：`https://snpmvpsoxeieguojlwzv.supabase.co/auth/v1/callback`
2. 也可以保留其他 callback URLs（用逗号分隔）：
   - `https://nexthardware.io/auth/callback`
   - `http://localhost:3000/auth/callback`
3. 点击 **"Update application"** 保存

---

## ✅ Step 4: 配置 Supabase URL Settings

### 4.1 打开 Supabase URL Configuration
👉 https://supabase.com/dashboard/project/snpmvpsoxeieguojlwzv/auth/url-configuration

### 4.2 设置 Site URL
在 **"Site URL"** 字段：
- 输入：`https://nexthardware.io`

### 4.3 添加 Redirect URLs
在 **"Redirect URLs"** 部分，点击 **"+ Add URL"** 添加：
- `https://nexthardware.io/auth/callback`
- `http://localhost:3000/auth/callback`（用于本地开发）

### 4.4 保存
点击 **"Save"** 保存所有更改

---

## ✅ Step 5: 部署代码

代码已经更新完成，只需要部署到 Vercel。

---

## ✅ Step 6: 测试

1. 访问：https://nexthardware.io/login
2. 点击 **"Login with Google"** 或 **"Login with GitHub"**
3. 应该会重定向到 OAuth provider 进行授权
4. 授权后应该会重定向回 `/membership` 页面

---

## 🐛 如果遇到问题

### 问题 1: OAuth 重定向失败
- 检查 Google/GitHub 中的 redirect URI 是否正确
- 确保 Supabase redirect URI 已添加到 Google/GitHub

### 问题 2: Session 丢失
- 确保 `NEXT_PUBLIC_SUPABASE_ANON_KEY` 已正确设置
- 检查浏览器控制台是否有错误

### 问题 3: 用户信息缺失
- 检查 `community_members` 表是否正确创建
- 检查 Supabase Auth 用户是否已创建

---

## 📝 检查清单

- [ ] Supabase Google Provider 已启用并配置
- [ ] Supabase GitHub Provider 已启用并配置
- [ ] Google Cloud Console 中已添加 Supabase redirect URI
- [ ] GitHub OAuth App 中已更新 callback URL
- [ ] Supabase URL Configuration 已设置
- [ ] 代码已部署到 Vercel
- [ ] OAuth 登录测试成功

