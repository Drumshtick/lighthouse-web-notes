# Unit Testing
Unit testing is the **practice of testing small pieces of code,** typically individual functions, alone and isolated. ***If your test uses some external resource, like the network or a database, it’s not a unit test.***

Unit tests should be fairly ***simple to write.*** A unit tests should essentially ***just give the function that’s tested some inputs, and then check what the function outputs is correct.*** In practice this can vary, because if your code is poorly designed, writing unit tests can be difficult. Because of that, **unit testing is the only testing method which also helps you write better code – Code that’s hard to unit test usually has poor design.**

In a sense, unit testing is the backbone. You can use unit tests to help design your code and keep it as a safety net when doing changes, and the same methods you use for unit testing are also applicable to the other types of testing. All the other test types are also constructed from similar pieces as unit tests, they are just more complex and less precise.

**Unit tests are also great for preventing regressions** – bugs that occur repeatedly. Many times there’s been a particularly troublesome piece of code which just keeps breaking no matter how many times I fix it. ***By adding unit tests to check for those specific bugs, you can easily prevent situations like that.*** You can also use integration tests or functional tests for regression testing, but ***unit tests are much more useful because they are very specific, which makes it easy to pinpoint and then fix the problem.***

When should you use unit testing? Ideally all the time, by applying test-driven development. A good set of unit tests do not only prevent bugs, but also improve your code design, and make sure you can later refactor your code without everything completely breaking apart.

**Popular tools for unit testing include Mocha, Jasmine and Tape.**

# Integration Testing
As the name suggests, in integration testing the idea is to **test how parts of the system work together – the integration of the parts.** Integration tests are similar to unit tests, but there’s one big difference: ***while unit tests are isolated from other components, integration tests are not.*** For example, a unit test for database access code would not talk to a real database, but an integration test would.

Integration testing is mainly ***useful for situations where unit testing is not enough.*** Sometimes you need to have tests to verify that two separate systems – like **a database and your app – work together correctly, and that calls for an integration test.** As a result, when validating integration test results, you could for example validate a database related test by querying the database to check the database state is correct.

Integration tests are often slower than unit tests because of the added complexity. They also might need some set up or configuration, such as the setting up of a test database. This makes writing and maintaining them harder than unit tests, so **you should focus on unit tests unless you absolutely need an integration test.**

**You should have fewer integration tests than unit tests.** You should mainly use them if you need to test two separate systems together, or if a piece of code is too complex to unit test. But in the latter case, I would recommend fixing the code so it’s easy to unit test instead.

**Integration tests can usually be written with the same tools as unit tests.**

# Functional Testing
Functional testing is also **sometimes called E2E testing**, **or browser testing**. They all refer to the same thing.

Functional testing is *****defined as the testing of complete functionality of some application.***** In practice **with web apps, this means using some tool to automate a browser, which is then used to click around on the pages to test the application.**

You might use a unit test to test an individual function and an integration test to check that two parts of the play nice. Functional tests are on a whole another level. While you can have hundreds of unit tests, **you usually want to have only a small amount of functional tests.** This is mainly because*** functional tests can be difficult to write and maintain due to their very high complexity.*** They also **run very slowly,** because they simulate real user interaction on a web page, so even page load times become a factor.

Because of all this, you shouldn’t try to make very fine grained functional tests. You don’t want to test a single function, despite the name “functional” perhaps hinting at it. **Instead, functional tests should be used for testing common user interactions.** If you would manually test a certain flow of your app in a browser, such as registering an account, you could make that into a functional test.

While in unit and integration tests you would validate the results in code, functional test results should be validated the same way as you would validate it if you were a user of the page. Going with the registration example, you could validate it by checking that the browser is redirected to a “thanks for registering page”.

**You should use functional tests if you have some repeated tests you do manually in the browser,** but be careful to not make them too fine-grained, as they can easily become a nightmare to maintain. I know, because I’ve seen it happen many times.

***The most common tool used for functional testing is Selenium.*** Running Selenium is usually **done with Selenium WebDriver, or Protractor.** Sometimes **PhantomJS** and **CasperJS** can be used as well, **especially if you don’t need to test in real browsers.**

## In closing
**Unit tests should be your main focus when testing JavaScript code.** They are the easiest to write and maintain, and provide many benefits beyond reducing bugs. ***Integration and functional tests should be in a supporting role, for where unit tests are not suitable.***

# Happy Path Testing

**The happy path** is the ***path through a system where everything works, the data is correct, the system stays up, and the users are well-behaved.***  We tend to test the happy path first because we understand how the system should function and want to ensure that the basic features should work.

Example of a "happy path" testing scenario
  * User selects an item and adds it to their cart
  * User enters billing data
  * User enters shipping data
  * User clicks “Check Out”
  * Transaction is processed

**If this works, has the system been tested?  Yes.**  **Would you move it into production? The right answer is “no,”***** but I’ve used a lot of systems where the apparent answer was “you bet!”***

We need to **move off the happy path** and wander in the weeds.  ***What if the quantity exceeds stock on hand?*** What if the ***user enters too few digits from their credit card?*** Or ***too many?*** Or ***adds a space, or a dash?*** What if the ***zip code doesn’t match the state?*** **What if? What if? What if?**

## You need to spend a lot of time wandering away from the happy path, and maybe there is a reverse rule for testing: 20% of your time on the happy path; 80% of your time off of it.

