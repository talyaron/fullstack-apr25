# Testing & Quality Assurance Summary

A comprehensive guide to testing and code quality in full-stack TypeScript applications.

---

## 1. Unit Testing with Jest

### What is Unit Testing?
Unit tests verify that individual pieces of code (functions, modules) work correctly in isolation.

### Setup

```bash
npm install --save-dev jest @types/jest ts-jest
```

### Configuration (`jest.config.js`)

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
};
```

### Writing Tests

```typescript
// math.ts
export function add(a: number, b: number): number {
  return a + b;
}

// math.test.ts
import { add } from './math';

describe('add function', () => {
  it('should add two positive numbers', () => {
    expect(add(2, 3)).toBe(5);
  });

  it('should handle negative numbers', () => {
    expect(add(-1, 1)).toBe(0);
  });
});
```

### Common Matchers

| Matcher | Description |
|---------|-------------|
| `toBe(value)` | Exact equality (===) |
| `toEqual(value)` | Deep equality for objects/arrays |
| `toBeTruthy()` | Checks if value is truthy |
| `toBeFalsy()` | Checks if value is falsy |
| `toContain(item)` | Array/string contains item |
| `toThrow()` | Function throws an error |
| `toHaveLength(n)` | Array/string has length n |

### Running Tests

```bash
npx jest              # Run all tests
npx jest --watch      # Watch mode
npx jest --coverage   # With coverage report
```

---

## 2. Server-Side Testing

### Testing Express APIs

```typescript
import request from 'supertest';
import app from './app';

describe('GET /api/users', () => {
  it('should return list of users', async () => {
    const response = await request(app)
      .get('/api/users')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
  });
});
```

### Mocking Dependencies

```typescript
// Mock a database module
jest.mock('./database', () => ({
  getUsers: jest.fn().mockResolvedValue([{ id: 1, name: 'Test' }]),
}));
```

---

## 3. Client-Side Testing (React Components)

### Setup with React Testing Library

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

### Testing Components

```typescript
// Button.tsx
interface ButtonProps {
  label: string;
  onClick: () => void;
}

export function Button({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}

// Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button component', () => {
  it('renders with correct label', () => {
    render(<Button label="Click me" onClick={() => {}} />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button label="Click me" onClick={handleClick} />);

    fireEvent.click(screen.getByText('Click me'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Common Queries

| Query | Returns | Throws if not found |
|-------|---------|---------------------|
| `getByText` | Element | Yes |
| `queryByText` | Element or null | No |
| `findByText` | Promise<Element> | Yes (async) |
| `getByRole` | Element by ARIA role | Yes |
| `getByTestId` | Element by data-testid | Yes |

---

## 4. End-to-End Testing with Playwright

### What is E2E Testing?
E2E tests simulate real user interactions with your application in a browser.

### Setup

```bash
npm init playwright@latest
```

### Configuration (`playwright.config.ts`)

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:3000',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'npm run dev',
    port: 3000,
  },
});
```

### Writing E2E Tests

```typescript
import { test, expect } from '@playwright/test';

test.describe('Login Flow', () => {
  test('user can log in successfully', async ({ page }) => {
    await page.goto('/login');

    await page.fill('input[name="email"]', 'user@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('h1')).toContainText('Welcome');
  });
});
```

### Common Playwright Actions

```typescript
await page.goto('/path');           // Navigate
await page.click('selector');       // Click element
await page.fill('selector', 'text'); // Fill input
await page.selectOption('select', 'value'); // Select dropdown
await page.waitForSelector('selector'); // Wait for element
```

### Running Playwright Tests

```bash
npx playwright test              # Run all tests
npx playwright test --ui         # Interactive UI mode
npx playwright test --headed     # See the browser
npx playwright show-report       # View HTML report
```

---

## 5. Linting with ESLint

### What is Linting?
Linting analyzes code for potential errors, style issues, and best practices.

### Setup

```bash
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

### Configuration (`.eslintrc.json`)

```json
{
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {
    "no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "error"
  }
}
```

### Running ESLint

```bash
npx eslint .                    # Check all files
npx eslint . --fix              # Auto-fix issues
npx eslint src/**/*.ts          # Check specific files
```

---

## 6. Type Checking with TypeScript

### Why Type Check?
Catches type errors at compile time before they become runtime bugs.

### Configuration (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

### Running Type Check

```bash
npx tsc --noEmit    # Check types without generating output
```

---

## 7. CI/CD Pipeline

### What is a Pipeline?
Automated workflows that run tests and checks on every code push.

### GitHub Actions Example (`.github/workflows/ci.yml`)

```yaml
name: CI Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Type Check
        run: npm run typecheck

      - name: Lint
        run: npm run lint

      - name: Unit Tests
        run: npm run test

      - name: Install Playwright Browsers
        run: npx playwright install --with-deps

      - name: E2E Tests
        run: npm run test:e2e
```

### Package.json Scripts

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "playwright test",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "typecheck": "tsc --noEmit"
  }
}
```

---

## Testing Pyramid

```
        /\
       /  \      E2E Tests (few, slow, expensive)
      /----\
     /      \    Integration Tests (some)
    /--------\
   /          \  Unit Tests (many, fast, cheap)
  --------------
```

| Level | Speed | Cost | Coverage |
|-------|-------|------|----------|
| Unit | Fast | Low | Single function/component |
| Integration | Medium | Medium | Multiple modules together |
| E2E | Slow | High | Full user flows |

---

## Best Practices

1. **Write tests first (TDD)** - Helps design better APIs
2. **Test behavior, not implementation** - Tests shouldn't break on refactoring
3. **Keep tests independent** - Each test should run in isolation
4. **Use meaningful test names** - Describe what the test verifies
5. **Don't test external libraries** - Trust that they work
6. **Maintain test coverage** - Aim for 80%+ on critical paths
7. **Run tests in CI** - Catch issues before merging

---

## Quick Reference Commands

```bash
# Jest
npm run test
npm run test -- --watch
npm run test -- --coverage

# Playwright
npx playwright test
npx playwright test --ui
npx playwright show-report

# Linting
npm run lint
npm run lint -- --fix

# Type Check
npm run typecheck
```

---

Good luck with your projects! Testing is a skill that improves with practice.
