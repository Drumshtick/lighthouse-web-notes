# describe() vs it() vs test()
The test files have been basic until now. If we want to group a series of tests, we can wrap them all in a describe function. We will want to group related tests to organize our test suite as it grows.
```jsx
describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });
});
```

We have been using the it function to declare our tests. In the Jest documentation, the examples use a function called test for the same purpose. The it function is an alias to the test function. We use the one we prefer, but the more important criteria are that we stay consistent within a project.

This project has not been consistent in the use if it vs test. The tests for selectors and useVisualMode both use the test function. We don't group them within a single describe block. The most important understanding is that the terms it and test are interchangeable.

We will continue to use it with describe for consistency sake. Anywhere that we use it we could use test instead.

# Testing Specific Files
While working with Jest, we want to become familiar with the available watch options. When we press the w key in watch mode, we are presented with a list of options.

Watch Usage

Press a to run all tests.
Press f to run only failed tests.
Press q to quit watch mode.
Press p to filter by a filename regex pattern.
Press t to filter by a test name regex pattern.
Press Enter to trigger a test run.
Change the watch mode to p and type in Appointment to only run the Appointment.test.js file after each update.