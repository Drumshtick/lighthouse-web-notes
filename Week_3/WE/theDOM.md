# So what's the "DOM"?

When a page is loaded for users to see, *the browser is running a process that creates a Document Object Model (or DOM) in memory* to represent all of the HTML code on that page.
  * Each HTML element is also called a "Node" or "DOM Node", not to be confused with NodeJS.
  * One reason why the browser does this is to allow JavaScript code to manipulate the web page and respond to user interactions like clicking on a button.

## What is the DOM? How does one work with it? [-REF-](https://www.digitalocean.com/community/tutorials/introduction-to-the-dom)

### Introduction
* DOM is an interface that allows a programming language to manipulate the content, structure, and style of a website.
* JavaScript is the client-side scripting language that connects to the DOM in an internet browser.
* The ```document``` object is core to manipulating the DOM with Javascript.

### What is the DOM?
* In addition to parsing the style and structure of the HTML and CSS, *the browser creates a representation of the document known as the Document Object Model.*
* This **model** allows JavaScript to access the text content and elements of the website document as objects.
<center><u>A simple HTML page follows:</u></center>


```html
<!DOCTYPE html>
<html lang="en">

  <head>
    <title>Learning the DOM</title>
  </head>

  <body>
    <h1>Document Object Model</h1>
  </body>

</html>
```

It contains the absolute *most essential aspects of a website document* — a **doctype**, and an **html tag** with the *head and body nested inside*.

#### The Document Object
* The ```document``` object is a built-in object that has many **properties** and **methods** that we can use to access and modify websites.
* In ***Developer Tools*** on ```index.html```, move to the **Console tab**. Type **document** into the console and press ```ENTER```. You will see that what is output is the same as what you see in the Elements tab.
```console
> document;
```
output...
```html
#document
<!DOCTYPE html>
<html lang="en">

  <head>
    <title>Learning the DOM</title>
  </head>

  <body>
    <h1>Document Object Model</h1>
  </body>

</html>
```

#### What is the Difference Between the **DOM** and **HTML Source Code**?
There are two instances in which the browser-generated DOM will be different than HTML source code:

1. The DOM is modified by client-side JavaScript
2. The browser automatically fixes errors in the source code

In console it is possible to modify the DOM.
```console
> document.body
```
output...
```html
<body>
  <h1>Document Object Model</h1>
</body>
```

```document``` is an ***object***, ```body``` is a ***property*** of that ***object*** that we have accessed with *dot notation*. Submitting ```document.body``` to the console outputs *the body element and everything inside of it.*

In the console, we can change some of the live properties of the ```body``` object on this website. We’ll edit the **style attribute**, changing the **background color** to **fuchsia**. Type this into the console:
```console
> document.body.style.backgroundColor = 'fuchsia';
```

Right click on the page and select “View Page Source”. **You will notice that the source of the website does not contain the new style attribute we added via JavaScript.** The source of a website will not change and will never be affected by client-side JavaScript. If you refresh the page, the new code we added in the console will disappear.