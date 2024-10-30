const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const DashboardPage = require('../pages/DashboardPage');
const userData = require('../fixtures/userData.json');
const urlData = require('../fixtures/urlData.json');

test.describe('Logout', () => {

  test('should logout successfully with admin user credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashPage = new DashboardPage(page);

    await loginPage.navigateToLoginPage();
    await loginPage.login(userData.adminBaseUser.username, userData.adminBaseUser.password);
    await page.waitForSelector(dashPage.userDropdown);
    await page.click(dashPage.userDropdown);
    const logoutLink = page.locator(`${dashPage.userDropdownLink} >> text=Logout`);
    await logoutLink.click();
    await page.waitForURL(urlData.loginUrl);
  });

});
