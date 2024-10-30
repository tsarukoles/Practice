import { faker } from "@faker-js/faker";
import dashboardPage from "../../page_objects/dashboard.page";
import credentials from "../../fixtures/user.credentials.json";
import url from '../../fixtures/urls.json'

const userData = {

  firstName: faker.person.firstName(),
  lastName: faker.person.lastName() + 'abcd',
  email: faker.internet.email(),
  password: faker.internet.password(),
  avatarUrl: "string",
  userRole: "user"

};

let user

describe("Deletion of the new user by the Admin", () => {
  before(() => {
    cy.fixture("user.credentials.json").then((data) => {
      user = data
    })
  });
  beforeEach(() => {
    cy.apiRegisterUser(userData);
    cy.apiLogin(userData.email, userData.password);
  });

    it("Should delete that user from Admin account and verify user deletion", () => {
    cy.visit(url.profileUrl);
    dashboardPage.roleLabel.should("contain", credentials.newUser.role);
    dashboardPage.userName.should("contain", userData.firstName);
    dashboardPage.userName.should("contain", userData.lastName);
    dashboardPage.profileButton.click();
    cy.contains("Logout").click();
    cy.apiLogin(credentials.admin.email, credentials.admin.password);
    cy.visit(url.profileUrl);
    dashboardPage.roleLabel.should("have.text", credentials.admin.role);
    dashboardPage.userName.should("have.text", credentials.admin.fullName);
    dashboardPage.dashboardTitle.should("eq", "User: Profile | Delek Homes");
    dashboardPage.dashboardUrl.should("include", url.profileUrl);
    dashboardPage.userSubheader.contains('list').click();
    dashboardPage.searchInput.type(userData.lastName).click();
    dashboardPage.tableWithEmail.contains(userData.email).siblings('td').find('button').click();
    dashboardPage.listMenuItem.contains('Delete').click();
    dashboardPage.tableWithEmail.contains(userData.email).should('not.exist');
  });
});
