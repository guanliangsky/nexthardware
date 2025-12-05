# 🔧 Luma Calendar Embed Fix

**更新日期：** 2025-01-26  
**状态：** ✅ 已更新嵌入 URL

---

## 🎯 问题

主页面 Events 部分的 Luma 日历嵌入显示 404 错误。

---

## ✅ 修复尝试

### 已尝试的嵌入 URL 格式：

1. ❌ `https://lu.ma/embed/calendar/NextHardware` (原始，404)
2. ❌ `https://lu.ma/embed/calendar/nexthardware` (小写，404)
3. ✅ `https://lu.ma/embed/nexthardware` (当前使用)

### 当前配置

**嵌入 URL：** `https://lu.ma/embed/nexthardware`

**文件位置：** `components/Events.tsx` (第 241 行)

---

## 🔍 如果仍然显示 404

### 可能的原因：

1. **Luma 嵌入需要特定的日历 ID**
   - 可能需要从 Luma 设置中获取特定的嵌入代码
   - 登录 Luma → 设置 → 嵌入代码

2. **组织名称格式不同**
   - 可能需要使用不同的格式（如 `next-hardware` 或 `next_hardware`）

3. **需要启用嵌入功能**
   - 可能需要在 Luma 设置中启用日历嵌入功能

### 解决方案：

#### 方案 1：获取 Luma 官方嵌入代码

1. 登录 Luma：https://luma.com
2. 进入您的组织页面：https://luma.com/nexthardware
3. 查找 "Embed" 或 "Share" 选项
4. 复制官方提供的嵌入代码
5. 更新 `components/Events.tsx` 中的 iframe src

#### 方案 2：使用直接链接（如果嵌入不工作）

如果嵌入持续失败，可以替换为直接链接按钮：

```tsx
<div className="w-full rounded-lg overflow-hidden border border-slate-200 bg-slate-50 p-8 text-center">
  <p className="text-slate-600 mb-4">{t.events.allEventsDescription}</p>
  <a
    href="https://luma.com/nexthardware"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block px-6 py-3 bg-slate-900 text-white font-medium rounded-md hover:bg-slate-800 transition-colors"
  >
    {t.events.viewAllEvents}
  </a>
</div>
```

---

## 📋 当前使用的 URL

### 链接 URL（工作正常）
- `https://luma.com/nexthardware` ✅

### 嵌入日历 URL（当前）
- `https://lu.ma/embed/nexthardware` ⚠️ 需要测试

---

## ✅ 部署状态

**已部署到生产环境**

**测试地址：**
- Events 页面：https://nexthardware.io/#events
- 查看日历嵌入是否正常加载

---

## 🔄 下一步

如果嵌入仍然不工作：

1. **检查浏览器控制台**：查看是否有错误信息
2. **测试不同的嵌入格式**：
   - `https://lu.ma/embed/nexthardware`
   - `https://lu.ma/embed/calendar/nexthardware`
   - `https://luma.com/nexthardware` (直接链接)
3. **联系 Luma 支持**：获取正确的嵌入代码
4. **使用备用方案**：如果嵌入不工作，使用直接链接按钮

---

**最后更新：** 2025-01-26


