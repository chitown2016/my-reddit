describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should navigate between Posts and Raw JSON views', () => {
    // Should start on posts view
    cy.get('h1').should('contain', 'Reddit Popular Posts');
    cy.get('a[href="/"]').should('have.class', 'active');

    // Navigate to Raw JSON view
    cy.get('a[href="/raw-json"]').click();
    cy.get('h1').should('contain', 'Raw JSON Response');
    cy.get('a[href="/raw-json"]').should('have.class', 'active');

    // Navigate back to Posts view
    cy.get('a[href="/"]').click();
    cy.get('h1').should('contain', 'Reddit Popular Posts');
    cy.get('a[href="/"]').should('have.class', 'active');
  });

  it('should show loading state initially', () => {
    cy.get('.loading').should('contain', 'Loading Reddit data...');
  });

  it('should have proper navigation links', () => {
    cy.get('nav').within(() => {
      cy.get('a[href="/"]').should('contain', 'Posts');
      cy.get('a[href="/raw-json"]').should('contain', 'Raw JSON');
    });
  });
}); 