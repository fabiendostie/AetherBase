# Implementation Checklist

Complete setup guide for implementing the enhanced development workflow.

> **Solo Developer?** You can skip:
>
> - Branch protection rules (optional)
> - PR approvals (not needed)
> - Multiple reviewers (you're the only one!)
> - Staging environment (optional, can use main for everything)
>
> **Keep everything else** - quality gates are still mandatory!

---

## Phase 1: Initial Setup

### 1. Install Dependencies

```bash
# Husky for Git hooks
npm install -D husky

# Commitlint for conventional commits
npm install -D @commitlint/cli @commitlint/config-conventional

# Linting and formatting
npm install -D eslint prettier eslint-config-prettier

# TypeScript (if using)
npm install -D typescript @types/node

# Testing frameworks
npm install -D jest @types/jest          # Unit/Integration
npm install -D @playwright/test          # E2E testing

# Coverage tools
npm install -D c8                        # or nyc for coverage
```

### 2. Initialize Husky

```bash
# Initialize Husky
npx husky init

# Make hooks executable (Linux/Mac)
chmod +x .husky/pre-commit
chmod +x .husky/commit-msg
chmod +x .husky/pre-push
chmod +x .husky/post-merge
```

**Windows**: Hooks are executable by default

### 3. Configure package.json Scripts

Add these scripts to `package.json`:

```json
{
    "scripts": {
        // Development
        "dev": "your-dev-command",

        // Linting
        "lint": "eslint src/",
        "lint:fix": "eslint src/ --fix",
        "format": "prettier --write \"src/**/*.{js,jsx,ts,tsx,json,css,md}\"",
        "format:check": "prettier --check \"src/**/*.{js,jsx,ts,tsx,json,css,md}\"",

        // Type checking
        "type-check": "tsc --noEmit",

        // Testing
        "test": "jest",
        "test:unit": "jest --testPathPattern=tests/unit",
        "test:integration": "jest --testPathPattern=tests/integration",
        "test:e2e": "playwright test",
        "test:coverage": "jest --coverage",
        "test:watch": "jest --watch",

        // Coverage
        "coverage:report": "cat coverage/coverage-summary.json",
        "coverage:merge": "nyc merge coverage coverage/merged.json",

        // Build
        "build": "your-build-command",

        // Husky
        "prepare": "husky install"
    }
}
```

### 4. Configure Git

```bash
# Set up Git config
git config --local core.hooksPath .husky

# Initialize Gitflow (optional, or do manually)
git checkout -b develop
git push -u origin develop
```

---

## Phase 2: Configure Tools

### 1. ESLint Configuration

Create `.eslintrc.json`:

```json
{
    "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
    "parser": "@typescript-eslint/parser",
    "plugins": ["@typescript-eslint"],
    "env": {
        "node": true,
        "es2021": true
    },
    "rules": {
        "no-console": "warn",
        "no-debugger": "error"
    }
}
```

### 2. Prettier Configuration

Create `.prettierrc`:

```json
{
    "semi": true,
    "trailingComma": "es5",
    "singleQuote": true,
    "printWidth": 100,
    "tabWidth": 2
}
```

### 3. TypeScript Configuration

Create or update `tsconfig.json`:

```json
{
    "compilerOptions": {
        "target": "ES2020",
        "module": "commonjs",
        "strict": true,
        "esModuleInterop": true,
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true,
        "resolveJsonModule": true,
        "declaration": true,
        "outDir": "./dist"
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules", "dist", "tests"]
}
```

### 4. Jest Configuration

Create `jest.config.js`:

```javascript
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/tests'],
    testMatch: ['**/*.test.ts', '**/*.spec.ts'],
    coverageDirectory: 'coverage',
    collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts', '!src/**/__tests__/**'],
    coverageThreshold: {
        global: {
            lines: 85,
            branches: 85,
            functions: 85,
            statements: 85,
        },
    },
    coverageReporters: ['text', 'lcov', 'html', 'json-summary'],
};
```

---

## Phase 3: GitHub Configuration

### 1. Create GitHub Secrets

Go to: Repository → Settings → Secrets and variables → Actions

Add these secrets:

```
STAGING_DEPLOY_TOKEN
STAGING_API_KEY
STAGING_DATABASE_URL

PROD_DEPLOY_TOKEN
PROD_API_KEY
PROD_DATABASE_URL

JWT_SECRET
SIGNING_KEY
```

### 2. Configure Branch Protection (Teams Only)

> **Solo Developers**: Skip this entire section! You don't need branch protection.
> Your quality gates are enforced by git hooks and CI/CD.

#### For `main` branch (Teams):

Settings → Branches → Add rule:

- Branch name pattern: `main`
- ✅ Require pull request reviews before merging (1-2 approvals)
- ✅ Require status checks to pass before merging
    - Select: `lint-and-typecheck`, `unit-tests`, `integration-tests`, `build`, `e2e-tests`
- ✅ Require branches to be up to date before merging
- ✅ Require conversation resolution before merging
- ❌ Allow force pushes
- ❌ Allow deletions

#### For `develop` branch (Teams):

- Branch name pattern: `develop`
- ✅ Require pull request reviews before merging (1 approval)
- ✅ Require status checks to pass before merging
- ✅ Require branches to be up to date before merging
- ❌ Allow force pushes
- ❌ Allow deletions

### 3. Configure GitHub Environments

> **Solo Developers**: You can skip "Required reviewers" - leave empty!

Settings → Environments → New environment:

#### Staging Environment (Optional for Solo):

- Name: `staging`
- Deployment branches: `develop` only
- Wait timer: 0 minutes
- Required reviewers: None (or skip staging entirely)

#### Production Environment:

- Name: `production`
- Deployment branches: `main` only
- Wait timer: 0 minutes
- **Required reviewers**:
    - **Teams**: Select team members
    - **Solo**: Leave empty (no approval needed)

---

## Phase 4: Verification

### 1. Test Husky Hooks

```bash
# Test commit-msg hook
git commit -m "bad commit message"
# Should fail with validation error

git commit -m "feat(test): valid commit message"
# Should succeed

# Test pre-commit hook
# Make a change with linting errors
git add .
git commit -m "feat(test): testing hooks"
# Should fail if linting errors exist

# Test pre-push hook
git push origin feature/test
# Should run tests and check coverage
```

### 2. Test CI/CD Pipeline

```bash
# Create test branch
git checkout -b feature/test-ci

# Make a change
echo "console.log('test');" >> src/test.js
git add .
git commit -m "feat(ci): test CI pipeline"

# Push and create PR
git push origin feature/test-ci
```

Check GitHub Actions tab for pipeline execution.

### 3. Verify Coverage Enforcement

```bash
# Run tests with coverage
npm run test:coverage

# Check coverage report
open coverage/index.html

# Verify threshold enforcement
# Coverage below 85% should fail in CI
```

---

## Phase 5: Team Onboarding

### 1. Update Team Documentation

- Share `.workflows/git-workflow.md` with team
- Review conventional commits format
- Explain branch protection rules
- Walk through PR process

### 2. Setup Meeting

Agenda:

1. Git workflow overview (Gitflow)
2. Conventional commits demo
3. Pre-commit hooks demonstration
4. PR template walkthrough
5. CI/CD pipeline explanation
6. Q&A

### 3. First PR Exercise

Have each team member:

1. Clone repository
2. Run `npm install` (installs Husky)
3. Create feature branch
4. Make small change
5. Commit with conventional format
6. Push and create PR
7. Review automated checks

---

## Checklist Summary

### Setup Phase

- [ ] Dependencies installed
- [ ] Husky initialized
- [ ] package.json scripts configured
- [ ] Git configured

### Configuration Phase

- [ ] ESLint configured
- [ ] Prettier configured
- [ ] TypeScript configured (if applicable)
- [ ] Jest configured
- [ ] Playwright configured
- [ ] Coverage thresholds set (85%)

### GitHub Phase

- [ ] GitHub secrets added
- [ ] Branch protection rules set (`main`, `develop`)
- [ ] GitHub environments configured (staging, production)
- [ ] Required status checks selected
- [ ] PR template in place

### Verification Phase

- [ ] Husky hooks tested
- [ ] CI/CD pipeline tested
- [ ] Coverage enforcement verified
- [ ] E2E tests run successfully

### Team Phase

- [ ] Documentation shared
- [ ] Team onboarding completed
- [ ] First test PRs created
- [ ] Workflow questions answered

---

## Troubleshooting

### Husky Hooks Not Running

```bash
# Reinstall Husky
rm -rf .husky
npx husky install

# Make hooks executable
chmod +x .husky/*

# Verify hooks path
git config core.hooksPath
# Should output: .husky
```

### CI Pipeline Failing

1. Check GitHub Actions logs
2. Verify secrets are set correctly
3. Ensure branch is up to date
4. Check test coverage meets 85%
5. Verify all tests pass locally

### Coverage Below Threshold

```bash
# Identify uncovered code
npm run test:coverage
open coverage/index.html

# Add tests for uncovered lines (red in report)
# Re-run coverage check
```

### Playwright Issues

```bash
# Install browsers
npx playwright install

# Install system dependencies
npx playwright install-deps

# Run with debug mode
npx playwright test --debug
```

---

## Maintenance

### Weekly

- [ ] Review CI/CD performance metrics
- [ ] Check for flaky tests
- [ ] Review failed builds

### Monthly

- [ ] Update dependencies
- [ ] Review and update branch protection rules
- [ ] Rotate GitHub secrets
- [ ] Review test coverage trends

### Quarterly

- [ ] Audit Husky hooks effectiveness
- [ ] Review Git workflow adoption
- [ ] Update team documentation
- [ ] Gather team feedback on process

---

**You're all set!** The enhanced development workflow is now fully implemented with automated quality gates, comprehensive testing, and streamlined CI/CD.

_For questions, refer to `.workflows/` documentation or create an issue._
