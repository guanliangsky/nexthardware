# 🧪 reCAPTCHA Testing Guide

**Date:** November 21, 2025  
**Status:** Ready for Testing

---

## ✅ **AUTOMATED TESTS COMPLETE**

1. ✅ Environment variables added to Vercel
2. ✅ Site redeployed with new variables
3. ✅ Code integration verified

---

## 🧪 **MANUAL TESTING STEPS**

### **Step 1: Open the Site**
1. Go to: https://nexthardware.io
2. Open browser Developer Tools (F12 or Right-click → Inspect)
3. Go to **Console** tab
4. Go to **Network** tab (optional, for detailed inspection)

### **Step 2: Navigate to Contact Form**
1. Scroll to the contact section (`#contact`)
2. Or click "Contact" link in navbar/footer

### **Step 3: Check reCAPTCHA Loading**
In the **Console** tab, you should see:
- ✅ reCAPTCHA script loading messages
- ✅ No errors related to reCAPTCHA
- ✅ If you see `grecaptcha` object, it's loaded!

### **Step 4: Fill Out Form**
1. Enter test data:
   - **Name:** Test User
   - **Email:** test@example.com
   - **Subject:** reCAPTCHA Test
   - **Message:** Testing reCAPTCHA integration

### **Step 5: Submit Form**
1. Click "Send Message" button
2. Watch the **Console** tab:
   - Should see reCAPTCHA token being generated
   - Should see form submission request
   - No errors

3. Watch the **Network** tab (if open):
   - Should see POST request to `/api/contact`
   - Request should include `recaptchaToken` in body
   - Response should be 200 OK

### **Step 6: Verify Success**
1. Form should show success message
2. Check email inbox: `liangoptics@gmail.com`
   - Should receive notification email
3. Check admin dashboard: https://nexthardware.io/admin/contact-messages
   - Should see the test message

---

## ✅ **EXPECTED RESULTS**

### **✅ Success Indicators:**
- ✅ Form submits without errors
- ✅ Success message appears
- ✅ No visible reCAPTCHA checkbox (it's invisible)
- ✅ Browser console shows reCAPTCHA token
- ✅ Email notification received
- ✅ Message saved in database

### **❌ If Something's Wrong:**
- ❌ Console shows reCAPTCHA errors
- ❌ Form doesn't submit
- ❌ Error message appears
- ❌ No email notification

---

## 🔍 **DETAILED CHECKS**

### **Browser Console Checks:**
```javascript
// Check if reCAPTCHA is loaded
window.grecaptcha
// Should return an object (not undefined)

// Check Site Key
process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
// Should be visible in page source
```

### **Network Request Check:**
1. Open Network tab
2. Submit form
3. Find POST request to `/api/contact`
4. Check Request Payload:
   ```json
   {
     "name": "Test User",
     "email": "test@example.com",
     "subject": "reCAPTCHA Test",
     "message": "Testing...",
     "recaptchaToken": "03AGdBq2..." // Should be present!
   }
   ```

### **Response Check:**
Should receive:
```json
{
  "message": "Your message has been sent successfully!"
}
```

---

## 🆘 **TROUBLESHOOTING**

### **reCAPTCHA Not Loading?**
- ✅ Check Site Key is correct: `6LeyxxMsAAAAAP07bt2AUMfy3qAriYyOh1eNBajG`
- ✅ Check domain is registered in reCAPTCHA admin
- ✅ Check browser console for errors
- ✅ Try hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

### **Form Not Submitting?**
- ✅ Check browser console for errors
- ✅ Check Network tab for failed requests
- ✅ Verify reCAPTCHA token is being generated
- ✅ Check if deployment is complete

### **No Email Notification?**
- ✅ Check spam folder
- ✅ Verify email forwarding is set up
- ✅ Check Resend API key is configured
- ✅ Check admin dashboard for message

---

## 📋 **TEST CHECKLIST**

- [ ] Site loads correctly
- [ ] Contact form is visible
- [ ] Browser console shows no errors
- [ ] reCAPTCHA script loads (check console)
- [ ] Form submits successfully
- [ ] Success message appears
- [ ] Email notification received
- [ ] Message appears in admin dashboard

---

## ✅ **READY TO TEST!**

Everything is set up. Please test the contact form and let me know:
1. ✅ Does it work?
2. ✅ Any errors?
3. ✅ Did you receive the email?

**Test URL:** https://nexthardware.io/#contact

