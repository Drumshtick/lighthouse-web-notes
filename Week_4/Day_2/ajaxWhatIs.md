# What is Ajax?
* When you type a URL into your web browser's address bar and press enter, the browser performs a GET request and then presents the HTML web page that is returned in the response.

* The request might look like this for the URL http://example.com/about.html.
```shell
GET /about.html HTTP/1.1
Host: example.com
Accept: text/html
```
* The response from the server might look like this:
```shell
HTTP/1.1 200 OK
Content-Type: text/html

<!doctype html>
<html>
  <head>
    <title>About Us</title>
  </head>
  <body>
    <h1>About Us</h1>
    <!-- etc. -->
  </body>
</html>
```
* This response contains an HTML page as is specified by the ```Content-Type``` header. 
  * If there is another web page already being shown in the browser window, **this new page replaces the old one**. 
  * The same interaction takes place **when you click on a link in a web page**, **or when you submit a form whose method attribute is set to GET.**

## Ajax is Asynchronous
* Ajax stands for **Asynchronous JavaScript and XML.**
  * The term asynchronous (or commonly "async") refers to the fact that Ajax HTTP requests don't interrupt a user's interaction with the current web page. 
* ***Instead of an HTTP response replacing the web page in the browser, it is passed to a JavaScript function***, and that function is responsible for determining what to do with it. 
  * Often the JavaScript **will modify the DOM** to reflect the response from the server.
* This is a valuable workflow because it makes web pages more dynamic by allowing subsequent requests to be sent to the server without navigating away from the page.
* In traditional, synchronous web sites, **each time a user clicks a link or submits a form they have to wait for the server to send the next web page for them to interact with** (after the browser has rendered it).
* ***Ajax allows the user to continue using the web page while the request-response cycle is done in the background, asynchronously.***

## How Ajax works
* **Ajax requests are normal HTTP requests sent to a web server by some JavaScript on a web page.**
* A lot of the time these requests are made after the user interacts with the page in some way, like clicking a button. 
* In fact, **the way that you tell JavaScript to run some function when a button is clicked is very similar to the way that you tell JavaScript to run some function when an HTTP request returns.**

## Ajax libraries
* Before going into how to actually add Ajax functionality to a web site, it's important to address the underlying technology. 
* **JavaScript is capable of performing Ajax requests without any code libraries**; *Ajax is something all major browsers support.*
* However, there are **several JS libraries that try to improve the way that Ajax is done in JavaScript**. 
  * ***The most popular one is jQuery, and for that reason the examples that follow will use jQuery.***