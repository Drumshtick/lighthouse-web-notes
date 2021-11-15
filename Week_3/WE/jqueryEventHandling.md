# jQuery
Created in 2006 by *John Resig*, jQuery holds cornerstone importance, as it is used widely across the Internet (In 2014, the jQuery core library was "used by more than 61% of top 100,000 sites").

jQuery provides many conveniences **when working with the DOM, events, and much more.**

## Why does jQuery exist?

###  1. Fixes Browser Compatibility issues

***For example***, if you want to **get the height and width** of of the *browser viewport in pure javascript* you have to write code that looks something like this:

```javascript
const getViewPortWidth = function() {
  let IEDocument = document.documentElement;
  if(window.innerWidth) {
    return window.innerWidth;
  } else if(IEDocument.clientWidth) {
    return IEDocument.clientWidth;
  } else if(IEDocument.getElementsByTagName('body')[0]) {
    return IEDocument.getElementsByTagName('body')[0].clientWidth;
  }
}
const viewportWidth = getViewPortWidth()
```

#### Why the craziness? 
* Because while most browsers have a function called ```window.innerWidth```, *Internet Explorer uses ```document.documentElement.clientWidth```* to return the viewport width. 
* ***If you tried to run window.innerWidth in Internet Explorer you would get an error.***

**jQuery** gives us a handy function that runs something like the code above to get the width. ***So we could replace the whole chunk of code above with:***

```javascript
$(window).width()
```

CRAZY!

### 2. Cleaner API


The *browser has built-in JavaScript functions* to help you write code that interacts with the page.

For example, if you have this html:

```html
<html>
  <head>...</head>
  <body>
    <span id="foo">Click me to open an alert!</span>
  </body>
</html>
```

You can write this bit of JavaScript to **pop up an alert** when the user *clicks the span element*

```javascript
const element = document.getElementById("foo");
element.addEventListener("click", function() {
  alert("Clicked!");
});
```

Working with DOM events can be a bit painful. ```getElementById``` and ```addEventListener``` are quite the mouthful.

***One of the nice things that jQuery does, is it wraps the native functions with a cleaner API.*** The *code above can be replaced with the following code* in jQuery:

```javascript
$("#foo").on( "click", function() {
  console.log("Foo element clicked");
});
```

OR

```javascript
$("#foo").click(function() {
  console.log("Foo element clicked");
});
```

## Events and Callbacks (Reference [HERE](http://learn.jquery.com/events/introduction-to-events/))

### Introducing Events

Users perform a countless number of actions such as **moving their mice over the page**, **clicking on elements**, and **typing in textboxes** — ***all of these are examples of events.***

Whenever something interesting occurs on the page, an event is fired, meaning that **the browser basically announces that something has happened.** It's this announcement that allows developers to "listen" for events and react to them appropriately.

