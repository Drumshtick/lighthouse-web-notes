# What is HyperText?
**HyperText** is the **HT** in **HTTP** and **HTML**, and its origins date back to the 1960's.

* ***Hypertext is text which contains links to other texts.***

## HTTP Introduction
HTTP is a protocol ***used to read and write "resources" (data) in a simple text-based manner.*** It started off as being mostly used for HTML documents, but today it's used for all sorts of documents, like JavaScript files, CSS, and anything else that our browser is capable of downloading (PDFs, etc.).

## HTTP Flow
HTTP is a ***request-response based protocol.*** A client makes a request to an HTTP server, immediately also sending a message asking for a specific resource, which the server sends down as a response. **A server cannot send a response to a client if the client has not first sent a request.**

Read the short HTTP flow* and **HTTP Messages sections in the MDN An Overview of HTTP.
https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview#HTTP_Flow
NOTES HERE: [HERE](/httpFLOWMDN.md)

## HTTP Requests
As we read in the MDN article, when a client wants to communicate with a server it issues a request. An HTTP request is made up of many components, but there are only **two parts that we need to pay attention to right now: the PATH and the METHOD.** The ***path says what resource the client wants to act on***, and the ***method says what action it would like to perform.***

## HTTP Methods
There are 9 HTTP request methods, but we only need to consider 4 of them right now:

* GET: used to "get" some data from the server
* POST: usually used to create some new data
* PUT: generally used for editing existing data on the server
* DELETE: used to delete some existing data
We'll explore these in detail over the next few weeks. Another name for HTTP methods is "verbs", since the methods can be seen as "action words".

## Paths and URL Structures
In order to request a "resource" (webpage, etc.) from an HTTP server, we need to know its URL. Every web developer should be able to correctly identify a Uniform Resource Locator, or URL. The path is a part of the URL.

Read the MDN article, Understanding URLs and their structure, and identify the different components of the following URL:
https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_URL

NOTES: [HERE](whatIsURL.md)
* Protocol
* Domain (or Host)
* Port
* Resource Path
* Query Parameters
* Anchor

## HTTP Responses
When a server receives a request from a client, it reads the path and method to figure out what it should do. For example, if the request it receives is something like GET /dogs the server may try to fetch and return all of the data about dogs that it has.

After the server has tried to perform the requested action, it sends a response back to the client. The response contains all kinds of useful information, but we'll look at two important bits here:

* Status Code
* Body
## HTTP Status Codes
You've likely seen error pages before:
![](2021-11-03-14-01-17.png)

These kinds of pages tell a user if ***a requested resource wasn't found,*** or if the server itself is simply unable to perform the action at the moment. It's crucial to be able to convey this information as quickly and efficiently as possible. While these info pages work well for humans, when a server wants to relay this information to a client it will use a status code.

The status code is a three-digit number that the server puts in the response to let the client know whether or not the operation was successful. There are TONS of status codes, but you don't need to be familiar with all of them. The main ones to keep an eye out for are below, with a translation of what they mean:

* 200: "Everything went great!"
* 201: "The request has succeeded and a new resource has been created as a result."
* 404: "Resource was not found."
* 500: "The server had an error."
* New status codes are added all the time, including 451, a status code that indicates that the user requested a resource that is not available due to legal reasons.

## Response Body
The response will also **usually contain some data,** such as the data the client originally requested. *This data is stored in a part of the response which is called the body.* The body may store data in many kinds of formats, such as text and images. For our purposes, the body will often *contain webpages (HTML) or data encoded in JSON, which we'll learn about later on.*

## Headers
As we mentioned earlier, HTTP requests and responses are made up of lots of components. However, you only need to worry about a few of them right now. For the requests, it's enough to understand the path and method. For the responses, you only need to consider the status code and body. Both requests and responses also let a programmer inject extra information into them as "headers", which is a key-value way of storing data in a request or response. There are many reasons for why we would add headers, but we won't explore that until next week's project.

For now, here's an example of developers who have added headers to their responses to honour Sir Terry Pratchett.

# Conclusion
While there's a lot more depth to the topic of HTTP, our focus here was to introduce the core concepts that are important to understand.

Specifically:

* HTTP is a request-response protocol, where the client makes requests and the server sends responses
* HTTP is a text based protocol, making it easy to read and understand for humans
* HTTP requests must contain the verb/method (eg: GET) and the Path (eg: /about)
* HTTP requests aren't always to receive data, but sometimes to save data, like when we submit a form on a website. This is done via a POST instead of a GET
* Requests and responses both contain key-value based headers (eg: Accept-Language: fr, Content-Type: text/html, etc.)