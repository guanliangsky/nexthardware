# 🚀 Supabase Auth OAuth - 快速设置（5分钟）

## ✅ 为什么使用 Supabase Auth？

- ✅ **自动处理所有 OAuth 细节** - 不需要手动配置 Google Cloud Console
- ✅ **内置安全** - Supabase 处理所有安全细节
- ✅ **简单配置** - 只需在 Supabase Dashboard 中启用
- ✅ **免费** - Supabase 免费层支持 OAuth

## 📋 设置步骤（一步一步）

### Step 1: 获取 Supabase Anon Key

1. 打开：https://supabase.com/dashboard/project/snpmvpsoxeieguojlwzv
2. 点击左侧菜单 **"Settings"** → **"API"**
3. 找到 **"Project API keys"** 部分
4. 复制 **"anon"** key（公开的，可以用于客户端）
5. 这个 key 以 `eyJ...` 开头

### Step 2: 添加到环境变量

**本地 (.env.local):**
```bash
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的_anon_key_这里
```

**Vercel:**
```bash
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
# 然后粘贴你的 anon key
```

### Step 3: 在 Supabase Dashboard 启用 OAuth Providers

1. 打开：https://supabase.com/dashboard/project/snpmvpsoxeieguojlwzv
2. 点击左侧菜单 **"Authentication"** → **"Providers"**
3. 找到 **"Google"**，点击开关启用
4. 填写：
   - **Client ID (for OAuth):** `[你的 Google Client ID]`
   - **Client Secret (for OAuth):** `[你的 Google Client Secret]`
5. 点击 **"Save"**
6. 找到 **"GitHub"**，点击开关启用
7. 填写：
   - **Client ID:** `Ov23liNjItQx0wsxePKh`
   - **Client Secret:** `eadf4130aa951421a5c4d7ed9e62c248871e8f1c`
8. 点击 **"Save"**

### Step 4: 配置 Redirect URLs

在 Supabase Dashboard → Authentication → URL Configuration：

**Site URL:**
- `https://nexthardware.io`

**Redirect URLs:**
- `https://nexthardware.io/auth/callback`
- `http://localhost:3000/auth/callback` (用于本地开发)

### Step 5: 部署

代码已经更新完成，只需要：
1. 添加 `NEXT_PUBLIC_SUPABASE_ANON_KEY` 到环境变量
2. 在 Supabase Dashboard 启用 OAuth providers
3. 部署代码

## 🎯 优势

使用 Supabase Auth 后：
- ✅ 不需要手动处理 OAuth 回调
- ✅ 不需要管理 state 参数
- ✅ 自动处理 token 刷新
- ✅ 自动管理用户会话
- ✅ 与现有 Supabase 数据库无缝集成
- ✅ **Google OAuth 配置由 Supabase 自动处理！**

## 📝 代码已更新

- ✅ `lib/supabaseClient.ts` - 客户端 Supabase 实例
- ✅ `app/login/page.tsx` - 使用 Supabase Auth
- ✅ `app/auth/callback/route.ts` - OAuth 回调处理

## 🧪 测试

完成设置后：
1. 访问 `https://nexthardware.io/login`
2. 点击 "Login with Google" 或 "Login with GitHub"
3. 应该能成功登录！

