class DashboardPage {

    get roleLabel() {return cy.get('[href="/dashboard/user/account"] p')};
    get userName() {return cy.get("h6")};
    get profileButton() {return cy.get('button [data-testid="PersonIcon"]')};
    get dashboardUrl() {return cy.url()};
    get dashboardTitle() {return cy.title()};
    get managementSubheader() {return cy.get('.MuiButtonBase-root[role="button"]')};
    get userSubheader() {return cy.get('.MuiButtonBase-root[role="button"]')};
    get estateSubheader() {return cy.get('.MuiButtonBase-root[role="button"]')};
    get searchInput() {return cy.get('input[placeholder="Search user..."]')};
    get tableWithEmail() {return cy.get('td')};
    get tableWithEstateTitle() {return cy.get('td')};
    get listMenuItem() {return cy.get('li[role="menuitem"]')};
    get nextPageButtonSelector() {return cy.get('button[title="Go to next page"]');};
    get deleteEstateConfirmation() {return cy.get('button.MuiButton-root')};
}

export default new DashboardPage();