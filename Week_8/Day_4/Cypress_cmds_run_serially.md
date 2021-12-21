# Commands Run Serially

After a test function is finished running, Cypress goes to work executing the commands that were enqueued using the cy.* command chains.

Let's take another look at an example
```js
it('changes the URL when "awesome" is clicked', () => {
  cy.visit('/my/resource/path') // 1.

  cy.get('.awesome-selector') // 2.
    .click() // 3.

  cy.url() // 4.
    .should('include', '/my/resource/path#awesomeness') // 5.
})
```

The test above would cause an execution in this order:
  1. Visit a URL.
  2. Find an element by its selector.
  3. Perform a click action on that element.
  4. Grab the URL.
  5. Assert the URL to include a specific string.

These actions will always happen serially (one after the other), never in parallel (at the same time). Why?

To illustrate this, let's revisit that list of actions and expose some of the hidden ✨ magic ✨ Cypress does for us at each step:
  1. Visit a URL ✨ and wait for the page load event to fire after all external resources have loaded✨
  2. Find an element by its selector ✨ and retry until it is found in the DOM ✨
  3. Perform a click action on that element ✨ after we wait for the element to reach an actionable state ✨
  4. Grab the URL and...
  5. Assert the URL to include a specific string ✨ and retry until the assertion passes ✨