# UI rendering: optimistic vs pessimistic ([HERE](https://medium.com/@duncandevs/ui-rendering-optimistic-vs-pessimistic-e8e0f4df264))

The popularity of ```AJAX``` has grown since its inception in 2005 because of the rich user experience that it provides.
  * Being able to render content without having to refresh or switch pages has become a staple in UI, and something that users have come to expect.

But as users demand more fluidity from their apps, **as they demand their content to appear instantaneously AJAX alone has proven not to be enough.**

Thats because **it still takes time to process requests and return content to the user**.

A typical user flow looks like this
  1. a user clicks a submit button to post content
  2. a call is sent to the server with the user’s post
  3. the server saves the user’s post and returns content upon success, or an error message in case of a failure
  4. the client side application renders the content or failure message

**All the while when this is happening the user is waiting**. Even though this wait may only be a few seconds, **it has a noticeable affect on user experience**. especially when you consider the fluidity that users have become accustomed to.

***So how can a developer provide a more instantaneous experience?***
  * The answer is to **use a technique called** ***optimistic user interface***. 
    * In optimistic UI **you don’t keep the user waiting for a response**. **instead you *make the assumption* that the response will *succeed***, and provide them with the appropriate response right away.
    * So if a user is posting a comment, or sending a message, **you render the view of the content immediately**.
    * Then if the server should response with a failure to save the record, you may re-render the content section with an error message.

In optimistic ui user flow changes to...
  * a user clicks a submit button to post content
  * client app renders user’s information
  * a call is sent to the server with the user’s post
  * the server saves the user’s post and returns an error message in case of a failure
  * the client side application renders failure message if one is present

Optimistic rendering **is not appropriate for all cases**.
  * For actions like **posting a comment**, or **liking content**; **it is absolutely appropriate to use optimistic rendering,** 
    * since **failure to complete the action does not result in a high cost**. 
  * But for certain tasks such as, **a bank transfers** or **a submission of a tax form**
    * **it is more appropriate to *use pessimistic ui* when rendering a response**.

## In relation to [Scheduler](https://github.com/Drumshtick/Scheduler)

We wait for the full HTTP request and response to finish before updating the user interface. There is approximately a one second delay between clicking on the save button and seeing the booked interview. We are only going to use a pessimistic update for creating, deleting, and editing appointments.

NOTE :
    The one-second delay has been added to the server so that it is easier to test the status functionality. Normally this response will come back within milliseconds.

## Async Status
We cannot make optimistic updates 100% of the time. We need to know how to handle longer requests. We will show a status indicator while we make the request. When the request is complete, we display it using the SHOW mode as before.

We have already done the hard work. The only remaining step is to transition to the SAVING mode when starting the save operation.