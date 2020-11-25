describe('Map', () => {
  const sizesDesktop = ['iphone-6+', 'ipad-2', [1024, 768]];
  beforeEach(() => {
    // Load our app before starting each test case
    cy.visit('/map');
  });

  context('Multiple Viewports', () => {
    sizesDesktop.forEach((size) => {
      it(`Map: Leaflet on ${size} screen`, () => {
        if (Cypress._.isArray(size)) {
          cy.viewport(size[0], size[1]);
        } else {
          cy.viewport(size);
        }
        cy.get('#map.leaflet-container').should('be.visible');
        cy.get('app-main-map').should('have.class', 'full-screen');
        // cy.percySnapshot() just static part...
      });

      it(`Map: Search 1 on ${size} screen`, () => {
        if (Cypress._.isArray(size)) {
          cy.viewport(size[0], size[1]);
        } else {
          cy.viewport(size);
        }
        cy.get('input#searchInput').type('Joe');
        cy.get('button#searchButton').should('be.enabled').click();
        cy.get('.search-result').should('contain', 'No results found');

        // cy.percySnapshot() just static part...
      });

      it(`Map: Search 2 on ${size} screen`, () => {
        if (Cypress._.isArray(size)) {
          cy.viewport(size[0], size[1]);
        } else {
          cy.viewport(size);
        }
        cy.get('input#searchInput').type('Joe');
        cy.get('button#searchButton').should('be.enabled').click();
        cy.contains('.toggle-btn', 'Show Advanced Filters').click();

        cy.get('[class="filters-container"]')
          .contains('Mine Type')
          .siblings('[class="filter-select"]')
          .within(() => {
            cy.get('select').select('Coal');
          });

        cy.get('[class="filters-container"]')
          .contains('Tailing Impoundments')
          .siblings('[class="filter-select"]')
          .within(() => {
            cy.get('select').select('No');
          });

        cy.get('button#searchButton').should('be.enabled').click();
        cy.get('.search-result').should('contain', 'No results found');
      });
    });
  });
});
