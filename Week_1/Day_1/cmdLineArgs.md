# Command Line Arguments
What are Command Line Arguments?
Command line arguments are strings of text used to pass additional information to a program when an application is run through the command line interface (CLI) of an operating system. Command line arguments typically include information used to set configuration or property values for an application.

In most cases the arguments are passed after the program name in your prompt. An example of the syntax of command line arguments looks like this:
```bash
$ [runtime] [script_name] [argument-1 argument-2 argument-3 ... argument-n]
```
Here runtime can be anything that executes a program/script e.g. sh, java, node, etc. The arguments are usually separated by a space - however there are some runtimes that use commas to distinguish between multiple command line arguments. Also, depending on the program, you can pass arguments in the form of key-value pairs, which we'll see later in this article.

Why Use Command Line Arguments?
The following are some of the major benefits of using command line arguments:

You can pass information to an application before it starts. This is particularly useful if you want to perform large number configuration settings.
Command line arguments are passed as strings to your program. String data types can easily be converted to other data types within an application, making the arguments very flexible.
You can pass unlimited number of arguments via the command line.
Command line arguments are used in conjunction with scripts and batch files, which is particularly useful for automated testing.
And here are some of the disadvantages of using them:

The biggest disadvantage of passing information via the command line is that interface has steep learning curve, so it's difficult for most people to use unless they have a good deal of experience using CLI tools.
Command line applications can be difficult to use unless you're using a desktop or laptop computer, so they're not typically used on smaller devices like phones or tablets.
Passing Command Line Arguments in Node.js
Like many other languages, Node.js applications also accept command line arguments. By default Node will handle accepting the arguments for you, but there are also some great third party packages that add some very useful features.

In this section we'll show you how to use arguments via the built-in way (process.argv), as well as with the popular packages minimist and yargs.

Using process.argv
The simplest way of retrieving arguments in Node.js is via the process.argv array. This is a global object that you can use without importing any additional libraries to use it. You simply need to pass arguments to a Node.js application, just like we showed earlier, and these arguments can be accessed within the application via the process.argv array.

The first element of the process.argv array will always be a file system path pointing to the node executable. The second element is the name of the JavaScript file that is being executed. And the third element is the first argument that was actually passed by the user.

To avoid confusion, I'd like to remind you beginners out there that JavaScript uses zero-based indexes on arrays (like many other languages), which means that first element will be stored at "0th" index and last element will be stored at "n-1" index, where "n" is the total number of elements in the array.

Now let's write a simple Node script that prints all of the command line arguments passed to the application, along with their index. Copy and paste the following code to a file named "processargv.js".
```javascript
'use strict';

for (let j = 0; j < process.argv.length; j++) {
    console.log(j + ' -> ' + (process.argv[j]));
}
```
All this script does is loop through the process.argv array and prints the indexes, along with the elements stored in those indexes. It's very useful for debugging if you ever question what arguments you're receiving, and in what order.

Now, to run this type the following command. Just make sure you are in the directory where the "processargv.js" file is saved.
```bash
$ node processargv.js tom jack 43
```
Here we are passing three arguments to the "processargv.js" program. You will see that "tom" will be stored at 2nd index while "jack" and "43" will be stored at 3rd and 4th indexes, respectively. The output should look something like this:
```bash
$ node processargv.js tom jack 43
0 -> /Users/scott/.nvm/versions/node/v4.8.0/bin/node
1 -> /Users/scott/javascript/processargv.js
2 -> tom
3 -> jack
4 -> 43
```
You can see that first index contains the path to our node executable (which will likely have a different path than mine), the second index contains the path to the script file, and the rest of the indexes contain the arguments that we passed in their respective sequence.