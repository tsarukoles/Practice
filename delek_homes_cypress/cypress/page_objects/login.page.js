class LoginPage {

    get emailInput() {return cy.get('[name="email"]')};
    get passwordInput() {return cy.get('[name="password"]')};
    get loginTitle() {return cy.title()};
    get loginButton() {return cy.contains("Login")};

    login(email, password) {
        this.emailInput.type(email);
        this.passwordInput.type(password);
        this.loginButton.click();
        }
}

export default new LoginPage();