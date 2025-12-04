# Git Workflow Guide

Complete guide to Git workflow standards using **Gitflow** methodology and **Conventional Commits**.

> **Solo Developer?** See [solo-developer-mode.md](./solo-developer-mode.md) for a simplified workflow without PR approvals and branch protection.

---

## Overview

This project follows a structured Git workflow to ensure:
- **Code quality** through automated checks
- **Clear history** with conventional commits
- **Safe deployments** with branch protection (teams)
- **Collaborative development** with pull requests (teams)

**Workflow Modes**:
- **Team Mode**: Full Gitflow with PRs, approvals, and branch protection
- **Solo Mode**: Simplified workflow, direct commits, automated quality gates

---

## Branch Structure (Gitflow)

### Main Branches

#### `main`
- **Purpose**: Production-ready code only
- **Protection**: ✅ Protected, requires PR + reviews
- **Deploys to**: Production environment
- **Never commit directly**: All changes via PR from `develop` or `hotfix/*`

#### `develop`
- **Purpose**: Integration branch for features
- **Protection**: ✅ Protected, requires PR + reviews
- **Deploys to**: Staging environment
- **Latest development**: Contains all completed features

### Supporting Branches

#### `feature/*`
**Format**: `feature/[issue-number]-[brief-description]`

```bash
# Examples
feature/123-user-authentication
feature/456-payment-integration
feature/789-dashboard-redesign
```

**Lifecycle**:
1. Branch from: `develop`
2. Merge back to: `develop`
3. Delete after: Merge complete

**Commands**:
```bash
# Create feature branch
git checkout develop
git pull origin develop
git checkout -b feature/123-user-auth

# Work on feature
git add .
git commit -m "feat(auth): add login endpoint"

# Push and create PR
git push origin feature/123-user-auth
# Create PR: feature/123-user-auth → develop
```

#### `release/*`
**Format**: `release/v[major].[minor].[patch]`

```bash
# Examples
release/v1.0.0
release/v1.2.0
release/v2.0.0-beta.1
```

**Lifecycle**:
1. Branch from: `develop`
2. Merge back to: `main` and `develop`
3. Tag: Version number on `main`
4. Delete after: Merge complete

**Commands**:
```bash
# Create release branch
git checkout develop
git pull origin develop
git checkout -b release/v1.0.0

# Prepare release (version bump, changelog)
npm version 1.0.0
git commit -m "chore(release): prepare v1.0.0"

# Merge to main
git checkout main
git merge --no-ff release/v1.0.0
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin main --tags

# Merge back to develop
git checkout develop
git merge --no-ff release/v1.0.0
git push origin develop

# Delete release branch
git branch -d release/v1.0.0
git push origin --delete release/v1.0.0
```

#### `hotfix/*`
**Format**: `hotfix/[issue-number]-[brief-description]`

```bash
# Examples
hotfix/911-critical-security-fix
hotfix/912-payment-bug
```

**Lifecycle**:
1. Branch from: `main`
2. Merge back to: `main` and `develop`
3. Tag: Patch version on `main`
4. Delete after: Merge complete

**Commands**:
```bash
# Create hotfix branch
git checkout main
git pull origin main
git checkout -b hotfix/911-security-fix

# Fix the issue
git add .
git commit -m "fix(security): patch XSS vulnerability"

# Merge to main
git checkout main
git merge --no-ff hotfix/911-security-fix
git tag -a v1.0.1 -m "Hotfix v1.0.1"
git push origin main --tags

# Merge to develop
git checkout develop
git merge --no-ff hotfix/911-security-fix
git push origin develop

# Delete hotfix branch
git branch -d hotfix/911-security-fix
```

---

## Conventional Commits (Mandatory)

### Format

```
type(scope): subject

[optional body]

[optional footer(s)]
```

### Types

| Type | Description | Example |
|------|-------------|---------|
| `feat` | New feature | `feat(auth): add OAuth2 login` |
| `fix` | Bug fix | `fix(api): resolve timeout on large requests` |
| `docs` | Documentation only | `docs(readme): update installation steps` |
| `style` | Code style/formatting | `style(components): fix indentation` |
| `refactor` | Code restructuring | `refactor(utils): simplify date formatting` |
| `perf` | Performance improvement | `perf(query): optimize database indexes` |
| `test` | Add/update tests | `test(auth): add unit tests for login` |
| `chore` | Maintenance tasks | `chore(deps): update dependencies` |
| `ci` | CI/CD changes | `ci(github): add deployment workflow` |
| `build` | Build system changes | `build(webpack): update config` |
| `revert` | Revert previous commit | `revert: feat(auth): add OAuth2 login` |

### Rules

1. **Type**: Required, lowercase, from approved list
2. **Scope**: Optional, lowercase, represents affected area
3. **Subject**: 
   - Required
   - Lowercase
   - No period at the end
   - Maximum 100 characters
   - Imperative mood ("add" not "added" or "adds")

### Examples

```bash
# Good commits ✅
feat(user): add profile editing functionality
fix(cart): resolve checkout tax calculation error
docs(api): document authentication endpoints
refactor(payment): extract stripe logic to service
test(checkout): add E2E tests for payment flow
chore(deps): upgrade react to v18.2.0

# Bad commits ❌
Added new feature                    # Missing type
feat: Add User Profile              # Wrong case, no scope
fix(api) fixed bug.                 # Period at end
feat(user): Added profile page      # Wrong tense
FEAT(USER): add profile             # Wrong case
```

### Automated Enforcement

Commits are validated via Husky `commit-msg` hook:

