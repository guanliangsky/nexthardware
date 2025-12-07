# 📊 OAuth 注册数据保存说明

## ✅ 是的，你可以看到 OAuth 注册！

**通过 Google 或 GitHub OAuth 注册的用户数据会保存到 `community_members` 表中。**

---

## 📋 当前 OAuth 注册流程

### 数据保存位置
- **表名：** `community_members`
- **保存时机：** OAuth 回调时（`/auth/callback`）

### 保存的数据字段

**OAuth 用户会保存以下信息：**

| 字段 | 来源 | 说明 |
|------|------|------|
| `name` | OAuth 提供商 | Google/GitHub 提供的姓名 |
| `email` | OAuth 提供商 | 用户的邮箱地址 |
| `phone` | ❌ | `null`（OAuth 不提供） |
| `company` | ❌ | `null`（OAuth 不提供） |
| `position` | ❌ | `null`（OAuth 不提供） |
| `password_hash` | ❌ | `null`（OAuth 用户没有密码） |
| `registered_at` | ✅ | 注册时间 |
| `oauth_provider` | ✅ | `"google"` 或 `"github"` |
| `oauth_id` | ✅ | OAuth 提供商的用户 ID |
| `discord_invite_sent` | ✅ | `false`（初始值） |

---

## 🔍 如何查看 OAuth 注册

### 方法 1: Supabase Dashboard

1. **访问：** https://supabase.com/dashboard/project/snpmvpsoxeieguojlwzv
2. **打开：** Table Editor → `community_members`
3. **查找 OAuth 用户：**
   - `oauth_provider` 列显示 `"google"` 或 `"github"`
   - `password_hash` 为 `null`
   - `company` 和 `position` 为 `null`

### 方法 2: SQL 查询

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

---

## ⚠️ 限制说明

### OAuth 用户缺少的信息

由于 OAuth 提供商（Google/GitHub）不提供以下信息，这些字段将为 `null`：

- ❌ **电话（Phone）** - OAuth 不提供
- ❌ **公司（Company）** - OAuth 不提供
- ❌ **职位（Position）** - OAuth 不提供

### 为什么缺少这些信息？

OAuth 提供商只提供基本的用户信息：
- ✅ 姓名（Name）
- ✅ 邮箱（Email）
- ✅ 头像（Avatar）- 存储在 Supabase Auth，不在 `community_members` 表

**公司和职位信息需要用户手动填写。**

---

## 💡 解决方案：允许 OAuth 用户补充信息

### 选项 1: 注册后引导补充（推荐）

在 OAuth 用户首次登录后，引导他们补充公司和职位信息：

1. **检测新 OAuth 用户：**
   - 检查 `company` 和 `position` 是否为 `null`
   - 如果是，显示补充信息表单

2. **更新会员页面：**
   - 如果 `company` 或 `position` 为 `null`，显示提示
   - 提供表单让用户补充信息

### 选项 2: 在会员页面添加编辑功能

允许用户在会员页面编辑和更新：
- 公司
- 职位
- 电话

---

## 📊 数据对比

### 邮箱/密码注册 vs OAuth 注册

| 字段 | 邮箱/密码注册 | OAuth 注册 |
|------|--------------|-----------|
| 姓名 | ✅ 用户填写 | ✅ OAuth 提供 |
| 邮箱 | ✅ 用户填写 | ✅ OAuth 提供 |
| 电话 | ✅ 用户填写（可选） | ❌ `null` |
| 公司 | ✅ 用户填写（可选） | ❌ `null` |
| 职位 | ✅ 用户填写（可选） | ❌ `null` |
| 密码 | ✅ 有 | ❌ `null` |
| OAuth 提供商 | ❌ `null` | ✅ `google`/`github` |
| OAuth ID | ❌ `null` | ✅ 有 |

---

## ✅ 总结

**是的，你可以看到 OAuth 注册！**

- ✅ OAuth 用户数据会保存到 `community_members` 表
- ✅ 可以通过 `oauth_provider` 字段识别 OAuth 用户
- ✅ 可以查看所有注册用户（包括 OAuth）
- ⚠️ OAuth 用户的 `company` 和 `position` 为 `null`（因为 OAuth 不提供）

**建议：** 添加功能让 OAuth 用户在注册后补充公司和职位信息。

---

**最后更新：** 2025-01-26


