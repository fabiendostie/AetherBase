import { test, expect } from '@playwright/test';

/**
 * Example E2E test suite
 * This demonstrates basic Playwright testing patterns
 */

test.describe('Homepage', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to the homepage before each test
        await page.goto('/');
    });

    test('should display the page title', async ({ page }) => {
        // Verify page title
        await expect(page).toHaveTitle(/My Application/);
    });

    test('should have a heading', async ({ page }) => {
        // Find and verify the main heading
        const heading = page.getByRole('heading', { level: 1 });
        await expect(heading).toBeVisible();
    });

    test('should navigate to about page', async ({ page }) => {
        // Click the about link
        await page.getByRole('link', { name: 'About' }).click();

        // Verify navigation occurred
        await expect(page).toHaveURL(/.*about/);

        // Verify about page content
        await expect(page.getByRole('heading', { name: 'About' })).toBeVisible();
    });
});

test.describe('User Authentication', () => {
    test('should login with valid credentials', async ({ page }) => {
        await page.goto('/login');

        // Fill in login form
        await page.getByLabel('Email').fill('user@example.com');
        await page.getByLabel('Password').fill('password123');

        // Submit form
        await page.getByRole('button', { name: 'Login' }).click();

        // Verify successful login
        await expect(page).toHaveURL(/.*dashboard/);
        await expect(page.getByText('Welcome back')).toBeVisible();
    });

    test('should show error with invalid credentials', async ({ page }) => {
        await page.goto('/login');

        // Fill in with invalid credentials
        await page.getByLabel('Email').fill('invalid@example.com');
        await page.getByLabel('Password').fill('wrongpassword');

        // Submit form
        await page.getByRole('button', { name: 'Login' }).click();

        // Verify error message
        await expect(page.getByText('Invalid credentials')).toBeVisible();
    });
});

test.describe('Form Interactions', () => {
    test('should validate required fields', async ({ page }) => {
        await page.goto('/contact');

        // Try to submit empty form
        await page.getByRole('button', { name: 'Submit' }).click();

        // Verify validation messages appear
        await expect(page.getByText('Name is required')).toBeVisible();
        await expect(page.getByText('Email is required')).toBeVisible();
    });

    test('should submit form successfully', async ({ page }) => {
        await page.goto('/contact');

        // Fill in the form
        await page.getByLabel('Name').fill('John Doe');
        await page.getByLabel('Email').fill('john@example.com');
        await page.getByLabel('Message').fill('This is a test message');

        // Submit form
        await page.getByRole('button', { name: 'Submit' }).click();

        // Verify success message
        await expect(page.getByText('Thank you for your message')).toBeVisible();
    });
});

test.describe('Visual Regression', () => {
    test('should match homepage screenshot', async ({ page }) => {
        await page.goto('/');

        // Take screenshot and compare
        await expect(page).toHaveScreenshot('homepage.png', {
            fullPage: true,
            animations: 'disabled',
        });
    });
});

test.describe('Performance', () => {
    test('should load page within acceptable time', async ({ page }) => {
        const startTime = Date.now();

        await page.goto('/');
        await page.waitForLoadState('networkidle');

        const loadTime = Date.now() - startTime;

        // Verify page loads within 3 seconds
        expect(loadTime).toBeLessThan(3000);
    });
});

test.describe('Accessibility', () => {
    test('should have no accessibility violations', async ({ page }) => {
        await page.goto('/');

        // You can integrate axe-core or similar tools here
        // Example: const accessibilityScanResults = await runAxe(page);
        // expect(accessibilityScanResults.violations).toEqual([]);
    });
});
