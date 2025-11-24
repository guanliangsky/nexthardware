# 📝 How to Update California Business Address

## 🔴 **CRITICAL: Required for CCPA Compliance**

You must replace the placeholder addresses in all three legal pages with your actual California business address.

---

## 📋 **Files to Update**

1. `app/privacy/page.tsx` - Line ~295
2. `app/terms/page.tsx` - Line ~282
3. `app/cookies/page.tsx` - Line ~203

---

## 🔍 **Find the Placeholder Text**

Search for:
- `[Your California Business Address - Required for CCPA compliance]`
- `[Your California Business Address]`

---

## ✏️ **Replace With Your Address**

Use this format:

```tsx
<p className="mb-2 text-slate-600"><strong>Address:</strong> 
  Next Hardware<br />
  [Your Street Address or PO Box]<br />
  [City, CA ZIP Code]<br />
  United States
</p>
```

**Example:**
```tsx
<p className="mb-2 text-slate-600"><strong>Address:</strong> 
  Next Hardware<br />
  123 Main Street, Suite 100<br />
  Palo Alto, CA 94301<br />
  United States
</p>
```

**Or for PO Box:**
```tsx
<p className="mb-2 text-slate-600"><strong>Address:</strong> 
  Next Hardware<br />
  P.O. Box 12345<br />
  Palo Alto, CA 94301<br />
  United States
</p>
```

---

## ⚡ **Quick Fix Script**

Once you have your address, I can update all three files automatically. Just provide:

1. **Street Address or PO Box**
2. **City**
3. **ZIP Code**

Or tell me: "Update address to: [your full address]"

---

## 📍 **Address Options**

### Option 1: Physical Office
If you have a physical office in California, use that address.

### Option 2: Registered Agent
If you don't have a physical office, use a registered agent service:
- Northwest Registered Agent
- LegalZoom
- Incfile
- Others

### Option 3: PO Box
Use a California PO Box if you don't have a physical address.

### Option 4: Virtual Office
Some virtual office addresses are legally valid, but verify with an attorney.

---

## ⚠️ **Important Notes**

1. **Must be in California** - CCPA requires a California address
2. **Must be valid** - The address must be real and verifiable
3. **Must be accessible** - Should be able to receive legal mail
4. **Legal service** - Must be able to accept service of process

---

## ✅ **After Updating**

1. Test all three legal pages load correctly
2. Verify the address displays properly
3. Check that links still work
4. Consider having an attorney review

---

**Need help?** Just provide your California address and I'll update all three files automatically!

