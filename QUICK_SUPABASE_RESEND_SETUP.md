# ⚡ 快速配置：Supabase + Resend SMTP

## 🎯 目标
让忘记密码功能能够发送邮件

---

## 📋 步骤（5分钟）

### 1️⃣ 获取 Resend API Key

如果你还没有：
- 访问：https://resend.com/api-keys
- 点击 "Create API Key"
- 复制 API Key（以 `re_` 开头）

**已有 API Key？** 直接跳到步骤 2

---

### 2️⃣ 配置 Supabase SMTP

1. **打开 Supabase Dashboard:**
   ```
   https://supabase.com/dashboard/project/snpmvpsoxeieguojlwzv
   ```

2. **进入 SMTP 设置:**
   - 左侧菜单：**Settings**（齿轮图标）
   - 点击：**Auth**
   - 滚动到：**SMTP Settings**

3. **填写配置:**
   ```
   ✅ Enable Custom SMTP: 打开
   
   SMTP Host: smtp.resend.com
   SMTP Port: 587
   SMTP User: resend
   SMTP Password: [粘贴你的 Resend API Key]
   Sender Email: noreply@nexthardware.io
   Sender Name: Next Hardware
   ```

4. **保存:**
   - 点击 **"Save"** 或 **"Update"**

---

### 3️⃣ 测试

1. **访问网站:**
   ```
   https://nexthardware.io/auth
   ```

2. **测试忘记密码:**
   - 点击 "Forgot password?"
   - 输入已注册的邮箱
   - 点击 "Send Reset Link"

3. **检查邮箱:**
   - 查看收件箱
   - 检查垃圾邮件文件夹
   - 应该收到密码重置邮件

---

## ✅ 完成！

如果收到邮件，说明配置成功！

---

## 🔧 如果遇到问题

### 邮件未收到？
1. 检查 Supabase Logs → Auth Logs
2. 确认 API Key 正确（没有多余空格）
3. 检查垃圾邮件文件夹

### 配置保存失败？
1. 确认 API Key 格式正确（`re_` 开头）
2. 检查网络连接
3. 重试保存

---

## 📝 配置示例

```
SMTP Host: smtp.resend.com
SMTP Port: 587
SMTP User: resend
SMTP Password: re_Bhh2FGv9_9sNy4qJGsjJNgxvtQboW9vry
Sender Email: noreply@nexthardware.io
Sender Name: Next Hardware
```

---

**详细文档：** 查看 `SUPABASE_SMTP_RESEND_SETUP.md`


