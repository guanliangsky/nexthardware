# ✅ OAuth 注册数据保存 - 总结

## 🎯 回答你的问题

**是的，你可以看到通过 Google 或 GitHub OAuth 注册的用户！**

所有 OAuth 注册都会保存到 `community_members` 表中。

---

## 📊 数据保存情况

### ✅ 会保存的数据

| 字段 | OAuth 注册 | 邮箱/密码注册 |
|------|-----------|--------------|
| **姓名** | ✅ 有（来自 OAuth） | ✅ 有（用户填写） |
| **邮箱** | ✅ 有（来自 OAuth） | ✅ 有（用户填写） |
| **注册时间** | ✅ 有 | ✅ 有 |
| **OAuth 提供商** | ✅ `google` 或 `github` | ❌ `null` |
| **OAuth ID** | ✅ 有 | ❌ `null` |

### ⚠️ 为 null 的字段（OAuth 不提供）

| 字段 | OAuth 注册 | 邮箱/密码注册 |
|------|-----------|--------------|
| **电话** | ❌ `null` | ✅ 用户填写（可选） |
| **公司** | ❌ `null` | ✅ 用户填写（可选） |
| **职位** | ❌ `null` | ✅ 用户填写（可选） |
| **密码哈希** | ❌ `null` | ✅ 有 |

---

## 🔍 如何查看 OAuth 注册

### 在 Supabase Dashboard

1. **访问：** https://supabase.com/dashboard/project/snpmvpsoxeieguojlwzv
2. **打开：** Table Editor → `community_members`
3. **识别 OAuth 用户：**
   - 查看 `oauth_provider` 列
   - 显示 `"google"` 或 `"github"` 的就是 OAuth 用户
   - `password_hash` 为 `null`

### SQL 查询示例

```sql
-- 查看所有 OAuth 注册用户
SELECT 
  id,
  name,
  email,
  oauth_provider,
  registered_at,
  company,
  position
FROM community_members
WHERE oauth_provider IS NOT NULL
ORDER BY registered_at DESC;
```

```sql
-- 查看 Google OAuth 用户
SELECT * FROM community_members
WHERE oauth_provider = 'google';
```

```sql
-- 查看 GitHub OAuth 用户
SELECT * FROM community_members
WHERE oauth_provider = 'github';
```

```sql
-- 查看所有注册（包括 OAuth 和邮箱/密码）
SELECT 
  id,
  name,
  email,
  oauth_provider,
  CASE 
    WHEN oauth_provider IS NOT NULL THEN 'OAuth'
    ELSE 'Email/Password'
  END as registration_type,
  registered_at
FROM community_members
ORDER BY registered_at DESC;
```

---

## 📋 数据示例

### OAuth 注册用户记录示例：

```json
{
  "id": 123,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": null,
  "company": null,
  "position": null,
  "password_hash": null,
  "registered_at": "2025-01-26T10:30:00Z",
  "oauth_provider": "google",
  "oauth_id": "123456789",
  "discord_invite_sent": false
}
```

### 邮箱/密码注册用户记录示例：

```json
{
  "id": 124,
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+1-555-123-4567",
  "company": "Google",
  "position": "Hardware Engineer",
  "password_hash": "$2b$10$...",
  "registered_at": "2025-01-26T11:00:00Z",
  "oauth_provider": null,
  "oauth_id": null,
  "discord_invite_sent": false
}
```

---

## 💡 建议

### 允许 OAuth 用户补充信息

由于 OAuth 不提供公司和职位信息，建议：

1. **在会员页面添加编辑功能**
   - 允许用户更新公司、职位、电话
   - 即使是通过 OAuth 注册的用户也可以补充

2. **首次登录提示**
   - 检测到 `company` 或 `position` 为 `null` 时
   - 显示提示让用户补充信息

---

## ✅ 总结

**是的，你可以看到所有注册！**

- ✅ OAuth 注册会保存到 `community_members` 表
- ✅ 可以通过 `oauth_provider` 字段识别 OAuth 用户
- ✅ 可以查看所有注册用户（OAuth + 邮箱/密码）
- ⚠️ OAuth 用户的 `company` 和 `position` 为 `null`（正常，因为 OAuth 不提供）

**查看方式：**
- Supabase Dashboard → Table Editor → `community_members`
- 使用 SQL 查询过滤 `oauth_provider` 字段

---

**最后更新：** 2025-01-26


