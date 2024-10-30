const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const DashboardPage = require('../pages/DashboardPage');
const userData = require('../fixtures/userData.json');
const urlData = require('../fixtures/urlData.json');

test.describe('Create candidate', () => {

  test('should successfully create candidate', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashPage = new DashboardPage(page);

    await loginPage.navigateToLoginPage();
    await loginPage.login(userData.adminBaseUser.username, userData.adminBaseUser.password);
    const recruitmentItem = page.locator(`${dashPage.mainMenuItem} >> text=Recruitment`);
    await recruitmentItem.click();
    await page.waitForSelector(dashPage.recruitmentAddButton);
    await page.click(dashPage.recruitmentAddButton);
    await page.waitForURL(urlData.candidateUrl);
    
    await dashPage.addCandidate(
        userData.adminUser.firstName,
        userData.adminUser.middleName,
        userData.adminUser.lastName,
        // userData.adminUser.vacancy,
        userData.adminUser.email,
        userData.adminUser.contactNumber,
        userData.adminUser.filePath,
        userData.adminUser.keywords,
        userData.adminUser.date,
        userData.adminUser.notes,
        userData.adminUser.checkbox
      );
  });

});
