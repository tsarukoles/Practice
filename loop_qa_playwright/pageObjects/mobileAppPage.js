const textData = require('../data/textData.json');

class MobileAppPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    const { mobileApp } = textData;

    // Locators for Mobile Application section
    this.mobileAppButton = page.locator(`button:has(h2:has-text("${mobileApp.mobileAppButton}"))`);

    // Locators for "To Do"
    this.toDoHeader = page.locator(`h2.font-semibold:has-text("${mobileApp.toDoHeader}")`);
    this.pushNotificationTask = page.locator(`h3.font-medium:has-text("${mobileApp.pushNotificationTask}")`);
    this.featureTag = page.locator(`div.bg-white:has(h3:has-text("${mobileApp.pushNotificationTask}")) span:has-text("${mobileApp.featureTag}")`);

    // Locators for "In Progress"
    this.inProgressHeader = page.locator(`h2.font-semibold:has-text("${mobileApp.inProgressHeader}")`);
    this.offlineModeTask = page.locator(`h3.font-medium:has-text("${mobileApp.offlineModeTask}")`);
    this.inProgressFeatureTag = page.locator(`div.bg-white:has(h3:has-text("${mobileApp.offlineModeTask}")) span:has-text("${mobileApp.featureTag}")`);
    this.highPriorityTag = page.locator(`div.bg-white:has(h3:has-text("${mobileApp.offlineModeTask}")) span:has-text("${mobileApp.highPriorityTag}")`);

    // New Locators for "Done"
    this.doneHeader = page.locator(`h2.font-semibold:has-text("${mobileApp.doneHeader}")`);
    this.appIconDesignTask = page.locator(`h3.font-medium:has-text("${mobileApp.appIconDesignTask}")`);
    this.designTag = page.locator(`div.bg-white:has(h3:has-text("${mobileApp.appIconDesignTask}")) span:has-text("${mobileApp.designTag}")`);
  }

  // Actions for "Mobile Application"
  async clickMobileAppButton() {
    await this.mobileAppButton.click();
  }

  // Actions for "To Do"
  async verifyToDoHeader(expect) {
    const { mobileApp } = textData;
    await expect(this.toDoHeader).toBeVisible();
    await expect(this.toDoHeader).toContainText(mobileApp.toDoHeader);
  }

  async verifyPushNotificationTask(expect) {
    const { mobileApp } = textData;
    await expect(this.pushNotificationTask).toBeVisible();
    await expect(this.pushNotificationTask).toHaveText(mobileApp.pushNotificationTask);
  }

  async verifyFeatureTag(expect) {
    const { mobileApp } = textData;
    await expect(this.featureTag).toBeVisible();
    await expect(this.featureTag).toHaveText(mobileApp.featureTag);
  }

  // Actions for "In Progress"
  async verifyInProgressHeader(expect) {
    const { mobileApp } = textData;
    await expect(this.inProgressHeader).toBeVisible();
    await expect(this.inProgressHeader).toContainText(mobileApp.inProgressHeader);
  }

  async verifyOfflineModeTask(expect) {
    const { mobileApp } = textData;
    await expect(this.offlineModeTask).toBeVisible();
    await expect(this.offlineModeTask).toHaveText(mobileApp.offlineModeTask);
  }

  async verifyInProgressFeatureTag(expect) {
    const { mobileApp } = textData;
    await expect(this.inProgressFeatureTag).toBeVisible();
    await expect(this.inProgressFeatureTag).toHaveText(mobileApp.featureTag);
  }

  async verifyHighPriorityTag(expect) {
    const { mobileApp } = textData;
    await expect(this.highPriorityTag).toBeVisible();
    await expect(this.highPriorityTag).toHaveText(mobileApp.highPriorityTag);
  }

  // New Actions for "Done"
  async verifyDoneHeader(expect) {
    const { mobileApp } = textData;
    await expect(this.doneHeader).toBeVisible();
    await expect(this.doneHeader).toContainText(mobileApp.doneHeader);
  }

  async verifyAppIconDesignTask(expect) {
    const { mobileApp } = textData;
    await expect(this.appIconDesignTask).toBeVisible();
    await expect(this.appIconDesignTask).toHaveText(mobileApp.appIconDesignTask);
  }

  async verifyDesignTag(expect) {
    const { mobileApp } = textData;
    await expect(this.designTag).toBeVisible();
    await expect(this.designTag).toHaveText(mobileApp.designTag);
  }
}

module.exports = { MobileAppPage };
