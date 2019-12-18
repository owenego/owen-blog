describe('cypress test of owen\'s blog web', () => {
    before(() => {
        cy.visit('/');
        cy.request('POST', '/blog/clear')
        cy.request('POST', '/category/clear')
    });

    it('1. get the title', () => {
        cy.title().should('include', "owen's blog site")
    })

    it('2. get the navi bar', () => {
        cy.get('.v-toolbar__content div.v-tab:first a').contains("Home")
        cy.get('.v-toolbar__content div.v-tab:first').next().get('a').contains("Category")
        cy.get('.v-toolbar__content div.v-tab:last a').contains("Blog")
        cy.get('.v-toolbar__content button span').contains("login")
    })

    it('3. change the tab', () => {
        cy.get('.v-toolbar__content div.v-tab--active a').contains("News")
        cy.get('.v-toolbar__content div.v-tab a').contains("Category").click()
        cy.get('.v-toolbar__content div.v-tab--active a').contains("Category")
        cy.get('.v-toolbar__content div.v-tab a').contains("Blog").click()
        cy.get('.v-toolbar__content div.v-tab--active a').contains("Blog")
    })

    it('4. go login page and login', () => {
        cy.get('.v-toolbar__content button span').contains("login").click()

        cy.get('.login h3').contains("Login")
        cy.get('input[name=name]').type('root');
        cy.get('input[name=password]').type('root');
        cy.get('.login form button').contains('login').click();
        cy.get('.v-toolbar__content span.nav-user-text').contains("root");
    })

    it('5. add a new category', () => {
        cy.get('.v-toolbar__content div.v-tab a').contains("Category").click()
        cy.get('form input').type('react')
        cy.get('form button').contains('Add new category').click()
    })

    Cypress.Commands.add('fillform', () => {
        cy.get('input[name=title]').type('test title');
        cy.get('textarea').type('test content');
        cy.get('.category-select div[role=button]').click()
        cy.get('.v-menu__content .v-list-item__title:contains("react")').click()
        cy.get('.tags-select div[role=combobox]').click()
        cy.get('.v-menu__content .v-list-item__title').eq(2).click()
        cy.get('.v-input__append-inner:last i').click()
    })

    it('6. post a new blog', () => {
        cy.get('.v-toolbar__content div.v-tab a').contains("Blog").click()
        cy.get('.blog h3 button').contains("POST NEW BLOG").click()
        cy.get('.blog-form h3').contains("Post a new blog")

        // test clear button
        cy.fillform()
        cy.get('form button span:contains("clear")').click()

        // test submit button
        cy.fillform()
        cy.get('form button span:contains("submit")').click()
    })

    it('7. go blog details page', () => {
        cy.get('tbody tr:first a').click()
        cy.get('.v-toolbar__content div.v-tab a').contains("Home").click()
        cy.get('.home .v-card:first a').click()
    })

    it('8. add a new review', () => {
        cy.wait(4000)
        cy.get('.blog .v-card:first input').type('good job, owen.')
        cy.wait(100)
        cy.get('.blog .v-card:first button').click()
    })

    it('9. logout', () => {
        cy.get('.v-toolbar__content i.mdi-logout-variant').click()
        cy.reload()
    })

    it('10. hide the functions after logout', () => {
        cy.get('.v-toolbar__content div.v-tab a').contains("Category").click()
        cy.get('.v-toolbar__content div.v-tab a').contains("Home").click()
        cy.get('.v-toolbar__content div.v-tab a').contains("Blog").click()
    })

    it('11. delete a blog', () => {
        cy.get('.v-toolbar__content button span').contains("login").click()

        cy.get('.login h3').contains("Login")
        cy.get('input[name=name]').type('root');
        cy.get('input[name=password]').type('root');
        cy.get('.login form button').contains('login').click();
        cy.wait(5000)
        cy.get(':nth-child(5) > .v-btn').click()
    })

});