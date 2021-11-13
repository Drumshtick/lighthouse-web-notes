# Sessions
When the word session comes up in web development, it can mean a variety of things. 
  * session **cookies** - cookies that ***expire after a browser is closed***
  * **user** session - ***login/logout features*** on a site
  * **user** session - the ***event of a user using an application***
  * session - ***encrypted cookies***
  session - ***abstraction that refers to user data***, can be tracked in various ways:
    * ***storing data in an encrypted cookie***
    * **storing an id in an encrypted cookie** w/ a **session store on the server-side**
## Plain Text Cookies Are Not Secure
* identity values in plain-text in cookies is insecure because it is easy to forge HTTP requests.
* By encrypting the cookie's value any forged cookies will be rejected because after the decryption the value would be a garbled mess
## Encrypted Cookies
* One way to make the data in a cookie safe from tampering **is to encrypt it**. Instead of storing ```user_id=20125```, we encrypt the value (using the **AES cipher, and some secret key**), and ***set the result (called the "digest") as the cookie.***
