# 🔧 reCAPTCHA Domain Format Fix

**Error:** "The following domains are invalid: www.nexthardware.io and localhost"

---

## ❌ **THE PROBLEM**

You might have included:
- Asterisks (*)
- Protocol (http:// or https://)
- Paths or ports
- Wrong formatting

---

## ✅ **CORRECT FORMAT**

Add domains **ONE AT A TIME**, exactly like this:

### **Option 1: Simple (Recommended)**
Just add these two domains:

1. `nexthardware.io`
   - No www
   - No http://
   - No asterisks
   - Just: `nexthardware.io`

2. `localhost`
   - Just the word: `localhost`
   - No http://
   - No port numbers

**This covers:**
- ✅ `nexthardware.io`
- ✅ `www.nexthardware.io` (covered by main domain)
- ✅ `localhost` (for local testing)

### **Option 2: Explicit (If Option 1 doesn't work)**
Add each domain separately:

1. `nexthardware.io`
2. `www.nexthardware.io`
3. `localhost`

---

## 📋 **STEP-BY-STEP INSTRUCTIONS**

1. **In the "Domains" field:**
   - Type: `nexthardware.io`
   - Press Enter or click "Add"
   - The domain should appear in a list below

2. **Add second domain:**
   - Type: `localhost`
   - Press Enter or click "Add"

3. **Verify:**
   - You should see:
     - `nexthardware.io`
     - `localhost`
   - Both should be listed

4. **Submit:**
   - Accept terms
   - Click "Submit"

---

## ⚠️ **WHAT NOT TO INCLUDE**

❌ `*nexthardware.io`
❌ `http://nexthardware.io`
❌ `https://nexthardware.io`
❌ `nexthardware.io:3000`
❌ `nexthardware.io/path`
❌ `*.nexthardware.io`

✅ `nexthardware.io` (correct!)
✅ `localhost` (correct!)

---

## 💡 **TIPS**

1. **One domain per line** - Add them one at a time
2. **No special characters** - Just the domain name
3. **No protocol** - Don't include http:// or https://
4. **No paths** - Don't include /path or /anything

---

## 🎯 **TRY THIS**

1. Clear the domains field
2. Type: `nexthardware.io`
3. Press Enter
4. Type: `localhost`
5. Press Enter
6. You should see both listed
7. Click "Submit"

---

## ✅ **AFTER SUCCESS**

Once you successfully register:
- You'll get your Site Key and Secret Key
- Then we'll add them to Vercel
- reCAPTCHA will be active!

Try again with the correct format! 🚀

