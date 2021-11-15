# application/x-www-form-urlencoded
* When a web browser sends a POST request from a web form element, ***the default Internet media type*** is *"application/x-www-form-urlencoded"*
* This is a format for **encoding key-value pairs** with possibly duplicate keys
* Each **key-value pair is separated by an '&' character**, and **each key is separated from its value by an '=' character.**
* *Keys and values* are both **escaped by replacing spaces with the '+'** character and then **using percent-encoding** on all other non-alphanumeric characters.
* For example, the key-value pairs: 

        Name: Gareth Wylie
        Age: 24
        Formula: a+b == 21

are encoded as

          Name=Gareth+Wylie&Age=24&Formula=a%2Bb+%3D%3D+21

# The special case of a **POST to the same page that the form belongs to** is known as a ***postback***.

