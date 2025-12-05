# Testing Strategy

Comprehensive multi-layer testing approach for maintaining 85%+ code coverage and ensuring code quality.

---

## Testing Pyramid

```
         /\
        /  \  E2E Tests (5%)
       /----\
      / Integ \  Integration Tests (20%)
     /--------\
    /   Unit   \  Unit Tests (75%)
   /------------\
```

**Philosophy**: More unit tests, fewer integration tests, even fewer E2E tests.

---

## Layer 1: Unit Tests (75% of tests)

### Purpose

Test individual functions, components, and modules in isolation.

### Coverage Target

**85% minimum** for all unit tests

### Framework

- **JavaScript/TypeScript**: Jest or Vitest
- **Python**: Pytest
- **Other**: Language-specific framework

### What to Test

✅ **DO test**:

- Pure functions
- Component rendering
- Business logic
- Utility functions
- State management
- Error handling
- Edge cases

❌ **DON'T test**:

- Third-party library internals
- Simple getters/setters
- Framework code
- Configuration files

### Example (Jest)

```javascript
// src/utils/calculateTotal.js
export function calculateTotal(items) {
    if (!Array.isArray(items)) throw new TypeError('Items must be an array');
    return items.reduce((sum, item) => sum + item.price, 0);
}

// tests/unit/utils/calculateTotal.test.js
import { calculateTotal } from '../../../src/utils/calculateTotal';

describe('calculateTotal', () => {
    it('should calculate total of multiple items', () => {
        const items = [{ price: 10 }, { price: 20 }, { price: 30 }];
        expect(calculateTotal(items)).toBe(60);
    });

    it('should return 0 for empty array', () => {
        expect(calculateTotal([])).toBe(0);
    });

    it('should throw error for non-array input', () => {
        expect(() => calculateTotal('not an array')).toThrow(TypeError);
    });
});
```

### Running Unit Tests

```bash
# Run all unit tests
npm run test:unit

# Run with coverage
npm run test:unit -- --coverage

# Run specific file
npm run test:unit -- calculateTotal.test.js

# Watch mode
npm run test:unit -- --watch

# Run with sharding (faster in CI)
npm run test:unit -- --shard=1/4
```

---

## Layer 2: Integration Tests (20% of tests)

### Purpose

Test how multiple modules work together (API endpoints, database interactions, service integrations).

### Coverage Target

**85% minimum** for integration paths

### What to Test

✅ **DO test**:

- API endpoints (request → response)
- Database operations (CRUD)
- Service-to-service communication
- Authentication flows
- Data transformations across layers

### Example (API Integration Test)

```javascript
// tests/integration/api/users.test.js
import request from 'supertest';
import app from '../../../src/app';
import { setupTestDatabase, teardownTestDatabase } from '../../helpers/database';

describe('User API', () => {
    beforeAll(async () => {
        await setupTestDatabase();
    });

    afterAll(async () => {
        await teardownTestDatabase();
    });

    describe('POST /api/users', () => {
        it('should create a new user', async () => {
            const userData = {
                email: 'test@example.com',
                password: 'password123',
                name: 'Test User',
            };

            const response = await request(app).post('/api/users').send(userData).expect(201);

            expect(response.body).toMatchObject({
                email: userData.email,
                name: userData.name,
            });
            expect(response.body).toHaveProperty('id');
            expect(response.body).not.toHaveProperty('password');
        });

        it('should return 400 for invalid email', async () => {
            const response = await request(app)
                .post('/api/users')
                .send({ email: 'invalid-email', password: 'pass' })
                .expect(400);

            expect(response.body).toHaveProperty('error');
        });
    });

    describe('GET /api/users/:id', () => {
        it('should retrieve user by ID', async () => {
            // Create test user first
            const user = await createTestUser();

            const response = await request(app).get(`/api/users/${user.id}`).expect(200);

            expect(response.body.id).toBe(user.id);
        });
    });
});
```

### Running Integration Tests

```bash
# Run all integration tests
npm run test:integration

# Run with test database
DATABASE_URL=postgresql://test npm run test:integration

# Run specific suite
npm run test:integration -- users.test.js
```

---

## Layer 3: E2E Tests (5% of tests)

### Purpose

Test critical user paths through the entire application from UI to database.

### Framework

**Playwright** (supports Chromium, Firefox, WebKit)

### What to Test

