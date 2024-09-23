describe('User Registration', () => {
  beforeEach(() => {
    // Visit the login page before each test
    cy.visit('http://localhost:3000/sign');
  });

  it('should register a new user successfully', () => {
    // Fill in the registration form
    cy.get('input#firstName').type('testfirst');
    cy.get('input#lastName').type('testLast');
    cy.get('input#username').type('testuser');
    cy.get('input#password').type('test1234');
    cy.get('input#confirmPassword').type('test1234');
    cy.get('input#email').type('testmail@gmail.com');
    cy.get('input#phoneNumber').type('+94773311785');
    cy.get('input#nicNumber').type('200104508874');
    cy.get('select#gender').select('male');
    cy.get('input#birthday').type('2001-05-10');
    cy.get('textarea#address').type('Galle');

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Check for a success alert or redirection
    cy.on('window:alert', (text) => {
      expect(text).to.contains('User registered successfully');
    });

    // Verify redirection to the homepage
    cy.url().should('include', '/');
  });
});
