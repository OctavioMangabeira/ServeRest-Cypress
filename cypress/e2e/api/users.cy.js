/// <reference types="cypress" />

import { faker } from '@faker-js/faker';

describe('API Tests Login', () => {
    it('Should create a user and return by GET ID', () => {
        cy.fixture('dataUser').then((DataUser) => {
            DataUser.valid.email = faker.internet.email();
            cy.request({
                method: 'POST',
                url: 'usuarios',
                body: DataUser.valid,
            }).then((response) => {
                expect(response.status).to.eq(201);
                expect(response.body.message).to.eq("Cadastro realizado com sucesso");
                Cypress.env('userId', response.body._id)
                Cypress.env('email', DataUser.valid.email)
            })
        })
    })

    it('Should not create a user with an email already registered', () => {
        cy.fixture('dataUser').then((DataUser) => {
            cy.request({
                method: 'POST',
                url: 'usuarios',
                body: DataUser.invalid,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body.message).to.eq("Este email já está sendo usado");
            })
        })
    })

    it('Should return a user by ID', () => {
        cy.fixture('dataUser').then((DataUser) => {
            const userId = Cypress.env('userId')
            const email = Cypress.env('email')
            cy.request({
                method: 'GET',
                url: `usuarios/${userId}`,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.nome).to.eq(DataUser.valid.nome);
                expect(response.body.email).to.eq(email);
                expect(response.body.password).to.eq(DataUser.valid.password);
                expect(response.body.administrador).to.eq(DataUser.valid.administrador);
                expect(response.body._id).to.eq(userId);
            })
        })
    })
})