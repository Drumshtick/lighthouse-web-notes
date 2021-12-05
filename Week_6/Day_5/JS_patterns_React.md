# JavaScript Patterns For React (Javascript, the React parts [HERE](https://reacttraining.com/blog/javascript-the-react-parts/))

## Semicolons [HERE](https://reacttraining.com/blog/javascript-the-react-parts/#semicolons)

Perhaps you've heard or seen that semicolons aren't exactly required in JavaScript. There has been a ton of debate on whether or not devs should use them anyways, but the main points usually boil down to:

* Point: You should use them because there are some edge cases where not having them can be a problem
* Counterpoint: True, but if we use Babel to "transpile" our code, Babel is going to take the code we wrote without semicolons and it's going to add them back in for us anyways, so why does it matter?
* Counterpoint: Yes, but... and it goes on and on

Whether you like or don't like them is totally up to you. One piece of tooling that seems to normalize the conversation a bit is [prettier.io](https://prettier.io/), a formatting tool which rewrites the code as you type, or as you save, or as you push -- whichever you prefer. With tools like prettier, many of the "what is your preference" conversations are going away because tooling helps to normalize the code.

      JavaScript requires semicolons but has a feature called "Automatic Semicolon Insertion" to catch the ones that we miss.

## Variable Declaration [HERE](https://reacttraining.com/blog/javascript-the-react-parts/#variables-var-let-and-const)

JavaScript has always had var, which creates function-scope (or global scope). This can be a little confusing sometimes and is not often what we need.

"Block Scope" can be easier to understand and manage which is why JavaScript got let, and const in ES2015. Here's a quick rundown of how all three work:
```js
// `var` is not block scope, it has global-scope in this
// case. Here, `name` always refers to the same thing
// because of that global scope.
var name = 'Michael'
if (true) {
  var name = 'Bruce'
  name // 'Bruce'
}
name // 'Bruce'

// `let` is block scope. This means if we declare name with
// `let` in the block of the if-statement, that `name` will
// be "Bruce" inside that block, and the outer `name` will
// still be "Michael"
let name = 'Michael'
if (true) {
  let name = 'Bruce'
  name // 'Bruce'
}
name // 'Michael'

// `const` is also block scope like let
const name = 'Michael'
if (true) {
  const name = 'Bruce'
  name // 'Bruce'
}
name // 'Michael'

// The difference is that `let` can be reassigned
let isOpen = true
isOpen = false
isOpen // false

// `const` cannot be reassigned
const isOpen = true
isOpen = false // throws error

// `const` in JavaScript does not mean it's a super
// global constant for the whole application like how
// other languages might have. In JS, it just means
// it's block scope and cannot be re-assigned for that 
// block.

// Although const cannot be reassigned, if the value
// is an array or an object, it's inner parts can be
// changed, as long as the array or object itself isn't
// reassigned
const list = []

// The `list` will always be this array, we can't change
// that, but we can modify the parts:
list.push('Michael')

// But this is not allowed, we cannot change (reassign)
// list to be something other than the array it started
// off to be
list = 'turn list into a string'
```

Over the next week, as we work through the material, we will notice that the majority of the examples use const.
  * A few examples use let out of necessity. The tendency for React developers to prefer a functional style **makes const the most common declaration.**

***We don't gain proper immutability with const. Objects can still have their internal structure modified when assigned to const variables.***

## Closures [HERE](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)

Closures: 
  * A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment).
  * In other words, a closure gives you access to an outer function’s scope from an inner function.
  * In JavaScript, closures are created every time a function is created, at function creation time.

### Lexical scoping
```js
function init() {
  var name = 'Mozilla'; // name is a local variable created by init
  function displayName() { // displayName() is the inner function, a closure
    alert(name); // use variable declared in the parent function
  }
  displayName();
}
init();
```

* ```init()``` creates a local variable called name and a function called ```displayName()```.
* The ```displayName()``` function is an inner function that is defined inside ```init()``` and is available only within the body of the ```init()``` function.
* Note that the ```displayName()``` function has no local variables of its own.
* However, since inner functions have access to the variables of outer functions, ```displayName()``` can access the variable name declared in the parent function, ```init()```.
* notice that the ```alert()``` statement within the ```displayName()``` function successfully displays the value of the name variable, which is declared in its parent function.
  * This is an example of **lexical scoping**, which describes **how a parser resolves variable names when functions are nested**.
  * The word lexical refers to the fact that lexical scoping uses the location where a variable is declared within the source code to determine where that variable is available. 
  * Nested functions have access to variables declared in their outer scope.

Closures are a core part of the JavaScript language that we don't have to think about often. As we introduce a feature of React called Hooks, we need to consider the use of closure to share values between functions declared in the same scope. This topic is a core concept that will not be clear immediately but will start to become clear with practice.

