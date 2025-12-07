# Supabase Auth OAuth - 下一步设置

✅ **已完成：**
- 添加了 `NEXT_PUBLIC_SUPABASE_ANON_KEY` 到 `.env.local` 和 Vercel
- 更新了代码以使用 Supabase Auth 的 OAuth 功能
- 更新了登录页面以使用 Supabase Auth
- 更新了会员页面以使用 Supabase Auth session

## 📋 接下来需要在 Supabase Dashboard 中配置：

### 1. 启用 OAuth Providers

1. 打开 Supabase Dashboard: https://supabase.com/dashboard/project/snpmvpsoxeieguojlwzv
2. 点击左侧菜单 **"Authentication"** → **"Providers"**
3. 找到 **"Google"** 并点击启用
4. 找到 **"GitHub"** 并点击启用

### 2. 配置 Google OAuth

在 Google provider 设置中：

1. **Client ID (for OAuth)**: 输入你的 Google Client ID
   ```
   [你的 Google Client ID]
   ```

2. **Client Secret (for OAuth)**: 输入你的 Google Client Secret
   ```
   [你的 Google Client Secret]
   ```

3. **Authorized Redirect URIs**: Supabase 会自动生成一个 redirect URI，格式如下：
   ```
   https://snpmvpsoxeieguojlwzv.supabase.co/auth/v1/callback
   ```
   
   **重要：** 你需要将这个 URI 添加到 Google Cloud Console：
   - 打开：https://console.cloud.google.com/apis/credentials
   - 编辑你的 OAuth 2.0 Client ID
   - 在 "Authorized redirect URIs" 中添加：
     ```
     https://snpmvpsoxeieguojlwzv.supabase.co/auth/v1/callback
     ```

### 3. 配置 GitHub OAuth

在 GitHub provider 设置中：

1. **Client ID (for OAuth)**: 输入你的 GitHub Client ID
   ```
   Ov23liNjItQx0wsxePKh
   ```

2. **Client Secret (for OAuth)**: 输入你的 GitHub Client Secret
   ```
   eadf4130aa951421a5c4d7ed9e62c248871e8f1c
   ```

3. **Authorization Callback URL**: Supabase 会自动生成一个 redirect URI，格式如下：
   ```
   https://snpmvpsoxeieguojlwzv.supabase.co/auth/v1/callback
   ```
   
   **重要：** 你需要将这个 URI 添加到 GitHub OAuth App 设置：
   - 打开：https://github.com/settings/developers
   - 编辑你的 OAuth App
   - 在 "Authorization callback URL" 中输入：
     ```
     https://snpmvpsoxeieguojlwzv.supabase.co/auth/v1/callback
     ```

### 4. 测试 OAuth 登录

配置完成后：

1. 部署到 Vercel（如果还没有部署）
2. 访问：https://nexthardware.io/login
3. 点击 "Login with Google" 或 "Login with GitHub"
4. 应该会重定向到 OAuth provider 进行授权
5. 授权后应该会重定向回 `/membership` 页面

## 🔍 如何找到 Supabase Redirect URI

如果你不确定 Supabase 的 redirect URI 是什么：

1. 在 Supabase Dashboard 中，进入 **"Authentication"** → **"URL Configuration"**
2. 查看 **"Site URL"** 和 **"Redirect URLs"**
3. Supabase 的 OAuth callback URL 通常是：
   ```
   https://[your-project-ref].supabase.co/auth/v1/callback
   ```

## ⚠️ 注意事项

- Supabase Auth 会自动管理 session，不需要自定义 session cookies
- 用户信息会自动同步到 `community_members` 表（在 OAuth callback 中处理）
- 邮箱/密码登录现在也使用 Supabase Auth，而不是自定义的 API 路由

## 🐛 如果遇到问题

1. **OAuth 不工作：** 检查 Google/GitHub 中的 redirect URI 是否正确
2. **Session 丢失：** 确保 `NEXT_PUBLIC_SUPABASE_ANON_KEY` 已正确设置
3. **用户信息缺失：** 检查 `community_members` 表是否正确创建

