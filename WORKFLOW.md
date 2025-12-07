# 🔄 Standard Workflow: Local → GitHub → Vercel

## ✅ Process: All Changes Must Follow This Flow

**Every change must go through:**
1. **Local** (your computer)
2. **GitHub** (version control)
3. **Vercel** (auto-deployment)

**Result:** All three are always identical!

---

## 📋 Standard Workflow (MANDATORY)

### Step 1: Make Changes Locally
```bash
# Edit files on your computer
# Test locally with: npm run dev
```

### Step 2: Commit to Git
```bash
git add .
git commit -m "Description of changes"
```

### Step 3: Push to GitHub
```bash
git push origin nexthardware
```

### Step 4: Vercel Auto-Deploys
- ✅ Automatically detects GitHub push
- ✅ Builds and deploys automatically
- ✅ Usually takes 1-2 minutes

---

## 🚀 Quick Commands

### Option 1: Use Helper Script
```bash
./git-push.sh "Your commit message"
```
This does: add → commit → push → auto-deploy

### Option 2: Use Auto-Commit Script
```bash
./auto-commit.sh "Your commit message"
```
This does: add → commit → push

### Option 3: Manual (Always Works)
```bash
git add .
git commit -m "Your message"
git push origin nexthardware
```

---

## ✅ Verification Checklist

After making changes, verify:

- [ ] Changes committed to git locally
- [ ] Changes pushed to GitHub
- [ ] GitHub shows latest commit
- [ ] Vercel deployment triggered
- [ ] Production site updated

---

## 🔍 How to Verify They're Identical

### Check Local:
```bash
git log --oneline -1
```

### Check GitHub:
- Visit: https://github.com/guanliangsky/nexthardware
- Check latest commit

### Check Vercel:
- Visit: https://vercel.com/dashboard
- Check latest deployment
- Should show same commit SHA

---

## ⚠️ Important Rules

1. **NEVER skip GitHub**
   - ❌ Don't deploy directly to Vercel
   - ✅ Always push to GitHub first

2. **NEVER leave uncommitted changes**
   - ❌ Don't make changes without committing
   - ✅ Always commit before pushing

3. **ALWAYS use the same branch**
   - ✅ Use: `nexthardware` branch
   - ✅ Keep it in sync

---

## 🎯 Goal

**Local = GitHub = Vercel**

All three should have:
- ✅ Same code
- ✅ Same files
- ✅ Same version
- ✅ Same commit history

---

## 📝 Example Workflow

```bash
# 1. Make changes
nano components/Hero.tsx

# 2. Test locally
npm run dev

# 3. Commit and push
./git-push.sh "Update hero section"

# 4. Wait 1-2 minutes

# 5. Verify
# - Check GitHub: commit is there
# - Check Vercel: deployment succeeded
# - Check site: changes are live
```

---

**Last Updated:** November 21, 2025  
**Status:** ✅ Active workflow

