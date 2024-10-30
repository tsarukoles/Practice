import homePage from "../../page_objects/home.page";
import featuredListingsPage from "../../page_objects/featured.listings.page";
import createdListingPage from "../../page_objects/created.listing.page";
import verificationText from "../../fixtures/verification.text.json";
import credentials from "../../fixtures/user.credentials.json";

let listingId;

describe("Search listings - Homepage", () => {
  before(() => {
    cy.apiLogin(credentials.realtor.email, credentials.realtor.password);
    cy.createListing("images/listing-picture.jpg", verificationText).then(
      (responseBody) => {
        listingId = responseBody.id;
        cy.log(`Listing created with ID: ${listingId}`);
      }
    );
  });
  beforeEach(() => {
    cy.errorHandler();
    const searchByItName = 'Should search by price';
    const priceRange = '1234321-1234321';
    homePage.visitBasedOnPrice(searchByItName, priceRange);
    homePage.darkModeCheck.check();
    
  });
  after("Delete", () => {
    if (listingId) {
      cy.deleteListing(listingId).then((deleteResponse) => {
        console.log(deleteResponse);
      });
    }
  });

  it("Should search by keyword", () => {
    homePage.searchName.type(verificationText.keyword);
    cy.contains('Start Search').click();
    featuredListingsPage.listingTitle.should('contain', verificationText.title);
  });

  it("Should search by bedrooms", () => {
    homePage.searchBedrooms.click(); 
    homePage.selectBedroomsNumber(2);
    cy.contains('Start Search').click();
    featuredListingsPage.verifyBedroomsCount(2);
    featuredListingsPage.moreInfoButton.first().click();
    createdListingPage.verifyBedroomsCount(2);
  });

  it("Should search by city", () => {
    homePage.searchCity.type(verificationText.city);
    cy.contains('Start Search').click();
    featuredListingsPage.listingAmountCheck.should('have.length', 1);
  // Verifies listing details on featured listing page
    featuredListingsPage.realtorName.contains(credentials.realtor.firstName).parent().contains(credentials.realtor.lastName);
    featuredListingsPage.listingPrice.should('contain', verificationText.priceValidation);
    featuredListingsPage.listingTitle.should('contain', verificationText.title);
    featuredListingsPage.listingAddress.should('contain', verificationText.address);
    featuredListingsPage.listingDetailsCheck.should('contain', verificationText.sqFeet);
    featuredListingsPage.listingDetailsCheck.should('contain', verificationText.garage);
    featuredListingsPage.listingDetailsCheck.should('contain', verificationText.bedrooms);
    featuredListingsPage.listingDetailsCheck.should('contain', verificationText.bathrooms);
    featuredListingsPage.listingDetailsCheck.should('contain', verificationText.city);
    featuredListingsPage.listingDetailsCheck.should('contain', verificationText.state);
    featuredListingsPage.listingDetailsCheck.should('contain', verificationText.zipCode);
    featuredListingsPage.moreInfoButton.first().click();
  // Verifies listing details on created listing page
    createdListingPage.createdListingTitle.should('contain', verificationText.title);
    createdListingPage.createdListingAddress.should('contain', verificationText.address);
    createdListingPage.listingDetailsCheck.should('contain', verificationText.priceValidation);
    createdListingPage.listingDetailsCheck.should('contain', verificationText.sqFeet);
    createdListingPage.listingDetailsCheck.should('contain', verificationText.lotSize);
    createdListingPage.listingDetailsCheck.should('contain', verificationText.garage);
    createdListingPage.listingDetailsCheck.should('contain', verificationText.bedrooms);
    createdListingPage.listingDetailsCheck.should('contain', verificationText.bathrooms);
    createdListingPage.listingDetailsCheck.should('contain', verificationText.realtor);
    createdListingPage.listingDetailsCheck.should('contain', verificationText.description);
  });

  it("Should search by price", () => {
  // Verifies listing details on created listing page
    featuredListingsPage.listingPrice.should('contain', verificationText.priceValidation);
    featuredListingsPage.listingTitle.should('contain', verificationText.title);
    featuredListingsPage.listingAddress.should('contain', verificationText.address);
    featuredListingsPage.listingDetailsCheck.should('contain', verificationText.sqFeet);
    featuredListingsPage.listingDetailsCheck.should('contain', verificationText.garage);
    featuredListingsPage.listingDetailsCheck.should('contain', verificationText.bedrooms);
    featuredListingsPage.listingDetailsCheck.should('contain', verificationText.bathrooms);
    featuredListingsPage.listingDetailsCheck.should('contain', verificationText.city);
    featuredListingsPage.listingDetailsCheck.should('contain', verificationText.state);
    featuredListingsPage.listingDetailsCheck.should('contain', verificationText.zipCode);
  });
});
