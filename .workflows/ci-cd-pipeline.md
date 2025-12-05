# CI/CD Pipeline Documentation

Fast, optimized CI/CD pipeline with speed targets and comprehensive automation.

---

## Pipeline Overview

**Total Duration Target**: < 10 minutes (PR builds)

```
┌─────────────────────────────────────────────────────────────┐
│                     CI/CD PIPELINE                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Stage 1: Lint & Type Check (30s) ────────┐                │
│                                             │                │
│  Stage 2: Unit Tests (1-2min) ─────────────┤                │
│           ├─ Shard 1/4                     │                │
│           ├─ Shard 2/4                     ├─ Parallel     │
│           ├─ Shard 3/4                     │                │
│           └─ Shard 4/4                     │                │
│                                             │                │
│  Stage 3: Integration Tests (2-3min) ──────┘                │
│                                                              │
│  Stage 4: Build (1-2min) ──────────────────────────────────│
│                                                              │
│  Stage 5: E2E Tests (3-5min) ───────┐                      │
│           ├─ Chromium/Shard1        │                      │
│           ├─ Chromium/Shard2        │                      │
│           ├─ Firefox/Shard1         ├─ Parallel            │
│           ├─ Firefox/Shard2         │                      │
│           ├─ WebKit/Shard1          │                      │
│           └─ WebKit/Shard2          │                      │
│                                                              │
│  Stage 6: Deploy (30s) ─────────────────────────────────── │
│           ├─ Staging (on develop)                           │
│           └─ Production (on main)                           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Stage Breakdown

### Stage 1: Lint & Type Check (~30s)

**Purpose**: Fast syntax and style validation

**Runs On**: Every push/PR

**Jobs**:

- ESLint code linting
- Prettier format checking
- TypeScript type checking

**Optimizations**:

- Cached node_modules
- ESLint cache enabled
- Parallel execution

```yaml
lint-and-typecheck:
    runs-on: ubuntu-latest
    timeout-minutes: 5
    steps:
        - uses: actions/checkout@v4
        - uses: actions/setup-node@v4
          with:
              cache: 'npm' # ← Cache dependencies
        - run: npm ci
        - run: npm run lint
        - run: npm run format:check
        - run: npm run type-check
```

**Pass Criteria**: Zero errors

---

### Stage 2: Unit Tests (1-2min)

**Purpose**: Test individual components in isolation

**Runs On**: Every push/PR

**Parallelization**: 4 shards

**Coverage Target**: ≥85%

```yaml
unit-tests:
    strategy:
        matrix:
            shard: [1, 2, 3, 4] # ← 4-way parallelization
    steps:
        - run: npm run test:unit -- --shard=${{ matrix.shard }}/4
        - uses: actions/upload-artifact@v4
          with:
              name: coverage-unit-${{ matrix.shard }}
```

**Optimizations**:

- Test sharding (4-way split)
- Jest parallel execution
- Cached dependencies

**Pass Criteria**:

- All tests pass
- Coverage ≥85%

---

### Stage 3: Integration Tests (2-3min)

**Purpose**: Test API endpoints and service integrations

**Runs On**: Every push/PR

**Services**: Test database (PostgreSQL)

```yaml
integration-tests:
    services:
        postgres:
            image: postgres:15
            options: >-
                --health-cmd pg_isready
            ports:
                - 5432:5432
    steps:
        - run: npm run test:integration
          env:
              DATABASE_URL: postgresql://postgres@localhost/test
```

**Optimizations**:

- Parallel with unit tests
- Containerized database
- Database connection pooling

**Pass Criteria**: All integration tests pass

---

### Stage 4: Build (1-2min)

**Purpose**: Create production artifacts

**Runs On**: Every push/PR

**Artifacts**: Uploaded for deployment and E2E tests

```yaml
build:
    needs: [lint-and-typecheck]
    steps:
        - run: npm ci
        - run: npm run build
        - uses: actions/upload-artifact@v4
          with:
              name: build-artifacts
              path: dist/
