describe('Blog app ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'Pekka',
      username: 'peruna',
      password: '1234'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Log in')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {
    it('fails with invalid username and password', function () {
      cy.get('#username-input').type('porkkana')
      cy.get('#password-input').type('4321')
      cy.get('#login-button').click()
      cy.contains('invalid username or password')
    })

    it('fails with wrong password AND notification is red', function () {
      cy.get('#username-input').type('peruna')
      cy.get('#password-input').type('1235')
      cy.get('#login-button').click()
      cy.contains('invalid username or password').should('have.css', 'color', 'rgb(255, 0, 0)')
    })

    it('succeeds with correct credentials', function () {
      cy.get('#username-input').type('peruna')
      cy.get('#password-input').type('1234')
      cy.get('#login-button').click()
      cy.contains('peruna logged in')
    })
  })
})