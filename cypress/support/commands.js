// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom command to wait for Reddit data to load
Cypress.Commands.add('waitForRedditData', () => {
  // Wait for loading to disappear
  cy.get('.loading', { timeout: 30000 }).should('not.exist');
});

// Custom command to navigate to posts view
Cypress.Commands.add('navigateToPosts', () => {
  cy.visit('/');
  cy.get('h1').should('contain', 'Reddit Popular Posts');
});

// Custom command to navigate to raw JSON view
Cypress.Commands.add('navigateToRawJson', () => {
  cy.visit('/raw-json');
  cy.get('h1').should('contain', 'Raw JSON Response');
});

// Custom command to search for posts
Cypress.Commands.add('searchPosts', (searchTerm) => {
  cy.get('input[type="text"]').clear().type(searchTerm);
  cy.get('button[type="submit"]').click();
});

// Custom command to filter by category
Cypress.Commands.add('filterByCategory', (category) => {
  cy.contains(category).click();
});

// Custom command to clear search
Cypress.Commands.add('clearSearch', () => {
  cy.contains('✕ Clear Search').click();
});

// Custom command to refresh data
Cypress.Commands.add('refreshData', () => {
  cy.contains('🔄 Refresh Data').click();
});

// Custom command to open post detail modal
Cypress.Commands.add('openPostModal', (index = 0) => {
  cy.get('.post-card').eq(index).click();
  cy.get('.modal-overlay').should('be.visible');
});

// Custom command to close post detail modal
Cypress.Commands.add('closePostModal', () => {
  cy.get('.modal-close').click();
  cy.get('.modal-overlay').should('not.exist');
});

// Override visit to wait for app to be ready
Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
  return originalFn(url, options).then(() => {
    // Wait for the app to be fully loaded
    cy.get('.app', { timeout: 10000 }).should('be.visible');
  });
}); 