import { faker } from "@faker-js/faker";
import registrationPage from "../../page_objects/registration.page";
import dashboardPage from "../../page_objects/dashboard.page";
import credentials from "../../fixtures/user.credentials.json";
import verificationText from "../../fixtures/verification.text.json";
import url from '../../fixtures/urls.json';

const userData = {

  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  avatarUrl: "string",
  userRole: "user"

};
let user

describe("Registration", () => {
  before(() => {
    cy.fixture("user.credentials.json").then((data) => {
      user = data
    })
  });
  beforeEach(() => {
    cy.visit(url.registrationURL);
  });

  it("Should NOT register with an already existing email account", () => {
    registrationPage.registration(
      credentials.admin.firstName,
      credentials.admin.lastName,
      credentials.admin.email,
      userData.password
    );
    registrationPage.validationMsg.should("contain", verificationText.validationMessage);
  });

  it("Should NOT register without filling in required fields", () => {
    registrationPage.registerButton.click();
    registrationPage.errorMessage.should("contain", verificationText.firstNameError);
    registrationPage.errorMessage.should("contain", verificationText.lastNameError);
    registrationPage.errorMessage.should("contain", verificationText.emailError);
    registrationPage.errorMessage.should("contain", verificationText.passwordError);
  });

  it("Should register a new user account", () => {
    cy.apiRegisterUser(userData);
    cy.apiLogin(userData.email, userData.password);
    cy.visit(url.profileUrl);
    dashboardPage.roleLabel.should("contain", credentials.newUser.role);
    dashboardPage.userName.should("contain", userData.firstName);
    dashboardPage.userName.should("contain", userData.lastName);
    dashboardPage.dashboardUrl.should("include", url.profileUrl);
    dashboardPage.profileButton.click();
    cy.contains("Logout").click();
    cy.apiLogin(userData.email, userData.password);
    cy.visit(url.profileUrl);
    dashboardPage.roleLabel.should("contain", credentials.newUser.role);
    dashboardPage.userName.should("contain", userData.firstName);
    dashboardPage.userName.should("contain", userData.lastName);
  });
});
