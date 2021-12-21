# Commands Are Asynchronous ([HERE](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#Commands-Are-Asynchronous))

It is very important to understand that **Cypress commands don't do anything at the moment they are invoked**, but rather enqueue themselves to be run later. This is what we mean when we say Cypress commands are asynchronous.

EX
```js
it('changes the URL when "awesome" is clicked', () => {
  cy.visit('/my/resource/path') // Nothing happens yet

  cy.get('.awesome-selector') // Still nothing happening
    .click() // Nope, nothing

  cy.url() // Nothing to see, yet
    .should('include', '/my/resource/path#awesomeness') // Nada.
})

// Ok, the test function has finished executing...
// We've queued all of these commands and now
// Cypress will begin running them in order!
```

Cypress doesn't kick off the browser automation magic until the test function exits.

Remembering that Cypress commands run asynchronously is important if you are attempting to mix Cypress commands with synchronous code. Synchronous code will execute immediately - not waiting for the Cypress commands above it to execute.

In the example below, the el evaluates immediately, before the cy.visit() has executed, so will always evaluate to an empty array.

```js
// 🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩
it('does not work as we expect', () => {
  cy.visit('/my/resource/path') // Nothing happens yet

  cy.get('.awesome-selector') // Still nothing happening
    .click() // Nope, nothing

  // Cypress.$ is synchronous, so evaluates immediately
  // there is no element to find yet because
  // the cy.visit() was only queued to visit
  // and did not actually visit the application
  let el = Cypress.$('.new-el') // evaluates immediately as []

  if (el.length) {
    // evaluates immediately as 0
    cy.get('.another-selector')
  } else {
    // this will always run
    // because the 'el.length' is 0
    // when the code executes
    cy.get('.optional-selector')
  }
})

// Ok, the test function has finished executing...
// We've queued all of these commands and now
// Cypress will begin running them in order!
```

Below is one way the code above could be rewritten in order to ensure the commands run as expected.

```js
// ✔️✔️✔️✔️✔️✔️✔️✔️✔️✔️✔️✔️✔️✔️✔️✔️✔️✔️✔️✔️✔️
it('does not work as we expect', () => {
  cy.visit('/my/resource/path') // Nothing happens yet

  cy.get('.awesome-selector') // Still nothing happening
    .click() // Nope, nothing
    .then(() => {
      // placing this code inside the .then() ensures
      // it runs after the cypress commands 'execute'
      let el = Cypress.$('.new-el') // evaluates after .then()

      if (el.length) {
        cy.get('.another-selector')
      } else {
        cy.get('.optional-selector')
      }
    })
})

// Ok, the test function has finished executing...
// We've queued all of these commands and now
// Cypress will begin running them in order!
```