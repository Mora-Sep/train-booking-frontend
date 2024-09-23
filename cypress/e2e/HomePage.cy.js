describe('Home Page', () => {
  beforeEach(() => {
    // Visit the home page before each test
    cy.visit('http://localhost:3000/'); // Adjust the URL if needed
  });

  it('displays the ON TRAIN title', () => {
    cy.get('h1').contains('ON TRAIN').should('be.visible');
  });

  it('displays the typewriter animation', () => {
    cy.get('.text-green-400').should('be.visible'); // Checks if the typewriter text is visible
  });

  it('renders Sign In and Register buttons when user is not logged in', () => {
    cy.get('button').contains('Sign In').should('be.visible');
    cy.get('button').contains('Register').should('be.visible');
    cy.get('button').contains('Search for a Train').should('be.visible');
  });

  it('navigates to login page when Sign In is clicked', () => {
    cy.get('button').contains('Sign In').click();
    cy.url().should('include', '/login'); // Check if the URL changes to /login
  });

  it('navigates to sign-up page when Register is clicked', () => {
    cy.get('button').contains('Register').click();
    cy.url().should('include', '/sign'); // Check if the URL changes to /sign
  });

  it('navigates to user home page when Search for a Train is clicked', () => {
    cy.get('button').contains('Search for a Train').click();
    cy.url().should('include', '/user-home'); // Check if the URL changes to /user-home
  });

  it('displays DEO and Admin links when user is not logged in', () => {
    cy.get('div').contains('Sign in as').should('be.visible');
    cy.get('a').contains('DEO').should('be.visible');
    cy.get('a').contains('Admin').should('be.visible');
  });
});
