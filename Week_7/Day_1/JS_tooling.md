# JavaScript Tooling

Building modern user interfaces requires the use of modern tools. **We need to learn a couple of the processes necessary to build, test and deploy modern web applications.** ***These processes are called "JavaScript Compilation" and "Module Bundling".***

The goal of this reading is to be able to recognize these terms. A full understanding won't be necessary in order to use these tools at this point.

## Babel: The JavaScript Compiler
Babel is a tool that is **used to convert ES2015+ JavaScript into a backwards compatible version of JavaScript.** This *means that we can use brand new or not yet released features of the JavaScript language* in our applications today.

An example taken from the [Babel documentation](https://babeljs.io/docs/en/) shows how an arrow function is converted to the equivalent ES5 compatible code.
```js
// Babel Input: ES2015 arrow function
[1, 2, 3].map((n) => n + 1);

// Babel Output: ES5 equivalent
[1, 2, 3].map(function(n) {
  return n + 1;
});
```

**Babel doesn't actually know about JSX.** Instead ***we configure Babel with some plugins***. These plugins enable Babel to convert JSX to valid JavaScript.
```jsx
// Babel Input: JSX
const element = <h2 className="name">Name</h2>

// Babel Output: ES5 equivalent
const element = React.createElement("h2", {
  className: "name"
}, "Name");
```

#### Convert some code using the [Babel online compiler](https://babeljs.io/repl#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=MYewdgzgLgBApgGzgWzmWBeGAeAFgJhmAQEMIIA5E1DAIjGrloD4rVsB6A5gKBn4FA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=false&presets=react&prettier=false&targets=&version=7.4.3&externalPlugins=).

## Webpack: The Module Bundler
Both ```CommonJS``` and ```ES6 Modules``` **allow us to define our dependencies**. 
  * ```CommonJS``` **is not built into the browser** 
  * ```ES6 Modules``` **are not fully supported by older browsers**. 
  * ```Webpack``` **pre-bundles all of our modules into one or more JavaScript files.**

Before npm there was no easy way to manage JavaScript module dependencies. The browser doesn't have a purpose built package manager. **We can install modules with npm and bundle them into our application with Webpack.**
```js
// print.js
export default function print(message) {
  console.log(message);
}

// format.js
export default function formatName(first, last) {
  return first + " " + last;
}

// index.js
import formatName from "./format.js";
import print from "./print.js";

print(formatName("Module", "Bundler"));

// Output: Module Bundler
```
```Webpack``` **starts by building a graph of module dependencies.** It is *a map of all the modules in the project with links between them*. The ```index.js``` file has two dependencies. **It uses the map to output a bundle.js file**. This example output is highly simplified. It clearly illustrates the most important concept. ***All of the source code is contained in a single file.***
```js
// bundle.js

const modules = {
  "./format.js": function(require) {
    return function formatName(first, last) {
      return first + " " + last;
    };
  },
  "./index.js": function(require) {
    const formatName = require("./format.js");
    const print = require("./print.js");

    print(formatName("Module", "Bundler"));
  },
  "./print.js": function(require) {
    return function print(message) {
      console.log(message);
    };
  }
};

function require(module) {
  return modules[module](require);
}

modules["./index.js"](require);
```

#### A **generated bundle** is ***a JavaScript file that has some code to help manage dependencies.***

### Video about the webpack build process [HERE](https://player.vimeo.com/video/332121237)
* Bundling may seem like overkill. These are tiny modules, but what about the code that you install using npm? **A module bundler allows us to easily include node_modules in our browser applications.**

## Summary
The mini-projects we completed in the last few days use a package called [create-react-app](https://facebook.github.io/create-react-app/), and don't require us to learn how to configure a project. **However, behind the scenes webpack and babel are providing the compiling and bundling capabilities needed for the project.**

There are many benefits to using tools like these to alter source code before deployment, including:
* **Embedding environment variables** into the code at build time
* **Removing code that does not ever get run**
* **Using features of JavaScript that aren't standard**