## String Literals [HERE](https://reacttraining.com/blog/javascript-the-react-parts/#string-literals)

This addition to the ES6 language is underrated. There are a lot of benefits to defining strings as multiline without having to use the characters like ```\n```.

The following jQuery code shows how this evolved syntax can lead to more declarative JavaScript.
```js
$(`
  <ul>
    <li>${escape(value)}</li>
  </ul>
`);
```

## Expressions vs Statements [HERE](https://reacttraining.com/blog/javascript-the-react-parts/#expressions-vs-statements-and-declarations)

it is important to know some things about expressions for React **since only expressions are allowed in JSX and not statements or declarations.**
```js
// If we're thinking in terms of statements, we might
// write code like this, with an If-Statement:
let result = null
if (someCondition) {
  result = 'Michael'
} else {
  result = 'Bruce'
}

// Here's how we might the same logic using a
// ternary operator, which is a type of expression
// because the line of code resolves to a single
// value for result
const result = someCondition ? 'Michael' : 'Bruce'
```

In this example, we have four separate expressions:

```js
const name = 'michael jackson'
const parts = name.split(' ') // parts: ['michael', 'jackson']
let first = parts[0] // first: 'michael'
first = first.toUpperCase() // first: 'MICHAEL'
```
Even though these are all expressions, JavaScript lets us combine and chain expressions together. In effect, all the expressions above can be rewritten into one expression:
```js
const name = 'michael jackson'
const first = name.split(' ')[0].toUpperCase()

// We could have even done this:
const first = 'michael jackson'.split(' ')[0].toUpperCase()
```

The most relevant consideration for the expression vs statement distinction is the compatibility with JSX. As we introduce JSX, the languages for describing DOM elements, it should become clear why we can only include expressions inline to our JSX code.

## Functions [HERE](https://reacttraining.com/blog/javascript-the-react-parts/#functions)
```js
// Function Declaration
function getName() {
  return 'Michael'
}

// Function Expression
const getName = function() {
  return 'Michael'
}

// Arrow Function (Which is also an expression)
const getName = () => {
  return 'Michael'
}
```

The tradeoffs between function declarations and expressions is that **declarations can be "hoisted" and expressions cannot.** However, many times hoisting doesn't matter so most developers choose one or the other simply based on personal syntax preference.

### Arrow Functions are Special

One of the characteristics of an arrow function is that they don't create context so this inside the arrow function is the same as the this on the outside.

Arrow functions can also be really compact. Look at these two examples that do the exact same thing:
```js
const getName = () => {
  return 'Michael'
}

// Same as above but more compact
const getName = () => 'Michael'
```

When arrow functions omit their curly-braces, it means we want the thing on the right-hand side of the fat arrow to be the return (without saying return). This is called an implicit return.

It can be very confusing to know how to declare functions. When creating functions in JSX, we need to use expressions.

We will express our inline functions using the shorter arrow syntax. The arrow functions handle the context of this differently than other functions.

        The details on this context regarding React are not important until we start using Classes.

## Shorthand for Object Methods [HERE](https://reacttraining.com/blog/javascript-the-react-parts/#shortand-for-object-methods)

You can drop off the ```:``` and the word function for methods when defining them:
```js
const obj = {
  insteadOfThis: function() {
    // do stuff
  },

  youCanDoThis() {
    // do stuff
  }
}
```

Note that the above is not an arrow function, just a shorter syntax for object methods.

### Object Destructuring

Object destructuring is a way to take an object and to pull out its internal properties into variables outside of the object:

```js
const obj = { x: 1, y: 2 }

// instead of:
const x = obj.x
const y = obj.y

// We can "destructure" the values into ordinary
// variables:
const { x, y } = obj
x // 1
y // 2

// you can use this all over the place, like function
// parameters. Notice how we're passing just one thing
// (an object) into the add function. If the function
// is expecting an argument, it can destructure the
// values right in the parameter list.
function add({ x, y }) {
  return x + y
}
add({ x: 3, y: 4 }) // 7
```

It can be a little confusing at first because now curly-braces are used to make objects and to destructure them depending on context. So how can you tell?
```js
// If the curlies are on the right-hand sign of the
// expression (equal sign) then we're making an object
const obj = { x: 1, y: 2 }

// If they're on the left-hand side (or the receiving
// side as with parameters), then it's destructuring:
const { x } = obj
x // 1
```

### Array Destructuring

Array destructuring works almost the same as Object Destructuring but with square-brackets instead of curly-braces:
```js
const arr = ['michael', 'jackson']
const [first, last] = arr
first // michael
last // jackson
```
The other difference between them is that objects have property names so those have to be used in the destructuring part. **Since array values are numerically ordered and without names, the order that we destructure is tied to what value we get** -- in other words, first is the first variable in the destructure so it gets the first value of the array.

