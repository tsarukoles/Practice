class ListingPage {

  get darkModeListingCheck() {return cy.get('[type="checkbox"]')};
  get moreInfoButton() {return cy.contains('.MuiButtonBase-root.MuiButton-root.MuiButton-contained', 'More Info')};
  get listingAmountCheck() {return cy.get('div.MuiGrid-root.MuiGrid-container').find('a:contains("More Info")')};
  get searchListingName() {return cy.get('legend span').contains('Search').parents('fieldset').siblings('input')};
  get searchBedrooms() {return cy.get('.MuiGrid-root.MuiGrid-container').find('.MuiFormControl-root').contains('Bedrooms').parents('.MuiFormControl-root').find('[role="button"]')};
  get searchListingCity() {return cy.get('legend span').contains('City').parents('fieldset').siblings('input')};
  get realtorName() {return cy.get('div.MuiGrid-root.MuiGrid-item').find('div.MuiBox-root')};
  get listingPrice() {return cy.get('div.MuiGrid-root.MuiGrid-item').find('div.MuiBox-root')};
  get listingDate() {return cy.get('div.MuiTypography-root.MuiTypography-caption')};
  get listingTitle() {return cy.get('h5')};
  get listingAddress() {return cy.get('div.MuiGrid-root.MuiGrid-item').find('p')};
  get listingDetailsCheck() {return cy.get('div.MuiCardContent-root').find('div.MuiGrid-root.MuiGrid-item')}
  get listingBedroomSelector() {return 'div.MuiGrid-item:contains("Bedrooms:")';}
 
  selectBedroomsNumber(number) {
    return cy.get('ul[role="listbox"]').find(`li[role="option"][data-value="${number}"]`).click();
  };
  
  visitBasedOnPrice(searchByItName, priceRange = '') {
    const testTitle = Cypress.currentTest.title;
    // Check if the current test title includes the provided search name
    if (testTitle.includes(searchByItName) && priceRange) {
      cy.visit(`/featured-listings?price=${priceRange}`);
    } else {
      cy.visit('/featured-listings');
    }
  };
  // Function that verifies that all listings on the page have 2 bedrooms
  getBedrooms() {
    return cy.get('div.MuiGrid-item:contains("Bedrooms:")');
  };
  verifyBedroomsCount(minBedrooms) {

    this.getBedrooms()
      .invoke('text')
      .then((text) => {
        cy.log('Extracted Text:', text);
        const bedroomsMatch = text.match(/Bedrooms:\s*(\d+)/);
        
        if (!bedroomsMatch) {
          throw new Error(`Invalid bedroom count text: ${text}`);
        }

        const bedrooms = parseInt(bedroomsMatch[1], 10);
        cy.log('Extracted Bedroom Number:', bedrooms);
        expect(bedrooms).to.be.gte(minBedrooms);
      });
  }
}

export default new ListingPage;