```

**Optimizations**:

- Incremental builds
- Cached node_modules
- Compressed artifacts

**Pass Criteria**: Build completes without errors

---

### Stage 5: E2E Tests (3-5min)

**Purpose**: Test critical user journeys

**Runs On**: Non-draft PRs only

**Browsers**: Chromium, Firefox, WebKit

**Parallelization**: 2 shards per browser = 6 parallel jobs

```yaml
e2e-tests:
    if: github.event.pull_request.draft == false # ← Skip on drafts
    strategy:
        matrix:
            browser: [chromium, firefox, webkit]
            shard: [1, 2]
    steps:
        - run: npx playwright install --with-deps ${{ matrix.browser }}
        - run: npx playwright test --project=${{ matrix.browser }} --shard=${{ matrix.shard }}/2
```

**Optimizations**:

- Skip on draft PRs
- Test sharding (2-way per browser)
- Parallel browser execution
- Trace only on first retry
- Video only on failure

**Pass Criteria**: ≥95% pass rate

---

### Stage 6: Coverage Report

**Purpose**: Verify and report test coverage

**Runs After**: Unit and integration tests complete

```yaml
coverage-report:
    needs: [unit-tests, integration-tests]
    steps:
        - name: Download coverage artifacts
          uses: actions/download-artifact@v4
        - name: Merge coverage
          run: npm run coverage:merge
        - name: Check threshold
          run: |
              COVERAGE=$(cat coverage/coverage-summary.json | jq '.total.lines.pct')
              if (( $(echo "$COVERAGE < 85" | bc -l) )); then
                exit 1
              fi
```

**Outputs**:

- Merged coverage report
- PR comment with coverage stats
- Coverage badge update

---

### Stage 7: Deploy

#### Deploy to Staging

**Trigger**: Push to `develop` branch

**Environment**: staging.yourapp.com

**Approval**: Not required

```yaml
deploy-staging:
    if: github.ref == 'refs/heads/develop'
    environment:
        name: staging
        url: https://staging.yourapp.com
    steps:
        - run: npm run deploy:staging
          env:
              DEPLOY_TOKEN: ${{ secrets.STAGING_DEPLOY_TOKEN }}
```

**Post-Deployment**:

- Smoke tests
- Health check verification

#### Deploy to Production

**Trigger**: Push to `main` branch

**Environment**: yourapp.com

**Approval**: Required (GitHub environment protection)

**Requirements**:

- All tests pass
- E2E tests complete
- Manual approval

```yaml
deploy-production:
    if: github.ref == 'refs/heads/main'
    environment:
        name: production # ← Requires approval
        url: https://yourapp.com
    steps:
        - run: npm run deploy:prod
          env:
              DEPLOY_TOKEN: ${{ secrets.PROD_DEPLOY_TOKEN }}
```

**Post-Deployment**:

- Smoke tests
- Performance monitoring
- Error tracking
- Deployment notification

---

## Speed Optimizations

### 1. Dependency Caching

**Impact**: Save 30-60s per job

```yaml
- uses: actions/setup-node@v4
  with:
      cache: 'npm' # Automatic npm caching
```

**Cache Keys**: Based on `package-lock.json` hash

### 2. Parallel Execution

**Impact**: 4x faster tests

```yaml
strategy:
    matrix:
        shard: [1, 2, 3, 4]
```

**Test Distribution**: Jest/Playwright auto-balances

### 3. Selective Testing

**Impact**: Skip unnecessary work

```yaml
# Skip E2E on draft PRs
if: github.event.pull_request.draft == false

# Run only affected tests (monorepo)
run: npx nx affected:test
```

### 4. Incremental Builds

**Impact**: Faster builds for small changes

```yaml
- name: Build
  run: npm run build:incremental
```

### 5. Concurrency Control

**Impact**: Cancel outdated runs

```yaml
concurrency:
    group: ${{ github.workflow }}-${{ github.ref }}
    cancel-in-progress: true # Cancel old runs
