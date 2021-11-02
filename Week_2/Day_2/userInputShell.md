# Event Handling User Input
Let's just look at some code first:
```javascript
// on any input from stdin (standard input), output a "." to stdout
process.stdin.on('data', (key) => {
  process.stdout.write('.');
});
console.log('after callback');
```
Here we're using ```process.stdin``` as well as ```process.stdout```. As you may have guessed, stdin deals with "standard input", much like how stdout is for "standard output".

We use the on method on ```stdin``` to register a callback. Unlike ```setTimeout```, this callback is not scheduled to run x seconds later. No delay information is provided for this reason. Instead, it is meant to run any time the user provides input to the program. In our case, our callback function, which is called each time there is new user input data, simply prints a "." to the screen.

* The on function is a very common method name for registering callbacks to handle events.

As for the "after callback" output, this executes before any input. This is because on returns immediately, without running the callback code. It's job isn't to run the callback right away, but rather save it for later. In that way, it's similar to setTimeout, isn't it?

In order for this to actually work, there's a few more lines of code to setup stdin properly, as shown below. These configuration settings are not important to our learning of asynchronous programming right now, so we won't focus on them.
```javascript
const stdin = process.stdin;
// don't worry about these next two lines of setup work.
stdin.setRawMode(true);
stdin.setEncoding('utf8');

////////////
// Event Handling for User Input
////////////

// on any input from stdin (standard input), output a "." to stdout
stdin.on('data', (key) => {
  // \u0003 maps to ctrl+c input
if (key === '\u0003') {
  process.exit();
}
  process.stdout.write('.');
});

console.log('after callback');
```