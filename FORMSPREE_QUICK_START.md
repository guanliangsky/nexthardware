# 🚀 Formspree Quick Start

## ✅ **What You Get**

- ✅ **Email notifications** - Get notified when someone submits
- ✅ **Database storage** - Also saves to Supabase (optional)
- ✅ **No CAPTCHA** - No anti-spam code issues
- ✅ **Free tier** - 50 submissions/month

---

## 📋 **Setup Steps (2 minutes)**

### **Step 1: Get Formspree Endpoint**

1. Go to: **https://formspree.io/**
2. Sign up (free)
3. Click **"New Form"**
4. Name it: "Contact Form"
5. Set notification email: `liangoptics@gmail.com`
6. Copy your form endpoint (looks like: `https://formspree.io/f/xxxxx`)

### **Step 2: Add to Environment Variables**

Add to `.env.local`:
```
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
```

### **Step 3: Add to Vercel**

```bash
vercel env add NEXT_PUBLIC_FORMSPREE_ENDPOINT production
# Paste your Formspree endpoint when prompted
```

### **Step 4: Deploy**

```bash
vercel --prod
```

---

## 🎯 **How It Works**

1. **User submits form** → Sends to Formspree
2. **Formspree sends email** → You get notification at `liangoptics@gmail.com`
3. **Also saves to database** → For your records in Supabase
4. **User sees success** → "Message sent successfully!"

---

## 📧 **Email Format**

You'll receive an email with:
```
From: formspree.io
Subject: New Contact Form Submission

Name: John Doe
Email: john@example.com
Subject: Question about hardware
Message: Hello, I have a question...
```

---

## ✅ **Benefits**

- ✅ **Email notifications** - Know immediately when someone contacts you
- ✅ **Database backup** - All submissions saved to Supabase
- ✅ **No setup complexity** - Just paste endpoint and it works
- ✅ **Free tier** - 50 submissions/month (enough for most sites)

---

## 🔧 **Alternative: Database-Only with Supabase Webhooks**

If you prefer to keep everything in Supabase, you can:
1. Keep current setup (saves to database)
2. Set up Supabase webhook to send email on insert
3. Use Supabase Edge Functions or external service

But Formspree is **much simpler** and works immediately!

---

**Ready to set up? Just get your Formspree endpoint and add it to `.env.local`!**


