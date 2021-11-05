# Special Keyword 'super' and Method Overriding
## Method Overriding and Super
### The problem
Sometimes *you want a subclass to have similar but slightly different behaviour to its superclass.* In our scenario, what if we want **all mentor bios to start with "I'm a mentor at Lighthouse Labs." before saying the "My name is ..." bit?**

#### Solution Part 1: Method Override
A simple way to solve it is to simply **override the bio method in the subclass,** like this:
```javascript
// Superclass
class Person {
  constructor(name, quirkyFact) {
    this.name = name;
    this.quirkyFact = quirkyFact;
  }

  bio() {
    return `My name is ${this.name} and here's my quirky fact: ${this.quirkyFact}`;
  }
}

// Subclass
class Mentor extends Person {
  // Completely re-define the bio method since it has more to say
  bio() {
    return `I'm a mentor at Lighthouse Labs. My name is ${this.name} and here's my quirky fact: ${this.quirkyFact}`;
  }
}

// The Student class doesn't need to define bio since it can just use the one from Person

// DRIVER CODE

const bob = new Mentor('Bob Ross', 'I like mountains way too much');
console.log(bob.bio());
```
*****When a subclass implements a method that already exists in the superclass, it is called method overriding.***** This is because it is indeed overriding the superclass's method. In this case, if we call bio on a mentor object, the *subclass's version of the method will get executed instead of the one on the superclass.*

While this is indeed the step in the right direction (since mentors have a slightly different bio), **it isn't ideal because we are repeating the logic** to display ```"My name is ${this.name} and here's my quirky fact: ${this.quirkyFact}"``` in both classes.

One approach to DRY this up, that you may be considering, is to define a shared method in the parent class called sharedBio which only returns this common/shared string. Since this is a common problem, perhaps OOP has a better way to solve it?

#### Solution Part 2: Use **super!**
It would be nice if the mentor's (subclass's) bio method could also just call the person's (superclass's) bio method. *Indeed OOP languages allow subclasses to have a reference on the parent class.* This is usually **done via the super keyword**, and JavaScript supports it too!
```javascript
// Super class
class Person {
  constructor(name, quirkyFact) {
    this.name = name;
    this.quirkyFact = quirkyFact;
  }

  bio() {
    return `My name is ${this.name} and here's my quirky fact: ${this.quirkyFact}`;
  }
}

class Mentor extends Person {
  // Mentor bios need to include a bit more info
  bio() {
    return `I'm a mentor at Lighthouse Labs. ${super.bio()}`;
  }
}

// DRIVER CODE

const bob = new Mentor('Bob Ross', 'I like mountains way too much');
console.log(bob.bio());
```
*****Using super allows us to access the superclass, plain and simple.*****

# Conclusion
In this activity, we explored two new concepts:
* **Overriding methods in subclasses to change their behaviour.** Sometimes this is all you need, but other times we end up repeating some things in the overriding methods. That brings us to point 2 below.
* *****Using super in the overriding methods in order to avoid repeating code that's already present in the superclass.*****