const path = require('path');

class DashboardPage {
  
    constructor(page) {
      this.page = page;
      this.userDropdown = '[class="oxd-userdropdown"]';
      this.userDropdownLink = '[class="oxd-userdropdown-link"]';
      this.mainMenuItem = '[class="oxd-main-menu-item"]';
      this.recruitmentTopBar = '[class="oxd-topbar-body-nav-tab"]';
      this.recruitmentAddButton = 'button[class="oxd-button oxd-button--medium oxd-button--secondary"]';
      this.addFirstName = '[class="oxd-input oxd-input--active orangehrm-firstname"]';
      this.addMiddleName = '[class="oxd-input oxd-input--active orangehrm-middlename"]';
      this.addLastName = '[class="oxd-input oxd-input--active orangehrm-lastname"]';
      // this.addVacancy = '[class="oxd-select-text oxd-select-text--active"]';
      this.addEmail = page.locator('//label[text()="Email"]/ancestor::div[contains(@class, "oxd-input-group")]//input');
      this.addContactNumber = page.locator('//label[text()="Contact Number"]/ancestor::div[contains(@class, "oxd-input-group")]//input');
      this.fileButton = '.oxd-file-button';
      this.addKeywords = 'input[placeholder="Enter comma seperated words..."]';
      this.addDate = '[placeholder="yyyy-dd-mm"]';
      this.addNotes = '[class="oxd-textarea oxd-textarea--active oxd-textarea--resize-vertical"]';
      this.addCheckbox = '[class="oxd-icon bi-check oxd-checkbox-input-icon"]';
      this.addSaveButton = '[class="oxd-button oxd-button--medium oxd-button--secondary orangehrm-left-space"]';
    }

    async uploadFileUsingDialog(filePath) {
      const resolvedFilePath = path.resolve(__dirname, '../uploads', filePath);

      const [fileChooser] = await Promise.all([
        this.page.waitForEvent('filechooser'),
        this.page.click(this.fileButton),
      ]);
      await fileChooser.setFiles(resolvedFilePath);
    }

    async addCandidate(
      firstName,
      middleName,
      lastName,
      // vacancy,
      email,
      contactNumber,
      filePath,
      keywords,
      date,
      notes,
      checkbox,
      ) {
      await this.page.fill(this.addFirstName, firstName);
      await this.page.fill(this.addMiddleName, middleName);
      await this.page.fill(this.addLastName, lastName);
      // await this.page.fill(this.addVacancy, vacancy);
      await this.addEmail.fill(email);
      await this.addContactNumber.fill(contactNumber);;
      await this.uploadFileUsingDialog(filePath);
      await this.page.fill(this.addKeywords, keywords);
      await this.page.fill(this.addDate, date);
      await this.page.fill(this.addNotes, notes);

      if (checkbox) {
        await this.page.check(this.addCheckbox);
      }
      await this.page.click(this.addSaveButton);
    }
  }
  
  module.exports = DashboardPage;
  