There are a few common use cases for array destructuring. When we start working with React Hooks we will use it to gain access to two values returned from a function.

In this example, useState returns two values encoded into an Array. javascript ```const [state, setState] = useState("Initial Value");```

We can name these variables anything that we want.
```js
const [message, setMessage] = useState("Initial Value");
```
Object destructuring allows us to rename values in an object, but that syntax can be clumsy for this purpose. In this example, we accept that useState always returns an array. The order of the values in the array matters.

Array destructuring is also useful when combined with Promise.all.
```js
Promise.all([
  Promise.resolve("a"),
  Promise.resolve("b"),
  Promise.resolve("c")
]).then(all => {
  const [a, b, c] = all;
  console.log(a, b, c); // a b c
});
```
We can shorten this more by destructuring in the function expression. Notice that the () brackets are used to wrap the [].
```js
Promise.all([
  Promise.resolve("a"),
  Promise.resolve("b"),
  Promise.resolve("c")
]).then(([a, b, c]) => {
  console.log(a, b, c); // a b c
});
```

### Property Shorthand

Property Shorthand lets you type less if a property name matches the variable name in an object:
```js
// Instead of having to type name twice like this
const name = 'Michael'
const person = { name: name }

// If the property and the variable are the same you can just
// type it like this and omit the colon and the double word
const person = { name }
```

### ...Spread Syntax COOL!

When creating objects or arrays, there is a new way to create properties from the properties of an existing object or array. This is much easier shown in code than explained:
```js
// Let's say you have this array
const person = ['Michael', 'Jackson']

// If you were to add the above array to a new one like this:
const profile = [person, 'developer']

// The end result would be an array in an array like this:
profile // [['Michael', 'Jackson'], 'developer']

profile[0] // this is an array
profile[1] // this is the string 'developer'

// However, if we had made profile like this with ...
const profile = [...person, 'developer']

// Then the end result would be this:
profile // ['Michael', 'Jackson', 'developer']

// The same concept works with objects
const person = { first: 'Michael', last: 'Jackson' }
const profile = { ...person, occupation: 'developer' }
profile // { first: 'Michael', last: 'Jackson', occupation: 'developer' }
```

### ...Rest Syntax

This might look similar to "spread" but the difference is that ```...``` rest is not used to build objects or arrays, **it's used to break then down into pieces.** Here's an example of rest while destructuring:
```js
const profile = { first: 'Michael', last: 'Jackson', occupation: 'developer' }
const { occupation, ...rest } = profile
occupation // developer
rest // { first: 'Michael', last: 'Jackson' }
```

Remember, destructuring is a way to break an object or an array apart into pieces. The above code makes an ordinary string variable called occupation through destructuring. The three dots ```...``` followed by a variable name means we want all the rest of the properties into this rest object. Note that ```...``` can be used while destructuring arrays as well. Also, the variable name doesn't have to be "rest". We could have done ```...whatever```.

The next form of rest comes in the form of function parameters:
```js
function myFunction(first, last, ...rest) {
  return rest
}

console.log(myFunction('Michael', 'Jackson', 'Developer', 'California'))
// output: ['Developer', 'California']
```

The function parameters is suggesting that it wants a first and last name as its first two arguments, but anything you pass in after that will all be added to rest as an array.

The main difference is that you will find it on the left side of the = operation. It is used to extract the values that we don't include in the destructuring list. The rest syntax is not as widely used as the spread syntax.

### ES Modules

Organizing and breaking your app into different re-usable files is key for a React application. Each JavaScript file is called a "module". In order to let modules work together, they need to be able to import and export code between them. While ES Modules aren't natively supported in browsers (yet), we use Webpack (or Rollup) and Babel to re-write our code that has modules into something the browser does understand.

In NodeJS, the "pattern" developed for this is "CommonJS" or (cjs). Here's what it looks like:
```js
const SomeModule = require('some-module)
SomeModule.someMethod()

// more code here...

module.exports = SomethingToExport
```

"ES Modules" is an alternative pattern that is mostly compatible with CommonJS but has a different syntax:
```js
import SomeModule from 'some-module'
SomeModule.someMethod()

// more code here...

export default SomethingToExport
```

Or we can do a destructuring-like syntax on the import:

```js
import { someMethod } from 'some-module'
someMethod()

// more code here...

export default SomethingToExport
```

### Some good array methods for REACT

