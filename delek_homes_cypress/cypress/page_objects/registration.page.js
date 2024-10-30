class RegistrationPage {

    get firstNameInput() {return cy.get('[name="firstName"]')};
    get lastNameInput() {return cy.get('[name="lastName"]')};
    get emailInput() {return cy.get('[name="email"]')};
    get passwordInput() {return cy.get('[name="password"]')};
    get registerButton() {return cy.get('[type="submit"]')};
    get validationMsg() {return cy.get('[role="alert"]')};
    get registrationUrl() {return cy.url()};
    get registerTitle() {return cy.title()};
    get errorMessage() {return cy.get("p.MuiFormHelperText-root.Mui-error")};

    registration(first, last, email, password) {
        this.firstNameInput.type(first);
        this.lastNameInput.type(last);
        this.emailInput.type(email);
        this.passwordInput.type(password);
        this.registerButton.click();
    }
}

export default new RegistrationPage();