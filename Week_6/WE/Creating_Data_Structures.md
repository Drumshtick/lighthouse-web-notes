# Creating Data Structures

## Building Simple Data Structures

If somebody tasked us **with the job of building a structure that will contain a list of all the names of a group of people**, what should we do? If we think about the relationship between names, **we can realize that those names are all independent of each other.** One name isn't associated with another name.

List of names
* Dilan Tanner
* Buddy Murillo
* Sophia Skinner
* Antony Hale

Normally, we would use an array for this type of data, like so:
```js
  ['Dilan Tanner', 'Buddy Murillo', 'Sophia Skinner', 'Antony Hale']
```

What if we **want to record more than just the names of the group? We also want to record their student ID and how many classes they are in.** The first thing we should do is to see how we can hold that data for one person in the group.

*These data points are related information because name, student id, and the number of classes are properties that define a specific individual.* **An object would be the best choice since we can use the properties as keys.**
```js
  {
    name: String,
    studentId: String,
    numberOfClasses: Number
  }
```

Now that we've built the structure, we can fill it with the information of a student to see how it will look. Let's consider ```Buddy Murillo```, whose student id is ```MURB090909```. Buddy is in two (```2```) classes.
```js
  {
    name: "Buddy Murillo",
    studentId: "MURB090909",
    numberOfClasses: 2
  }
```

            The reason we should build the structure first and populate it second is because it's easier to concentrate on first making good, meaningful key names that are associated with the data type each key will receive. Filling in the data then becomes trivial.

## Building Bigger Data Structures

What about **combining an array and an object?** For the next example, we'll create an object containing the name, student id and number of classes for each person. Then we'll put each object in an array to contain the entire group of people.

Personal Information
* Buddy Murillo (id MURB090909) is in two classes.
* Dilan Tanner (id TAND060606) is in five classes.
* Sophia Skinner (id SKIS424242) is in one class.
* Antony Hale (id HALA101010) but isn't yet in any classes.
* Let's consider how one person's information will be stored:
```js
 {
    name: String,
    studentId: String,
    numberOfClasses: Number
  }
```
We will use the same structure as the previous example. Let's see how it looks when we put it in an array:
```js
  [
    {
      name: String,
      studentId: String,
      numberOfClasses: Number
    },
    {
      name: String,
      studentId: String,
      numberOfClasses: Number
    },
    ...
  ]
```

Now that we made our structure, let's populate it with information!
```js
  [
    {
      name: "Buddy Murillo",
      studentId: "MURB090909",
      numberOfClasses: 2
    },
    {
      name: "Dilan Tanner",
      studentId: "TAND060606",
      numberOfClasses: 5
    },
    {
      name: "Sophia Skinner",
      studentId: "SKIS424242",
      numberOfClasses: 1
    },
    {
      name: "Antony Hale",
      studentId: "HALA101010",
      numberOfClasses: 0
    },
  ]
```
**Why isn't this a good structure for frequent modifications** to the data? With this structure, **we have to iterate through the array and read each record until we find the person** we need to update. This takes considerably more time. However, what if we had keys to easily access a specific person so we didn't have to find them? To achieve this, **we could use an object to contain all the records instead of an array.**

```js
  // old version
  [
     {
      name: String,
      studentId: String,
      numberOfClasses: Number
    },
    ...
  ]

  // with keys!
  {
    studentId: {
      name: String,
      studentId: String,
      numberOfClasses: Number
    },
    ...
  }
```

If we change the container of our group from an array to an object, then it will be easier to change values and a lot faster! In the example above, we're using studentId as the key for each person since it's unique.
```js
  {
    "MURB090909": {
      name: "Buddy Murillo",
      studentId: "MURB090909",
      numberOfClasses: 2
    },
    "TAND060606": {
      name: "Dilan Tanner",
      studentId: "TAND060606",
      numberOfClasses: 5
    },
    "SKIS424242": {
      name: "Sophia Skinner",
      studentId: "SKIS424242",
      numberOfClasses: 1
    },
    "HALA101010": {
      name: "Antony Hale",
      studentId: "HALA101010",
      numberOfClasses: 0
    }
  }
```