```

---

## Secrets Management

### Required Secrets

Add these to GitHub repository secrets:

#### Deployment Secrets

```
STAGING_DEPLOY_TOKEN   - Staging deployment credentials
PROD_DEPLOY_TOKEN      - Production deployment credentials
```

#### API Keys

```
STAGING_API_KEY        - Staging environment API key
PROD_API_KEY           - Production environment API key
```

#### Database

```
STAGING_DATABASE_URL   - Staging database connection
PROD_DATABASE_URL      - Production database connection
```

#### Authentication

```
JWT_SECRET             - JWT signing key
SIGNING_KEY            - Application signing key
```

### Secret Rotation

- Rotate every 90 days
- Use different secrets per environment
- Never commit secrets to code
- Use GitHub environment secrets for environment-specific values

### Accessing Secrets

```yaml
- name: Deploy
  run: npm run deploy
  env:
      API_KEY: ${{ secrets.PROD_API_KEY }}
      DATABASE_URL: ${{ secrets.PROD_DATABASE_URL }}
```

---

## Quality Metrics

### Speed Targets

| Stage             | Target    | Current    |
| ----------------- | --------- | ---------- |
| Lint & Type Check | 30s       | ⏱️ Monitor |
| Unit Tests        | 2min      | ⏱️ Monitor |
| Integration Tests | 3min      | ⏱️ Monitor |
| Build             | 2min      | ⏱️ Monitor |
| E2E Tests         | 5min      | ⏱️ Monitor |
| **Total (PR)**    | **10min** | ⏱️ Monitor |

### Success Rates

| Metric         | Target | Action if Below       |
| -------------- | ------ | --------------------- |
| Build Success  | ≥98%   | Investigate failures  |
| Test Pass Rate | ≥95%   | Fix flaky tests       |
| E2E Pass Rate  | ≥95%   | Stabilize tests       |
| Deploy Success | ≥99%   | Review deploy process |

### Coverage Targets

| Coverage Type | Target |
| ------------- | ------ |
| Lines         | ≥85%   |
| Branches      | ≥85%   |
| Functions     | ≥85%   |
| Statements    | ≥85%   |

---

## Workflow Triggers

### On Push

```yaml
on:
    push:
        branches: [main, develop]
```

**Runs**: Full pipeline + deploy (on main/develop)

### On Pull Request

```yaml
on:
    pull_request:
        branches: [main, develop]
```

**Runs**: Full pipeline (no deploy)

**Draft PRs**: Skip E2E tests

### Manual Trigger

```yaml
on:
    workflow_dispatch:
```

**Purpose**: Manual deployment or testing

---

## Monitoring & Alerts

### Build Notifications

**Success**:

- GitHub commit status ✅
- Deployment notification

**Failure**:

- GitHub commit status ❌
- Email to committer
- Slack/Discord alert (optional)

### Deployment Tracking

- Track deployment time
- Monitor error rates post-deploy
- Performance metrics
- User impact analysis

---

## Troubleshooting

### Slow Pipeline

1. Check job duration in Actions tab
2. Identify bottleneck stage
3. Add parallelization or caching
4. Consider selective testing

### Flaky Tests

1. Run test multiple times: `--repeat-each=10`
2. Identify timing issues
3. Fix race conditions
4. Add proper waits (not arbitrary timeouts)

### Failed Deployments

1. Check deployment logs
2. Verify secrets are set
3. Test deployment locally
4. Roll back if necessary

### Coverage Drops

1. Identify uncovered code
2. Add missing tests
3. Review coverage report
4. Ensure tests run in CI

---

## Best Practices

### Pipeline hygiene

- ✅ Keep jobs fast (<10min total)
- ✅ Fail fast (lint before tests)
- ✅ Use caching aggressively
- ✅ Parallelize where possible
- ✅ Skip unnecessary work

### Security

- ✅ Never log secrets
- ✅ Use environment protection
- ✅ Require approvals for production
- ✅ Rotate secrets regularly
- ✅ Audit secret access

### Maintenance

- ✅ Monitor pipeline duration
- ✅ Fix flaky tests immediately
- ✅ Update dependencies regularly
- ✅ Review failed builds daily
- ✅ Keep workflows DRY (reusable workflows)

---

**The CI/CD pipeline ensures code quality while maintaining development velocity. Fast feedback is critical for AI-assisted development!**
