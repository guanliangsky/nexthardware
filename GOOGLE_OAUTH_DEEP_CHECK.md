# 🔍 Google OAuth 深度检查清单

## 当前错误
- Error 400: invalid_request
- redirect_uri: `https://nexthardware.io/api/auth/google/callback` ✅ (正确)
- Google 说应用不符合 OAuth 2.0 政策

## 📋 完整配置检查清单

### 1. OAuth Consent Screen - 完整检查

访问：https://console.cloud.google.com/apis/credentials/consent

**App Information:**
- [ ] App name: `Next Hardware` (已填写)
- [ ] User support email: 你的邮箱 (已填写)
- [ ] App logo: (可选，但建议添加)

**Application Home Page:**
- [ ] Application home page: `https://nexthardware.io` (必须填写)
- [ ] Application privacy policy link: `https://nexthardware.io/privacy` (必须填写)
- [ ] Application terms of service link: `https://nexthardware.io/terms` (必须填写)

**Authorized domains:**
- [ ] `nexthardware.io` (必须存在)

**Developer contact information:**
- [ ] Email addresses: 你的邮箱 (已填写)

**Scopes:**
- [ ] 检查是否有任何敏感或受限的 scopes
- [ ] 如果应用在 Testing 模式，确保只使用基本 scopes

**Publishing status:**
- [ ] 应该是 "Testing" (用于测试)
- [ ] 如果是 "In production"，需要验证

### 2. OAuth Client - 完整检查

访问：https://console.cloud.google.com/apis/credentials

**Authorized JavaScript origins:**
- [ ] `http://localhost:3000`
- [ ] `https://nexthardware.io`

**Authorized redirect URIs:**
- [ ] `https://nexthardware.io/api/auth/google/callback`
- [ ] `http://localhost:3000/api/auth/google/callback`
- [ ] ❌ 确保没有 `https://nexthardware.io/api/auth/gmail/callback`

### 3. 可能的问题

**问题 A: 应用状态**
- 如果应用是 "In production" 但未验证，Google 会拒绝
- 解决方案：切回 "Testing" 模式

**问题 B: 域名验证**
- `nexthardware.io` 可能需要在 Google Search Console 中验证
- 检查：在 OAuth consent screen 中，域名是否显示为已验证

**问题 C: 配置生效时间**
- Google 配置可能需要 5-10 分钟才能完全生效
- 建议：等待 10 分钟后再次测试

**问题 D: 浏览器缓存**
- 清除所有 Google 相关的 cookies
- 使用无痕模式测试

## 🎯 立即尝试的解决方案

### 方案 1: 确保应用在 Testing 模式

1. 打开 OAuth consent screen
2. 检查 Publishing status
3. 如果是 "In production"，点击 "Back to testing"
4. 保存

### 方案 2: 验证域名（如果需要）

1. 打开 Google Search Console: https://search.google.com/search-console
2. 添加属性：`nexthardware.io`
3. 验证域名所有权
4. 回到 OAuth consent screen，检查域名是否显示为已验证

### 方案 3: 等待并重试

1. 确保所有配置已保存
2. 等待 10 分钟
3. 清除浏览器缓存和 cookies
4. 使用无痕模式重新测试

## 🔍 调试步骤

如果仍然失败，请检查：

1. **实际发送的 redirect_uri:**
   - 查看浏览器地址栏中的完整 URL
   - 确认 `redirect_uri=` 参数的值

2. **Google Cloud Console 中的实际配置:**
   - 截图 OAuth Client 的完整配置
   - 截图 OAuth Consent Screen 的完整配置

3. **Vercel 环境变量:**
   - 确认 `GOOGLE_REDIRECT_URI` 的值
   - 确认 `GOOGLE_CLIENT_ID` 的值


