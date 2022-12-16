/// <reference types="cypress"/>

context("Forgot password page", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/forgot-password");
    });
});

export { }