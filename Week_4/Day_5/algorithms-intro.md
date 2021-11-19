# Introduction to Algorithms
* In computer science, an algorithm is a set of steps that a computer takes to accomplish a task. We tell computers what to do by writing code, so an algorithm is the code that accomplishes a certain task.

# Introduction to Algorithm Complexity
* **Algorithmic complexity** is all about how fast or slow a particular algorithm is.
* Computer algorithms could run on an endless variety of different computers, languages and operating systems, making it very difficult to determine how long an algorithm would actually take to run.
* Even something simple like adding two numbers together: ```number1 + number2``` could take 0.0001 seconds in C on a brand new iPhone running the latest iOS version, but 0.5 seconds in Python on an old Raspberry Pi.
* Therefore we're going to forget about measuring the speed of an algorithm using time; it's too unreliable. So how do we measure how fast or slow a particular algorithm is? **We measure its speed by counting the number of elementary operations.**
  * The number of **operations that are so simple that they take a constant amount of time to perform.**

### Each of the following are elementary operations:

* ```let number = 0;```
* ```number += 2;```
* ```console.log(number);```

***We can count up all of the elementary operations that an algorithm performs and call that its running time.*** So if a an algorithm performs ```n``` elementary operations, we say ***the running time is n.***

# Elementary Operations
* An elementary operation is **any operation that takes a fixed amount of time to perform**, *no matter what the data is.*

* The following operation adds two numbers together:
```javascript
number1 + number2;
```
* This operation relies on 2 variables, ```number1``` and ```number2```.
* This takes a fixed amount of time because no matter what ```number1``` and ```number2``` are, this will always take the same amount of time.
* **1+2** will take the same amount of time as **1234+5678**. ***There is 1 elementary operation here, so the running time is 1.***
```javascript
console.log(someString);
```
* This operation relies on 1 variable, ```someString```. This **takes a fixed amount of time because it will always take the same amount of time to execute,** no matter what ```someString``` is. 
* ***There is 1 elementary operation here, so the running time is 1.***
```javascript
let result = 0;
result += number1;
result += number2;
console.log(result);
```
* How about this algorithm? How long will this one take to execute?
  * This algorithm is **performing 4 different operations.** 
  * It also relies on 2 variables, ```number1``` and ```number2```; but no matter what ```number1``` and ```number2``` are, these 4 operations will always take the same amount of time.
  * There are 4 elementary operations happening here, so the running time is 4.

# Elementary Operations
Take a look at the following algorithm that sums all the numbers in an array:
```javascript
let result = 0;

for (let i = 0; i < array.length; i++) {
  let number = array[i];
  result += number;
}

console.log(result);
```
This algorithm relies on 1 variable, array. What do you think is the running time of the algorithm above?

In order to determine this we can reorganize the algorithm a bit. **It's common to use ```n``` to represent the length of an array, so we will start using ```n``` when an operation gets executed ```array.length``` times.**
```javascript
let result = 0; // 1

for (
  let i = 0; // 1
  i < array.length; // n + 1
  i++ // n
) {
  let number = array[i]; // n
  result += number; // n
}

console.log(result); // 1
```
In case you're wondering, ```i < array.length``` gets executed ```n + 1``` times (an extra time) ***because there is an extra check at the end in order to stop the loop, when it goes over the length.***

Some of the operations in this algorithm will always take a fixed amount of time to execute, no matter what array is. **Other operations' running times will depend on the size of array.** For example, every operation that gets executed inside the for loop will get called ```n``` times, once for each item in the array.

Here's a list of each operation and its running time:
```javascript
1	n	n + 1
let result = 0;	i++	i < array.length;
let i = 0;	let number = array[i];	_
console.log(result);	result += number;	_
```
If we add them all together, we can get the running time of the entire algorithm ```3 + (n * 3) + n + 1``` which can be simplified to ```4 + (n * 4)```. A more conventional way to write this math expression is ```4n + 4```.

You can visualize the execution of this algorithm using: Python Tutor. This example also creates an array first, so there's one extra step.

## Conclusion
* An algorithm is any piece of code that performs a particular task or solves a particular problem
* Time complexity is commonly estimated by counting the number of elementary operations performed by an algorithm. It takes a fixed amount of time to perform an elementary operation.
* Time complexity is often referred to as running time
* Algorithms that don't deal with dynamic data, like loops, usually take constant time (no n involved)
* Algorithms that iterate over data, involve using n based on the size of the data
