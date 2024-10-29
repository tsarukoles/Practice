class LoginPage {

    constructor(page) {
      this.page = page;
      this.usernameInput = '[name="username"]';
      this.passwordInput = '[name="password"]';
      this.loginButton = '[type="submit"]';
      this.dashTitle = '[class="oxd-text oxd-text--h6 oxd-topbar-header-breadcrumb-module"]';
      this.invalidCredSelector = '[class="oxd-text oxd-text--p oxd-alert-content-text"]';
    }
    
    async navigateToLoginPage() {

      await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    }

    async login(username, password) {

      await this.page.fill(this.usernameInput, username);
      await this.page.fill(this.passwordInput, password);
      await this.page.click(this.loginButton);
    }
  }
  
  module.exports = LoginPage;
  