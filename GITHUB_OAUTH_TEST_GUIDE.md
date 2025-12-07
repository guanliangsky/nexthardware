# 🧪 GitHub OAuth 测试指南

## 📋 测试步骤

### Step 1: 清除当前登录状态

由于你已经通过 Google 登录，需要先登出：

1. 访问：https://nexthardware.io/membership
2. 点击 **"Logout"** 按钮
3. 或者直接访问：https://nexthardware.io/login

### Step 2: 测试 GitHub 登录

1. 访问登录页面：https://nexthardware.io/login
2. 点击 **"Login with GitHub"** 按钮
3. 应该会重定向到 GitHub 授权页面

### Step 3: 授权应用

1. 在 GitHub 授权页面，确认应用信息
2. 点击 **"Authorize"** 按钮
3. 应该会重定向回你的网站

### Step 4: 验证登录成功

1. 应该会重定向到 `/membership` 页面
2. 页面应该显示你的 GitHub 账户信息
3. 检查用户信息是否正确显示

---

## 🔍 预期行为

### 正常流程：

1. **点击 "Login with GitHub"**
   - 页面应该重定向到 Supabase Auth
   - Supabase 会处理 GitHub OAuth 流程

2. **GitHub 授权页面**
   - URL 应该是：`https://github.com/login/oauth/authorize?...`
   - 显示应用名称和请求的权限

3. **授权后**
   - 重定向到 Supabase callback: `https://snpmvpsoxeieguojlwzv.supabase.co/auth/v1/callback`
   - Supabase 交换授权码获取用户信息
   - 创建或更新 Supabase Auth 用户
   - 同步用户信息到 `community_members` 表

4. **完成登录**
   - 重定向到 `/membership` 页面
   - 显示用户信息

---

## 🐛 可能的问题

### 问题 1: 点击按钮没有反应

**可能原因：**
- JavaScript 错误
- Supabase client 未正确初始化

**解决方案：**
1. 打开浏览器开发者工具（F12）
2. 查看 Console 标签页是否有错误
3. 检查 Network 标签页是否有失败的请求

### 问题 2: 重定向到 GitHub 但显示错误

**可能原因：**
- GitHub OAuth App callback URL 未正确配置
- Supabase redirect URI 未添加到 GitHub

**解决方案：**
1. 检查 GitHub OAuth App 设置：
   - 打开：https://github.com/settings/developers
   - 编辑你的 OAuth App
   - 确认 "Authorization callback URL" 包含：
     ```
     https://snpmvpsoxeieguojlwzv.supabase.co/auth/v1/callback
     ```

### 问题 3: 授权后无法返回

**可能原因：**
- Supabase URL Configuration 未正确设置
- Redirect URLs 未包含你的网站 URL

**解决方案：**
1. 检查 Supabase URL Configuration：
   - 打开：https://supabase.com/dashboard/project/snpmvpsoxeieguojlwzv/auth/url-configuration
   - 确认 Site URL: `https://nexthardware.io`
   - 确认 Redirect URLs 包含: `https://nexthardware.io/auth/callback`

### 问题 4: 用户信息未同步

**可能原因：**
- `community_members` 表结构问题
- OAuth callback 路由错误

**解决方案：**
1. 检查 Supabase Dashboard → Table Editor → `community_members`
2. 查看是否有新用户记录
3. 检查 OAuth callback 路由日志

---

## ✅ 检查清单

在测试前，确认以下配置：

- [ ] Supabase GitHub Provider 已启用
- [ ] GitHub Provider 的 Client ID 和 Secret 已配置
- [ ] GitHub OAuth App 的 callback URL 包含 Supabase redirect URI
- [ ] Supabase URL Configuration 已设置
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` 已在 Vercel 中设置

---

## 🔗 相关链接

- **登录页面：** https://nexthardware.io/login
- **Supabase Providers：** https://supabase.com/dashboard/project/snpmvpsoxeieguojlwzv/auth/providers
- **GitHub OAuth Apps：** https://github.com/settings/developers
- **Supabase URL Config：** https://supabase.com/dashboard/project/snpmvpsoxeieguojlwzv/auth/url-configuration

---

## 📝 测试结果记录

**测试日期：** _______________

**测试结果：**
- [ ] ✅ GitHub 登录成功
- [ ] ❌ GitHub 登录失败

**错误信息（如果有）：**
```
[在这里记录任何错误信息]
```

**用户信息同步：**
- [ ] ✅ 用户信息正确显示在 `/membership` 页面
- [ ] ❌ 用户信息缺失或不正确

---

**提示：** 如果遇到问题，请检查浏览器控制台和网络请求，这些信息可以帮助诊断问题。


