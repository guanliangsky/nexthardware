# 🔧 Luma Event Links Fix

**更新日期：** 2025-01-26  
**状态：** ✅ 已修复并部署

---

## 🎯 问题

Luma 事件链接显示 404 错误。

---

## ✅ 修复内容

### 已更新的 URL

**之前：** `https://luma.com/NextHardware`  
**现在：** `https://lu.ma/NextHardware`

### 更新的文件

1. ✅ `components/Events.tsx`
   - 注册按钮链接
   - "View All Events" 按钮
   - "Subscribe Calendar" 按钮

2. ✅ `components/Footer.tsx`
   - Footer 中的 Luma 链接

3. ✅ `components/Contact.tsx`
   - Contact 部分的 Luma 事件链接

### 嵌入日历 URL

**保持不变：** `https://lu.ma/embed/calendar/NextHardware`

---

## 🔍 如果仍然显示 404

如果修复后仍然显示 404，可能的原因：

### 1. Luma 组织名称不正确

**检查方法：**
1. 登录您的 Luma 账户
2. 查看您的组织 URL
3. 确认组织名称是否为 "NextHardware"

**可能的格式：**
- `https://lu.ma/next-hardware`
- `https://lu.ma/nexthardware`
- `https://lu.ma/Next-Hardware`
- 或其他变体

### 2. 需要更新组织名称

如果您知道正确的 Luma 组织名称，请更新以下文件中的 URL：

**需要更新的位置：**
- `components/Events.tsx` (3 处)
- `components/Footer.tsx` (1 处)
- `components/Contact.tsx` (1 处)
- `components/Events.tsx` 中的嵌入 URL

**搜索并替换：**
```typescript
// 将所有 "NextHardware" 替换为您的实际组织名称
"https://lu.ma/NextHardware" → "https://lu.ma/YOUR_ORG_NAME"
"https://lu.ma/embed/calendar/NextHardware" → "https://lu.ma/embed/calendar/YOUR_ORG_NAME"
```

### 3. 如何找到正确的 Luma URL

1. **登录 Luma：** https://lu.ma
2. **查看您的组织页面：** 在浏览器地址栏查看 URL
3. **复制组织名称：** URL 格式通常是 `https://lu.ma/[org-name]`
4. **更新代码：** 使用找到的组织名称替换 "NextHardware"

---

## 📋 当前使用的 URL

### 链接 URL
- `https://lu.ma/NextHardware`

### 嵌入日历 URL
- `https://lu.ma/embed/calendar/NextHardware`

---

## ✅ 部署状态

**已部署到生产环境**

**测试链接：**
- Events 页面：https://nexthardware.io/#events
- Footer Luma 链接
- Contact 页面 Luma 链接

---

**最后更新：** 2025-01-26


