# A Culture of Testing

For any project, testing has to be part of the plan. We need to allocate time to the process of writing and maintaining tests. With practice, testing can become a natural part of any workflow, even though it may seem restrictive at first.

## VIDEO Building a testing and quality driven culture at IBM ([REF](https://www.youtube.com/watch?v=zqdCM8zR6Mc))

## Strategy to building a test driven production style
  * Code changes must be sent as pull requests (so that when other devs pull from the repo they get code that works and doesnt break everthing)
  * A build pipeline runs tests automatically
  * New code must meet testing requirements
  * Code must meet quality guidelines
  * Changes must be peer reviewed and approved (before merge)

## Tests and quality checks can be automated
  * Linter an IDE plugins to help as code is written
  * Huskey and Git hooks check changes pre-push
  * TravisCI and Jenkins to build and test PRs
  * SonarCloud, code climate, Codacy for quality checks
  * Prettier to auto-fix code style

## Pull request procedures create a control flow
  * No force pushing
  * Creates a place for automated tests to run
  * Requires team participation

## Automating enforcement remove the need for a ***human code cop***

## Peer reviews create opportunities to learn and share knowledge

## Testable code is BETER CODE
  * Cleaner separation of different functionality
  * Fewer side-effects 
  * Better APIs because edge cases are tested for

