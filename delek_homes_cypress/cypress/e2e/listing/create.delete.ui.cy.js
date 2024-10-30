import homePage from '../../page_objects/home.page';
import dashboardPage from '../../page_objects/dashboard.page';
import createdListingPage from '../../page_objects/created.listing.page';
import featuredListingsPage from '../../page_objects/featured.listings.page';
import credentials from '../../fixtures/user.credentials.json';
import verificationText from '../../fixtures/verification.text.json';
import url from '../../fixtures/urls.json'

describe("Listings", () => { 
    beforeEach(() => {
        cy.apiLogin(credentials.realtor.email, credentials.realtor.password);
    });

    it("Create a new estate object, UI", () => {
        cy.visit(url.createNewListingUrl);
        createdListingPage.newAttachPicture.attachFile('images/listing-picture.jpg');
        createdListingPage.createNewRealEstate(
            verificationText.title,
            verificationText.description,
            verificationText.city,
            verificationText.address,
            verificationText.zipCode,
            verificationText.price,
            verificationText.bedrooms,
            verificationText.bathrooms,
            verificationText.garage,
            verificationText.sqFeet,
            verificationText.lotSize
            );
        cy.visit('/');
        homePage.searchName.type(verificationText.keyword);
        cy.contains('Start Search').click();
        featuredListingsPage.listingTitle.should('contain', verificationText.title);
        featuredListingsPage.moreInfoButton.first().click();
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
        cy.visit(url.estateObjectsUrl);
        dashboardPage.userSubheader.contains('list').click();
        dashboardPage.tableWithEmail.contains(verificationText.title).siblings('td').find('button').click();
        dashboardPage.listMenuItem.contains('Delete').click();
        dashboardPage.deleteEstateConfirmation.contains('Yes').click();
        dashboardPage.tableWithEmail.contains(verificationText.title).should('not.exist');
    });
});
