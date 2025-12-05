# 🚀 Supabase OAuth 配置完整指南

## 📋 配置前准备

**你的信息（示例占位符，不要在这里写真实密钥）：**
- Supabase 项目 ID: `snpmvpsoxeieguojlwzv`
- Supabase Redirect URI: `https://snpmvpsoxeieguojlwzv.supabase.co/auth/v1/callback`
- Google Client ID: `YOUR_GOOGLE_CLIENT_ID`
- Google Client Secret: `YOUR_GOOGLE_CLIENT_SECRET`
- GitHub Client ID: `YOUR_GITHUB_CLIENT_ID`
- GitHub Client Secret: `YOUR_GITHUB_CLIENT_SECRET`

---

## ✅ Step 1: 在 Supabase Dashboard 启用 OAuth Providers

### 1.1 打开 Supabase Dashboard
👉 **URL:** https://supabase.com/dashboard/project/snpmvpsoxeieguojlwzv/auth/providers

### 1.2 启用 Google Provider
1. 在页面中找到 **"Google"** provider
2. 点击右侧的 **开关** 启用它
3. 会展开配置表单，填写（从 `.env.local` 中复制）： 
   - **Client ID (for OAuth):** `YOUR_GOOGLE_CLIENT_ID`
   - **Client Secret (for OAuth):** `YOUR_GOOGLE_CLIENT_SECRET`
4. 点击 **"Save"** 按钮保存

### 1.3 启用 GitHub Provider
1. 在页面中找到 **"GitHub"** provider
2. 点击右侧的 **开关** 启用它
3. 会展开配置表单，填写（从 `.env.local` 中复制）： 
   - **Client ID:** `YOUR_GITHUB_CLIENT_ID`
   - **Client Secret:** `YOUR_GITHUB_CLIENT_SECRET`
4. 点击 **"Save"** 按钮保存

---

## ✅ Step 2: 配置 Google Cloud Console

### 2.1 打开 Google Cloud Console
👉 **URL:** https://console.cloud.google.com/apis/credentials?project=next-hardware-email

### 2.2 编辑 OAuth 2.0 Client ID
1. 在页面中找到 **"OAuth 2.0 Client IDs"** 部分
2. 找到你的 **"Web client 1"**（Client ID 以 `139200018654-` 开头）
3. 点击右侧的 **编辑图标**（铅笔图标）

### 2.3 添加 Supabase Redirect URI
1. 在 **"Authorized redirect URIs"** 部分，点击 **"+ ADD URI"**
2. 输入以下 URI：
   ```
   https://snpmvpsoxeieguojlwzv.supabase.co/auth/v1/callback
   ```
3. 确保以下 URI 也存在（如果还没有，也添加）：
   - `https://nexthardware.io/auth/callback`
   - `http://localhost:3000/auth/callback`
4. 点击页面底部的 **"SAVE"** 按钮

---

## ✅ Step 3: 配置 GitHub OAuth App

### 3.1 打开 GitHub Developer Settings
👉 **URL:** https://github.com/settings/developers

### 3.2 编辑 OAuth App
1. 在 **"OAuth Apps"** 部分，找到你的应用（应该是 "Next Hardware"）
2. 点击应用名称或右侧的 **"Edit"** 按钮

### 3.3 更新 Authorization Callback URL
1. 在 **"Authorization callback URL"** 字段中：
   - 如果已经有其他 URL，用逗号分隔添加新 URL
   - 添加以下 URL：
     ```
     https://snpmvpsoxeieguojlwzv.supabase.co/auth/v1/callback
     ```
2. 也可以保留其他 callback URLs（用换行或逗号分隔）：
   - `https://nexthardware.io/auth/callback`
   - `http://localhost:3000/auth/callback`
3. 滚动到页面底部，点击 **"Update application"** 按钮

---

## ✅ Step 4: 配置 Supabase URL Settings

### 4.1 打开 Supabase URL Configuration
👉 **URL:** https://supabase.com/dashboard/project/snpmvpsoxeieguojlwzv/auth/url-configuration

### 4.2 设置 Site URL
1. 在 **"Site URL"** 字段中，输入：
   ```
   https://nexthardware.io
   ```

### 4.3 添加 Redirect URLs
1. 在 **"Redirect URLs"** 部分，点击 **"+ Add URL"** 或直接在输入框中添加
2. 添加以下 URL（每行一个或逗号分隔）：
   ```
   https://nexthardware.io/auth/callback
   http://localhost:3000/auth/callback
   ```

