# Reading Data Structures

## Defining Data Structures

**Data structure** is a broad term that covers *all of the ways that we can store data in our programs.* 
  * If the term variable comes to mind, it would be accurate since this is where we store data. However, *not all variables in JavaScript can qualify as being a data structure.*

Variable types like 
  * undefined
  * Boolean
  * Number
  * String
  * BigInt
  * Symbol
  * Are *called Data Types since they hold only one value.*

```js
const aSimpleString = 'Hello!';
```

For this variable, we can see that the variable aSimpleString holds the string value Hello!.

Variable types such as **Object, Array, Date, and Map are called Structural Types.**
  * They represent a structure that will hold data for us in a specific way.
  * In ```JavaScript```, **Array, Date, and Map** *are constructed from the Object structural type*, so **they are technically sub-categories of the Object type.**

```js
const aListOfGreetings = [];
```

This is a valid way to declare an Array type, but it is just a structure with no values inside. Based on the name of the variable, we can infer that it will hold greetings.
```js
  const aListOfGreetings = [ 
    'Hello!', 
    'Bonjour!', 
    '¡Hola!' 
  ];
```

Once populated, we see that **we have an Array as the structure**, ***with values inside that are all of the ```String``` type***.

Depending on the context, our list of greetings could be stored in an Object structure since they are variations of greeting per language.
```js
  const aListOfGreetings = { 
    english: 'Hello!', 
    french: 'Bonjour!', 
    spanish: '¡Hola!' 
  };
```
Based on the examples of our previous list of greetings, we can see that data structures by themselves are like empty shelves waiting to have things placed on them. Now, what kind of shelves should we use?

## Arrays vs. Objects

Why would we store data in two different data structures? Technically, we could put everything in objects all the time, but that could quickly because problematic depending on the operations we want to perform on the data. Let's see the pros and cons of arrays and objects.

### When To Use Arrays

Arrays are **great at storing information in order and are often used to store a collection of *independent* items.** An array would then be a good choice if we wanted to *store something like a list of tasks, a browser history, etc..*
```js
  const listOfTasks = ['grocery shopping', 'sing in the rain', 'write a tutorial'];
  const browserHistory = ['Google', 'Pictures of cat', 'More pictures of cats'];
```
Where **arrays become problematic is when we want to create, read, or modify elements that are not at the beginning or the end of the array.** This means we need to first find the item in the array. So, we need to iterate through the array, retrieve the index, then execute our modifications.

Another problematic usage of an array would be if we use one to store related data, such as a list of characteristics that are associated with the same thing. For example, consider storing information about an animal:
```js
  const animal = ["cat", 9001, 'Strawberry Pop-Tart'];
```
We can guess that cat is the type, but what about 9001 and 'Strawberry Pop-Tart'? If it was stored inside an object, we could have keys describing the properties like so:
```js
  const animal = {type: "cat", coolness: 9001, color: 'Strawberry Pop-Tart'};
```

### When To Use Objects
Objects are great to store related information with labels. Here, order is not important. As long as appropriate labels are attached to the proper values, it will be easy to access and manipulate those values.
```js
  const userAccount = {
    username: "pollo", 
    password: "pockpock", 
    email: "cuckoo@rico.com"
  };

  const anotherUserAccount = {
    email: "croak@croak.com", 
    username: "froggy", 
    password: "ribbit"
  };

  const tree = {
    type: "leafy", 
    name: "Maple Tree", 
    latin_name: "Acer saccarhum"
  };
```
When order is important, objects can become problematic. How can we remove the last key-value pair if we're not sure of the order? In the example above, our two users don't have the keys in the same order. It's also problematic when we have a list of independent items like a list of individual tasks.
```js
  const notAGreatTaskList = {
    task1: 'shopping', 
    task2: 'sing in the rain', 
    task3: 'write a tutorial'
  };
```
Since we need to create the keys ourselves, it's an extra process that can lead to some consistency issues. It will also be slower to access the values, since we need to process the object first.

## What's Next?
Now that we have reviewed the definition of data structures, we will review interacting with simple structures like an Array or an Object and then we will slowly ramp up the complexity of structures. Here are some examples of data structures we will play with in the next activity:

### An array of strings
```js
  ["1084", "1075", "80CrV2", "S30V", "420HC"]
```
### An object containing strings, numbers and date
```js
  {
    name:  "Francis Bourgouin",
    email: "little_chicken@gmail.com",
    wins:  7,
    date:  "2020-11-05T18:41:53Z"
  }
```
### An object containing arrays, containing strings
```js
{
  carbonSteel:    ["1084","1075","80CrV2"],
  stainlessSteel: ["S30V", "420HC"]  
}
```
### An array containing objects, containing strings
```js
[
   {
    name:  "Dainton Markham",
    email: "d.markham@mail.com"
  },
  {
    name:  "Heidi Dalton",
    email: "heidi.d@mail.com"
  },
  {
    name:  "Amalia Rawlings",
    email: "amalia_rawlings@mail.com"
  }
]
```