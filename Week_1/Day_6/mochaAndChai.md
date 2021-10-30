# BDD
BDD or **Behavior Driven Development** is a process that emerged from test-driven development in 2006. The topic of BDD covers the entire life cycle of the app development process, from planning the project, to writing the code.

BDD encourages you to ***specify the behavior of your app in terms of user stories which are broken down into scenarios that can be built and tested.***

The Topic of BDD is big enough that entire books have been written on the subject, but for today, we're just interested in a one part of BDD, testing with BDD frameworks.

## BDD Frameworks
When we write tests, we are testing the behavior of our code. If you were to test a function that sums two numbers together, you would create some numbers, call the function with those numbers, then write an assertion for what the function should return. Some tests are more complicated than others, but every test will involve setting up some data, running some code that should do something, and asserting that it does that thing.

## Setting Up
To start testing our JavaScript code, we first need to install a testing framework. We will be using the Mocha testing framework and the Chai assertion library. These are very popular packages for testing javascript and are very easy to get started with.

### Installing ```mocha``` + ```chai```
With Node installed, open up a terminal or command line in your project’s directory.

* If you want to **test code in the browser**, run ```npm install mocha chai --save-dev```
* If you want to **test Node.js code**, ***in addition to the above,*** ```run npm install -g mocha```

This **installs the packages mocha and chai.** ***Mocha is the library that allows us to run tests,*** and ***Chai contains some helpful functions that we’ll use to verify our test results.***

### Testing on Node.js vs Testing in the Browser
The ***examples that follow are designed to work if running the tests in a browser.*** If you **want to unit test your Node.js application, follow these steps.**
  * For **Node**, **you don’t need the test runner file.**
  * To **include Chai**, add ```var chai = require('chai');``` ***at the top of the test file.***
  * Run the tests using the ```mocha``` command, ***instead of opening a browser.***

### Setting up a Directory Structure
You should ***put your tests in a separate directory from your main code files.*** This makes it **easier to structure them**, for example if you want to add other types of tests in the future (such as integration tests or functional tests).

The most **popular practice with JavaScript code is to have a directory called** ```test/``` **in your project’s root directory.** Then, each test file is placed under ```test/someModuleTest.js```. Optionally, you can also use directories inside test/, but I recommend keeping things simple — you can always change it later if necessary.

### Setting up a Test Runner
In order **to run our tests in a browser,** we need to ***set up a simple HTML page to be our test runner page.*** The page loads Mocha, the testing libraries and our actual test files. ***To run the tests, we’ll simply open the runner in a browser.***

If you’re using Node.js, you can skip this step. ***Node.js unit tests can be run using the command mocha, assuming you’ve followed the recommended directory structure.***

Below is the ***code we’ll use for the test runner.*** I’ll save this file as ```testrunner.html```.
```html
<!DOCTYPE html>
<html>
  <head>
    <title>Mocha Tests</title>
    <link rel="stylesheet" href="node_modules/mocha/mocha.css">
  </head>
  <body>
    <div id="mocha"></div>
    <script src="node_modules/mocha/mocha.js"></script>
    <script src="node_modules/chai/chai.js"></script>
    <script>mocha.setup('bdd')</script>

    <!-- load code you want to test here -->

    <!-- load your test files here -->

    <script>
      mocha.run();
    </script>
  </body>
</html>
```
The important bits in the test runner are:

  * We **load Mocha’s CSS styles** to give our test results nice formatting.
  * We **create a div with the ID mocha.** This is where the ***test results are inserted.***
  * We **load Mocha and Chai**. They are located in subfolders of the node_modules folder since we installed them via npm.
  * **By calling mocha.setup,** we make **Mocha’s testing helpers available.**
  * Then, **we load the code we want to test and the test files.** We don’t have anything here just yet.
  * Last, we **call mocha.run to run the tests.** Make sure you **call this ***after*** loading the source and test files.**

### The Basic Test Building Blocks
Now that we can run tests, let’s start writing some.

We’ll begin by **creating a new file** ```test/arrayTest.js```. An **individual test file such as this one is known as a ***test case***.** I’m calling it ```arrayTest.js``` because for this example, we’ll be testing some basic array functionality.

Every test case file follows the same basic pattern. **First, you have a describe block:**
```javascript
describe('Array', function() {
  // Further code for tests goes here
});
```
**describe is used to group individual tests.** The ***first parameter should indicate what we’re testing*** — in this case, since we’re going to test array functions, I’ve passed in the string ```'Array'```.

Secondly, **inside the describe, we’ll have it blocks:**
```javascript
describe('Array', function() {
  it('should start empty', function() {
    // Test implementation goes here
  });

  // We can have more its here
});
```
**it is used to create the actual tests.** The ***first parameter to it should provide a human-readable description of the test.*** For example, we can ***read the above as “it should start empty”,*** which is a good description of how arrays should behave. **The code to implement the test is then written inside the function passed to it.**

**All Mocha tests are built from these same building blocks, and they follow this same basic pattern.**

* **First**, we ***use describe to say what we’re testing*** – for example, “describe how array should work”.
* **Then**, ***we use a number of it functions to create the individual tests*** – **each ***it*** should explain one specific behavior**, such as “it should start empty” for our array case above.

### Writing the Test Code
Now that we know how to structure the test case, let’s jump into the fun part — implementing the test.

Since we are testing that an array should start empty,*** we need to create an array and then ensure it’s empty.*** The implementation for this test is quite simple:
```javascript
var assert = chai.assert;

describe('Array', function() {
  it('should start empty', function() {
    var arr = [];

    assert.equal(arr.length, 0);
  });
});
```
Note on the ***first line, we set up the assert variable.*** This is just s**o we don’t need to keep typing chai.assert** everywhere.

**In the it function, we create an array and check its length.** Although simple, this is a good example of how tests work.

**First, you have something you’re testing — this is called the ***System Under Test or SUT***.** Then, if necessary, you do something with the SUT. In this test, we’re not doing anything, since we’re checking the array starts as empty.

The last thing in a test should be the validation — an assertion which checks the result. Here, we are using assert.equal to do this. Most assertion functions take parameters in the same order: First the “actual” value, and then the “expected” value.

* The actual value is the result from your test code, so in this case ```arr.length```
* The expected value is what the result should be. Since an array should begin empty, the expected value in this test is ```0```

Chai also offers two different styles of writing assertions, but we’re using assert to keep things simple for now. When you become more experienced with writing tests, you might want to use the expect assertions instead, as they provide some more flexibility.

### Running the Test
In order ***to run this test, we need to add it to the test runner file we created earlier.***

If you’re using Node.js, you can skip this step, and use the command mocha to run the test. You’ll see the test results in the terminal.

**Otherwise, to add this test to the runner, simply add:**
```
<script src="test/arrayTest.js"></script>
```
Below:
```
<!-- load your test files here -->
```
**Once you’ve added the script, you can then load the test runner page in your browser of choice.**