#### ```Array.isArray()```
```js
// Check to see if a value is an array
const myArray = ['hello']
console.log(Array.isArray(myArray)) // true
```
#### ```.map()```
Map takes an array, iterates over it with a function and whatever the function returns will be the replacement value for the item we're currently on:
```js
const myArray = [1, 2, 3, 4]
const result = myArray.map(function(item) {
  return item + 5
})
console.log(result) // [6, 7, 8, 9]

// The above could have also been written like this with
// an arrow function:
const result = myArray.map(item => item + 5)
```
#### ```.reduce()```
Reduce is similar to .map in that it iterates over an array but the end result is just one value instead of replacing all the values in the array:
```js
// Let's add up all the values to get one value of 10
const myArray = [1, 2, 3, 4]
const total = myArray.reduce(function(tally, current) {
  return tally + current
}, 0)
console.log(total) // 10
```
The callback function will give us **two important arguments**. **The first is a running tally** of what we've made so far. **The second is the current item we're iterating over** (in our case the numbers). So, you can see that we're just taking what we have so far and adding each number to it. The only problem is we need tally to start off as 0 otherwise the first iteration won't know how to add things. **That's where the second argument for reduce() comes in -- the first being the function and the second being a starting value for the "accumulator" which we're calling tally**

The above could have also been written as an arrow function:
```js
const total = myArray.reduce((tally, current) => tally + current, 0)
```
#### ```.filter```
Filter gives us a new array with the same values, but only if the iterator function returns true:
```js
const myArray = [1, 2, 3, 4]
const result = myArray.filter(function(item) {
  const isBiggerThanTwo = item > 2
  return isBiggerThanTwo
})
console.log(result) // [3, 4]

// An an arrow function
const result = myArray.filter(item => item > 2)
console.log(result) // [3, 4]
```
The first example clearly shows that we need to return a boolean based on if the input number is bigger than two. This can be simplified into an arrow function with an implicit return.

#### ```.find```
Find is similar to Filter but instead of returning an array, only the first item to get true returned from the iterator function is returned from Find:
```js
const people = [{ id: 3, name: 'Michael'}, {id: 5 name: 'Bruce' }]
const person = people.find(item => item.id === 3)
console.log(person) // { id: 3, name: 'Michael'}
```

## Computed Property Names [HERE](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names)

Starting with ECMAScript 2015, the object initializer syntax also supports computed property names. That allows you to put an expression in brackets [], that will be computed and used as the property name.

```js
// Computed property names (ES2015)
let i = 0
let a = {
  ['foo' + ++i]: i,
  ['foo' + ++i]: i,
  ['foo' + ++i]: i
}

console.log(a.foo1) // 1
console.log(a.foo2) // 2
console.log(a.foo3) // 3

const items = ["A","B","C"];
const obj = {
[items]: "Hello"
}
console.log(obj); // A,B,C: "Hello"
console.log(obj["A,B,C"]) // "Hello"

let param = 'size'
let config = {
  [param]: 12,
  ['mobile' + param.charAt(0).toUpperCase() + param.slice(1)]: 4
}

console.log(config) // {size: 12, mobileSize: 4}
```

This feature is an improvement to the developer experience. In the past we would have to write the following code.
```js
var STATUS_SUCCESS = "STATUS_SUCCESS";
var STATUS_FAILURE = "STATUS_FAILURE";

var messages = {};

messages[STATUS_SUCCESS] = "Updated";
messages[STATUS_FAILURE] = "Error";
```

With the update to the object literal syntax, we can perform the creation and assignment using a single expression.
```js
const STATUS_SUCCESS = "STATUS_SUCCESS";
const STATUS_FAILURE = "STATUS_FAILURE";

const messages = {
  [STATUS_SUCCESS]: "Updated",
  [STATUS_FAILURE]: "Error"
};
```

## Short-Circuiting with &&

You already know how && works in If-Statements, but perhaps you didn't know they are used to do what is called "short circuiting". Here's how it works:

```js
function one() {
  console.log('one was called')
  return false
}
function two() {
  console.log('two was called')
  return false
}

if (one() && two()) {
  console.log('Here we go!')
}

// The only output of this code is "one was called" because of
// short circuiting

```

* The output for "Here we go!" is not going to happen because the two function calls return false.
* But why is the function two() not called at all? We know it wasn't called because we never get "two was called".
* The reason is that most programming languages short-circuit, which means when the thing before && is false, then there's no point in checking the rest of the expression because one thing being false means the end result has to be false. Maybe you know most of that but never thought of it that way.

We can take advantage of && and short-circuiting in other place besides if-statements:
```js
// This will cause an error if `users` is not an array
function findById(users, id) {
  return users.find(item => item.id === id)
}

// Now we are returning the person if `users` is an array
// If `users` is not an array, we the value whatever is before
// && which is `false` in that case
function findById(users, id) {
  return Array.isArray(users) && users.find(item => item.id === id)
}
```