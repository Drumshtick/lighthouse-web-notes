# Promises LOOK AT ISS_SPOTTER APP FOR DEMO
**An official introductory description:** A promise *represents the eventual result of an asynchronous operation.* The primary way of interaction with a promise is through its ```then``` method, which **registers callbacks** to receive either *a promise’s eventual value* or the *reason why the promise cannot be fulfilled.*

As we can see here, we don't avoid callbacks with promises. Instead, we wrap them into a promise.

So what are promises and how do we start using them?
* A promise is an object
* Promises do not rely on anything other than basic JavaScript
* As of ES6, JavaScript has promises supported natively in its code. In other words, *they are built into the language* (via Promise)

## Recap on Promises & Callback Hell
A promise is an object which represents a (usually asynchronous) task that will execute and the end result of said task (fulfilled or rejected). We can add callbacks to it in order to handle these end results.

What's cool about promises is that we can chain them, turning callback hell into manageable / readable control flow.

Promises allow us to turn code like this:
```javascript
// clepto.js
gotoTheirHouse(billy, () => {
  pretendToBeFriends(billy, () => {
    stealWhenNotLooking(billy.mixtapes, (items) => {
      hideInBackpack(items, () => {
        console.log("I don't feel well. I gotta go home now Billy!");
      });
    });
  });
});
```
### Into this:
```javascript
// clepto_promises.js
gotoTheirHouse(billy)
  .then(pretendToBeFriends)
  .then(stealWhenNotLooking)
  .then(hideInBackpack)
  .then(() => {
    console.log("I don't feel well. I gotta go home now Billy!");
  });
```
As we can see, one is much more readable as the async tasks are less nested. We've transformed the "callback hell" that comes from doing async tasks one after another, into seemingly synchronous code.
## There's More To Promises
There's more to promises than just avoiding nested callbacks, such as:
* Error handling becomes much simpler with promises
* Promises make asynchronous code easier to unit test
* Promise.all (introduced by MPJ's video) can be used to run multiple async operations in parallel and have a single callback to see all the results together
* And more ...

Again, this is part of the reason that introductions to promises are often too heavy. In our case, we'll try to keep things focused instead of trying to cover all of these aspects right away.

