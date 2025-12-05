# 📧 使用 Resend 配置 Supabase SMTP（忘记密码功能）

## 🎯 目标

配置 Supabase 使用 Resend 发送密码重置邮件，这样忘记密码功能就能正常工作了。

---

## 📋 前置条件

1. ✅ 已有 Resend 账户
2. ✅ 已有 Resend API Key
3. ✅ 已有 Supabase 项目

---

## 🚀 配置步骤

### 步骤 1: 获取 Resend API Key

如果你还没有 Resend API Key：

1. 访问：https://resend.com/api-keys
2. 点击 **"Create API Key"**
3. 命名：`nexthardware-supabase-smtp`
4. 复制 API Key（以 `re_` 开头）

**示例：** `re_Bhh2FGv9_9sNy4qJGsjJNgxvtQboW9vry`

---

### 步骤 2: 配置 Supabase SMTP

1. **访问 Supabase Dashboard:**
   - 前往：https://supabase.com/dashboard/project/snpmvpsoxeieguojlwzv
   - 或：Dashboard → 选择项目 `nexthardware`

2. **进入 SMTP 设置:**
   - 左侧菜单：**Settings**（齿轮图标）
   - 点击：**Auth**
   - 滚动到：**SMTP Settings**

3. **启用自定义 SMTP:**
   - 找到 **"Enable Custom SMTP"** 开关
   - 打开开关

4. **填写 SMTP 配置:**
   
   ```
   SMTP Host: smtp.resend.com
   SMTP Port: 587
   SMTP User: resend
   SMTP Password: [你的 Resend API Key]
   Sender Email: noreply@nexthardware.io
   Sender Name: Next Hardware
   ```

   **详细说明：**
   - **SMTP Host:** `smtp.resend.com`（Resend 的 SMTP 服务器）
   - **SMTP Port:** `587`（TLS 端口，推荐）
   - **SMTP User:** `resend`（固定值）
   - **SMTP Password:** 你的 Resend API Key（例如：`re_Bhh2FGv9_...`）
   - **Sender Email:** `noreply@nexthardware.io`（或使用 Resend 默认域名）
   - **Sender Name:** `Next Hardware`（显示名称）

5. **保存设置:**
   - 点击 **"Save"** 或 **"Update"**
   - 等待保存成功

---

### 步骤 3: 验证域名（可选但推荐）

如果你想使用 `noreply@nexthardware.io` 而不是 Resend 的默认域名：

1. **在 Resend 中添加域名:**
   - 访问：https://resend.com/domains
   - 点击 **"Add Domain"**
   - 输入：`nexthardware.io`
   - 点击 **"Add"**

2. **添加 DNS 记录:**
   - Resend 会显示需要添加的 DNS 记录
   - 在你的域名提供商（如 Vercel、Cloudflare）添加这些记录：
     - **TXT 记录**（用于验证）
     - **MX 记录**（用于邮件路由）

3. **等待验证:**
   - DNS 传播通常需要 5-30 分钟
   - 在 Resend 中点击 **"Verify"**
   - 等待验证完成

**注意：** 如果不验证域名，可以使用 Resend 的默认域名（如 `onboarding@resend.dev`），但邮件可能更容易进入垃圾邮件。

---

### 步骤 4: 测试配置

1. **在 Supabase 中测试:**
   - 在 Supabase Dashboard：**Authentication** → **Users**
   - 选择一个用户
   - 点击 **"Send password reset email"**
   - 检查是否收到邮件

2. **在网站上测试:**
   - 访问：https://nexthardware.io/auth
   - 点击 **"Forgot password?"**
   - 输入已注册的邮箱
   - 点击 **"Send Reset Link"**
   - 检查邮箱（包括垃圾邮件文件夹）

---

## 🔍 故障排除

### 问题 1: 保存失败

**可能原因：**
- API Key 格式错误
- 网络连接问题

**解决方案：**
- 检查 API Key 是否正确复制（包含 `re_` 前缀）
- 确保没有多余的空格
- 重试保存

### 问题 2: 邮件未发送

**可能原因：**
- SMTP 配置错误
- API Key 无效
- 端口被阻止

**解决方案：**
1. 检查 Supabase Logs：
   - **Logs** → **Auth Logs**
   - 查找错误信息

2. 验证 API Key：
   - 在 Resend Dashboard 检查 API Key 是否有效
   - 确保没有过期或被删除

3. 尝试不同端口：
   - 如果 `587` 不工作，尝试 `465`（SSL）

### 问题 3: 邮件进入垃圾邮件

**可能原因：**
- 未验证域名
- 发送频率过高

**解决方案：**
- 验证域名（步骤 3）
- 使用已验证的发送邮箱
- 避免短时间内发送大量邮件

---

## 📧 邮件模板自定义

你可以在 Supabase 中自定义密码重置邮件模板：

1. **访问模板设置:**
   - Supabase Dashboard → **Authentication** → **Email Templates**
   - 选择：**Reset Password**

2. **自定义内容:**
   - **Subject:** 邮件主题（例如：`Reset Your Next Hardware Password`）
   - **Body:** 邮件正文（可以使用 HTML）
   - **Link Text:** 重置链接文本

3. **可用变量:**
   - `{{ .ConfirmationURL }}` - 重置链接
   - `{{ .Token }}` - 重置令牌
   - `{{ .TokenHash }}` - 令牌哈希

4. **保存更改**

---

## ✅ 配置完成检查清单

- [ ] Resend API Key 已获取
- [ ] Supabase SMTP 设置已配置
- [ ] SMTP 设置已保存
- [ ] 域名已验证（可选）
- [ ] 测试邮件已发送
- [ ] 收到测试邮件
- [ ] 忘记密码功能测试通过

---

## 📝 配置示例

### Supabase SMTP 配置示例：

```
✅ Enable Custom SMTP: ON
📧 SMTP Host: smtp.resend.com
🔌 SMTP Port: 587
👤 SMTP User: resend
🔑 SMTP Password: re_Bhh2FGv9_9sNy4qJGsjJNgxvtQboW9vry
📨 Sender Email: noreply@nexthardware.io
👋 Sender Name: Next Hardware
```

---

## 🎉 完成！

配置完成后，忘记密码功能将能够：
- ✅ 发送密码重置邮件
- ✅ 使用你的域名发送（如果已验证）
- ✅ 提供专业的用户体验

**测试地址：** https://nexthardware.io/auth

---

## 📚 相关文档

- **Resend 文档：** https://resend.com/docs
- **Supabase Auth 文档：** https://supabase.com/docs/guides/auth
- **SMTP 配置指南：** https://supabase.com/docs/guides/auth/smtp

---

**最后更新：** 2025-01-26


