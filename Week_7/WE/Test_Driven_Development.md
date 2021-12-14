# Test Driven Development

The goal of Test-Driven Development is **"Clean code that works"**. The book "Test-Driven Development By Example" by Kent Beck, suggests that we follow two rules to achieve this goal.
  1. Write new code **only if an automated test has failed**
  2. Eliminate duplication

Some developers decide to use pure TDD, while others may apply it only in certain situations. It can be an excellent technique for new developers because it encourages the understanding of the requirements before we write a single line of application code.

## Red, Green, Refactor
We can call the process we use during test-driven development "Red, Green, Refactor".
  1. Red - **Write a small test** that **doesn't pass**.
  2. Green - Do the **minimal amount of work to make the test pass**.
  3. Refactor - **Improve the code**, continuing to ensure all tests still pass.

## Watch [Test Driven Development & Refactoring - JS Testing 101 with Jest](https://www.youtube.com/watch?v=6pYUzEduLyU) by LevelUpTuts.


# Summary
There is a clear development pattern used during the video. Write one or more failing tests (Red), make the tests pass (Green) and then refactor the code while ensuring that the tests continue to pass (Refactor). We have already used this technique without introduction during the implementation of our project.

The initial implementation in the video provides an excellent example of code that we should refactor. We feel more confident in refactoring brittle code once we have tests that give us immediate feedback.

We won't be using TDD for everything because we have already broken the first rule. We will need to add tests for features that already exist. Once we have done that and we have the confidence that the feature works, we can refactor it for a cleaner implementation.

