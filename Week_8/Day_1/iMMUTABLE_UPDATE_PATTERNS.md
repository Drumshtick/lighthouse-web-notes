# Immutable Update Patterns

When we ```setState``` we need to **ensure that we are replacing the state**, and ***not changing the existing state***.

## Copying an Object

We will start with the ```copy``` pattern. **The goal is to create a clone of an object**, ***not a reference*** to the existing object.

```js
const original = { one: 1 };
const bad = original;
const good = { ...original };

console.log(original === original); // true
console.log(original === bad); // true
console.log(original === good); // false
```

***Using the ```spread``` operator, we take the first level of keys and copy them into the object.***

#### This will **only copy the first level of keys**. The example below **shows how the copy two levels.**

```js
const original = { one: 1, sub: { two: 2 } };
const copy = { ...original, sub: { ...original.sub } }; // Multi level objects

console.log(original === copy); // false
console.log(original.sub === copy.sub); // false
```

The best way to avoid complexity like this is to ***keep your state nesting to a minimum***. This complexity is one of the reasons we have structured the data in a normalized form. We can focus on the top level of appointments instead of having to modify nesting arrays of objects.

## Adding to an Object
To add to an existing object, **we can use the spread operator**. The ***order that we declare the keys determines the write priority***. All of the keys in original will get added to the new object. ***Any keys listed after are either new or will replace existing values.***
```js
const original = { one: 1 };
const copy = { ...original, two: 2 };

console.log(original === copy); // false

/* original */
{
  one: 1
}

/* copy */
{
  one: 1,
  two: 2
}
```

## Updating an Object
An update **takes advantage of the fact that keys declared later in the object overwrite previous values.**
```js
const original = { one: 1, two: 3 };
const copy = { ...original, two: 2 };

console.log(original === copy); // false

/* original */
{
  one: 1,
  two: 3
}

/* copy */
{
  one: 1,
  two: 2
}
```

## Merging Multiple Objects
We accomplish **a merge by spreading two or more objects into a new object**.
```js
const first = { one: 1 };
const second = { two: 2 };
const copy = { ...first, ...second };

console.log(copy === copy); // true
console.log(first === copy); // false
console.log(second === copy); // false

/* first */
{
  one: 1
}

/* second */
{
  two: 2
}

/* copy */
{
  one: 1,
  two: 2
}
```

# Summary
There are a lot of resources available that allow us to dive deeper on these patterns. *If we come across a situation where we need to learn a new pattern, we can search for "immutable update patterns"*. **Some libraries provide more advanced immutability features**. To understand, at a high level, what these libraries are doing, we are starting with some basic examples.