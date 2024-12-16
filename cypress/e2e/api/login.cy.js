/// <reference types="cypress" />

describe('API Tests Login', () => {
    it('Test Login Successful', () => {
        cy.fixture('userLogin').then((UserLogin) => {
            cy.request({
                method: 'POST',
                url: 'login',
                body: UserLogin.valid,
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.message).to.eq("Login realizado com sucesso");
            })
        })
    })

    it('Test Login Failed', () => {
        cy.fixture('userLogin').then((UserLogin) => {
            cy.request({
                method: 'POST',
                url: 'login',
                body: UserLogin.invalid,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
                expect(response.body.message).to.eq("Email e/ou senha inválidos");
            })
        })
    })
})