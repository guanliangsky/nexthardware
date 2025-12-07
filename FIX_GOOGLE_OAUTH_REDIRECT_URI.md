# 🔧 修复 Google OAuth Redirect URI 错误

## ❌ 当前错误

**错误信息：** `redirect_uri_mismatch`

**问题：** Google 拒绝了 OAuth 请求，因为 redirect URI 不匹配。

**Supabase 使用的 Redirect URI：**
```
https://snpmvpsoxeieguojlwzv.supabase.co/auth/v1/callback
```

---

## ✅ 解决方案

### Step 1: 打开 Google Cloud Console

👉 **URL:** https://console.cloud.google.com/apis/credentials?project=next-hardware-email

### Step 2: 编辑 OAuth 2.0 Client ID

1. 在 "OAuth 2.0 Client IDs" 部分，找到你的 **"Web client 1"**
2. 点击右侧的 **编辑图标**（铅笔图标）

### Step 3: 添加 Supabase Redirect URI

1. 在 **"Authorized redirect URIs"** 部分，点击 **"+ ADD URI"**
2. 输入以下 URI（**完全匹配，包括 https://**）：
   ```
   https://snpmvpsoxeieguojlwzv.supabase.co/auth/v1/callback
   ```
3. **重要检查：**
   - ✅ 确保使用 `https://`（不是 `http://`）
   - ✅ 确保没有多余的空格
   - ✅ 确保路径完全匹配：`/auth/v1/callback`
   - ✅ 确保域名正确：`snpmvpsoxeieguojlwzv.supabase.co`

### Step 4: 保存更改

1. 滚动到页面底部
2. 点击 **"SAVE"** 按钮
3. 等待几秒钟让更改生效

### Step 5: 验证

1. 回到你的 OAuth Client ID 详情页
2. 确认 **"Authorized redirect URIs"** 列表中包含：
   ```
   https://snpmvpsoxeieguojlwzv.supabase.co/auth/v1/callback
   ```

---

## 📋 完整的 Authorized redirect URIs 列表

你的 OAuth Client ID 应该包含以下所有 URI：

```
https://snpmvpsoxeieguojlwzv.supabase.co/auth/v1/callback
https://nexthardware.io/auth/callback
http://localhost:3000/auth/callback
```

---

## ⚠️ 常见错误

### 错误 1: 缺少 https://
❌ `snpmvpsoxeieguojlwzv.supabase.co/auth/v1/callback`  
✅ `https://snpmvpsoxeieguojlwzv.supabase.co/auth/v1/callback`

### 错误 2: 路径不匹配
❌ `https://snpmvpsoxeieguojlwzv.supabase.co/auth/callback`  
✅ `https://snpmvpsoxeieguojlwzv.supabase.co/auth/v1/callback`

### 错误 3: 域名错误
❌ `https://supabase.co/auth/v1/callback`  
✅ `https://snpmvpsoxeieguojlwzv.supabase.co/auth/v1/callback`

---

## 🧪 测试

配置完成后：

1. 等待 1-2 分钟让 Google 的更改生效
2. 访问：https://nexthardware.io/login
3. 点击 **"Login with Google"**
4. 应该会成功重定向到 Google 登录页面

---

## 📝 检查清单

- [ ] 打开 Google Cloud Console
- [ ] 编辑 OAuth 2.0 Client ID
- [ ] 在 "Authorized redirect URIs" 中添加：
  - `https://snpmvpsoxeieguojlwzv.supabase.co/auth/v1/callback`
- [ ] 点击 "SAVE" 保存
- [ ] 验证 URI 已添加到列表中
- [ ] 等待 1-2 分钟
- [ ] 测试 Google 登录


