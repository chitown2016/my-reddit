describe('Posts Functionality', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display posts after loading', () => {
    // Wait for data to load
    cy.waitForRedditData();
    
    // Should show posts section
    cy.get('.posts-section').should('be.visible');
    
    // Should show category filter buttons
    cy.get('.category-section').should('be.visible');
    cy.contains('All Posts').should('be.visible');
    cy.contains('Technology').should('be.visible');
  });

  it('should filter posts by category', () => {
    cy.waitForRedditData();
    
    // Click on Technology category
    cy.filterByCategory('Technology');
    cy.get('.category-button').contains('Technology').should('have.class', 'active');
    
    // Click on All Posts category
    cy.filterByCategory('All Posts');
    cy.get('.category-button').contains('All Posts').should('have.class', 'active');
  });

  it('should search for posts', () => {
    cy.waitForRedditData();
    
    // Search for a term
    cy.searchPosts('test');
    
    // Should show search results
    cy.contains('Search Results for "test"').should('be.visible');
    cy.contains('✕ Clear Search').should('be.visible');
  });

  it('should clear search', () => {
    cy.waitForRedditData();
    
    // Search for a term
    cy.searchPosts('test');
    cy.contains('Search Results for "test"').should('be.visible');
    
    // Clear search
    cy.clearSearch();
    
    // Should return to normal view
    cy.contains('All Posts').should('be.visible');
    cy.contains('✕ Clear Search').should('not.exist');
  });

  it('should display post details', () => {
    cy.waitForRedditData();
    
    // Should show post elements
    cy.get('.post-card').should('have.length.greaterThan', 0);
    
    // Check for post structure
    cy.get('.post-card').first().within(() => {
      cy.get('h3').should('be.visible'); // post title
      cy.get('.author').should('be.visible');
      cy.get('.subreddit').should('be.visible');
      cy.get('.post-stats').should('be.visible');
    });
  });

  it('should open post detail modal when clicking on a post', () => {
    cy.waitForRedditData();
    
    // Click on the first post card
    cy.get('.post-card').first().click();
    
    // Should show modal
    cy.get('.modal-overlay').should('be.visible');
    cy.get('.modal-content').should('be.visible');
    cy.get('.modal-header h2').should('contain', 'Post Details');
  });

  it('should display detailed post information in modal', () => {
    cy.waitForRedditData();
    
    // Click on the first post card
    cy.get('.post-card').first().click();
    
    // Should show detailed information
    cy.get('.post-detail-header .post-title').should('be.visible');
    cy.get('.post-meta').should('be.visible');
    cy.get('.post-stats-detailed').should('be.visible');
    
    // Should show action buttons (scroll to them if needed)
    cy.get('.modal-actions').scrollIntoView().should('be.visible');
    cy.get('.action-button.primary').should('contain', 'View on Reddit');
    cy.get('.action-button.secondary').should('contain', 'Close');
  });

  it('should close modal when clicking close button', () => {
    cy.waitForRedditData();
    
    // Click on the first post card
    cy.get('.post-card').first().click();
    
    // Should show modal
    cy.get('.modal-overlay').should('be.visible');
    
    // Click close button
    cy.get('.modal-close').click();
    
    // Should hide modal
    cy.get('.modal-overlay').should('not.exist');
  });

  it('should close modal when clicking overlay', () => {
    cy.waitForRedditData();
    
    // Click on the first post card
    cy.get('.post-card').first().click();
    
    // Should show modal
    cy.get('.modal-overlay').should('be.visible');
    
    // Click on overlay (not the modal content)
    cy.get('.modal-overlay').click({ force: true });
    
    // Should hide modal
    cy.get('.modal-overlay').should('not.exist');
  });

  it('should not close modal when clicking modal content', () => {
    cy.waitForRedditData();
    
    // Click on the first post card
    cy.get('.post-card').first().click();
    
    // Should show modal
    cy.get('.modal-overlay').should('be.visible');
    
    // Click on modal content
    cy.get('.modal-content').click();
    
    // Should still show modal
    cy.get('.modal-overlay').should('be.visible');
  });

  it('should show post metadata in modal', () => {
    cy.waitForRedditData();
    
    // Click on the first post card
    cy.get('.post-card').first().click();
    
    // Should show metadata section (scroll to it if needed)
    cy.get('.post-metadata').scrollIntoView().should('be.visible');
    cy.get('.post-metadata h4').should('contain', 'Additional Information');
    cy.get('.metadata-grid').should('be.visible');
  });
}); 