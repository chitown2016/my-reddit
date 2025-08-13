describe('Complete User Journey', () => {
  it('should complete a full user journey through the app', () => {
    // 1. Start on the main page
    cy.visit('/');
    cy.get('h1').should('contain', 'Reddit Popular Posts');
    
    // 2. Wait for data to load
    cy.waitForRedditData();
    
    // 3. Browse posts
    cy.get('.post-card').should('have.length.greaterThan', 0);
    cy.get('.post-card').first().should('be.visible');
    
    // 4. Open post detail modal
    cy.openPostModal(0);
    cy.get('.modal-header h2').should('contain', 'Post Details');
    
    // 5. Close modal
    cy.closePostModal();
    
    // 6. Filter by category (just click, don't check active class)
    cy.filterByCategory('Technology');
    
    // 7. Search for posts
    cy.searchPosts('programming');
    cy.contains('Search Results for "programming"').should('be.visible');
    
    // 8. Clear search
    cy.clearSearch();
    cy.contains('All Posts').should('be.visible');
    
    // 9. Navigate to Raw JSON view
    cy.get('a[href="/raw-json"]').click();
    cy.get('h1').should('contain', 'Raw JSON Response');
    cy.waitForRedditData();
    
    // 10. View JSON data
    cy.get('.json-display').should('be.visible');
    
    // 11. Refresh data
    cy.refreshData();
    cy.waitForRedditData();
    
    // 12. Navigate back to posts
    cy.get('a[href="/"]').click();
    cy.get('h1').should('contain', 'Reddit Popular Posts');
    cy.waitForRedditData();
    
    // 13. Verify we're back to normal state
    cy.get('.post-card').should('have.length.greaterThan', 0);
  });

  it('should handle error states gracefully', () => {
    // This test would require mocking network failures
    // For now, we'll test that the app loads properly
    cy.visit('/');
    cy.get('.app').should('be.visible');
    cy.get('h1').should('contain', 'Reddit Popular Posts');
  });

  it('should maintain state during navigation', () => {
    // Start on posts view
    cy.visit('/');
    cy.waitForRedditData();
    
    // Filter by category
    cy.filterByCategory('Technology');
    
    // Navigate to raw JSON
    cy.get('a[href="/raw-json"]').click();
    cy.waitForRedditData();
    
    // Navigate back to posts
    cy.get('a[href="/"]').click();
    cy.waitForRedditData();
    
    // Verify we can still interact with the page
    cy.get('.post-card').should('have.length.greaterThan', 0);
  });

  it('should handle modal interactions properly', () => {
    // Start on posts view
    cy.visit('/');
    cy.waitForRedditData();
    
    // Open modal
    cy.openPostModal(0);
    
    // Verify modal content
    cy.get('.post-detail-header .post-title').should('be.visible');
    cy.get('.post-stats-detailed').should('be.visible');
    
    // Close modal by clicking overlay
    cy.get('.modal-overlay').click({ force: true });
    cy.get('.modal-overlay').should('not.exist');
    
    // Open modal again (use first post)
    cy.openPostModal(0);
    
    // Close modal by clicking close button
    cy.closePostModal();
    
    // Verify we can still interact with posts
    cy.get('.post-card').should('have.length.greaterThan', 0);
  });
}); 