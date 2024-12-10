//File upload setup
import 'cypress-file-upload';

// Error handler
Cypress.Commands.add('errorHandler', () => {

  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });
});

// Uncaught exception
Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('ResizeObserver loop completed with undelivered notifications')) {
    return false;
  }
  return true;
});

// Login API
Cypress.Commands.add('apiLogin', (email, password) => {

    cy.request('POST', '/api/users/login', {
        "email": email,
        "password": password
    }).then(
        (response) => {
          cy.log(response)
            window.localStorage.setItem('accessToken', response.body.accessToken)
        }
    )
});

//Register a new user API
Cypress.Commands.add('apiRegisterUser', ({ firstName, lastName, email, password, avatarUrl, userRole }) => {
  cy.request('POST', '/api/users/registration', {
      "username": firstName,
      "user_surname": lastName,
      "email": email,
      "password": password,
      "avatarUrl": avatarUrl,
      "isRealtor": userRole
  }).then(
    (response) => {
    expect(response.status).to.eq(201);
    cy.log(response)
      window.localStorage.setItem('accessToken', response.body.accessToken)
  });
});

// New estate object API
Cypress.Commands.add('createListing', (filePath, jsonData) => {
  cy.fixture(filePath, 'binary').then(file => {
      const blob = Cypress.Blob.binaryStringToBlob(file);

      const formData = new FormData();
      formData.append('images', blob);

      const apiData = {
          title: jsonData.title,
          description: jsonData.description,
          address: jsonData.address,
          city: jsonData.city,
          state: jsonData.stateAbbreviation,
          zipCode: jsonData.zipCode,
          price: Number(jsonData.price),
          bedrooms: Number(jsonData.bedrooms),
          bathrooms: Number(jsonData.bathrooms),
          garage: Number(jsonData.garage),
          sqft: Number(jsonData.sqFeet),
          lotSize: Number(jsonData.lotSize),
          isPublished: true
      };

      Object.keys(apiData).forEach(key => {
          formData.append(key, apiData[key]);
      });

      return cy.request({
          method: 'POST',
          url: '/api/estate-objects',
          headers: {
              authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
          },
          body: formData,
      }).then(response => {
          const responseBody = JSON.parse(
              String.fromCharCode.apply(null, new Uint8Array(response.body))
          );
          return responseBody;
      });
  });
});

// Delete estate object API
Cypress.Commands.add('deleteListing', (listingId) => {
  cy.request({
    method: 'DELETE',
    url: `/api/estate-objects/${listingId}`,
    failOnStatusCode: false,
  }).then(deleteResponse => {
    if (deleteResponse.status === 200) {
      cy.log('Listing deleted successfully');
    } else {
      cy.log(`Failed to delete listing: ${deleteResponse.status}`);
    }
  });
});
