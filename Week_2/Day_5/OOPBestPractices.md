# the primary goals of OO:
1. Reduce duplicated code (reusability)
2. Breaking code up into sensibly-divided units (modularity)

Ultimately it's about trying to make complex things simpler to read, write and maintain.

With that said, there are some OO principles to emphasize so that we don't misuse OO and have the opposite outcome with our code.

# Abstraction
If you have a driver's license then you know how to drive pretty much any car on the road. No matter its make, how many seats and doors it has, or how the engine works, you will be able to get into the driver's seat of a car and drive it. Cars are extremely complicated things, and engineering them is no simple task. But because I know how to use the steering wheel and the foot pedals, I can drive.

All the details of how the car actually works and how it does things are abstracted away from us. We don't have to know how an internal combustion engine works in order to drive the car. We don't have to know how brake pads work in order to make it stop. *****In fact, we don't even have to know that these things exist at all, we just need to know how to use pedals and a steering wheel.*****

This is a great example of Abstraction. Cars take all the nasty complicated details about how they work and hide them away from the user of the car. Cars just give us a nice and simple interface to use.

A major benefit of this is that the inner workings of the car can change dramatically and we can still drive the car. You could learn to drive in a car that uses an internal combustion engine, then go out tomorrow and drive a Tesla that uses an electric motor. The internals of cars are very different but the interface is the same.

The Wikipedia article does a great job of introducing abstraction:

>Abstraction is a technique for arranging complexity of computer systems. It works by establishing a level of complexity on which a person interacts with the system, suppressing the more complex details below the current level.

Abstract Pizza
Take for example the following pizza object:
```javascript
class Pizza {
  constructor() {
    this.toppings = "";
  }
}
let pizza = new Pizza();

pizza.toppings = pizza.toppings + "cheese";
pizza.toppings = pizza.toppings + ", mushrooms";
```
This Pizza class creates a new string to store toppings, then *any code that uses that class has to manually add new toppings to this string.* After using this object for a while, we realize that a string is probably not the best way to store toppings. **We should use an array instead:**
```javascript
class Pizza {
  constructor() {
    this.toppings = [];
  }
}
```
But this means than any code that uses the toppings array, **has to now change to use the new array syntax:**
```javascript
let pizza = new Pizza();

pizza.toppings.push("cheese");
pizza.toppings.push("mushrooms");
```
That was annoying. Now imagine a much larger code base where a small change like this would result in you having to update hundreds of lines of code.

*Instead of the Pizza class publicly exposing it's internals like this, it should abstract them away.* The Pizza class should expose a nice ```addTopping()``` method for the rest of the code to use:
```javascript
class Pizza {
  constructor() {
    this.toppings = [];
  }
  addTopping(topping) {
    this.toppings.push(topping);
  }
}

let pizza = new Pizza();

pizza.addTopping("cheese");
pizza.addTopping("mushrooms");
```
Now if we store toppings in an array, a plain old string, or some other object; *****the only place that the code has to change is inside of the Pizza class.*****

It's also very easy to add new logic to our class without altering any other code. **If we want to make sure that a topping can only be added once, we just have to make one small change to the Pizza class:**
```javascript
class Pizza {
  constructor() {
    this.toppings = [];
  }
  addTopping(topping) {
    if (this.toppings.indexOf(topping) > -1) {
      // Topping already exists, deny!
      return false;
    }
    this.toppings.push(topping);
    return true;
  }
}
```

# Private vs Public
All code using the pizza class should now use the ```addTopping()``` method instead of accessing toppings directly. But what's to stop someone writing code that accesses the array directly? Nothing! Someone could still write the following line of code:
```javascript
pizza.toppings.push("cheese");
```
In some languages, properties can be made private, which means that they can't be accessed outside of the class that they're created in. In JavaScript there is no way of making something private, but: 
>*****if we add an _ to the start of a property name, other developers will know that they shouldn't access it directly.*****
```javascript
class Pizza {
  constructor() {
    this._toppings = [];
  }
  addTopping(topping) {
    this._toppings.push(topping);
  }
}

let pizza = new Pizza();

pizza.addTopping("cheese");
pizza.addTopping("mushrooms");
```
By prefixing toppings with an ```_```, we are letting all other developers know that they shouldn't access that property directly. There is nothing special about this property now, it's still just a normal property and someone could easily still access it:
```
pizza._toppings.add("pineapple");
```
Based on convention around private properties, a JS developer will be aware that they're doing something wrong.

