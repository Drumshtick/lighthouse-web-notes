# REST
REST is *a set of conventions and practices* in web development that deals with **accessing and manipulating resources over HTTP.**
* **A resource can be an abstraction of an object or data.** In practice resources are referenced using a URL (Uniform Resource Locator).
### EX
The GitHub API **is RESTful.** It can be *used to manage resources such as Users, Repos, Commits, Gists, and so forth.* Each resource can be accessed using an API endpoint (which is simply a URL).

Consider the endpoint for **Listing commits**:
* GET /repos/:owner/:repo/commits
>(You can begin to see that REST API endpoint reflect the relationships between objects. In the example above, commits belong to a repo, which belongs to an owner user.)

We can perform various operations on these resources (create, delete, modify) using the different HTTP methods.

## CRUD (Create Read Update Delete) -> BREAD

In REST, the notion of Reading is split into two:
1. accessing a whole collection ("Search" or "Browse")
2. accessing a single member of that collection. Some developers extend CRUD to include Search, and call it SCRUD. Others think SCRUD is ugly, and instead made up a new mnemonic, BREAD, which stands for: Browse Read Edit Add Delete.

| Action |	Application	| Description  |	HTTP Method |
|--------|--------------|--------------|--------------|
|Browse |	collection |	browse the collection|	GET |
|Read |	member  | 	read a member of the collection|	GET
Edit	|member|	edit a member of the collection |	PUT / PATCH
Add	| collection	| add a new member to the collection |	POST
Delete |	member| delete a member of the collection |	DELETE

## Resource Identifier
* When you identify a resource, you must choose a name for it.
* The name is typically the name of the object type, plural, all lower case, and often with words separated with hyphens (unless it is a singular resource, which we'll get to later).
* For members of the collection, a unique identifier should be indicated as well
  * This is done by adding the member object's id after a slash following the collection identifier.
  * For example, the users collection would be identified as /users and the first user would be identified as /users/1.

## Representation
* When a resource is transferred (sent back to the user-agent in an HTTP response) it can be in any format and does not necessarily have to be complete. 
* The format of the representation should take into account the Accept header sent in the HTTP request.
  * If the request had Accept: text/html then an HTML representation should be sent. If the request had Accept: application/json then a JSON representation should be sent.
* Here are some example representations in various formats.

This is what a data record might look in a **spreadsheet**:
```spreadsheet
Users
+----+-------+-------------------------+
| id | name  | email                   |
+----+-------+-------------------------+
| 1  | Larry | larry@lighthouselabs.ca |
+----+-------+-------------------------+
```
This is what **that same data would look like expressed as JSON.**
```json
{
  "id": 1,
  "name": "Larry",
  "email": "larry@lighthouselabs.ca"
}
```
**There are many ways to represent data in HTML.** This is one, but I'm sure you could come up with something better. If you'll remember, *a representation doesn't have to be 100% complete.* This representation omits the id field.
```html
<!doctype html>
<p><a href="mailto:larry@lighthouselabs.ca">Larry</a></p>
```
## Basic Routing Conventions
### The following is how you would want your routes configured for a typical resource. In this example, **we'll use a resource named users.**
* Here are some examples of how the behaviours of the five RESTful routes can be implemented.
* There are additional considerations that should be taken into account when building a more generalized system (such as how to change the behaviour of the system depending on the content types that the requestor accepts.)
* **These work for simple websites that only interact using HTML.**

GET /users
* Retrieves the collection of Users
* Renders a representation of the collection

POST /users

* Creates a new User using the provided request body
* Redirects to a route where the new user can be viewed

GET /users/:id

* Retrieves the User with the specified id
* Renders a representation of the User
* Responds with a 404 - Not Found error if the User doesn't exist

PUT /users/:id

* Updates a specific User using the provided request body
* May redirect to or render a representation of the User
* Responds with a 404 - Not Found error if the User doesn't exist

DELETE /users/:id

* Deletes a specific User
* May redirect to the index of the collection
* Responds with a 404 - Not Found error if the User doesn't exist

### More Routes
There are two extra routes that are typical for applications that interact using HTML. These are routes that provide HTML web pages that contain forms that a user can use **to interact with the "create resource" and "edit resource" routes.** *These are both GET routes because they simply return HTML pages.*

GET /users/new

* Renders a form that collects information about a new User
* The form submits a POST request to the collection path /users

GET /users/:id/edit

* Renders a form that collects information for altering a User
* The form submits a PUT request to the user's path /users/:id
* Responds with a 404 - Not Found error if the User doesn't exist