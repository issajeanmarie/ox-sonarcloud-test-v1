/// <reference types="cypress"/>
import passwordGenerator from "../../utils/passwordGenerator";

context("Login first", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("http://localhost:3000");
  });

  it("It should login, visit clients page", () => {
    cy.contains("Login");

    cy.get("#Login_username").type("admin@ox.com");
    cy.get("#Login_username").should("have.value", "admin@ox.com");

    cy.get("#Login_password").type("123login");
    cy.get("#Login_password").should("have.value", "123login");

    cy.get("#login_button").click();

    cy.get(".Clients").click();
  });
});

export {};