✅ **DO test**:

- Critical user journeys
- Authentication flows
- Payment processes
- Data submission workflows
- Cross-browser compatibility

### Test Only Critical Paths

Focus on:

1. User registration & login
2. Core business transactions
3. Payment flows
4. Data export/import
5. Account management

### Example (Playwright)

```typescript
// tests/e2e/checkout.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Checkout Flow', () => {
    test('complete purchase from cart to confirmation', async ({ page }) => {
        // 1. Login
        await page.goto('/login');
        await page.fill('[name="email"]', 'user@example.com');
        await page.fill('[name="password"]', 'password123');
        await page.click('button[type="submit"]');
        await expect(page).toHaveURL(/.*dashboard/);

        // 2. Add item to cart
        await page.goto('/products');
        await page.click('[data-testid="product-123"]');
        await page.click('button:has-text("Add to Cart")');
        await expect(page.locator('.cart-badge')).toHaveText('1');

        // 3. Navigate to checkout
        await page.click('[data-testid="cart-icon"]');
        await page.click('button:has-text("Checkout")');
        await expect(page).toHaveURL(/.*checkout/);

        // 4. Fill shipping information
        await page.fill('[name="address"]', '123 Main St');
        await page.fill('[name="city"]', 'New York');
        await page.fill('[name="zipcode"]', '10001');
        await page.click('button:has-text("Continue")');

        // 5. Enter payment
        await page.fill('[name="cardNumber"]', '4242424242424242');
        await page.fill('[name="expiry"]', '12/25');
        await page.fill('[name="cvc"]', '123');
        await page.click('button:has-text("Place Order")');

        // 6. Verify order confirmation
        await expect(page).toHaveURL(/.*confirmation/);
        await expect(page.locator('h1')).toHaveText('Order Confirmed');
        await expect(page.locator('[data-testid="order-number"]')).toBeVisible();
    });
});
```

### Running E2E Tests

```bash
# Run all E2E tests
npx playwright test

# Run specific browser
npx playwright test --project=chromium

# Run specific test
npx playwright test checkout.spec.ts

# Run with UI mode (debugging)
npx playwright test --ui

# Run with headed browsers (see the browser)
npx playwright test --headed

# Run in parallel with sharding
npx playwright test --shard=1/2
```

---

## Coverage Requirements

### Thresholds

| Coverage Type  | Minimum | Target |
| -------------- | ------- | ------ |
| **Lines**      | 85%     | 90%+   |
| **Branches**   | 85%     | 88%+   |
| **Functions**  | 85%     | 90%+   |
| **Statements** | 85%     | 90%+   |

### Enforcement

Coverage is enforced at multiple points:

1. **Pre-push hook**: Blocks push if coverage < 85%
2. **CI/CD pipeline**: Fails build if coverage < 85%
3. **PR reviews**: Coverage report posted as comment

### Configuration (Jest)

```javascript
// jest.config.js
module.exports = {
    collectCoverageFrom: [
        'src/**/*.{js,jsx,ts,tsx}',
        '!src/**/*.d.ts',
        '!src/**/*.test.{js,jsx,ts,tsx}',
        '!src/**/__tests__/**',
    ],
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

### Checking Coverage

```bash
# Generate coverage report
npm run test:coverage

# View HTML report
open coverage/index.html

# Check coverage summary
cat coverage/coverage-summary.json | jq '.total'
```

---

## Test Organization

### Directory Structure

```
tests/
├── unit/                  # Unit tests (mirror src/ structure)
│   ├── components/
│   ├── services/
│   └── utils/
├── integration/           # Integration tests
│   ├── api/
│   ├── database/
│   └── services/
├── e2e/                   # End-to-end tests
│   ├── auth.spec.ts
│   ├── checkout.spec.ts
│   └── dashboard.spec.ts
├── fixtures/              # Test data
│   ├── users.json
│   └── products.json
└── helpers/               # Test utilities
    ├── database.js
    └── factories.js
