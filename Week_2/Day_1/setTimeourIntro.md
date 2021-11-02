# setTimeout ---- setTimeout(callback, delay)
setTimeout is used to delay the execution of some code to later. We specify the code via a callback, and the delay in ms.

The setTimeout function can actually take in more parameters, and isn't limited to just two. However, for our purposes, this simplified view of it is acceptable.

EX:
```javascript
console.log('first line');
setTimeout(() => {
  console.log('timeout line');
}, 1000);
console.log('last line');
```
Output:
```shell
first line
last line
timeout line
```
## What's It Used For?
Almost all web applications (websites) in the wild like to schedule something to occur a bit later on their webpage(s) and therefore use setTimeout.

Below are some examples of setTimeout on websites.

1. Some sites will show a notice to the user and then ***automatically hide it after a few seconds.*** That's accomplished via setTimeout
2. In Gmail or other web-based email clients, ***a yellow "disconnected" message popus up at the top if we go offline.*** It usually indicates that it will retry to connect after x seconds. This countdown and its retry is implemented using setTimeout.
3. Some websites like to ***pop open an in-browser chat button after a few seconds.*** setTimeout is used to make them appear with a short delay.
4. If you use an Adblocker browser extension, you've likely ***seen prompts from websites asking us to disable them for that site. These don't come up right away and instead are delayed by a few seconds.*** The delay here would be implemented using setTimeout.
## Our Goals
While setTimeout is indeed a very core and fundamental part of JavaScript, for every JS developer to know about, our reason for introducing it here and now is to practice asynchronous programming in JavaScript.
## Conclusion
* The setTimeout function is ***used to defer code execution*** by a specified number of milliseconds
* ***A callback is passed in to setTimeout*** and setTimeout calls it after x ms
* It's **used on many websites** to delay a message or response
* We are learning about it for purposes of practicing async programming in JS