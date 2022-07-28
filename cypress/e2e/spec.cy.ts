/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

describe('Home page', () => {
  it('should render several products', () => {
    // Arrange
    cy.visit('/')

    // Act
    // Assert
    cy.get('.MuiCardMedia-root').its('length').should('be.gte', 10)
  })
})

describe('Admin products page', () => {
  it('should render several products', () => {
    // Arrange
    // Act
    cy.visit('/admin/products').contains('$')

    // Assert
    cy.get('tr.MuiTableRow-root').its('length').should('be.gte', 10)
  })

  it('should render unauthorized message', done => {
    // Arrange
    const stub = cy.stub()
    cy.on('window:alert', stub)
    // Act
    cy.visit('/admin/products')

    cy.get('input[type="file"').selectFile('./cypress/fixtures/products_cheap.csv')

    // Assert
    cy.get('button').contains('Upload file').click()
    cy.on('window:alert', str => {
      expect(str).to.equal(`401: Unauthorized`)
      done()
    })
  })

  it('should render bad access message', done => {
    // Arrange
    localStorage.setItem('authorization_token', 'wrong_token')

    const stub = cy.stub()
    cy.on('window:alert', stub)
    // Act
    cy.visit('/admin/products')

    cy.get('input[type="file"').selectFile('./cypress/fixtures/products_cheap.csv')

    // Assert
    cy.get('button').contains('Upload file').click()
    cy.on('window:alert', str => {
      expect(str).to.equal(`403: User is not authorized to access this resource with an explicit deny`)
      done()
    })
  })
})
