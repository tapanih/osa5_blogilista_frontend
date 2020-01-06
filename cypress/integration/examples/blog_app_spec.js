/* eslint-disable no-undef */
describe('Blog list', function() {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Testikäyttäjä',
      username: 'testi',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('shows the login screen', function() {
    cy.contains('log in to application')
  })

  describe('when logged in', function() {
    beforeEach(function () {
      cy.get('[data-cy=username]').type('testi')
      cy.get('[data-cy=password]').type('salainen')
      cy.get('[data-cy=login]').click()
    })

    it('name of the user is shown', function() {
      cy.contains('Testikäyttäjä logged in')
    })

    it('new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('[data-cy=title]').type('a blog created by cypress')
      cy.get('[data-cy=author]').type('an author name')
      cy.get('[data-cy=url]').type('www.example.com')
      cy.get('[data-cy=submit]').click()
      cy.contains('a blog created by cypress')
    })

    it('logging out works', function () {
      cy.contains('logout').click()
      cy.contains('log in to application')
    })

    describe('and a new blog is created', function() {
      beforeEach(function () {
        cy.contains('new blog').click()
        cy.get('[data-cy=title]').type('another blog cypress')
        cy.get('[data-cy=author]').type('an another author')
        cy.get('[data-cy=url]').type('www.example.com')
        cy.get('[data-cy=submit]').click()
      })

      it('liking a blog works', function () {
        cy.contains('another blog cypress an another author').click()
        cy.get('[data-cy=likes]').contains('0 likes')
        cy.wait(150)
        cy.get('[data-cy=likeButton]').click()
          .get('[data-cy=likes]').contains('1 likes')
        cy.contains('Liked another blog cypress by an another author')
      })

      it('commenting a blog works', function () {
        cy.contains('another blog cypress an another author').click()
        cy.get('[data-cy=commentField]')
          .type('a comment created by cypress')
        cy.get('[data-cy=submitComment]').click()
        cy.get('[data-cy=comments]')
          .contains('a comment created by cypress')
      })

      it('user page contains created blog', function() {
        cy.contains('users').click()
        cy.contains('1')
        cy.contains('Testikäyttäjä').click()
        cy.contains('another blog cypress')
      })
    })
  })
})