# Single Responsibility Principle
The single responsibility principle states that *a class should be responsible for a single part of the app's functionality,* giving it only one reason to change. Or more simply, **a class should only have one job.**

Take a look at the following outline for a class:
```javascript
// Manage the state of a task
class Task {
  complete() {
    // Mark this task as complete
  }
  sendNotification() {
    // Send a notification to the user that their task is complete
  }
  saveToDatabase() {
    // Save this task to the database
  }
}

let task = new Task();
task.saveToDatabase();
task.complete();
task.sendNotification();
task.saveToDatabase();
```
This class's purpose is to manage the state of a task, but it's *currently responsible for 3 different things and has 3 separate reasons to change.*

If the way a task's state is managed changes, like using a string instead of a boolean to mark a task as done, then the first method has to change.
If our in-app notification system changes, from browser notifications to email notifications, then the second method has to change.
If we need to change how it's persisted in the database, then the third method has to change.
Our class has too many reasons to change. Furthermore, each method has access to the entire internal state of the object. A change to the way notifications work could break the database method.

All of these methods in the same class violates the Single Responsibility Principle. This object has to be broken up into more objects that all just do one thing. The following is a possible solution to this problem:
```javascript
// Manage the state of a task
class Task {
  complete() {
    // Mark this task as complete
  }
}

class NotificationManager {
  sendNotification(task) {
    // Send a notification to the user that their task is complete
  }
}

class DatabaseManager {
  saveToDatabase(task) {
    // Save this task to the database
  }
}

let task = new Task();
databaseManager.saveToDatabase(task);
task.complete();
notificationManager.sendNotification(task);
databaseManager.saveToDatabase(task);
```
*****Now each object just has one reason to change.*****

If we use abstraction and the single responsibility principle correctly, *then a change to one part of our app won't affect other unrelated parts of our app.* Changing from PostgreSQL to Mongo, for example, should not affect our notification system.

# Inheritance
When we're not using OO, we use functions and modules to reduce duplicate code and make our code more reusable. When we're using OO we can use inheritance to achieve this.

See if you can spot the duplicate code below:
```javascript
class Flower {
  water() {
    console.log("Watering the flower");
    this.lastWatered = Date();
  }
}

class Tree {
  water() {
    console.log("Watering the tree");
    this.lastWatered = Date();
  }
}

class Bush {
  water() {
    console.log("Watering the bush");
    this.lastWatered = Date();
  }
}
```
These classes all have very, very similar behaviour resulting in duplicate code. We can get rid of the duplication by using inheritance.

class Plant {
  water() {
    console.log(`Watering the ${this.type}`);
    this.lastWatered = Date();
  }
}

class Flower extends Plant {
  constructor() {
    super()
    this.type = "flower";
  }
}

class Tree extends Plant {
  constructor() {
    super()
    this.type = "tree";
  }
}

class Bush extends Plant {
  constructor() {
    super()
    this.type = "bush";
  }
}
*Now if the water method changes, the code only has to be changed in one place.* Use inheritance to reduce duplicate code and share behaviour between classes.

# Why Bother?
What's the point of all this OO nonsense? Object Orientation gives us a **nice alternate strategy for modularization.** That is to say, it's a strategy about *how to break up our work into bite-sized chunks.*

Object Orientation is not the only strategy though. You've been modularizing your code just fine without OO for the past two weeks. When using a language like JavaScript, **you might ask the question "when should I and shouldn't I use OO?"**

Unfortunately there's no easy answer to this question. *It's often a matter of personal comfort and taste.* Every project is different and it's up to you and your team to make a decision on how to structure the code. Sometimes you'll have a say in this and sometimes you won't. Sometimes you'll use OO and sometimes you won't. Just know that it's a very popular strategy for modularization that you can use whenever you need to.

That being said, when you program in an OO language like Ruby, C++, or Swift, you will use OO. In a purely OO language you don't really have an option. But remember that there's a reason that these OO languages are so popular; it's because OO is often a good option.
