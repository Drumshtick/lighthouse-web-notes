# Cypress Can Be Simple (Sometimes)

```js
describe('Post Resource', () => {
  it('Creating a New Post', () => {
    cy.visit('/posts/new') //   1. Visit the page at /posts/new.

    cy.get('input.post-title') // 2. Find the ```<input>``` with class post-title.
      .type('My First Post') // 3. Type "My First Post" into it.

    cy.get('input.post-body') // 4. Find the ```<input>``` with class post-body.
      .type('Hello, world!') // 5. Type "Hello, world!" into it.

    cy.contains('Submit') // 6. Find the element containing the text Submit.
      .click() // 7. Click it.

    cy.url() // 8. Grab the browser URL, ensure it includes /posts/my-first-post.
      .should('include', '/posts/my-first-post')

    cy.get('h1') // 9. Find the h1 tag, ensure it contains the text "My First Post".
      .should('contain', 'My First Post')
  })
})
```

Can you read this? If you did, it might sound something like this:
  1. Visit the page at /posts/new.
  2. Find the ```<input>``` with class post-title.
  3. Type "My First Post" into it.
  4. Find the ```<input>``` with class post-body.
  5. Type "Hello, world!" into it.
  6. Find the element containing the text Submit.
  7. Click it.
  8. Grab the browser URL, ensure it includes /posts/my-first-post.
  9. Find the h1 tag, ensure it contains the text "My First Post".