# Little note on Arrow Functions
* Arrow Function syntax can vary based on how simple the function is
* **Arrow functions don't get assigned a value for** ```this``` (in the way that traditional function expressions do).
  * This "limitation" is in fact intentional, and can be used as an advantage **in certain situations - situations where it is beneficial to inherit the value of this from its lexical scope**. 

## Lexical Scope
### What is Lexical Scope in JavaScript?
* Lexical scope is the definition area of an expression.

In other words, an item's lexical scope is ***the place in which the item got created.***

```javascript
// Define a variable in the global scope:
const myName = "Oluwatobi";

// Call myName variable from a function:
function getName() {
  return myName;
}
```
In the snippet above, notice that we defined the myName variable in the global scope and called it in the ```getName()``` function.

Question: Which of the two spaces is myName’s lexical scope? Is it the global scope or the getName() function’s local scope?

Answer: Remember that lexical scope means definition space — not invocation space. Therefore, myName’s lexical scope is the global scope because we defined myName in the global environment.