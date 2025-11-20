# Git Version Control Guide

## ✅ Git is now set up!

Your first commit has been created with all current files.

## Common Git Commands

### Check Status
```bash
git status
```
Shows what files have changed

### Commit Changes
```bash
# Stage all changes
git add .

# Commit with a message
git commit -m "Your commit message here"
```

### View History
```bash
# See all commits
git log

# See commits in one line
git log --oneline
```

### Restore Previous Version
```bash
# See all commits
git log --oneline

# Restore to a specific commit (replace COMMIT_ID)
git checkout COMMIT_ID

# To go back to latest version
git checkout master
```

### Create a Restore Point (Branch)
```bash
# Create a new branch for experiments
git branch experiment-name

# Switch to that branch
git checkout experiment-name

# Go back to main branch
git checkout master
```

### Undo Changes
```bash
# Undo changes to a specific file (before committing)
git checkout -- filename

# Undo all uncommitted changes
git checkout -- .
```

## Recommended Workflow

1. **Before making big changes:**
   ```bash
   git add .
   git commit -m "Save point before [description of changes]"
   ```

2. **After making changes:**
   ```bash
   git add .
   git commit -m "Updated [what you changed]"
   ```

3. **To see what changed:**
   ```bash
   git diff
   ```

## Current Status
- ✅ Git initialized
- ✅ Initial commit created
- ✅ All files tracked

You can now safely make changes and always restore to previous versions!

