# Mocking

Unit testing **requires us to isolate most of the code that we are testing**. The amount of isolation varies as we move from static testing to end-to-end testing. With unit testing and integration testing requiring us to "poke holes in reality". We use a feature called [mock functions](https://jestjs.io/docs/en/mock-functions) to replace real functions.

A future example will **highlight how we can intercept requests to ```axios.get()``` and return *fake static data*.** This hole, in reality, is one we are creating. We will no longer be testing our component against the real API server.

## Mock Functions

Mock functions are a part of the Jest framework and **are also known as *"spies"***. They let you **spy on the behaviour of a function that other code calls during the test.**

We can **create a basic mock in any test by calling the ```jest.fn()``` function**. We use the generated mock function **to gather information for the verification phase of our test**. These mock functions *provide a benefit similar to the "actions" that we log in Storybook* but with more features.

In the first example, we create a new function. It does not get called by anything as we can see.
```jsx
it("doesn't call the function", () => {
  const fn = jest.fn();
  expect(fn).toHaveBeenCalledTimes(0);
});
```

In the next example, we **create a new function and then we call it right away**. We can now *check how many times the function executes.*
```jsx
it("calls the function", () => {
 const fn = jest.fn();
 fn();
 expect(fn).toHaveBeenCalledTimes(1);
});
```
We can also **verify** that the ***function is called with the correct arguments***.

```js
it("calls the function with specific arguments", () => {
 const fn = jest.fn();
 fn(10);
 expect(fn).toHaveBeenCalledWith(10);
});
```
And here, we can **make the function do whatever we want**. The *function, in reality, may sum two numbers.* We blast a hole right through that and ***make it return 42 no matter what***.
```js
it("uses the mock implementation", () => {
 const fn = jest.fn((a, b) => 42);
 fn(1, 2);
 expect(fn).toHaveReturnedWith(42);
});
```

In all of these examples, we called the mock function. If we pass that mock function to a component, we can check to see if it gets called with the expected arguments. We can use this automated process to verify that our components call the actions in the way we expect.

We can also **configure a mock function to return a specific value**. We write the tests to confirm that our Application component makes the necessary requests to the API. **To accomplish this will need to replace the real implementation of the axios library with a mock version. We will use mocks to remove the dependency on HTTP request library specifically during testing.**

# Summary
This reading provides a rapid introduction to the concept of mock functions. We are going to use ```jest.fn``` to poke holes in reality as we continue to write more sophisticated tests. There are two primary uses of mocks that we will explore to learn unit and integration testing.
  1. We can capture the different calls made to the function and the arguments for each call.
  2. We can configure the function to return any value that we want for the specific test.