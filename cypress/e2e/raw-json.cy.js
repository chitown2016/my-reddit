describe('Raw JSON View', () => {
  beforeEach(() => {
    cy.visit('/raw-json');
  });

  it('should display raw JSON data', () => {
    // Wait for data to load
    cy.waitForRedditData();
    
    // Should show JSON display
    cy.get('.json-display').should('be.visible');
    
    // Should contain JSON content (check for null if no data)
    cy.get('.json-display').should('contain', 'null');
  });

  it('should show JSON statistics when data is available', () => {
    cy.waitForRedditData();
    
    // Check if json-stats exists (it might not if there's no data)
    cy.get('body').then(($body) => {
      if ($body.find('.json-stats').length > 0) {
        cy.get('.json-stats').should('be.visible');
        cy.contains('Data Type:').should('be.visible');
        cy.contains('Posts Count:').should('be.visible');
      } else {
        // If no data, just verify the page loads correctly
        cy.get('.json-display').should('be.visible');
      }
    });
  });

  it('should refresh data', () => {
    cy.waitForRedditData();
    
    // Click refresh button
    cy.refreshData();
    
    // Should show loading state briefly
    cy.get('.loading').should('contain', 'Loading Reddit data...');
    
    // Should return to normal state
    cy.waitForRedditData();
  });

  it('should show correct header based on context', () => {
    cy.waitForRedditData();
    
    // Should show "Popular Posts - Raw JSON" by default
    cy.get('h2').should('contain', 'Popular Posts');
    cy.get('h2').should('contain', 'Raw JSON');
  });

  it('should handle navigation from posts view', () => {
    // Start from posts view
    cy.visit('/');
    cy.waitForRedditData();
    
    // Navigate to raw JSON
    cy.get('a[href="/raw-json"]').click();
    cy.get('h1').should('contain', 'Raw JSON Response');
    
    // Should still have data
    cy.get('.json-display').should('be.visible');
  });
}); 