# Readline
The readline module provides an interface for reading data from a Readable stream (such as process.stdin) one line at a time.

## Basic Use:
```javascript
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'process';

const rl = readline.createInterface({ input, output });

const answer = await rl.question('What do you think of Node.js? ');

console.log(`Thank you for your valuable feedback: ${answer}`);

rl.close();
```
Once this code is invoked, the Node.js application will not terminate until the readline.Interface is closed because the interface waits for data to be received on the input stream.

## rl.question(query[, options], callback)
* query {string} A statement or query to write to output, prepended to the prompt.
* options {Object}
  * signal {AbortSignal} Optionally allows the question() to be canceled using an AbortController.
* callback {Function} A callback function that is invoked with the user's input in response to the query.
The rl.question() method displays the query by writing it to the output, waits for user input to be provided on input, then invokes the callback function passing the provided input as the first argument.

When called, rl.question() will resume the input stream if it has been paused.

If the InterfaceConstructor was created with output set to null or undefined the query is not written.

The callback function passed to rl.question() does not follow the typical pattern of accepting an Error object or null as the first argument. The callback is called with the provided answer as the only argument.

Example usage:
```javascript
rl.question('What is your favorite food? ', (answer) => {
  console.log(`Oh, so your favorite food is ${answer}`);
});
```

## Event: 'close'
The 'close' event is emitted when one of the following occur:

* The rl.close() method is called and the InterfaceConstructor instance has relinquished control over the input and output streams;
* The input stream receives its 'end' event;
* The input stream receives Ctrl+D to signal end-of-transmission (EOT);
* The input stream receives Ctrl+C to signal SIGINT and there is no 'SIGINT' event listener registered on the InterfaceConstructor instance.
The listener function is called without passing any arguments.

The InterfaceConstructor instance is finished once the 'close' event is emitted.

# NOTE
This is the best working ex code
```javascript
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What do you think of Node.js? ', (answer) => {
  console.log(`Thank you for your valuable feedback: ${answer}`);

  rl.close();
});
```