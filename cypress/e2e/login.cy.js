describe('User Login', () => {
  const baseUrl = 'http://localhost:3000';

  beforeEach(() => {
    cy.visit(`${baseUrl}/login`);
  });

  it('should log in successfully with valid credentials', () => {
    // Enter valid credentials
    cy.get('#email').type('testuser'); // Adjust the selector if needed
    cy.get('#password').type('test1234'); // Adjust the selector if needed
    cy.get('button[type="submit"]').click();

    // Check for successful navigation or user-specific elements
    cy.url().should('include', '/user-home');
    cy.contains('Make your booking experience easy!').should('exist'); // Check for the specific heading
  });

  it('should show an error with invalid credentials', () => {
    // Enter invalid credentials
    cy.get('#email').type('invaliduser');
    cy.get('#password').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    // Check for error message
    cy.contains('Invalid username or password').should('exist');
  });
});
