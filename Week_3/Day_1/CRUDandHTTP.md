# CRUD
Almost all web applications allow users to manipulate data in various ways, which we typically break down into four categories: Create, Read, Update and Delete.
| Action       |Description|
|--------------|-----------|
| Create       |  Add a new record 
| Read         | Retrieve the value of a record 
|Read        	 | Retrieve the value of a record
|Update      	 | Update a record's value
|Delete        |	Delete a record

If we used a JavaScript *object ```users```* whose *keys would be user IDs* and whose matching *values would be objects storing user information*, the following table shows how we could perform CRUD operations on the users object.

|Action | JavaScript |
|-------|------------|
|Create |	```users["5315"] = {first_name: "John", last_name: "Smith"}```
|Read   | ```users["5315"]```
|Update |```users["5315"].first_name = "Jane"```
|Delete |```delete users["5315"]```

Later in bootcamp, instead of using JavaScript objects, **we will use databases to store our data so that the data is persisted** (that is, so it doesn't disappear when we restart our apps). The basic operations will still be CRUD, but the databases provide more powerful versions of each (for example, being able to create multiple data entries at a time, or to list data entries that match a certain condition).

# CRUD and HTTP
**Most applications can be thought of as "fancy user interfaces on top of databases"**, and in the case of web applications, *HTTP is the protocol used to facilitate communication between the interface and the database* (with the browser and server in between):

*HTTP was designed around the concept of resources* (described by URLs) and actions that can be taken on them. To take an action on a resource, a client (for example, a browser) sends an HTTP request to a server with the appropriate URL and method. The following table shows how the most common HTTP methods correspond with CRUD actions.

|HTTP Method | CRUD Action |
|------------|-------------|
GET	Read
POST	Create
PUT	Update
DELETE	Delete

# Safe Methods (wikipedia: HTTP)
* A request method is safe if a request with that method has no intended effect on the server.
  * Methods **GET, HEAD, OPTIONS, and TRACE** are defined as safe.
  * Safe methods are intended to be read-only
  * **They do not exclude side effects though**, such as *appending request information to a log file* or *charging an advertising account*, *****since they are not requested by the client*****, by definition.
    * EX - a website might allow deletion of a resource through a URL such as https://example.com/article/1234/delete, which, if arbitrarily fetched, even using GET, would simply delete the article.
  * Careless programming can make a GET create non-trivial changes to the page. THIS IS BAD, because web caching, search engines and other automated agents could cause changes to the site
* The methods **POST, PUT, DELETE, CONNECT, and PATCH** are *not safe.*
  * They may **modify the state of the server** or *have other effects such as sending an email.* 
# Idempotent methods (wiki: HTTP)
* A request method is idempotent *if multiple identical requests with that method have the same intended effect as a single such request.*
  * **PUT and DELETE, and safe methods** are defined as idempotent.
  * **POST, CONNECT, and PATCH are not necessarily idempotent**
    * sending an identical POST request multiple times may further modify the state of the server or have further effects such as sending an email.
* In some cases this may be desirable, but in other cases *this could be due to an accident,* such as when **a user does not realize that their action will result in sending another request,** or they did not receive adequate feedback that their first request was successful.
  *  web browsers may show alert dialog boxes to warn users in some cases where reloading a page may re-submit a POST request
# HTTP request Method's
## GET
The GET method requests that the target resource transfers a representation of its state. GET requests should only retrieve data and should have no other effect. (This is also true of some other HTTP methods.) The W3C has published guidance principles on this distinction, saying, "Web application design should be informed by the above principles, but also by the relevant limitations."[52] See safe methods below.
## HEAD
The HEAD method requests that the target resource transfers a representation of its state, like for a GET request, but without the representation data enclosed in the response body. This is useful for retrieving the representation metadata in the response header, without having to transfer the entire representation.
## POST
The POST method requests that the target resource processes the representation enclosed in the request according to the semantics of the target resource. For example, it is used for posting a message to an Internet forum, subscribing to a mailing list, or completing an online shopping transaction.
## PUT
The PUT method requests that the target resource creates or updates its state with the state defined by the representation enclosed in the request.
## DELETE
The DELETE method requests that the target resource deletes its state.

#  Back to C.R.U.D
* It would technically be possible to create a functional web application *that only uses GET requests* for all CRUD actions, but to play by the rules of HTTP we should use the appropriate methods for each request.
* This means **that when we send a safe request to read some information** (safe as in a request that should have no side effects on the server), **we should use the GET method.**
* When we send a request to **create a resource we should use POST.**
* When we **update a resource in an idempotent way we should use PUT**, otherwise when updating in a non-idempotent way we should use POST.
* If we are requesting to **delete a resource, we should use DELETE.**

# Limitations of HTTP in the Browser
Unfortunately there's a catch... Using just links and forms we can't achieve our goal of issuing the right type of HTTP method for each request, **because links can only create GET requests** and **forms can only create GET and POST requests** (for historical reasons).

To create PUT and DELETE requests we would need to use a workaround known as *****HTTP Method Override*****, but for simplicity we will make do with just GET and POST. **Instead of PUT and DELETE, we will use POST.**

