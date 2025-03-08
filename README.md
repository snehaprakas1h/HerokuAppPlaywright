# Playwright Test Automation Framework

This repository contains an **ES6-based Playwright framework** for automating tests on [The Internet](https://the-internet.herokuapp.com/).

## **📌 Project Structure**
```
/ 📂 the-internet-playwright-framework
│── tests/                  # Test scripts
│   ├── login.test.js        # Login test
│   ├── abtest.test.js       # A/B Test
│   ├── ...                  # More tests
│
│── pages/                  # Page Object Model (POM) files
│   ├── login.page.js        # Login page object
│   ├── abtest.page.js       # A/B Test page object
│   ├── ...                  # More POMs
│
│── reports/                # Test reports
│
│── playwright.config.js    # Playwright configuration
│── package.json           # Dependencies & scripts
│── README.md              # Documentation
```

## **🚀 Setup & Installation**
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/snehaprakas1h/HerokuAppPlaywright.git
cd the-internet-playwright-framework
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Run Tests**
```sh
npx playwright test
```

### **4️⃣ Generate and View Reports**
```sh
npx playwright test --reporter=html
npx playwright show-report
```

## **🔧 Playwright Configuration** (`playwright.config.js`)
```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
    use: {
        baseURL: 'https://the-internet.herokuapp.com',
        headless: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure'
    },
    reporter: [['html', { outputFolder: 'reports' }]],
});
```

## **📄 Writing Tests (Example)**
### **tests/abtest.test.js**
```js
import { test, expect } from '@playwright/test';
import ABTestPage from '../pages/abtest.page.js';

test.describe('A/B Test Page', () => {
    let abTestPage;

    test.beforeEach(async ({ page }) => {
        abTestPage = new ABTestPage(page);
        await abTestPage.goto();
    });

    test('Should display an A/B test heading', async () => {
        const headingText = await abTestPage.getHeadingText();
        expect(headingText).toMatch(/A\/B Test/);
    });
});
```

## **📚 Additional Commands**
| Command | Description |
|---------|-------------|
| `npx playwright test` | Run all tests |
| `npx playwright test --headed` | Run tests in UI mode |
| `npx playwright codegen <URL>` | Generate Playwright script |
| `npx playwright show-report` | Open HTML test report |

## **✅ Best Practices**
- Use **Page Object Model (POM)** for maintainability.
- Store **test data** separately for easy modifications.
- Implement **CI/CD integration** with GitHub Actions or Jenkins.

## **📌 Next Steps**
- [ ] Add support for multiple environments (staging, production).
- [ ] Integrate with **Allure Reports** for better reporting.
- [ ] Implement **API testing** with Playwright.

---
🚀 **Happy Testing!**

