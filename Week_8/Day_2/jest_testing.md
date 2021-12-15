# Testing the Project

Jest will find tests with any of the following extensions.
  * ```.js```/```.jsx```
  * ```.ts```/```.tsx```

## Setup and Teardown
The setup and teardown methods **allow us to execute functions *before* and *after* the tests are run**. There are four functions available to us, each with a descriptive name. We will be returning to these in future activities.
  1. ```beforeAll(fn, timeout)```
  2. ```beforeEach(fn, timeout)```
  3. ```afterEach(fn, timeout)```
  4. ```afterAll(fn, timeout)```

Jest puts a number of [methods](https://jestjs.io/docs/en/api.html#testname-fn) in the global environment for test files. This is why we can use it and afterEach without importing them.