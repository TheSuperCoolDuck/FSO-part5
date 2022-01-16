Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST','http://localhost:3003/api/login',{
    username, password
  }).then(response => {
    localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: { title, author, url },
    headers:{
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
    }
  })

  cy.visit('http://localhost:3000')
})

describe('Blog app', function(){
  beforeEach(function(){
    cy.request('POST','http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function(){
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function(){
    beforeEach(function(){
      const user = {
        name: 'Superuser',
        username: 'root',
        password: 'Password123'
      }
      cy.request('POST', 'http://localhost:3003/api/users', user)
    })

    it('succeed with correct credentials', function(){
      cy.get('#username').type('root')
      cy.get('#password').type('Password123')
      cy.get('#login-button').click()

      cy.contains('Superuser logged-in')
    })

    it('fails with wrong credentials', function(){
      cy.get('#username').type('root')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()


      cy.contains('wrong username or password')

      cy.get('html').should('not.contain', 'Superuser logged-in')
    })

    describe('when logged in', function(){
      beforeEach(function(){
        cy.login({ username: 'root', password: 'Password123' })
      })

      it('A blog can be created', function(){
        cy.contains('create new blog').click()
        cy.get('#title').type('a blog created by cypress')
        cy.get('#author').type('cypress')
        cy.get('#url').type('localhost')

        cy.get('#submit-button').click()

        cy.contains('a blog created by cypress By cypress')

      })

      describe('and a note exist', function(){
        beforeEach(function(){
          cy.createBlog({
            title: 'another cypress blog',
            author: 'cypress',
            url: 'localhost'
          })
        })

        it.only('it can be liked', function(){
          cy
            .contains('another cypress blog By cypress')
            .contains('view')
            .click()

          cy
            .contains('another cypress blog By cypress')
            .parent()
            .contains('likes 0')

          cy
            .contains('another cypress blog By cypress')
            .get('#like-button')
            .click()

          cy
            .contains('another cypress blog By cypress')
            .parent()
            .contains('likes 1')
        })
      })
    })
  })
})