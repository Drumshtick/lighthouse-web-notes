# Case against switch

The **most common pattern used for reducer functions is the switch/case**. It is common in library documentation, open source projects, and tutorials. Before we proceed, we should learn about some of the pitfalls of switch/case.

## Switch/Case and Alternatives

#### Read Why I [Prefer Objects Over Switch Statements](https://enmascript.com/articles/2018/10/22/why-I-prefer-objects-over-switch-statements) by Enmanuel Durán to learn about some of the downsides to this approach.

Let's quickly see how a typical switch statement looks like:
```js
switch (expression) {
    case x: {
        /* Your code here */
        break;
    }
    case y: {
        /* Your code here */
        break;
    }
    default: {
        /* Your code here */
    }
}
```

Excellent, Now there are a couple of things you may not know you need to pay attention to:

### The break keyword is optional.
The break keyword allows us to stop the execution of blocks when a condition is already met. If you don't add the break keyword to your switch statement it wont throw an error. Having a break keyword missing by accident could mean executing code that you don't even know is being executed, this also adds inconsistency to our implementations, mutations, memory leaks and complexity layers when debugging problems. Let's see a representation of this problem:
```js
switch ('first') {
    case 'first': {
        console.log('first case');
    }
    case 'second': {
        console.log('second case');
    }
    case 'third': {
        console.log('third case');
        break;
    }
    default: {
        console.log('infinite');
    }
}
```
If you execute this piece of code in your console you'll see that the output is
```sh
firt case
second case
third case
```

The switch statement executes the block inside the second and third case even though the first case was already the correct one, **it then finds the break keyword in the third case block and stops the execution**, no warnings or errors in the console to let you know about it, this is the desired behavior.

### The curly brackets on each case are NOT mandatory.
Curly brackets represent blocks of code in javascript, since ECMAscript 2015 we can declare blockscoped variables with the use of keyworkds like const or let which is great (but not so great for switch cases), since curly brackets are not mandatory we could get errors because of duplication of variables, let's see what happens when we execute the code below:
```js
switch ('second') {
    case 'first':
        let position = 'first';
        console.log(position);
        break;
    case 'second':
        let position = 'second';
        console.log(position);
        break;
    default:
        console.log('infinite');
}
```
we would get:
```sh
Uncaught SyntaxError: Identifier 'position' has already been declared
```

This returns an error because the variable position has already been declared in the first case and since it does not have curly brackets it's being hoisted, then by the moment the second case tries to declare it, it already exists and BOOM.

Now imagine the things that could happen when using the switch statements with inconsistent break keywords and curly brackets:
```js
switch ('first') {
    case 'first':
        let position = 'first';
        console.log(position);
    case 'second':
        console.log(`second has access to ${position}`);
        position = 'second';
        console.log(position);
    default:
        console.log('infinite');
}

```

This will console log the following:
```sh
first
second has access to first
second
infinite
```
Only imagine, the amount of errors and mutations that could be introduced because of this, the possibilities are endless... Anyway, enough of switch statements, we came here to talk about a different approach, we came here to talk about objects.

### Objects for safer lookups
Object lookups are fast and they're faster as their size grow, also they allow us to represent data as key value pairs which is excelent for conditional executions.

### Working with strings
let's start with something simple like the switch examples, let's suppose we need to save and return a string conditionally, using objects we could do:
```js
const getPosition = position => {
    const positions = {
        first: 'first',
        second: 'second',
        third: 'third',
        default: 'infinite'
    };

    return positions[position] || positions.default;
};

const position = getPosition('first'); // Returns 'first'
const otherValue = getPosition('fourth'); // Returns 'infinite'
```
This would do the same job, **if you want to compact this implementation even more, we could take even more advantage of arrow functions:**
```js
const getPosition = position =>
    ({
        first: 'first',
        second: 'second',
        third: 'third'
    }[position] || 'infinite');

const positionValue = getPosition('first'); // Returns 'first'
const otherValue = getPosition('fourth'); // Returns 'infinite'
```

This does the exact same thing as the previous implementation, we have achieved a more compact solution in less lines of code.

Let's be a little more realistic now, not all the conditions we write will return simple strings, many of them will return booleans, execute functions and more.

## Working with booleans

I like to create my functions in a way that they return consistent types of values, but, since javascript is a dynamically typed language there could be cases in which a function may return dynamic types so I'll take this into account for this example and I'll make a function that returns a boolean, undefined or a string if the key is not found.
```js
const isNotOpenSource = language =>
    ({
        vscode: false,
        sublimetext: true,
        neovim: false,
        fakeEditor: undefined
    }[language] || 'unknown');

const sublimeState = isNotOpenSource('sublimetext'); // Returns true
```
Looks great, right?, but wait, seems like we have a problem... what would happen if we call the function with the argument 'vscode' or fakeEditor instead?, mmm, let's see:
  1. It'll look for the key in the object.
  2. It'll see that the value of the vscode key is false.
  3. It'll try to return false but since false || 'unknown' is unknown we will end up returning an incorrect value.

We'll have the same problem for the key fakeEditor.