```bash
# This will pass ✅
git commit -m "feat(auth): add password reset"

# This will fail ❌
git commit -m "added password reset"
# Error: Commit message must follow conventional commits format
```

---

## Pull Request Workflow

### 1. Create Feature Branch

```bash
git checkout -b feature/123-new-feature
```

### 2. Make Changes & Commit

```bash
# Work on your code
git add .
git commit -m "feat(feature): implement new functionality"

# Pre-commit hooks run automatically:
# ✓ Linting
# ✓ Formatting
# ✓ Type checking
```

### 3. Push & Create PR

```bash
git push origin feature/123-new-feature
```

Create PR on GitHub with:
- **Title**: Brief description
- **Description**: What changed and why
- **Link issues**: Closes #123
- **Reviewers**: Assign team members

### 4. Automated Checks Run

CI/CD pipeline runs:
- ✓ Lint & Type Check (~30s)
- ✓ Unit Tests (~2min)
- ✓ Integration Tests (~3min)
- ✓ Build (~2min)
- ✓ E2E Tests (~5min)
- ✓ Coverage Check (≥85%)

### 5. Code Review

- **At least 1 approval** required
- Address review comments
- Push updates (CI re-runs)

### 6. Merge

```bash
# Squash merge (for clean history)
# OR
# Merge commit (to preserve feature history)
```

### 7. Cleanup

```bash
# Delete branch after merge
git branch -d feature/123-new-feature
git push origin --delete feature/123-new-feature
```

---

## Branch Protection Rules

> **Note**: Branch protection is **recommended for teams**, **optional for solo developers**.
>
> Solo developers can skip branch protection and rely on:
> - Git hooks (local quality gates)
> - CI/CD (automated testing)
> - Personal discipline

### `main` Branch (Team Mode)

- ✅ Require pull request reviews (1+)
- ✅ Require status checks to pass
- ✅ Require branches to be up to date
- ✅ Require conversation resolution
- ✅ Require signed commits (optional)
- ❌ Allow force pushes: NO
- ❌ Allow deletions: NO

### `develop` Branch (Team Mode)

- ✅ Require pull request reviews (1+)
- ✅ Require status checks to pass
- ❌ Allow force pushes: NO
- ❌ Allow deletions: NO

### Solo Developer Alternative

**Skip branch protection entirely!**

- No PR approvals needed
- Quality enforced by git hooks + CI
- Merge directly to main
- See [solo-developer-mode.md](./solo-developer-mode.md)

---

## Daily Workflow Examples

### Starting a New Feature

```bash
# 1. Update develop
git checkout develop
git pull origin develop

# 2. Create feature branch
git checkout -b feature/456-new-widget

# 3. Work and commit
# ... make changes ...
git add .
git commit -m "feat(widget): add new widget component"

# 4. Push and create PR
git push origin feature/456-new-widget
# Create PR on GitHub: feature/456-new-widget → develop
```

### Updating Your Feature Branch

```bash
# Keep your branch up to date with develop
git checkout feature/456-new-widget
git fetch origin
git rebase origin/develop

# Or merge (if rebase is complicated)
git merge origin/develop

# Push updates
git push origin feature/456-new-widget --force-with-lease
```

### Finishing a Feature

```bash
# 1. Ensure all commits follow conventions
git log --oneline

# 2. Push final changes
git push origin feature/456-new-widget

# 3. Create/Update PR
# 4. Wait for CI ✅
# 5. Get approval 👍
# 6. Merge via GitHub
# 7. Delete branch

git checkout develop
git pull origin develop
git branch -d feature/456-new-widget
```

---

## Commit Frequency

### Best Practices

✅ **DO** commit:
- After completing a discrete unit of work
- After each passing test
- Before switching contexts
- At least once per day of active work
- After fixing each bug

❌ **DON'T** commit:
- Broken/non-compiling code (unless WIP clearly marked)
- Commented-out code
- Debugging statements
- Large unrelated changes together

### Example Timeline

```
09:00 - Start feature
10:30 - feat(widget): add widget component structure
12:00 - feat(widget): implement widget rendering
14:00 - test(widget): add unit tests for widget
15:30 - refactor(widget): extract common logic
16:00 - docs(widget): add widget usage documentation
17:00 - Push and create PR
```

---

## Git Hooks Summary

All hooks run automatically:

| Hook | When | What It Does | Duration |
|------|------|--------------|----------|
| `pre-commit` | Before commit | Lint, format, type check | ~5-10s |
| `commit-msg` | After commit message | Validate conventional format | ~1s |
| `pre-push` | Before push | Run tests, check coverage | ~2-5min |
| `post-merge` | After merge/pull | Update dependencies | ~10-30s |

---

## Troubleshooting

### Commit Message Rejected

```bash
# Error: Commit message doesn't follow conventions

# Fix: Amend the commit message
git commit --amend -m "feat(scope): proper message"
```

### Pre-push Hook Fails

```bash
# Error: Tests failing or coverage below 85%

# Fix tests first
npm test

# Then push
git push
```

### Merge Conflicts

```bash
# Update your branch
git fetch origin
git merge origin/develop

# Resolve conflicts in files
# ... edit conflicting files ...

git add .
git commit -m "chore: resolve merge conflicts"
```

---

## Quick Reference

```bash
# Create feature
git checkout -b feature/123-name

# Commit (runs pre-commit hook)
git commit -m "type(scope): message"

# Push (runs pre-push hook)
git push origin feature/123-name

# Update from develop
git fetch origin
git rebase origin/develop

# Clean up merged branches
git branch --merged | grep -v "\*\|main\|develop" | xargs git branch -d
```

---

*This workflow ensures code quality, clear history, and safe deployments. Follow it consistently for best results!*
