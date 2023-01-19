/// <reference types="cypress"/>
import passwordGenerator from "../../utils/passwordGenerator";

context("Login page", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("http://localhost:3000");
  });

  it("Login should fail", () => {
    cy.contains("Login");

    const random_password = passwordGenerator();

    cy.get("#Login_username").type("admin@ox.com");
    cy.get("#Login_username").should("have.value", "admin@ox.com");

    cy.get("#Login_password").type(random_password);
    cy.get("#Login_password").should("have.value", random_password);

    cy.get("#login_button").click();
    cy.contains("Invalid Credentials");
  });

  it("Login should succeed", () => {
    cy.contains("Login");

    cy.get("#Login_username").type("admin@ox.com");
    cy.get("#Login_username").should("have.value", "admin@ox.com");

    cy.get("#Login_password").type("123login");
    cy.get("#Login_password").should("have.value", "123login");

    cy.get("#login_button").click();
    cy.contains("Orders");

    cy.get('[data-test-id="profile-pic"]').click();
    cy.get("span").contains("Logout").click();

    cy.contains("Login");
  });
});

export {};
