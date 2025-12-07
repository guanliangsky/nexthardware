# 📊 数据库迁移：添加公司和职位字段

## ✅ 迁移文件

**文件：** `supabase/migrations/20250126000000_add_company_position.sql`

## 🚀 如何运行迁移

### 方法 1: 使用 Supabase Dashboard（推荐）

1. **访问 Supabase Dashboard:**
   ```
   https://supabase.com/dashboard/project/snpmvpsoxeieguojlwzv
   ```

2. **打开 SQL Editor:**
   - 左侧菜单：**SQL Editor**
   - 点击：**New query**

3. **运行迁移 SQL:**
   ```sql
   -- Add company and position fields to community_members table
   ALTER TABLE community_members 
   ADD COLUMN IF NOT EXISTS company TEXT,
   ADD COLUMN IF NOT EXISTS position TEXT;

   -- Add comments
   COMMENT ON COLUMN community_members.company IS 'Company or organization name';
   COMMENT ON COLUMN community_members.position IS 'Job title or position';
   ```

4. **执行:**
   - 点击 **"Run"** 或按 `Cmd/Ctrl + Enter`
   - 应该看到 "Success. No rows returned"

### 方法 2: 使用 Supabase CLI

```bash
# 在项目根目录运行
supabase db push
```

---

## ✅ 验证迁移

运行以下 SQL 查询验证字段已添加：

```sql
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'community_members'
  AND column_name IN ('company', 'position');
```

应该看到：
- `company` (TEXT, nullable)
- `position` (TEXT, nullable)

---

## 📝 字段说明

- **company**: 公司或组织名称（可选）
- **position**: 职位或头衔（可选）

两个字段都是可选的（nullable），不会影响现有数据。

---

## ⚠️ 注意事项

- 现有用户的 `company` 和 `position` 字段将为 `NULL`
- 新注册用户可以选择填写这些字段
- 字段已添加到注册表单和会员页面

---

**最后更新：** 2025-01-26