Oh no, ok, don't panic, let's work this out:
```js
const isNotOpenSource = editor => {
    const editors = {
        vscode: false,
        sublimetext: true,
        neovim: false,
        fakeEditor: undefined,
        default: 'unknown'
    };

    return editor in editors ? editors[editor] : editors.default;
};

const codeState = isNotOpenSource('vscode'); // Returns false
const fakeEditorState = isNotOpenSource('fakeEditor'); // Returns undefined
const sublimeState = isNotOpenSource('sublimetext'); // Returns true
const webstormState = isNotOpenSource('webstorm'); // Returns 'unknown'
```

And this solves the issue, but... I want you to ask yourself one thing: was this really the problem here? I think we should be more worried about why we needed a function that returns a boolean, undefined or a string in the first place, that's some serious inconsistency right there, anyway, this is just a possible solution for a very edgy case.

### Working with functions
Let's continue with functions, often we find ourselves in **a position where we need to execute a function depending on arguments**, let's suppose we need to parse some input values depending on the type of the input, if the parser is not registered we just return the value:
```js
const getParsedInputValue = type => {
    const emailParser = email => `email,  ${email}`;
    const passwordParser = password => `password, ${password}`;
    const birthdateParser = date => `date , ${date}`;

    const parsers = {
        email: emailParser,
        password: passwordParser,
        birthdate: birthdateParser,
        default: value => value
    };

    return parsers[type] || parsers.default;
};

// We select the parser with the type and then passed the dynamic value to parse
const parsedEmail = getParsedInputValue('email')('myemail@gmail.com'); // Returns email, myemail@gmail.com
const parsedName = getParsedInputValue('name')('Enmanuel'); // Ret
```

If we had a similar function that returns another functions but without parameters this time, we could improve the code to directly return when the first function is called, something like:
```js
const getValue = type => {
    const email = () => 'myemail@gmail.com';
    const password = () => '12345';

    const parsers = {
        email,
        password,
        default: () => 'default'
    };

    return (parsers[type] || parsers.default)(); // we immediately invoke the function here
};

const emailValue = getValue('email'); // Returns myemail@gmail.com
const passwordValue = getValue('name'); // Returns default
```

### Common Code Blocks
Switch statements allows us to define common blocks of code for multiple conditions.
```js
switch (editor) {
    case 'atom':
    case 'sublime':
    case 'vscode':
        return 'It is a code editor';
        break;
    case 'webstorm':
    case 'pycharm':
        return 'It is an IDE';
        break;
    default:
        return 'unknown';
}
```
How would we approach this using objects?, we could do it in the next way:
```js
const getEditorType = type => {
    const itsCodeEditor = () => 'It is a code editor';
    const itsIDE = () => 'It is an IDE';

    const editors = {
        atom: itsCodeEditor,
        sublime: itsCodeEditor,
        vscode: itsCodeEditor,
        webstorm: itsIDE,
        pycharm: itsIDE,
        default: () => 'unknown'
    };

    return (editors[type] || editors.default)();
};

const vscodeType = getEditorType('vscode'); // Returns 'It is a code editor'
```

### Things to take into consideration
As expected all approaches have their downfalls and this one is not exception to the rule.
  1. Since we're using objects we will be taking some temporal space in memory to store them, this space will be freed thanks to the garbage collector when the scope in which the object was defined is no longer accesible.
  2. Objects approach could be less fast than switch statements when there are not many cases to evaluate, this could happen because we're creating a data structure and later accesing a key where in the switch we're just checking values and returning.

## Back to compass

If we write a reducer using this pattern, we would expect it to match the following code.
```js
function reducer(state, action) {
  switch (action.type) {
    case "add": {
      return state + action.value;
    }

    case "subtract": {
      return state - action.value;
    }

    default: {
      return state;
    }
  }
}
```

### Reducers with Lookup
We can apply an object lookup pattern to our reducer function.
```js
const reducers = {
  add(state, action) {
    return state + action.value;
  },
  subtract(state, action) {
    return state - action.value;
  }
};

function reducer(state, action) {
  return reducers[action.type](state, action) || state;
}
```
It works when the action.type is either "add" or "subtract". Otherwise it returns the current state.

## Using Constants
With any of these patterns, we can also define the action types as constant values instead. This technique can help prevent bugs due to incorrect spelling of strings. If we misuse a variable, we will get a ReferenceError.
```js
const ADD = "ADD";
const SUBTRACT = "SUBTRACT";

function reducer(state, action) {
  switch (action.type) {
    case ADD: {
      return state + action.value;
    }

    case SUBTRACT: {
      return state - action.value;
    }

    default: {
      return state;
    }
  }
}
```
With this modification, we also call the actions using the constant values. For example, to add three we would dispatch using dispatch({ type: ADD, value: 3 }).

To use the constant values with an object lookup, we need to take advantage of [computed property names]().

# Summary
We now have three different patterns we can choose from to create a reducer.
  * if conditions
  * switch/case
  * object lookup


In all scenarios, the important thing is that the reducer receives state and an action and can return the next state. The approach that we take to handle the action.type can differ based on style preferences.