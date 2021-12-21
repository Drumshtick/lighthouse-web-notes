# Cypress is Like jQuery [HERE](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#Cypress-is-Like-jQuery)

If you've used jQuery before, you may be used to querying for elements like this:
```js
$('.my-selector')
```
In Cypress, querying elements is the same:
```js
cy.get('.my-selector')
```

In fact, **Cypress bundles jQuery** and exposes many of its DOM traversal methods to you so you can work with complex HTML structures with ease using APIs you're already familiar with.
```js
// Each method is equivalent to its jQuery counterpart. Use what you know!
cy.get('#main-content').find('.article').children('img[src^="/static"]').first()
```

#### Best practice for selecting elements [HERE](https://docs.cypress.io/guides/references/best-practices#Selecting-Elements)

Accessing the DOM elements returned from the query works differently, however:
```js
// This is fine, jQuery returns the element synchronously.
const $jqElement = $('.element')

// This will not work! Cypress does not return the element synchronously.
const $cyElement = cy.get('.element')
```

Question: What happens when Cypress can't find any matching DOM elements from its selector?

Answer: No big deal! Cypress automatically retries the query until either:

1. The element is found
```js
cy
  // cy.get() looks for '#element', repeating the query until...
  .get('#element')

  // ...it finds the element!
  // You can now work with it by using .then
  .then(($myElement) => {
    doSomething($myElement)
  })
```
2. A set timeout is reached
```js
cy
  // cy.get() looks for '#element-does-not-exist', repeating the query until...
  // ...it doesn't find the element before its timeout.
  // Cypress halts and fails the test.
  .get('#element-does-not-exist')

  // ...this code is never run...
  .then(($myElement) => {
    doSomething($myElement)
  })
```

This makes Cypress robust and immune to dozens of common problems that occur in other testing tools. Consider all the circumstances that could cause querying a DOM element to fail:
  1. The DOM has not loaded yet.
  2. Your framework hasn't finished bootstrapping.
  3. An XHR request hasn't responded.
  4. An animation hasn't completed.
  5. and on and on...