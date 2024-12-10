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

test('Test case 1: Should verify "Implement user authentication" in the "To Do" column', async ({ page }) => {
  const webAppPage = new WebAppPage(page);

  await webAppPage.clickWebAppButton();
  await webAppPage.verifyToDoHeader(expect);
  await webAppPage.verifyImplementUserAuth(expect);
  await webAppPage.verifyFeatureTag(expect);
  await webAppPage.verifyHighPriorityTag(expect);
});

test('Test case 2: Should verify "Fix navigation bug" in the "To Do" column', async ({ page }) => {
  const webAppPage = new WebAppPage(page);

  await webAppPage.verifyToDoHeader(expect);
  await webAppPage.verifyFixNavigationBug(expect);
  await webAppPage.verifyBugTag(expect);
});
