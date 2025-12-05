# 🚀 Supabase Auth OAuth 设置指南

## ✅ 为什么使用 Supabase Auth？

- ✅ **自动处理 OAuth** - 不需要手动配置 Google Cloud Console
- ✅ **内置安全** - Supabase 处理所有安全细节
- ✅ **简单配置** - 只需在 Supabase Dashboard 中启用
- ✅ **免费** - Supabase 免费层支持 OAuth

## 📋 设置步骤

### Step 1: 在 Supabase Dashboard 启用 OAuth Providers

1. 打开：https://supabase.com/dashboard/project/snpmvpsoxeieguojlwzv
2. 点击左侧菜单 **"Authentication"** → **"Providers"**
3. 找到 **"Google"**，点击启用
4. 找到 **"GitHub"**，点击启用

### Step 2: 配置 Google OAuth

1. 在 **"Google"** provider 设置中：
   - **Client ID (for OAuth):** 输入你的 Google Client ID
   - **Client Secret (for OAuth):** 输入你的 Google Client Secret
   - 这些是你之前在 Google Cloud Console 创建的
2. 点击 **"Save"**

### Step 3: 配置 GitHub OAuth

1. 在 **"GitHub"** provider 设置中：
   - **Client ID:** 输入你的 GitHub Client ID
   - **Client Secret:** 输入你的 GitHub Client Secret
2. 点击 **"Save"**

### Step 4: 获取 Supabase Anon Key

1. 在 Supabase Dashboard，点击 **"Settings"** → **"API"**
2. 找到 **"Project API keys"**
3. 复制 **"anon"** key（这是公开的，可以用于客户端）
4. 添加到环境变量：`NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Step 5: 更新代码

代码已经准备好使用 Supabase Auth。只需要：
1. 添加 `NEXT_PUBLIC_SUPABASE_ANON_KEY` 到环境变量
2. 更新登录页面使用 Supabase Auth

## 🎯 优势

使用 Supabase Auth 后：
- ✅ 不需要手动处理 OAuth 回调
- ✅ 不需要管理 state 参数
- ✅ 自动处理 token 刷新
- ✅ 自动管理用户会话
- ✅ 与现有 Supabase 数据库无缝集成


