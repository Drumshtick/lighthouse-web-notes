# Types of Tests

The [video](https://www.youtube.com/watch?v=Fha2bVoC8SE) mentions four distinct categories of tests.
  1. Static
  2. Unit
  3. Integration
  4. End-to-End

As we move from the top of the list to the bottom, we increase the cost and the amount of time needed to perform the tests. We are going to apply each of these types of testing to our Interview Scheduler.


## The Testing Lighthouse
We will be learning about testing by sampling from each category of testing. We need a shape that represents a "learning how to test strategy". Introducing The Testing Lighthouse.

![](2021-12-12-17-19-25.png)

## Static Testing
Static analysis tools **take some initial configuration**, but **very little maintenance**. We can ***integrate these tests into our code editor*** for immediate feedback. Two **common forms of static analysis that we can perform are *linting* and *static typing***.

We have been using ```ESLint``` to identify common errors in our code since the first day of week one.

```ESLint``` **can identify issues due to style inconsistency,** but it is more appropriate to enforce rules that identify code errors. We use Prettier to format our code to a single consistent style automatically.

**We can extend ESLint and configure it specifically for a project.** The ```React``` team **provides the lint rules used to ensure that we use ```Hooks``` correctly**. These rules are something that they created to help us avoid the common bugs that they have identified.

**We could use a *superset* of the JavaScript language *to introduce static type checking* to our project. Two popular options are ```TypeScript``` and ```Flow```**.

We won't be using either of these languages due to time constraints. **Both compile to JavaScript, but they also add a level of complexity that we would like to avoid while learning JavaScript.**

JavaScript is a dynamic language with values that we pass around freely. Variables will have their types coerced, and sometimes this doesn't work out so well. Let's consider the **following example from the TypeScript in 5 minutes tutorial.**
```js
const greeter = function(person) {
  return "Hello, " + person;
}

console.log(greeter("Jane") === "Hello, Jane"); // true
```
This function expects that the value of person will be of type String. What happens if we pass a Number instead?
```js
const greeter = function(person) {
  return "Hello, " + person;
}

console.log(greeter(11) === "Hello, 11"); // true
```

The **Number is coerced to be a String and it works out for us**. ***Some developers do not like to rely on this behaviour and instead choose to declare that we can only pass a String as an argument to this function.***
```js
function greeter(person: string) {
  return "Hello, " + person;
}

greeter(11);
```
**This example is no longer a JavaScript function**, but *we can compile it into one*. The **```string``` type applied to the person argument will allow the ```TypeScript``` compiler to verify that the type is correct**. *If the type does not match then the compiler will report the error* ```error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'string'```.

## Unit Testing
With unit testing, **the goal is to test a specific function or component in *isolation***. We focus on one small, predictable piece of code to increase our confidence that it will work as expected. **Similar to the process of using ```Storybook``` to build components in isolation**, we can write tests that automatically check for expected behaviour.

We have already used unit tests for this purpose. While we were developing our Interview Scheduler application, one of our development environments was Jest. The following activities applied unit testing to validate feature requirements.
  * Building a Button
  * Listing Days
  * Transforming Data
  * Building a Hook
  * Interviewers

We will shift our focus to writing more complex React component unit tests for existing and not yet implemented features.

## Integration Testing
When we **combine different units of code to create an application, we are *integrating* them**. Developers often debate what the term "integration testing" describes. For our purposes, we will describe integration testing ***as the process of proving that two or more units of code work together***. Let's go through an example.

**One of our requirements is to show the schedule for a specific day when an item is selected using the DayList component**. We could create a unit test that confirms that we call the function passed as the setDay prop with the correct value. A test like that doesn't confirm that the schedule shows appointments for the selected day.

We created a unit test that confirms that the getAppointmentsForDay selector returns the correct array based on the value of state and state.day. This test also does not confirm that the application shows the correct data to the user.

**If we wrote an integration test to confirm this functionality, *we would render the Application and its children*.** We would click the DayListItem and confirm that we render the correct appointments in the schedule. ***A test like this gives us confidence that the user sees accurate information after clicking on a button.***

The **```risk of writing a lot of integration tests is overlapping coverage.```** If we are testing these two units with an integration test, we may not want to maintain two additional unit tests as well.

## End-to-End Testing
End-to-End testing is considered the **most expensive category of testing**. The goal is to ***get as close to simulated user behaviour as possible***. We *gain a lot of confidence in the application* by applying these types of tests but have to accept the higher cost of implementation, maintenance, and runtime.

Historically the cost of implementing E2E tests has been high, but significant improvements in available tools have helped reduce this cost.

When we change our application behaviour then we may need to update our tests to reflect these changes. We can learn techniques that help minimize the coupling of our tests to our implementation. The maintenance costs go down as a result.

Loading a browser and simulating user actions increases the runtime of our tests. No matter how long it takes, we can always be sure that it would take longer to do manually. We won't spend a lot of time worrying about this for our project.

We will use ```Jest``` and ```Cypress``` to write unit and integration tests for our React application. **Our end-to-end tests will be written exclusively in the Cypress environment.**

# Summary
We are going to learn how to apply each category of testing to our Interview Scheduler. We are already using ESLint to identify common bugs through static code analysis.

We will add new unit tests to the project, starting with an empty file and walking through the process of testing a component in isolation.

Most of the tests we want to write will be integration tests. They will be used to test the logic at the intersection of multiple components. An example would ensure that we show the correct schedule when a specific day is selected.

End-to-end tests simulate user interaction and provide the most confidence, but can be slow to run. We will use this to replace the manual process used to test common user flows.

Testing is a combination of art and science used to achieve a high level of confidence in our code.