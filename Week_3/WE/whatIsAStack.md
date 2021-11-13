# The Stack

A stack often refers to *the collection of technologies used in a given system.*

 For instance, the project you're working on has the following stack:
  * Web Server: **Node.js**
  * Middleware: **Express**
  * Template Engine: **EJS**
  * Database: *None*, just an **"In-Memory Object"**

Depending on your role within a company, your definition of the stack could be also include the infrastructure...
  * Hosting/Infrastructure: **Heroku**

In theory any of these components can be swapped out for alternatives. For instance, there are several different middleware solutions that run well on a Node.js web server.

**A common stack** (*but by no means the most popular, given how rapidly the JS ecosystem shifts these days*) ***is the MEAN stack***, which includes **Node.js**, **Express**, but also **Angular.js** and **MongoDB** (we'll discuss these later).

## Full-Stack
> The term full-stack means developers who are comfortable working with both back-end and front-end technologies. [ref](https://www.laurencegellert.com/2012/08/what-is-a-full-stack-developer/)

layers of the full stack:
  * Server, Network, and Hosting Environment.
    * This involves understanding what can break and why, taking no resource for granted.
    * Appropriate use of the file system, cloud storage, network resources, and an understanding of data redundancy and availability is necessary.
    * How does the application scale given the hardware constraints?
    * What about multi-threading and race conditions? Guess what, you won’t see those on your development machine, but they can and do happen in the real world.
    * Full stack developers can work side by side with DevOps. The system should provide useful error messages and logging capabilities. DevOps will see the messages before you will, so make them count.
  * Data Modeling
    * If the data model is flawed, the business logic and higher layers start to need strange (ugly) code to compensate for corner cases the data model doesn’t cover.
    * Full stack developers know how to create a reasonably normalized relational model, complete with foreign keys, indexes, views, lookup tables, etc.
    * Full stack developers are familiar with the concept of non-relational data stores and understand where they shine over relational data stores.
  * Business Logic
    * The heart of the value the application provides.
    * Solid object oriented skills are needed here.
    * Frameworks might be needed here as well.
  * API layer / Action Layer / MVC
    * How the outside world operates against the business logic and data model.
    * Frameworks at this level should be used heavily.
    * Full stack developers have the ability to write clear, consistent, simple to use interfaces. The heights to which some APIs are convoluted repel me.
  * User Interface
    * Full stack developers: 
      1. understand how to create a readable layout 
      2. acknowledge they need help from artists and graphic designers. Either way, implementing a good visual design is key.
    * Can include mastery of HTML5 / CSS.
    * JavaScript is the up and coming language of the future and lots of exciting work is being done in the JavaScript world (node, backbone, knockout…)
  * User Experience
    * Full stack developers appreciate that users just want things to work.
    * A good system doesn’t give its users carpal tunnel syndrome or sore eyes. A full stack developer can step back and look at a process that needs 8 clicks and 3 steps, and get it down to one click.
    * Full stack developers write useful error messages. If something breaks, be apologetic about it. Sometimes programmers inadvertently write error messages that can make people feel stupid.
  * Understanding what the customer and the business need.
    * Now we are blurring into the line of architect, but that is too much of a hands off role.
    * Full stack developers have a grasp of what is going on in the field when the customer uses the software. They also have a grasp of the business.

## Generally speaking...
  * the **back-end** is *server-side technologies like* ***web servers*** (Node.js), databases, and so forth.
  * **Front-end** *refers to the stuff a user sees and interacts with*, such as **HTML** / **CSS** / **JavaScript** and all the associated considerations on client-side (or in the browser).