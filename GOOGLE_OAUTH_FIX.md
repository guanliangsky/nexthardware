# 🔧 Google OAuth 400 Error - 根本原因和解决方案

## 🔍 错误分析

**错误信息：** `Error 400: invalid_request`
**redirect_uri:** `https://nexthardware.io/api/auth/google/callback`

这个错误表示 Google 拒绝了 OAuth 请求，即使 redirect_uri 看起来正确。

## ✅ 必须检查的配置（按顺序）

### 1. OAuth Consent Screen - Authorized Domains ⚠️ **最重要**

1. 打开：https://console.cloud.google.com/apis/credentials/consent
2. 选择项目：**Next Hardware Email**
3. 滚动到 **"Authorized domains"** 部分
4. **必须包含：** `nexthardware.io`（不带 https://）
5. 如果没有，点击 **"+ ADD DOMAIN"** 添加
6. 点击 **"SAVE"** 保存

**⚠️ 这是最关键的步骤！如果没有添加域名，Google 会拒绝所有请求。**

### 2. OAuth Client - Authorized Redirect URIs

1. 打开：https://console.cloud.google.com/apis/credentials
2. 点击你的 **OAuth 2.0 Client ID**（Web client 1）
3. 在 **"Authorized redirect URIs"** 中，确保有：
   - `https://nexthardware.io/api/auth/google/callback`（完全匹配）
   - `http://localhost:3000/api/auth/google/callback`（用于本地测试）
4. 检查：
   - ✅ 没有多余的空格
   - ✅ 使用 `https://`（不是 `http://`）
   - ✅ 路径完全匹配：`/api/auth/google/callback`
5. 点击 **"SAVE"** 保存

### 3. OAuth Consent Screen - 完整配置

1. 打开：https://console.cloud.google.com/apis/credentials/consent
2. 检查以下字段都已填写：
   - ✅ **App name:** Next Hardware
   - ✅ **User support email:** 你的邮箱
   - ✅ **Application home page:** `https://nexthardware.io`
   - ✅ **Application privacy policy link:** `https://nexthardware.io/privacy`
   - ✅ **Application terms of service link:** `https://nexthardware.io/terms`
   - ✅ **Authorized domains:** `nexthardware.io`
3. **Publishing status:** 应该是 "Testing"（用于测试）
4. **Test users:** 包含你要测试的邮箱
5. 点击 **"SAVE"** 保存

### 4. 等待配置生效

- 保存后等待 **2-3 分钟**让 Google 的配置生效
- 清除浏览器缓存
- 重新测试

## 🧪 测试步骤

1. 访问：`https://nexthardware.io/login`
2. 点击 "Login with Google"
3. 应该能看到 Google 账号选择页面
4. 选择账号后，应该能成功授权

## 🐛 如果仍然失败

如果完成以上所有步骤后仍然失败，请检查：

1. **域名验证状态：**
   - 在 OAuth consent screen 中，`nexthardware.io` 应该显示为已验证
   - 如果显示未验证，需要验证域名所有权

2. **检查实际发送的 redirect_uri：**
   - 查看浏览器地址栏中的完整 URL
   - 确认 `redirect_uri=` 参数的值
   - 确保与 Google Cloud Console 中的配置完全匹配

3. **查看 Vercel 日志：**
   - 检查是否有错误信息
   - 查看实际使用的 redirect_uri

## 📝 快速检查清单

- [ ] Authorized domains 包含 `nexthardware.io`
- [ ] Authorized redirect URIs 包含 `https://nexthardware.io/api/auth/google/callback`
- [ ] OAuth consent screen 所有必需字段已填写
- [ ] Publishing status 是 "Testing"
- [ ] Test users 包含你的邮箱
- [ ] 已保存所有更改
- [ ] 等待了 2-3 分钟
- [ ] 清除了浏览器缓存

## 🎯 最可能的原因

根据错误信息，**最可能的原因是 Authorized domains 中没有添加 `nexthardware.io`**。

Google 要求：
- redirect_uri 的域名必须在 Authorized domains 中
- 即使 redirect_uri 在 Authorized redirect URIs 列表中，如果域名不在 Authorized domains 中，也会被拒绝

**立即检查 Authorized domains！**


