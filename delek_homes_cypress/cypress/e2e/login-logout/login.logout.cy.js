import dashboardPage from "../../page_objects/dashboard.page";
import credentials from '../../fixtures/user.credentials.json';
import loginPage from "../../page_objects/login.page";

describe("Login", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Should LOG IN with existing account as a user", () => {
    cy.contains("Login").click();
    loginPage.login(credentials.realtor.email, credentials.realtor.password);
    dashboardPage.roleLabel.should("contain", credentials.realtor.role);
    dashboardPage.userName.should("contain", credentials.realtor.fullName);
  });

  it("Should LOG OUT with existing account as a user", () => {
    cy.contains("Login").click();
    loginPage.login(credentials.realtor.email, credentials.realtor.password);
    dashboardPage.roleLabel.should("contain", credentials.realtor.role);
    dashboardPage.userName.should("contain", credentials.realtor.fullName);
    dashboardPage.profileButtonWithIcon.click();
    cy.contains("Logout").click();
  });
});
