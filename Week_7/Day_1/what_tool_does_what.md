# What tool what? Who? Where am I?

There are four tools that we will use during the development of the "Interview Scheduler". Each one serves a different purpose. It is up to a developer to decide which environment they will use to develop and test their application.

* If you want to **manually test your components in isolation**: use ***[Storybook](https://storybook.js.org/docs/react/get-started/introduction)***.
* If you want to **run your entire application in development mode**: use ***[webpack-dev-server](https://webpack.js.org/configuration/dev-server/)***.
* If you want to **run unit or integration tests from the command line**: use ***[Jest](https://jestjs.io/)***.
* If you wan to **run automated end-to-end tests in the browser** (UI): use ***[Cypress](https://www.cypress.io/features/)***.


Most of the development for Interview Scheduler will be done using Storybook and webpack-dev-server. Some tests will be run using Jest, however many other tests will be run in the next module.