const textData = require('../data/textData.json');

class WebAppPage {
  /**
   * @param {import('@playwright/test').Page} page 
   */
  constructor(page) {
    this.page = page;

    const { webApp } = textData;

    // Locators for Web Application section
    this.webAppButton = page.locator(`button:has(h2:has-text("${webApp.webAppButton}"))`);

    // Locators for "To Do" section
    this.toDoHeader = page.locator('h2.font-semibold').filter({ hasText: `${webApp.toDoHeader}` });
    this.implementUserAuth = page.locator(`h3.font-medium:has-text("${webApp.implementUserAuth}")`);
    this.fixNavigationBug = page.locator(`h3.font-medium:has-text("${webApp.fixNavigationBug}")`);
    this.featureTag = page.locator(`div.bg-white:has(h3:has-text("${webApp.implementUserAuth}")) span:has-text("${webApp.featureTag}")`);
    this.highPriorityTag = page.locator(`div.bg-white:has(h3:has-text("${webApp.implementUserAuth}")) span:has-text("${webApp.highPriorityTag}")`); 
    this.bugTag = page.locator(`div.bg-white:has(h3:has-text("${webApp.fixNavigationBug}")) >> div.flex.flex-wrap:has(span:has-text("${webApp.bugTag}"))`);

    // Locators for "In Progress" section
    this.inProgressHeader = page.locator('h2.font-semibold').filter({ hasText: `${webApp.inProgressHeader}` });
    this.designSystemUpdates = page.locator(`h3.font-medium:has-text("${webApp.designSystemUpdates}")`);
    this.designTag = page.locator(`div.bg-white:has(h3:has-text("${webApp.designTag}")) >> div.flex.flex-wrap:has(span:has-text("${webApp.designTag}"))`);

  }

  // Actions for "To Do"
  async verifyToDoHeader(expect) {
    const { webApp } = textData;
    await expect(this.toDoHeader).toBeVisible();
    await expect(this.toDoHeader).toContainText(webApp.toDoHeader);
  }

  async verifyImplementUserAuth(expect) {
    const { webApp } = textData;
    await expect(this.implementUserAuth).toBeVisible();
    await expect(this.implementUserAuth).toHaveText(webApp.implementUserAuth);
  }

  async verifyFixNavigationBug(expect) {
    const { webApp } = textData;
    await expect(this.fixNavigationBug).toBeVisible();
    await expect(this.fixNavigationBug).toHaveText(webApp.fixNavigationBug);
  }

  async verifyFeatureTag(expect) {
    const { webApp } = textData;
    await expect(this.featureTag).toBeVisible();
    await expect(this.featureTag).toHaveText(webApp.featureTag);
  }  

  async verifyHighPriorityTag(expect) {
    const { webApp } = textData;
    await expect(this.highPriorityTag).toBeVisible();
    await expect(this.highPriorityTag).toHaveText(webApp.highPriorityTag);
  }

  async verifyBugTag(expect) {
    const { webApp } = textData;
    await expect(this.bugTag).toBeVisible();
    await expect(this.bugTag).toHaveText(webApp.bugTag);
  }

  // Actions for "In Progress"
  async clickWebAppButton() {
    await this.webAppButton.click();
  }

  async verifyInProgressHeader(expect) {
    const { webApp } = textData;
    await expect(this.inProgressHeader).toBeVisible();
    await expect(this.inProgressHeader).toContainText(webApp.inProgressHeader);
  }

  async verifyDesignSystemUpdates(expect) {
    const { webApp } = textData;
    await expect(this.designSystemUpdates).toBeVisible();
    await expect(this.designSystemUpdates).toHaveText(webApp.designSystemUpdates);
  }

  async verifyDesignTag(expect) {
    const { webApp } = textData;
    await expect(this.designTag).toBeVisible();
    await expect(this.designTag).toHaveText(webApp.designTag);
  }
}

module.exports = { WebAppPage };
