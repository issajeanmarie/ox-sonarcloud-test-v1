/// <reference types="cypress"/>
import passwordGenerator from "../../utils/passwordGenerator";

context("Login first", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("http://localhost:3000");
  });

  it("It should login, visit orders page, go to create new order and come back!", () => {
    cy.contains("Login");

    cy.get("#Login_username").type("admin@ox.com");
    cy.get("#Login_username").should("have.value", "admin@ox.com");

    cy.get("#Login_password").type("123login");
    cy.get("#Login_password").should("have.value", "123login");

    cy.get("#login_button").click();

    cy.get("#new-order-btn").click();

    cy.get(".go-back-to-orders").click();
  });
});

export {};
