// @ts-check
const { test, expect } = require('@playwright/test');
const urlData = require('../../data/urlData.json');
const userData = require('../../data/userData.json');
const { login } = require('../../helpers/loginHelper');
const { WebAppPage } = require('../../pageObjects/webAppPage');

test.beforeEach('Login and navigate to Web application', async ({ page }) => {
  await page.goto(urlData.url.loginUrl);
  await login(page, userData.user.username, userData.user.password);
  await expect(page).toHaveURL(urlData.url.dashboardUrl);
});

test('Test case 3: Should verify "Design system updates" in the "In Progress" column', async ({ page }) => {
  const webAppPage = new WebAppPage(page);

  await webAppPage.clickWebAppButton();
  await webAppPage.verifyInProgressHeader(expect);
  await webAppPage.verifyDesignSystemUpdates(expect);
  await webAppPage.verifyDesignTag(expect);
});
