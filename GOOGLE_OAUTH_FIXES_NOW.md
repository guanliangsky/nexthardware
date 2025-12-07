# 🔧 立即修复 Google OAuth 问题

## ✅ 好消息
- Authorized domains 已正确配置：`nexthardware.io` ✅

## ❌ 需要修复的问题

### 问题 1: 错误的 Redirect URI

在 OAuth Client 配置中，有一个错误的 URI：
- ❌ `https://nexthardware.io/api/auth/gmail/callback` (错误 - 应该是 google，不是 gmail)

**修复步骤：**
1. 在 OAuth Client 页面（你当前打开的页面）
2. 找到 "Authorized redirect URIs" 部分
3. 删除 `https://nexthardware.io/api/auth/gmail/callback` 这一行
4. 确保只保留：
   - `https://nexthardware.io/api/auth/google/callback`
   - `http://localhost:3000/api/auth/google/callback`
5. 点击 **"Save"**

### 问题 2: Branding 页面缺少必需字段

在 Branding 页面，以下字段是空的（但 Google 要求填写）：
- Application home page: 空
- Application privacy policy link: 空
- Application terms of service link: 空

**修复步骤：**
1. 点击左侧菜单的 **"Branding"**
2. 填写以下字段：
   - **Application home page:** `https://nexthardware.io`
   - **Application privacy policy link:** `https://nexthardware.io/privacy`
   - **Application terms of service link:** `https://nexthardware.io/terms`
3. 点击 **"Save"**

## 🎯 修复后的配置应该是：

**Authorized redirect URIs:**
- ✅ `https://nexthardware.io/api/auth/google/callback`
- ✅ `http://localhost:3000/api/auth/google/callback`
- ❌ 删除 `https://nexthardware.io/api/auth/gmail/callback`

**Branding:**
- ✅ Application home page: `https://nexthardware.io`
- ✅ Privacy policy: `https://nexthardware.io/privacy`
- ✅ Terms of service: `https://nexthardware.io/terms`
- ✅ Authorized domains: `nexthardware.io`

完成这两个修复后，等待 2-3 分钟，然后再次测试登录！