### 4.4 保存设置
1. 点击页面底部的 **"Save"** 按钮保存所有更改

---

## ✅ Step 5: 验证配置

### 5.1 检查 Supabase Providers
回到：https://supabase.com/dashboard/project/snpmvpsoxeieguojlwzv/auth/providers

确认：
- ✅ Google provider 显示为 **"Enabled"**（绿色）
- ✅ GitHub provider 显示为 **"Enabled"**（绿色）

### 5.2 检查 Google Cloud Console
回到：https://console.cloud.google.com/apis/credentials?project=next-hardware-email

确认：
- ✅ OAuth 2.0 Client ID 的 **"Authorized redirect URIs"** 中包含：
  - `https://snpmvpsoxeieguojlwzv.supabase.co/auth/v1/callback`

### 5.3 检查 GitHub OAuth App
回到：https://github.com/settings/developers

确认：
- ✅ OAuth App 的 **"Authorization callback URL"** 中包含：
  - `https://snpmvpsoxeieguojlwzv.supabase.co/auth/v1/callback`

---

## ✅ Step 6: 部署代码（如果需要）

代码已经准备好，如果 Vercel 已连接 GitHub，会自动部署。

或者手动部署：
```bash
vercel --prod
```

---

## ✅ Step 7: 测试 OAuth 登录

### 7.1 测试 Google 登录
1. 访问：https://nexthardware.io/login
2. 点击 **"Login with Google"** 按钮
3. 应该会重定向到 Google 登录页面
4. 选择你的 Google 账户并授权
5. 应该会重定向回 `/membership` 页面

### 7.2 测试 GitHub 登录
1. 访问：https://nexthardware.io/login
2. 点击 **"Login with GitHub"** 按钮
3. 应该会重定向到 GitHub 授权页面
4. 点击 **"Authorize"** 按钮
5. 应该会重定向回 `/membership` 页面

---

## 🐛 常见问题排查

### 问题 1: OAuth 重定向失败
**症状：** 点击登录按钮后，显示错误或无法重定向

**解决方案：**
1. 检查 Google/GitHub 中的 redirect URI 是否完全匹配：
   ```
   https://snpmvpsoxeieguojlwzv.supabase.co/auth/v1/callback
   ```
2. 确保没有多余的空格或字符
3. 确保使用的是 `https://`（不是 `http://`）

### 问题 2: Session 丢失
**症状：** 登录后立即退出或无法保持登录状态

**解决方案：**
1. 检查 Vercel 环境变量中是否设置了 `NEXT_PUBLIC_SUPABASE_ANON_KEY`
2. 检查浏览器控制台是否有错误信息
3. 清除浏览器 cookies 并重试

### 问题 3: 用户信息缺失
**症状：** 登录成功但会员页面显示信息不完整

**解决方案：**
1. 检查 `community_members` 表是否正确创建
2. 检查 Supabase Auth 用户是否已创建
3. 检查 OAuth callback 路由是否正确同步用户信息

---

## 📝 配置检查清单

完成以下所有步骤后，OAuth 应该可以正常工作：

- [ ] **Supabase Dashboard:**
  - [ ] Google Provider 已启用并配置 Client ID 和 Secret
  - [ ] GitHub Provider 已启用并配置 Client ID 和 Secret
  - [ ] Site URL 设置为 `https://nexthardware.io`
  - [ ] Redirect URLs 包含 `https://nexthardware.io/auth/callback`

- [ ] **Google Cloud Console:**
  - [ ] OAuth 2.0 Client ID 的 Authorized redirect URIs 包含：
    - `https://snpmvpsoxeieguojlwzv.supabase.co/auth/v1/callback`

- [ ] **GitHub OAuth App:**
  - [ ] Authorization callback URL 包含：
    - `https://snpmvpsoxeieguojlwzv.supabase.co/auth/v1/callback`

- [ ] **Vercel Environment Variables:**
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` 已设置

- [ ] **测试:**
  - [ ] Google 登录测试成功
  - [ ] GitHub 登录测试成功
  - [ ] 登录后可以访问 `/membership` 页面

---

## 🎉 完成！

配置完成后，你的用户就可以使用 Google 或 GitHub 账户登录了！

如果遇到任何问题，请检查上面的"常见问题排查"部分。

