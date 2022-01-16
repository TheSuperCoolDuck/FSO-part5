Cypress.Commands.add('login', ({username, password})=>{
  cy.request('POST','http://localhost:3003/api/login',{
    username, password
  }).then(response=>{
    localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
    cy.visit('http://localhost:3000')
  })
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

      cy.get('html').should('not.contain', "Superuser logged-in")
    })

    describe('when logged in', function(){
      beforeEach(function(){
        cy.login({username: 'root', password: 'Password123'})
      })

      it('A blog can be created', function(){
        cy.contains('create new blog').click()
        cy.get('#title').type('a blog created by cypress')
        cy.get('#author').type('cypress')
        cy.get('#url').type('localhost')
        
        cy.get('#submit-button').click()

        cy.contains('a blog created by cypress by cypress')

      })
    })
  })
})