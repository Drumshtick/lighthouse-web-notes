# Intro to DOM Events (Ref [HERE](https://www.smashingmagazine.com/2013/11/an-introduction-to-dom-events/))

<u>GIGANTIC EVENT REF [HERE](https://developer.mozilla.org/en-US/docs/Web/Events)</u>

## Listening For DOM Events
* In the past, **browsers have had major inconsistencies in the way they attach event listeners to DOM nodes.**
  * Libraries such as **jQuery** have been invaluable *in abstracting away these oddities.*
* If you are writing JavaScript for **Internet Explorer (IE) 8 or below**, I would advise using a ***polyfill*** or ***framework*** (such as **jQuery**) to manage event listeners.
* In JavaScript, we can **listen to events** using this:
```javascript
element.addEventListener(<event-name>, <callback>, <use-capture>);
```
* Where...
  * **event-name** (string) ***This is the name or type of event that you would like to listen to.*** It could be any of the standard DOM events (```click```, ```mousedown```, ```touchstart```, ```transitionEnd```, etc.) **or even your own custom event name **(we’ll touch on custom events later).
  * **callback** (function) This ***function gets called when the event happens.*** The *event object*, containing data about the event, **is passed as the first argument**.
  * **use-capture** (boolean) **This declares whether the callback should be fired in the *“capture” phase*.** (Don’t worry: We’ll explain what that means a little later.)
```javascript
var element = document.getElementById('element');

function callback() {
  alert('Hello');
}

// Add listener
element.addEventListener('click', callback);
```

## Removing Listener

      NOTE Anonymous functions cannot be used if the event listener needs to be removed!!!!

* Removing event listeners ***once they are no longer needed is a best practice*** (especially in long-running Web applications).
  * To do this, use the ```element.removeEventListener()``` method:

```javascript
element.removeEventListener(<event-name>, <callback>, <use-capture>);
```
* But ```removeEventListener``` **has one catch:** ***You must have a reference to the callback function that was originally bound.*** Simply calling element.```removeEventListener(‘click’);``` *will not work.*
* Essentially, if we have any interest in removing event listeners (which we should in “long-lived” applications), then we need to keep a handle on our callbacks. ***This means we cannot use anonymous functions.***
```javascript
var element = document.getElementById('element');

function callback() {
  alert('Hello once');
  element.removeEventListener('click', callback);
}

// Add listener
element.addEventListener('click', callback);
```

## Maintaining Callback Context
* An *easy gotcha* is **callbacks being called with the incorrect context.** Let’s explain with an example.
```javascript
var element = document.getElementById('element');

var user = {
 firstname: 'Wilson',
 greeting: function(){
   alert('My name is ' + this.firstname);
 }
};

// Attach user.greeting as a callback
element.addEventListener('click', user.greeting);

// alert => 'My name is undefined'

```

## USING ANONYMOUS FUNCTIONS
* We expected the callback to correctly alert us with ```My name is Wilson```. In fact, it alerts us with ```My name is undefined```. In order for this.```firstName``` to return ```Wilson```, ```user.greeting``` must be called within the context (i.e. whatever is left of the dot when called) of user.
  * When we pass the ```greeting``` function to the ````addEventListener```` method, **we are only passing a reference to the function**; the *context of user is not passed with it.* Internally, ***the callback is called in the context of element***, which means that ```this``` refers to **element**, not to user. Therefore, ```this.firstname``` is ```undefined```.
* There are **two ways to prevent this context mismatch**. First, we can call ```user.greeting()``` with the correct context inside an anonymous function.
```javascript
element.addEventListener('click', function() {
  user.greeting();
  // alert => 'My name is Wilson'
});
```

## FUNCTION.PROTOTYPE.BIND
* The last method isn’t so good **because now we don’t have a handle on the function when we want to remove it with** ```.removeEventListener()```. Plus, it’s pretty ugly.
  * I prefer to use the ```.bind()``` method (built into all functions, as of ECMAScript 5) **to generate a new function** (bound) that will always run in the given context. **We then pass that function as the callback to** ```.addEventListener()```.
```javascript
// Overwrite the original function with
// one bound to the context of 'user'
user.greeting = user.greeting.bind(user);

// Attach the bound user.greeting as a callback
button.addEventListener('click', user.greeting);
```
* We also have a reference to the callback at hand, which we can use to unbind the listener if need be.
```javascript
button.removeEventListener('click', user.greeting);
```
* Reference [Function.prototype.bind](https://kangax.github.io/es5-compat-table/#Function.prototype.bind)
* Reference [polyfill](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#Compatibility)

## The Event Object
* The **event object is created when the event first happens;** it travels with the event on its journey through the DOM.
  * The **function that we assign as a callback to an event listener is passed the event object as its first argument**.
  * We can use this object to access a wealth of information about the event that has occurred:
    * **type** (string) This is the name of the event.
    * **target** (node) This is the DOM node where the event originated.
    * **currentTarget** (node) This is the DOM node that the event callback is currently firing on.
    * **bubbles** (boolean) This indicates whether this is a “bubbling” event (which we’ll explain later).
    * **preventDefault** (function) This prevents any default behaviour from occurring that the user agent (i.e. browser) might carry out in relation to the event (for example, ***preventing a click event on an ```<a>``` element from loading a new page***).
    * **stopPropagation** (function) This **prevents any callbacks from being fired on any nodes further along the event chain**, but it does not prevent any additional callbacks of the same event name from being fired on the current node. (We’ll talk about that later.)
    * **stopImmediatePropagation** (function) This prevents any callbacks from being fired on any nodes further along the event chain, **including any additional callbacks of the same event name on the current node.**
    * **cancelable** (boolean) This indicates whether the default behaviour of this event can be prevented by calling the event.preventDefault method.
    * **defaultPrevented** (boolean) This states whether the preventDefault method has been called on the event object.
    * **isTrusted** (boolean) An event is said to be “trusted” **when it originates from the device itself**, not synthesized from within JavaScript.
    * **eventPhase** (number) This number represents the phase that the event is currently in: **none (0), capture (1), target (2) or bubbling (3)**. We’ll go over event phases next.
    * **timestamp** (number) This is the date on which the event occurred.
  * **Many other properties can be found on the event object**, but they are ***specific to the type of event in question***. For example, **mouse events will include clientX and clientY properties on the event object to indicate the location of the pointer in the viewport.**

## Event Phases 
* When a DOM event fires in your app, **it doesn’t just fire once where the event originated;** it embarks ***on a journey of three phases***.
  * In short, the event flows **from the document’s root to the target** (i.e. capture phase)
  * then **fires on the event target (target phase**)
  * then **flows back to the document’s root** (bubbling phase).

![](2021-11-16-13-12-33.png)

### CAPTURE PHASE
* The event starts its journey at the root of the document, working its way down through each layer of the DOM, **firing on each node until it reaches the event target.**
* The ***job of the capture phase is to build the propagation path***, *which the event will travel back through* in the bubbling phase.
* As mentioned, **you can listen to events in the capture phase by setting the third argument of ```addEventListener``` to true.** I have not found many use cases for capture phase listeners, **but you could potentially prevent any clicks from firing in a certain element if the event is handled in the capture phase.**
```javascript
var form = document.querySelector('form');

form.addEventListener('click', function(event) {
  event.stopPropagation();
}, true); // Note: 'true'
```
* If you’re unsure, listen for events in the bubbling phase by setting the useCapture flag to false or undefined.

### TARGET PHASE
* An event reaching the target is known as the target phase. **The event fires on the target node, before reversing and retracing its steps, propagating back to the outermost document level.**

* In the case of nested elements, ```mouse``` and ```pointer``` **events are always targeted at the most deeply nested element.** If you have listened for a ```click``` event on a ```<div>``` element, and the user actually clicks on a ```<p>``` element in the div, then the ```<p>``` element will become the event target. The fact that events “bubble” means that you are able to listen for clicks on the ```<div>``` (or any other ancestor node) and still receive a callback once the event passes through.

### BUBBLING PHASE
* ***After an event has fired*** on the target, it doesn’t stop there. **It bubbles up (or propagates) through the DOM until it reaches the document’s root.** This means that the same event is fired on the target’s parent node, followed by the parent’s parent, continuing until there is no parent to pass the event onto.

* Think of the DOM as an onion and the event target as the core of the onion. In the capture phase, the event drills into the onion through each layer. When the event reaches the core, it fires (the target phase), and then reverses, working its way back up through each layer (the propagation phase). Once the event has returned to the surface, its journey is over.

* ***Bubbling is useful. It frees us from listening for an event on the exact element it came from***; instead, we listen on an element further up the DOM tree, waiting for the event to reach us. **If events didn’t bubble, we would have to, in some cases, listen for an event on many different elements to ensure that it is caught.**

* The majority of, but not all, events bubble. When events do not bubble, it is usually for a good reason.

## Stopping Propagation

* Interrupting the path of the event at any point on its journey (i.e. in the capture or bubbling phase) **is possible simply by calling the ```stopPropagation``` method on the event object.** Then, the event will no longer call any listeners on nodes that it travels through on its way to the target and back to the document.
```javascript
child.addEventListener('click', function(event) {
 event.stopPropagation();
});

parent.addEventListener('click', function(event) {
 // If the child element is clicked
 // this callback will not fire
});
```
* Calling ```event.stopPropagation()``` **will not prevent any additional event listeners from being called on the current target if multiple listeners for the same event exist.** If you wish *to prevent any additional listeners from being called on the current node*, you can use the more aggressive event.```stopImmediatePropagation()``` method.

```javascript
child.addEventListener('click', function(event) {
 event.stopImmediatePropagation();
});

child.addEventListener('click', function(event) {
 // If the child element is clicked
 // this callback will not fire
});
```

## Prevent The Browser’s Default Behavior
* The browser has default behaviors that will respond when certain events occur in the document. **The most common event is a link being clicked**. When a click event occurs on an ```<a>``` element, ***it will bubble up to the document level of the DOM, and the browser will interpret the href attribute and reload the window at the new address.***

* In Web applications, **developers usually want to manage the navigation themselves, without causing the page to refresh**. To do this, we need to prevent the browser’s default response to clicks and instead do our own thing. To do this, we call ```event.preventDefault()```.

```javascript
anchor.addEventListener('click', function(event) {
  event.preventDefault();
  // Do our own thing
});
```

* We can prevent many other default behaviors in the browser.
  * For example, **we could prevent presses of the space bar from scrolling the page in an HTML5 game**,
  * or we could **prevent clicks from selecting text.**

* Calling ```event.stopPropagation()``` here will only prevent callbacks that are attached further down the propagation chain from being fired. It will not prevent the browser from doing its thing.

## Custom DOM Events
* The browser is not the only thing that is able to trigger DOM events. We can create our own custom events and dispatch them on any element in the document. This type of event would behave just the same as a regular DOM event.
```javascript
var myEvent = new CustomEvent("myevent", {
  detail: {
    name: "Wilson"
  },
  bubbles: true,
  cancelable: false
});

// Listen for 'myevent' on an element
myElement.addEventListener('myevent', function(event) {
  alert('Hello ' + event.detail.name);
});

// Trigger the 'myevent'
myElement.dispatchEvent(myEvent);

```
* Synthesizing “untrusted” DOM events on elements (for example, click) to simulate user interaction is also possible. This can be useful when testing DOM-related libraries. If you’re interested, the Mozilla Developer Network has a [write-up on it](https://developer.mozilla.org/en-US/docs/Web/Guide/DOM/Events/Creating_and_triggering_events#Triggering_built-in_events).

Note the following:

* The CustomEvent API is not available in IE 8 and below.
* The Flight framework from Twitter makes use of custom events to communicate between modules. This enforces a highly decoupled, modular architecture.

## Delegate Event Listeners

* Delegate event listeners are a more convenient and performant **way to listen for events on a large number of DOM nodes using a single event listener.**
  * For example, if a list contains 100 items that all need to respond to a click event in a similar way, then we could query the DOM for all of the list items and attach an event listener to each one. This would result in 100 separate event listeners. Whenever a new item is added to the list, the click event listener would have to be added to it. Not only does this risk getting expensive, but it is tricky to maintain.
* Delegate event listeners can make our lives a lot easier. Instead of listening for the click event on each element, we listen for it on the parent ```<ul>``` element. When an ```<li>``` is clicked, then the event bubbles up to the ```<ul>```, triggering the callback. ***We can identify which ```<li>``` element has been clicked by inspecting the ```event.target```. Below is a crude example to illustrate:***
```javascript
var list = document.querySelector('ul');

list.addEventListener('click', function(event) {
  var target = event.target;

  while (target.tagName !== 'LI') {
    target = target.parentNode;
    if (target === list) return;
  }

  // Do stuff here
});
```
* This is better because we have **only the overhead of a single event listener**, and we no longer have to worry about attaching a new event listener when an item is added to the list. The concept is pretty simple but super-useful.

* I wouldn’t recommend using such a crude implementation in your app. **Instead, use an event delegate JavaScript library, such as FT Lab’s ```ftdomdelegate``` ([READ MORE](https://github.com/ftlabs/ftdomdelegate)).** 
* ***If you’re using jQuery, you can seamlessly use event delegation by passing a selector as the second parameter to the ```.on()``` method.***
```javascript
// Not using event delegation
$('li').on('click', function(){});

// Using event delegation
$('ul').on('click', 'li', function(){});
```

## Useful Events

* **LOAD**
  * The ```load``` event **fires on any resource that has finished loading** (including any dependent resources). This **could be an image, style sheet, script, video, audio file, document or window.**
```javascript
image.addEventListener('load', function(event) {
  image.classList.add('has-loaded');
});
```
* **ONBEFOREUNLOAD**
  * ```window.onbeforeunload``` enables developers to **ask the user to confirm that they want to leave the page.** This can be useful in applications that require the user to save changes that would get lost if the browser’s tab were to be accidentally closed.
```javascript
window.onbeforeunload = function() {
  if (textarea.value != textarea.defaultValue) {
    return 'Do you want to leave the page and discard changes?';
  }
};
```
  * ***Note that assigning an ```onbeforeunload``` handler <u>prevents the browser from caching the page</u>, thus making return visits a lot slower. Also, onbeforeunload handlers must be synchronous.***

* **STOPPING WINDOW BOUNCE IN MOBILE SAFARI**
  * At the Financial Times, we use a simple ```event.preventDefault``` technique to **prevent mobile Safari from bouncing the window when it is scrolled**.
```javascript
document.body.addEventListener('touchmove', function(event) {
 event.preventDefault();
});
```
  * Be warned that this will also **prevent any native scrolling from working** ( such as ```overflow: scroll```).
    * To allow native scrolling on a subset of elements that need it, we listen for the same event on the scrollable element and set a flag on the event object. In the callback at the document level, we decide whether to prevent the default behavior of the touch event based on the existence of the isScrollable flag.
```javascript
// Lower down in the DOM we set a flag
scrollableElement.addEventListener('touchmove', function(event) {
 event.isScrollable = true;
});

// Higher up the DOM we check for this flag to decide
// whether to let the browser handle the scroll
document.addEventListener('touchmove', function(event) {
 if (!event.isScrollable) event.preventDefault();
});
```
* **RESIZE**
  * Listening to the resize event on the window object is **super-useful for complex responsive layouts**. Achieving a layout with CSS alone is not always possible. Sometimes JavaScript has to help us calculate and set the size of elements. When the window is resized or the device’s orientation changes, then we would likely need to readjust these sizes.
```javascript
window.addEventListener('resize', function() {
  // update the layout
});
```
  * I recommended using a [debounced](https://davidwalsh.name/function-debounce) callback to normalize the callback rate and prevent extreme thrashing in the layout.
* **TRANSITIONEND**
* Today we use CSS to power the majority of transitions and animations in our applications. Sometimes, though, we still need to ***know when a particular animation has finished.***
```javascript
el.addEventListener('transitionEnd', function() {
 // Do stuff
});
```
Note the following:

        If you’re using @keyframe animations, use the animationEnd event name, instead of transitionEnd.
        Like a lot of events, transitionEnd bubbles. Remember either to call event.stopPropagation() on any descendant transition events or to check the event.target to prevent callback logic from running when it’s not supposed to.
        Event names are still widely vendor-prefixed (for example, webkitTransitionEnd, msTransitionEnd, etc). Use a library such as Modernizr to get the event name’s correct prefix.

* **ANIMATIONITERATION**
* The ```animationiteration``` event **will fire every time a currently animating element completes an iteration.** This is useful if we want to **stop an animation but not midway through.**
```javascript
function start() {
  div.classList.add('spin');
}

function stop() {
  div.addEventListener('animationiteration', callback);

  function callback() {
    div.classList.remove('spin');
    div.removeEventListener('animationiteration', callback);
  }
}
```
If you’re interested, I’ve written about the [animationiteration](https://wilsonpage.co.uk/animation-iteration-event) event in a little more detail on my blog.


* **ERROR**
  * **If an error occurs when a resource loads**, we might want to do something about it, especially if our users are on a flaky connection. The Financial Times uses this event to detect any images that might have failed to load in an article and instantly hide them. Because the “DOM Level 3 Events” specification has redefined the error event to “not bubble,” we can handle the event in one of two ways.
```javascript
imageNode.addEventListener('error', function(event) {
  image.style.display = 'none';
});
```
  * Unfortunately, ```addEventListener``` does not address all use cases. My colleague Kornel has kindly pointed me to an example that demonstrates that the **only way, sadly, to guarantee the execution of image error event callbacks is to use (the often frowned upon) inline event handlers.**
```html
<img src="https://example.com/image.jpg" onerror="this.style.display='none';" />
```
  * The reason for this is that you cannot be sure that the code that binds the error event handler will be executed before the error event actually happens. Using inline handlers means that when the markup is parsed and the image is requested, our error listeners will be attached.
