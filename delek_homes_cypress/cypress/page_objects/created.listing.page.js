class CreatedListingPage {

    get listingDetailsCheck() {return cy.get('div.MuiGrid-root.MuiGrid-item')};
    get createdListingTitle() {return cy.get('div.MuiGrid-root.MuiGrid-container').find('h3')};
    get createdListingAddress() {return cy.get('div.MuiGrid-root.MuiGrid-container').find('p')};
    get createdBedroomSelector() {return 'div.MuiGrid-root.MuiGrid-item:contains("Bedrooms:")'};
    get newTitleInput() {return cy.get('[name="title"]')};
    get newDescriptionInput() {return cy.get('[name="description"]')};
    get newCityInput() {return cy.get('[name="city"]')};
    get newAddressInput() {return cy.get('[name="address"]')};
    get newZipCodeInput() {return cy.get('[name="zipCode"]')};
    get newStateButton() {return cy.contains('label', 'State').parent().find('div[role="button"]')};
    get newStateInput() {return cy.get('ul[role="listbox"]').find(`li[role="option"][data-value="OR"]`)};
    get newPriceInput() {return cy.get('[name="price"]')};
    get newBedroomInput() {return cy.get('[name="bedrooms"]')};
    get newBathroomInput() {return cy.get('[name="bathrooms"]')};
    get newGarageInput() {return cy.get('[name="garage"]')};
    get newSqFtInput() {return cy.get('[name="sqft"]')};
    get newLotSizeInput() {return cy.get('[name="lotSize"]')};
    get newPublishedSwitch() {return cy.get('[name="isPublished"]')};
    get newPostButtonClick() {return cy.get('button[type="submit"]').contains('Post')};
    get newAttachPicture() {return cy.get('input[type="file"]')};
    
    // Function that verifies that all listings on the page have 2 bedrooms
    getBedrooms() {
        return cy.get('div.MuiGrid-root.MuiGrid-item:contains("Bedrooms:")');
      }
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
      };
    
    // Function that creates and posts new listing
    createNewRealEstate(

        title,
        description,
        city,
        address,
        zipCode,
        price,
        bedrooms,
        bathrooms,
        garage,
        sqft,
        lotSize) {

        this.newTitleInput.type(title);
        this.newDescriptionInput.type(description);
        this.newCityInput.type(city);
        this.newAddressInput.type(address);
        this.newZipCodeInput.type(zipCode);
        this.newStateButton.click();
        this.newStateInput.click();
        this.newPriceInput.type(price);
        this.newBedroomInput.type(bedrooms);
        this.newBathroomInput.type(bathrooms);
        this.newGarageInput.type(garage);
        this.newSqFtInput.type(sqft);
        this.newLotSizeInput.type(lotSize);
        this.newPublishedSwitch.check()
        this.newPostButtonClick.click();
    }

}

export default new CreatedListingPage;