```

### Naming Conventions

- **Unit tests**: `[filename].test.js` or `[filename].spec.js`
- **Integration tests**: `[feature].test.js`
- **E2E tests**: `[flow].spec.ts`

---

## Mock ing Strategy

### Unit Tests

Mock **all external dependencies**:

- API calls
- Database connections
- Third-party services
- File system operations

### Integration Tests

Mock **only external services**:

- Real database (test database)
- Real service layer
- Mock third-party APIs

### E2E Tests

Mock **nothing** (or minimal):

- Real database (test database)
- Real services
- Real UI
- Mock only unavoidable external services (payment gateways)

---

## Test Data Management

### Fixtures

```javascript
// tests/fixtures/users.json
{
  "testUser1": {
    "email": "user1@example.com",
    "password": "hashedPassword123",
    "name": "Test User 1"
  },
  "testUser2": {
    "email": "user2@example.com",
    "password": "hashedPassword456",
    "name": "Test User 2"
  }
}
```

### Factories

```javascript
// tests/helpers/factories.js
export function createTestUser(overrides = {}) {
    return {
        id: Math.random().toString(36).substr(2, 9),
        email: `test-${Date.now()}@example.com`,
        name: 'Test User',
        createdAt: new Date(),
        ...overrides,
    };
}

export function createTestProduct(overrides = {}) {
    return {
        id: Math.random().toString(36).substr(2, 9),
        name: 'Test Product',
        price: 99.99,
        stock: 100,
        ...overrides,
    };
}
```

### Database Seeding

```javascript
// tests/helpers/database.js
export async function setupTestDatabase() {
    await db.migrate.latest();
    await db.seed.run();
}

export async function teardownTestDatabase() {
    await db.migrate.rollback();
}

export async function cleanDatabase() {
    await db('users').del();
    await db('products').del();
    await db('orders').del();
}
```

---

## Performance Optimization

### Speed Targets

| Test Type              | Target Duration |
| ---------------------- | --------------- |
| Unit test suite        | < 2 minutes     |
| Integration test suite | < 5 minutes     |
| E2E test suite         | < 10 minutes    |
| Full test suite        | < 15 minutes    |

### Optimization Techniques

1. **Parallel Execution**

```bash
# Jest
npm run test -- --maxWorkers=4

# Playwright
npx playwright test --workers=4
```

2. **Test Sharding**

```bash
# Split tests across multiple runners
npm run test -- --shard=1/4
npm run test -- --shard=2/4
npm run test -- --shard=3/4
npm run test -- --shard=4/4
```

3. **Selective Testing**

```bash
# Run only changed tests
npm run test -- --onlyChanged

# Run only affected tests (monorepo)
npm run test -- --selectProjects=affected
```

4. **Smart Test Selection**

- Skip E2E on draft PRs
- Run only unit tests locally
- Full suite only in CI

---

## CI/CD Integration

### PR Workflow

```yaml
1. Lint & Type Check (30s)
2. Unit Tests parallel (1-2min)
3. Integration Tests (2-3min)
4. Build (1-2min)
5. E2E Tests parallel (3-5min) - only on non-draft PRs
6. Coverage Check (ensures 85%+)
```

### Coverage Reporting

Coverage reports are:

- Generated in CI
- Posted as PR comment
- Stored as artifact
- Tracked over time

---

## Best Practices

### Writing Tests

1. **AAA Pattern**: Arrange, Act, Assert

```javascript
test('should calculate total', () => {
    // Arrange
    const items = [{ price: 10 }, { price: 20 }];

    // Act
    const result = calculateTotal(items);

    // Assert
    expect(result).toBe(30);
});
```

2. **Descriptive Names**

```javascript
// Good ✅
test('should throw error when email is invalid');

// Bad ❌
test('email test');
```

3. **One Assertion Per Test** (when possible)
4. **Test Behavior, Not Implementation**
5. **Avoid Test Interdependence**

### Maintenance

- Review failing tests immediately
- Update tests when requirements change
- Remove obsolete tests
- Refactor common test setup into helpers
- Keep tests simple and readable

---

## Troubleshooting

### Coverage Below Threshold

```bash
# Identify uncovered lines
npm run test:coverage
open coverage/index.html  # Red = uncovered

# Add tests for uncovered code
```

### Flaky Tests

```bash
# Run test multiple times
npx playwright test --repeat-each=10 flaky.spec.ts

# Identify timing issues
# Fix: Add proper waits, not arbitrary timeouts
```

### Slow Tests

```bash
# Identify slow tests
npm run test -- --verbose

# Optimize:
# - Reduce test data
# - Mock expensive operations
# - Use test database

---

**Testing is non-negotiable. Coverage must stay ≥85%. All tests must pass before merge.**
```
