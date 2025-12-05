# 🔧 修复 GitHub OAuth Redirect URI 错误

## ❌ 当前错误

**错误信息：** "The redirect_uri is not associated with this application"

**问题：** GitHub OAuth App 的 Authorization callback URL 没有包含 Supabase 的 redirect URI。

**Supabase 使用的 Redirect URI：**
```
https://snpmvpsoxeieguojlwzv.supabase.co/auth/v1/callback
```

---

## ✅ 解决方案

### Step 1: 打开 GitHub OAuth App 设置

👉 **URL:** https://github.com/settings/developers

### Step 2: 找到你的 OAuth App

1. 在 "OAuth Apps" 部分，找到你的应用（应该是 "Next Hardware" 或类似名称）
2. 点击应用名称进入详情页

### Step 3: 编辑 OAuth App

1. 点击 **"Edit"** 按钮（或直接点击应用名称）

### Step 4: 更新 Authorization Callback URL

1. 找到 **"Authorization callback URL"** 字段
2. **重要：** 这个字段可以包含多个 URL，用换行符分隔
3. 添加以下 URL（如果还没有）：
   ```
   https://snpmvpsoxeieguojlwzv.supabase.co/auth/v1/callback
   ```
4. 你也可以保留其他 callback URLs，例如：
   ```
   https://nexthardware.io/auth/callback
   http://localhost:3000/auth/callback
   https://snpmvpsoxeieguojlwzv.supabase.co/auth/v1/callback
   ```

### Step 5: 保存更改

1. 滚动到页面底部
2. 点击 **"Update application"** 按钮
3. 等待几秒钟让更改生效

---

## 📋 完整的 Authorization Callback URL 配置

你的 GitHub OAuth App 应该包含以下所有 URL（每行一个）：

```
https://nexthardware.io/auth/callback
http://localhost:3000/auth/callback
https://snpmvpsoxeieguojlwzv.supabase.co/auth/v1/callback
```

**或者只包含 Supabase 的 redirect URI：**

```
https://snpmvpsoxeieguojlwzv.supabase.co/auth/v1/callback
```

---

## ⚠️ 重要注意事项

### 1. URL 格式
- ✅ 必须使用 `https://`（生产环境）
- ✅ 路径必须完全匹配：`/auth/v1/callback`
- ✅ 域名必须正确：`snpmvpsoxeieguojlwzv.supabase.co`

### 2. 多个 URL
- GitHub 支持多个 callback URLs
- 每行一个 URL
- 或者用逗号分隔（取决于 GitHub 的格式要求）

### 3. 保存后生效时间
- 更改通常立即生效
- 如果不行，等待 1-2 分钟

---

## 🧪 测试

配置完成后：

1. **等待 1-2 分钟** 让 GitHub 的更改生效
2. 访问：https://nexthardware.io/login
3. 点击 **"Login with GitHub"**
4. 应该会成功重定向到 GitHub 授权页面
5. 授权后应该会成功返回你的网站

---

## 🐛 如果仍然有问题

### 检查 1: URL 完全匹配
确保 GitHub OAuth App 中的 callback URL **完全匹配** Supabase 使用的 URI：
```
https://snpmvpsoxeieguojlwzv.supabase.co/auth/v1/callback
```

### 检查 2: 没有多余字符
- ❌ 不要有尾随空格
- ❌ 不要有前导空格
- ❌ 不要有额外的斜杠

### 检查 3: Supabase GitHub Provider 配置
确认 Supabase Dashboard 中的 GitHub Provider：
1. 打开：https://supabase.com/dashboard/project/snpmvpsoxeieguojlwzv/auth/providers
2. 确认 GitHub Provider 已启用
3. 确认 Client ID 和 Secret 已正确配置

---

## 📝 检查清单

- [ ] 打开 GitHub OAuth App 设置
- [ ] 找到你的 OAuth App
- [ ] 点击 "Edit"
- [ ] 在 "Authorization callback URL" 中添加：
  - `https://snpmvpsoxeieguojlwzv.supabase.co/auth/v1/callback`
- [ ] 点击 "Update application" 保存
- [ ] 等待 1-2 分钟
- [ ] 测试 GitHub 登录

---

## 🔗 相关链接

- **GitHub OAuth Apps：** https://github.com/settings/developers
- **Supabase Providers：** https://supabase.com/dashboard/project/snpmvpsoxeieguojlwzv/auth/providers
- **登录页面：** https://nexthardware.io/login

---

**提示：** 这个错误和之前 Google OAuth 的错误类似，都是因为 redirect URI 没有正确配置。修复方法是一样的：在 OAuth provider 的设置中添加 Supabase 的 redirect URI。