### What's a DOM event?

      A list of DOM events [HERE](https://developer.mozilla.org/en-US/docs/Web/Events)

### linkWays to listen for events

* The developer is only notified about events if they're listening for them!
  * *Listening for an event* basically means you're waiting for the browser to tell you that a specific event has occurred and then you'll specify how the page should react.
* To specify to the browser what to do when an event occurs, you provide a function, also known as ***an event handler***.
  * This function is executed whenever the event occurs (***or until the event is unbound***).

<u>For instance, to alert a message whenever a user clicks on a button, you might write something like this:</u>
```html
<button onclick="alert('Hello')">Say hello</button>
```
* **The event we want to listen to is specified by the button's ```onclick``` attribute,** and **the event handler is the alert function** which alerts "Hello" to the user. While this works, ***it's an abysmal way to achieve this functionality for a couple of reasons:***
  1. **First**, ***we're coupling our view code (HTML) with our interaction code (JS)***. That means that whenever we need to update functionality, we'd have to edit our HTML which is just a bad practice and a maintenance nightmare.
  2. **Second**, ***it's not scalable***. If you had to attach this functionality onto numerous buttons, you'd not only bloat the page with a bunch of repetitious code, but you would again destroy maintainability.

         Utilizing inline event handlers like this can be considered ***obtrusive JavaScript***, but its opposite, ***unobtrusive JavaScript*** is a much more common way of discussing the topic.

**Unobtrusive JavaScript** is that your *HTML and JS are kept separate* and are therefore more maintainable.
  * If a user's browser doesn't support JavaScript, then it shouldn't be intertwined into the markup of the page.
  * Also, to prevent **naming collisions**, JS code should utilize a single namespace for different pieces of functionality or libraries.
  
***To accomplish the desired task unobtrusively,*** let's change our HTML a little bit by *removing the ```onclick``` attribute* and replacing it with an ```id```, which we'll utilize to "hook onto" the button from within a script file.

```html
<button id="helloBtn">Say hello</button>
```

If we wanted to be informed when a user clicks on that button unobtrusively, we might do something like the following in a separate script file:

```javascript
// Event binding using addEventListener
var helloBtn = document.getElementById( "helloBtn" );
 
helloBtn.addEventListener( "click", function( event ) {
    alert( "Hello." );
}, false );
```

While there's nothing wrong with this code as it will work fine in modern browsers, **it won't fare well in versions of IE prior to IE9.**
  * This is because Microsoft chose to implement a different method, ```attachEvent```, as opposed to the **W3C standard** ```addEventListener```, and didn't get around to changing it until IE9 was released.
  * For this reason, it's beneficial to ***utilize jQuery because it abstracts away browser inconsistencies***, allowing developers to use a single API for these types of tasks, **as seen below.**

```javascript
// Event binding using a convenience method
$( "#helloBtn" ).click(function( event ) {
    alert( "Hello." );
});
```

* The ```$( "#helloBtn" )``` code selects the button element using the ```$``` (a.k.a. jQuery) function and returns a jQuery object.
* The jQuery object has a bunch of methods (functions) available to it, one of them named ```click```, which resides in the jQuery object's prototype.
* We call the ```click``` method on the jQuery object and pass along an anonymous function event handler that's going to be executed when a user clicks the button, alerting "Hello." to the user.

#### There are a number of ways that events can be listened for using jQuery:

```javascript
// The many ways to bind events with jQuery
// Attach an event handler directly to the button using jQuery's
// shorthand `click` method.
$( "#helloBtn" ).click(function( event ) {
    alert( "Hello." );
});
 
// Attach an event handler directly to the button using jQuery's
// `bind` method, passing it an event string of `click`
$( "#helloBtn" ).bind( "click", function( event ) {
    alert( "Hello." );
});
 
// As of jQuery 1.7, attach an event handler directly to the button
// using jQuery's `on` method.
$( "#helloBtn" ).on( "click", function( event ) {
    alert( "Hello." );
});
 
// As of jQuery 1.7, attach an event handler to the `body` element that
// is listening for clicks, and will respond whenever *any* button is
// clicked on the page.
$( "body" ).on({
    click: function( event ) {
        alert( "Hello." );
    }
}, "button" );
 
// An alternative to the previous example, using slightly different syntax.
$( "body" ).on( "click", "button", function( event ) {
    alert( "Hello." );
});
```

***As of jQuery 1.7***, all events are bound via the ```on``` method, whether you call it directly or whether you use an alias/shortcut method such as bind or click, which are mapped to the ```on``` method internally. With this in mind, it's beneficial to use the on method because the others are all just syntactic sugar, and utilizing the ```on``` ****method is going to result in faster and more consistent code****.

Let's look at the on examples from above and discuss their differences.
*  ***In the first example***, a string of click is passed as the first argument to the on method, and an anonymous function is passed as the second. This looks a lot like the bind method before it. **Here, we're attaching an event handler directly to #helloBtn.** If there were any other buttons on the page, they wouldn't alert "Hello" when clicked because the event is only attached to #helloBtn.
* ***In the second on example***, *we're passing an object* (denoted by the curly braces {}), **which has a property of click whose value is an anonymous function.** The second argument to the on method is a jQuery selector string of button. While examples 1–3 are functionally equivalent, example 4 is different in that the body element is listening for click events that occur on any button element, not just #helloBtn.
* ***The final example above*** *is exactly the same as the one preceding it,* but instead of passing an object, **we pass an event string**, **a selector string, and the callback.** ***Both of these are examples of event delegation, a process by which an element higher in the DOM tree listens for events occurring on its children.***

### Event delegation
* Event delegation works because of the notion of ***event bubbling***.
  * For most events, whenever something occurs on a page (like an element is clicked), the event travels from the element it occurred on, up to its parent, then up to the parent's parent, and so on, until it reaches the root element, a.k.a. the ```window```.
  * So in our table example, whenever a ```td``` is clicked, its parent ```tr``` would also be notified of the click, the parent ```table``` would be notified, the ```body``` would be notified, and ultimately the ```window``` would be notified as well.
* While event bubbling and delegation work well, ***the delegating element (in our example, the table) should always be as close to the delegatees as possible*** so the event doesn't have to travel way up the DOM tree **before its handler function is called.**
* The **two main pros** of *event delegation over binding directly* to an element (or set of elements) **are performance and the aforementioned event bubbling.**
  * FOR EXAMPLE:
    * Imagine having a large table of 1,000 cells and binding to an event for each cell.
    * That's 1,000 separate event handlers that the browser has to attach, even if they're all mapped to the same function.
    * **Instead of binding to each individual cell though, we could instead use delegation to listen for events that occur on the parent table** and react accordingly!
    * ***One event would be bound instead of 1,000, resulting in way better performance and memory management.***
    * If Ajax was used to populate new cells then every addition would require a new bind event! Destroying memory and making maintenance a nightmare.

### The event object
In all of the previous examples, we've been using anonymous functions and specifying an event argument within that function. Let's change it up a little bit.

```javascript
// Binding a named function
function sayHello( event ) {
    alert( "Hello." );
}
 
$( "#helloBtn" ).on( "click", sayHello );
```

* In this slightly different example, we're defining a function called sayHello and then passing that function into the on method instead of an anonymous function.
  * This is important if different elements or different events should perform the same functionality. This helps to keep your code DRY.
* **But what about that event argument in the sayHello function — what is it and why does it matter?**
  * In all DOM event callbacks, **jQuery passes an event object argument which contains information about the event**, such as precisely ***when and where it occurred***, what ***type of event it was***, ***which element the event occurred on***, and a plethora of ***other information.***
  *  Of course you don't have to call it event; you could call it e or whatever you want to, **but event is a pretty common convention.**
* If the element **has default functionality for a specific event** (like a link opens a new page, a button in a form submits the form, etc.), ***that default functionality can be canceled. This is often useful for Ajax requests.*** When a user clicks on a button to submit a form via Ajax, we'd want to cancel the button/form's default action (to submit it to the form's action attribute), and **we would instead do an Ajax request to accomplish the same task** for a more seamless experience. 
  * To do this, **we would utilize the event object and call its** ```.preventDefault()``` method. **We can also prevent the event from bubbling up the DOM tree** using ```.stopPropagation()``` so that parent elements aren't notified of its occurrence (in the case that event delegation is being used).
```javascript
// Preventing a default action from occurring and stopping the event bubbling
$( "form" ).on( "submit", function( event ) {
 
    // Prevent the form's default submission.
    event.preventDefault();
 
    // Prevent event from bubbling up DOM tree, prohibiting delegation
    event.stopPropagation();
 
    // Make an AJAX request to submit the form data
});
```
* **When utilizing both** ```.preventDefault()``` and ```.stopPropagation()``` simultaneously, **you can instead return ```false``` to achieve both in a more concise manner,** but it's advisable to only return ```false``` when both are actually necessary and not just for the sake of terseness. A final note on ```.stopPropagation()``` is that when using it in delegated events, the soonest that event bubbling can be stopped is when the event reaches the element that is delegating it.
* It's also important to note that ***the event object contains a property called*** ```originalEvent```, *which is the event object that the browser itself created.* jQuery wraps this native event object with some useful methods and properties, but in some instances, **you'll need to access the original event via ```event.originalEvent```** for instance. This is ***especially useful for touch events on mobile devices and tablets.***
* Finally, **to inspect the event itself and see all of the data it contains**, you should **log the event** in the browser's console using console.log. This will allow you to ***see all of an event's properties*** (including the ```originalEvent```) which can be **really helpful for debugging.**
```javascript
// Logging an event's information
$( "form" ).on( "submit", function( event ) {
 
    // Prevent the form's default submission.
    event.preventDefault();
 
    // Log the event object for inspectin'
    console.log( event );
 
    // Make an AJAX request to submit the form data
});
```