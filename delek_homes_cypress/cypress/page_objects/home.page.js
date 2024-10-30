class HomePage {

    get homeUrl() {return cy.url()};
    get darkModeCheck() {return cy.get('[type="checkbox"]')};
    get searchName() {return cy.get('legend span').contains('Search').parents('fieldset').siblings('input')};
    get searchBedrooms() {return cy.get('.MuiGrid-root.MuiGrid-container').find('.MuiFormControl-root').contains('Bedrooms').parents('.MuiFormControl-root').find('[role="button"]')};
    get searchCity() {return cy.get('legend span').contains('City').parents('fieldset').siblings('input')};
    
    selectBedroomsNumber(number) {
        return cy.get('ul[role="listbox"]').find(`li[role="option"][data-value="${number}"]`).click();
      };

    visitBasedOnPrice(searchByItName, priceRange = '') {
      const testTitle = Cypress.currentTest.title;
      // Check if the current test title includes the provided search name
      if (testTitle.includes(searchByItName) && priceRange) {
        cy.visit(`/featured-listings?price=${priceRange}`);
      } else {
        cy.visit('/');
      }
  };
};

export default new HomePage();