With this structure it will be much easier to update since we can use the studentId to target a specific person. In this example, we saw that we could build two different structures to hold the same values. Remember, there isn't one that is wrong and one that is right. It always depends on the use-case.

## Building Complex Data Structures

**Depending on the amount of information we want to store data structures may contain a lot of different substructures.** Those complex data structures are approached in the same way we did before, which means that no complex structure can resist the power of a step by step approach!

**Imagine that we need to store information about different types of metals.** We need to store the ```name```, ```type```, ```composition``` and ````forging temperatures````. As an example, we could have **1084 Carbon Steel** that has a **composition of a number of elements, including iron, carbon, manganese, phosphorus, and sulfur.** That **metal should be forged between 900°C and 1200°C**.

**The first we want to do here is to extract and organize this information.**
* The name of the metal is 1084
* The type of metal is Carbon Steel
* The metal is made of iron, carbon, manganese, phosphorus and sulfur
* The forging temperature range is between 900°C and 1200°C

We know that we will need to deal with other metals later, but let's concentrate on this one first and create a structure that will hold the information for that specific metal.
```js
{
    name: String,
    type: String,
    composition: ???,
    forgingTemp: ???
  }
```

The keys name and type are strings so they are easy to place in our structure, **however what can we do about composition and forgingTemp?**

A list of chemical elements would fit nicely in an array since each one is an independent piece of data. Since it is understood that every item in the composition array is a chemical element, we don't need keys to label the type of information. For the forging temperatures, we have two numbers - a minimum and a maximum - so each number should be labeled with a key and stored in an object.

```js
  // An array for the chemical elements

  ['iron', 'carbon', 'manganese', 'phosphorus', 'sulfur']

  // An object for the temperatures

  {
    min: 900,
    max: 1200
  }
```

Now that know how to deal with the composition and forgingTemp, let's put them in the object we're creating.
```js
  {
    name: String,
    type: String,
    composition: [ String, ...],
    forgingTemp: { min: Number, max: Number }
  }
```

We now have a complete data structure that we can use to store the properties of one metal. Neat!

```js
  {
    name: "1084",
    type: "Carbon Steel",
    composition:  ['iron', 'carbon', 'manganese', 'phosphorus', 'sulfur'],
    forgingTemp: { min: 900, max: 1200 }
  }
```

***After completing the data structure for one metal to see how it looks with content inside, let's move to the next step of building the structure that will hold multiple metals together.***

Should we use an array to store all the metals or an object? Since we will not need to modify specific elements often and we will mostly want to show all of them or a filtered version, an array would be the best choice here.
```js
  [
    {
      name: String,
      type: String,
      composition: [ String, ...],
      forgingTemp: { min: Number, max: Number }
    },
    {
      name: String,
      type: String,
      composition: [ String, ...],
      forgingTemp: { min: Number, max: Number }
    },
    ...
  ]
```
Let's see how it looks with a couple of metals:
```js
  [
    {
      name: "1084",
      type: "Carbon Steel",
      composition:  ['iron', 'carbon', 'manganese', 'phosphorus', 'sulfur'],
      forgingTemp: { min: 900, max: 1200 }
    },
    {
      name: "S30V",
      type: "Stainless Steel",
      composition:  ['iron', 'carbon', 'chromium', 'molybdenium', 'vanadium'],
      forgingTemp: { min: 975, max: 1200 }
    },
    {
      name: "420HC",
      type: "Stainless Steel",
      composition:  ['iron', 'carbon', 'nickel', 'chromium', 'silicon','manganese'],
      forgingTemp: { min: 1050, max: 1200 }
    }
  ]
```

## Summary
In this reading we took the time to think about the necessary steps to build data structures:
* Determine what data you need
* Determine what operations you need to perform on the data
* Organize the data
* Determine if certain data is related or independent and decide what kind of substructure is needed
* Start small, then grow your structure

By following those steps, we're sure to always create well-formed structures that organize our data in a logical and understandable way!

