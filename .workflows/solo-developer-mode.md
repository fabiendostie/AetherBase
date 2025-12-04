# Solo Developer Quick Setup

Streamlined workflow configuration for solo developers - all the quality gates, none of the team overhead.

---

## Philosophy

As a solo developer, you still benefit from:
- ✅ Automated quality checks (linting, testing, coverage)
- ✅ Conventional commits (clean history)
- ✅ CI/CD pipeline (automated deployment)
- ✅ Git hooks (prevent bad commits)

But you **don't need**:
- ❌ PR approvals
- ❌ Branch protection rules
- ❌ Code reviews
- ❌ Multiple environments (staging can equal production)

---

## Quick Start (5 Minutes)

### 1. Install Dependencies

```bash
npm install -D husky @commitlint/cli @commitlint/config-conventional
npm install -D eslint prettier jest @playwright/test
npm install
```

### 2. Simplified Git Workflow

**Option A: Single Branch** (Simplest)
```bash
# Just work on main
git checkout main
# Make changes
git commit -m "feat: add new feature"
git push
# CI/CD deploys automatically
```

**Option B: Feature Branches** (Recommended)
```bash
# Create feature branch for organization
git checkout -b feature/new-feature
# Make changes
git commit -m "feat: add new feature"
# Merge directly (no PR needed)
git checkout main
git merge feature/new-feature
git push
```

### 3. Skip Branch Protection

**Don't set up branch protection rules** - you're the only developer!

Just ensure:
- Git hooks run locally (pre-commit, pre-push)
- CI runs on push to main
- Tests and coverage are enforced in CI

---

## Simplified Workflow Options

### Option 1: Trunk-Based Development (Fastest)

```
main ←── All commits go here directly
```

**Pros**:
- Simplest workflow
- No branch management
- Immediate deployments

**Cons**:
- No isolation for experiments
- CI is your only safety net

**Use when**: Small projects, rapid iteration

### Option 2: Feature Branches (Recommended)

```
main
 ├── feature/user-auth
 ├── feature/dashboard
 └── feature/api-v2
```

**Pros**:
- Isolated work
- Easy to abandon failed experiments
- Clean main branch

**Cons**:
- Slightly more overhead

**Use when**: Medium/large projects, multiple features in progress

### Option 3: Lightweight Gitflow (For Releases)

```
main (production)
 └── develop (integration)
      ├── feature/a
      └── feature/b
```

**Pros**:
- Separate production from development
- Controlled releases

**Cons**:
- More branches to manage

**Use when**: Need stable production branch, infrequent releases

---

## GitHub Configuration (Solo Mode)

### Branch Protection: OFF

**Don't enable branch protection** for solo projects.

