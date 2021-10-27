# Object Keys
Let's revisit the rules regarding how object keys work in JavaScript:

## Keys are always strings
1. ***Each key is unique*** (can only occur once in the object)
2. ***Each key is associated with exactly one value.*** (Note that technically, **an array or another object would count as "one value"** here, even though they contain other values.)
When writing out object literals, like ```{ myKey: "some value" }```, ***the key is always interpreted as a literal string***, even if it's unquoted. **It's only necessary to use quotes around the key if the key contains spaces, hyphens or periods.** For instance: ```{ "my-hyphenated-key": "some value" }```.

*****By convention, we omit the quotes around keys in string literals whenever we can.***** If the key is a valid variable name, then we don't have to include quotes

The following example shows two ways of specifying the same value in an object literal: using a literal string for the value, or using a variable.
```javascript
const spam = "spam";
person["dislikes"] = { food: spam, "e-mail": "spam" };
```

# Object.keys
To inspect an object's keys, there is a method ```javascriptObject.keys(...)``` that returns an array of keys.

