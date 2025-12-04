# Workflow Mode Selection

Choose the workflow that matches your team size and needs.

---

## Quick Decision Tree

```
Are you working solo or with a team?
│
├─ SOLO ────────────────────────────────────────────┐
│   ↓                                                │
│   Do you want maximum simplicity or best practices?
│   │                                                │
│   ├─ Simplicity → Use TRUNK-BASED                 │
│   └─ Best Practices → Use SOLO MODE                │
│                                                    │
└─ TEAM ────────────────────────────────────────────┤
    ↓                                                │
    Small team (2-5) or large team (6+)?            │
    │                                                │
    ├─ Small → Use SIMPLIFIED GITFLOW                │
    └─ Large → Use FULL GITFLOW                      │
                                                     │
─────────────────────────────────────────────────────┘
```

---

## Mode 1: Trunk-Based (Solo - Simplest)

**Who**: Solo developers, rapid iteration

**Branches**: `main` only

**Process**:
```bash
git checkout main
# Make changes
git commit -m "feat: add feature"
git push
# Auto-deploys ✅
```

**Pros**:
- ✅ Simplest possible workflow
- ✅ No branch management
- ✅ Immediate deployments

**Cons**:
- ❌ No isolation for experiments
- ❌ All commits go straight to production

**Setup Time**: 5 minutes

**Documentation**: [solo-developer-mode.md](./solo-developer-mode.md)

---

## Mode 2: Solo Mode (Solo - Recommended)

**Who**: Solo developers who want best practices

**Branches**: `main` + optional `feature/*`

**Process**:
```bash
git checkout -b feature/new-feature
# Work on feature
git commit -m "feat: add feature"
# Merge directly (no PR)
git checkout main
git merge feature/new-feature
git push
```

**Pros**:
- ✅ Feature isolation
- ✅ Clean main branch
- ✅ No team overhead (PRs, approvals)
- ✅ All quality gates still enforced

**Cons**:
- ❌ Slightly more complexity than trunk-based

**Setup Time**: 10 minutes

**Quality Gates**:
- Git hooks (pre-commit, pre-push)
- CI/CD (automated testing)
- Coverage enforcement (85%+)

**Documentation**: [solo-developer-mode.md](./solo-developer-mode.md)

---

## Mode 3: Simplified Gitflow (Small Teams)

**Who**: 2-5 developers

**Branches**: `main`, `develop`, `feature/*`

**Process**:
```bash
git checkout -b feature/new-feature
# Work
git push origin feature/new-feature
# Create PR → 1 approval → Merge
```

**Pros**:
- ✅ Code review benefits
- ✅ Clear separation of development/production
- ✅ Not too much overhead

**Cons**:
- ❌ Requires PRs and approvals
- ❌ More branch management

**Setup Time**: 30 minutes

**Quality Gates**:
- Git hooks
- CI/CD
- 1 required PR approval
- Branch protection on `main` and `develop`

**Documentation**: [git-workflow.md](./git-workflow.md)

---

## Mode 4: Full Gitflow (Large Teams)

**Who**: 6+ developers, complex projects

**Branches**: `main`, `develop`, `feature/*`, `release/*`, `hotfix/*`

**Process**:
```bash
git checkout -b feature/new-feature
# Work
git push origin feature/new-feature
# Create PR → 2+ approvals → Merge to develop
# Release cycles create release branches
# Deploy to production from main
```

**Pros**:
- ✅ Maximum control
- ✅ Multiple reviewers
- ✅ Controlled releases
- ✅ Hotfix process

**Cons**:
- ❌ Most complex
- ❌ Slowest (approvals, reviews)
- ❌ More branch management overhead

**Setup Time**: 60 minutes

**Quality Gates**:
- Git hooks
- CI/CD
- 2+ required PR approvals
- Branch protection on all main branches
- Staging + production environments

**Documentation**: [git-workflow.md](./git-workflow.md)

---

## Comparison Table

| Feature | Trunk-Based | Solo Mode | Simplified Gitflow | Full Gitflow |
|---------|-------------|-----------|-------------------|--------------|
| **Team Size** | 1 | 1 | 2-5 | 6+ |
| **Branches** | main | main + feature | main + develop + feature | All |
| **PRs Required** | No | No | Yes (1 approval) | Yes (2+ approvals) |
| **Branch Protection** | No | No | Yes | Yes |
| **Setup Time** | 5 min | 10 min | 30 min | 60 min |
| **Quality Gates** | Git hooks + CI | Git hooks + CI | All + PR reviews | All + multiple reviews |
| **Complexity** | ⭐ | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Best For** | Rapid iteration | Solo best practices | Small teams | Large teams |

---

## What Stays the Same Across All Modes

### Always Required ✅

1. **Conventional Commits**
   - Format: `type(scope): subject`
   - Enforced by `commit-msg` hook

2. **Quality Gates**
   - Linting (pre-commit)
   - Formatting (pre-commit)
   - Testing (pre-push)
   - Coverage ≥85% (pre-push + CI)

3. **CI/CD Pipeline**
   - Automated testing
   - Coverage reporting
   - Automated deployment

4. **Git Hooks**
   - pre-commit: lint + format
   - commit-msg: validate format
   - pre-push: tests + coverage

### Optional (Based on Mode) ⚙️

- Branch protection rules
- PR approvals
- Code owners
- Multiple reviewers
- Staging environments

---

## Migration Between Modes

### Solo → Team

1. Enable branch protection rules
2. Require PR approvals
3. Add reviewers
4. Update CI/CD for staging environment

### Team → Solo

1. Disable branch protection
2. Remove required approvals
3. Merge directly to main
4. Simplify CI/CD (single environment)

---

## Recommendation by Project Type

### Personal Projects / Side Projects
→ **Trunk-Based** or **Solo Mode**

### Freelance / Client Work (Solo)
→ **Solo Mode** (keeps clean history)

### Small Startup (2-5 devs)
→ **Simplified Gitflow**

### Enterprise / Large Team
→ **Full Gitflow**

### Open Source
→ **Simplified or Full Gitflow** (depends on contributors)

---

## Getting Started

### 1. Choose Your Mode

Based on team size and complexity needs

### 2. Follow Setup Guide

- Trunk-Based / Solo: [solo-developer-mode.md](./solo-developer-mode.md)
- Simplified / Full Gitflow: [git-workflow.md](./git-workflow.md)

### 3. Configure

Follow the [IMPLEMENTATION_CHECKLIST.md](../IMPLEMENTATION_CHECKLIST.md)

Skip sections marked "Teams Only" if going solo!

### 4. Start Coding

All modes support the same quality standards - just different collaboration processes.

---

**The best workflow is the one you'll actually follow!**

*Start simple, add complexity only when needed.*
