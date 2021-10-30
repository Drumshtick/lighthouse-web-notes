# Requiring a Module
Here's the basic syntax to import a module from our local filesystem using require:
```javascript
const sayHelloTo = require('./myModule');
```
This assumes that we have a file called myModule.js in the same directory as the file that is requiring the module.

The file extension is not necessary, but it would also work:

const sayHelloTo = require("./myModule.js");
Common convention omits the the .js extension, since it is fairly redundant.

The imported object gets assigned to the variable, sayHelloTo in the above example.

# Exporting Modules
Instead of an empty object being exported, we need myModule to export the function. It looks like we didn't properly export our function. Let's complete that step.

Assign the defined function to module.exports.
```javascript
// myModule.js

const sayHelloTo = function(person) {
  console.log(`Hello, ${person}`);
}
// add this line to the end of the file.
module.exports = sayHelloTo;
```
Now our myModule file exports the functions instead of {} (an empty object).

Run main.js, which we now expect will finally work!

And indeed we can confirm that our main.js successfully requires and runs the function from myModule.

## Conclusion
We learned that in Node,

* modules are its way of organizing code into individual files
* every js file in node is implicitly a module
  * we can ```console.log(module)``` and see its details
* module.exports tells node what to export from a file
  * it defaults to ```{}```
* we can use require with relative paths (like ./myModule)
  * it doesn't need the .js extension, as that is implied