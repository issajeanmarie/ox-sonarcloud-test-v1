/// <reference types="cypress"/>

context("Login page", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000");
    });

    it("should render the login page and display login", () => {
        cy.get("p").contains("Login");
    });
});

export { }