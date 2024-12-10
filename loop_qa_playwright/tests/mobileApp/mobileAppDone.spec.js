// @ts-check
const { test, expect } = require('@playwright/test');
const urlData = require('../../data/urlData.json');
const userData = require('../../data/userData.json');
const { login } = require('../../helpers/loginHelper');
const { MobileAppPage } = require('../../pageObjects/mobileAppPage');

test.beforeEach('Login and navigate to Mobile Application', async ({ page }) => {
  const mobileAppPage = new MobileAppPage(page);

  await page.goto(urlData.url.loginUrl);
  await login(page, userData.user.username, userData.user.password);
  await expect(page).toHaveURL(urlData.url.dashboardUrl);
  await mobileAppPage.clickMobileAppButton();
});

test('Test case 6: Should verify "App icon design" in the "Done" column', async ({ page }) => {
  const mobileAppPage = new MobileAppPage(page);

  await mobileAppPage.verifyDoneHeader(expect);
  await mobileAppPage.verifyAppIconDesignTask(expect);
  await mobileAppPage.verifyDesignTag(expect);
});
