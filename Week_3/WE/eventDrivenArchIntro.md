# Event-Driven Architecture (EDA)
EDA can be summarized as:

    When X happens, then do Y.

Where...
  * X is the event
  * Y is the event handler

Perhaps Event X is the click of a button, and Handler Y turns on a lightbulb.

This software pattern lends itself well to asynchronous programming languages such as JavaScript.

## Client-Side Events

We have the DOM, which has events such as ```onClick```, ```onFocus```, ```onLoad```, as well as *custom events*.

One library that we will use to demonstrate client-side events is **jQuery**.

## Server-Side Events

Similarly, on a server running **Node.js** you can think of **an incoming request as an event,** with a callback function that handles the event (and could render a response).

The Node.js core API provides an ```EventEmitter``` class that is basis for event-driven patterns.