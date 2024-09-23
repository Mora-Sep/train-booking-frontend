describe('Train Booking Page', () => {
  beforeEach(() => {
    // Visit the booking page before each test
    cy.visit('http://localhost:3000/user-home'); // Updated to correct URL
  });

  it('displays the search form', () => {
    cy.get('h1').contains('Make your booking experience easy!').should('be.visible');
    cy.get('select').should('have.length', 2); // Two dropdowns for from and to stations
    cy.get('input[type="text"]').should('not.exist'); // Ensure no text input is present
  });

  it('fetches and displays stations', () => {
    // Assuming the API response contains stations
    cy.intercept('GET', '/get/stations', {
      statusCode: 200,
      body: [
        { Code: 'S1', Name: 'Station A' },
        { Code: 'S2', Name: 'Station B' },
        { Code: 'S3', Name: 'Station C' },
      ],
    }).as('getStations');

    cy.wait('@getStations'); // Wait for the stations to load
    cy.get('select').first().select('Station A');
    cy.get('select').last().select('Station B');
    cy.get('button').contains('Search for Trains').click();
  });

  it('displays search results based on selected stations', () => {
    // Intercept the search API call and return mock train data
    cy.intercept('GET', '/booking/search', {
      statusCode: 200,
      body: [
        {
          ID: 1,
          originName: 'Station A',
          destinationName: 'Station B',
          trainName: 'Express Train',
          departureDateAndTime: '2024-09-30T10:00:00',
          arrivalDateAndTime: '2024-09-30T12:00:00',
          seatReservations: [
            { totalCount: 100, reservedCount: 20 },
            { totalCount: 100, reservedCount: 10 },
            { totalCount: 100, reservedCount: 5 },
          ],
        },
      ],
    }).as('searchTrains');

    // Perform the search
    cy.get('select').first().select('Station A');
    cy.get('select').last().select('Station B');
    cy.get('button').contains('Search for Trains').click();
    cy.wait('@searchTrains');

    // Verify the search results
    cy.get('h2').contains('Search Results').should('be.visible');
    cy.get('.bg-white').should('have.length', 1); // Expect one train result
    cy.get('.bg-white').contains('Express Train').should('be.visible');
  });

  it('handles no available trains', () => {
    cy.intercept('GET', '/booking/search', {
      statusCode: 200,
      body: [],
    }).as('searchTrains');

    // Perform the search
    cy.get('select').first().select('Station A');
    cy.get('select').last().select('Station B');
    cy.get('button').contains('Search for Trains').click();
    cy.wait('@searchTrains');

    // Verify no trains available message
    cy.get('p').contains('No trains available for the selected route.').should('be.visible');
  });
});
