const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const userData = require('../fixtures/userData.json');
const textData = require('../fixtures/textData.json')

test.describe('Login', () => {

  test('should login successfully with admin user credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login(userData.adminBaseUser.username, userData.adminBaseUser.password);
    await page.waitForSelector(loginPage.dashTitle);
    const dashboardTitle = await page.textContent(loginPage.dashTitle);
    expect(dashboardTitle).toBe(textData.dashboard.dashboardTitle);
  });

  test('should show error for invalid login attempt', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login(userData.invalidUser.username, userData.invalidUser.password);
    const errorMessage = await page.textContent(loginPage.invalidCredSelector);
    expect(errorMessage).toBe(textData.errorMessages.invalidCred);
  });

});