Instead, rely on:
1. **Git hooks** (local quality gates)
2. **CI/CD** (automated testing)
3. **Personal discipline** (don't push broken code)

### CI/CD: Simplified

Modify `.github/workflows/ci-cd.yml`:

```yaml
# Remove approval requirements
deploy-production:
  if: github.ref == 'refs/heads/main'
  environment:
    name: production
    url: https://yourapp.com
    # NO required reviewers for solo dev
  steps:
    - run: npm run deploy
```

### Environments: Combined

**Option**: Combine staging and production

```yaml
# Single environment
deploy:
  if: github.ref == 'refs/heads/main'
  steps:
    - run: npm run deploy
```

---

## Quality Gates (Still Enforced!)

Even as a solo dev, maintain quality:

### Local (Git Hooks)
- ✅ pre-commit: Lint + format + type check
- ✅ commit-msg: Conventional commits
- ✅ pre-push: Tests + coverage (85%+)

### CI/CD
- ✅ All tests must pass
- ✅ Coverage ≥85%
- ✅ Build must succeed
- ✅ E2E tests pass

**These are NON-NEGOTIABLE** even solo!

---

## Commit Workflow (Solo)

### Daily Workflow

```bash
# Morning: Start work
git pull origin main

# Work on feature
# ... write code ...

# Commit frequently (hooks run automatically)
git add .
git commit -m "feat(auth): add login form"
# ← pre-commit hook runs (lint, format)
# ← commit-msg hook validates format

# More work
git commit -m "test(auth): add login tests"

# Push when ready (tests run)
git push origin main
# ← pre-push hook runs (tests + coverage)
# ← CI/CD pipeline runs on GitHub
# ← Auto-deploys if all checks pass
```

### No PRs Needed!

```bash
# Traditional team workflow:
git push origin feature/x
# Create PR → Wait for approval → Merge

# Solo workflow:
git checkout main
git merge feature/x  # or work directly on main
git push origin main
# Done! ✅
```

---

## Simplified Conventional Commits

You still use conventional commits, but simpler:

```bash
# Full format (team):
feat(user-auth): add OAuth2 login with Google and GitHub providers

# Solo format (simplified):
feat: add OAuth login

# Both are valid! Use what works for you.
```

**Minimum requirements**:
- Type: `feat`, `fix`, `docs`, etc.
- Subject: Brief description

**Optional** for solo:
- Scope
- Body
- Footer

---

## Testing Strategy (Solo Adjusted)

### Coverage: Still 85%+

Don't lower standards! Maintain 85% coverage.

### E2E Tests: Critical Paths Only

Focus on:
- User registration/login
- Core business flow
- Payment (if applicable)

Skip:
- Edge cases in E2E (cover in unit tests)
- Multiple browser testing (pick one: Chromium)

### Speed Optimization

```bash
# Run only Chromium for E2E (faster)
npx playwright test --project=chromium

# Skip E2E locally if confident
npm run test:unit
npm run test:integration
# Let CI run E2E
```

---

## Deployment (Solo)

### Auto-Deploy on Push

```yaml
# .github/workflows/ci-cd.yml
deploy-production:
  if: github.ref == 'refs/heads/main'
  steps:
    - run: npm run deploy
    # No approval needed!
```

### Rollback Plan

Even solo, have a rollback plan:

```bash
# If deployment breaks:
git revert HEAD
git push origin main
# CI auto-deploys previous version
```

---

## Tools Checklist (Solo)

### Required ✅
- [x] Husky (git hooks)
- [x] Commitlint (conventional commits)
- [x] ESLint (linting)
- [x] Prettier (formatting)
- [x] Jest (testing)
- [x] GitHub Actions (CI/CD)

### Optional (Skip for Solo) ❌
- [ ] Branch protection rules
- [ ] PR templates
- [ ] Code owners file
- [ ] Multiple reviewers
- [ ] Staging environment (can use main for everything)

---

## Time Savings

### What You Skip

| Team Workflow | Solo Workflow | Time Saved |
|---------------|---------------|------------|
| Create PR | Direct push | 2-5 min |
| Wait for review | No wait | 10-60 min |
| Address review comments | No comments | 10-30 min |
| Get approval | No approval | 5-15 min |
| **Total per feature** | **Instant** | **30-110 min** |

### What You Keep

- Quality gates (automated)
- Test coverage (85%+)
- Clean commit history
- Automated deployment
- Code standards

---

## Migration: Team → Solo

If you're adapting this template for solo use:

### 1. Disable Branch Protection

GitHub → Settings → Branches → Delete rules

### 2. Remove Approval Requirements

Edit `.github/workflows/ci-cd.yml`:

```yaml
# Remove this:
environment:
  name: production
  # required reviewer removed!

# Or simplify to:
steps:
  - run: npm run deploy
```

### 3. Simplify Workflow

Choose your preferred workflow:
- Trunk-based (main only)
- Feature branches (merge directly)
- Skip PRs entirely

### 4. Keep Quality Gates!

- Git hooks still run
- CI/CD still validates
- Coverage still required

---

## Best Practices (Solo)

### DO ✅
- Commit frequently (end of each feature/fix)
- Use conventional commits
- Maintain 85%+ test coverage
- Run tests locally before push
- Keep CI/CD pipeline fast
- Have rollback plan

### DON'T ❌
- Skip tests "because it's just you"
- Lower coverage standards
- Disable git hooks
- Push directly without testing
- Ignore CI failures

---

## Example: Full Solo Flow

### Starting New Feature

```bash
# 1. Update main
git checkout main
git pull

# 2. Optional: Create feature branch
git checkout -b feature/user-profiles

# 3. Work
# ... write code ...

# 4. Commit (hooks run automatically)
git add .
git commit -m "feat: add user profile page"

# 5. Tests run automatically on push
git push origin feature/user-profiles

# 6. CI passes → Merge directly
git checkout main
git merge feature/user-profiles
git push origin main

# 7. Auto-deploys!
```

**Total time**: < 1 minute overhead (vs 30-110 min with team process)

---

## When to Add Team Features

Consider adding team features when:

- Adding first collaborator
- Open-sourcing project
- Hiring contractor
- Need code review for learning

Then enable:
1. Branch protection on `main`
2. Required PR approvals (1+)
3. PR template
4. Code owners (optional)

---

**Solo developers can have all the quality benefits of team workflows without the overhead!**

*Quality is non-negotiable. Process overhead is optional.*
