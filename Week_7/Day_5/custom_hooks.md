# Custom Hooks (save repetition)
*  It is possible for us to create custom Hooks to share logic between components.
* The custom Hooks can use the same built-in Hook methods that we have been using so far.

## More Rules for Custom Hooks
So far we have covered the two general rules for Hooks.
  1. **Don't call** Hooks ***inside loops***, ***conditions***, or ***nested functions***
  2. **Only call** Hooks from ***inside React components***

These rules apply with custom hooks as well, but there is one more.
  1. A custom Hook is a **function** that **must start with the word "use"**

Since we must call a custom Hook from within a component, **a custom Hook can call other custom or built-in Hooks.**

## Sharing Logic Between Functions
Hooks are designed to solve an entire class of problems in React.
  * It's **hard to reuse stateful logic between components**.
  * Complex components grow in size.
  * Classes confuse people and machines.

We can look at an example of **a form with multiple inputs to start down the road of repetition**. Here ***we are rendering five controlled components***.
```jsx
function Application(props) {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  return (
    <form>
      <input
        value={firstname}
        onChange={(event) => setFirstName(event.target.value)}
      />
      <input
        value={lastname}
        onChange={(event) => setLastName(event.target.value)}
      />
      <input
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        type="password"
      />
      <input
        value={passwordConfirmation}
        onChange={(event) => setPasswordConfirmation(event.target.value)}
        type="password"
      />
  </form>
);
```

This code is valid and will work as intended, but we can do better. **It is a common task to create controlled input fields. This scenario provides an excellent opportunity to use a custom Hook.**

**This Hook will track the state of the input field and return an object that contains a value and an onChange property**. ***These match the attributes that an input field must have to become controlled.***

```jsx
function useControlledInput(initial) {
  const [value, setValue] = useState(initial);

  return {
    value,
    onChange: (event) => setValue(event.target.value)
  };
}
```

We can **use the custom Hook instead of useState**. *We store the object that the Hook returns in a separate variable per input.* The **spread operator** provides an easy way to ***pass the value and onChange props directly to each input element***.
```jsx
function Application(props) {
  const firstname = useControlledInput("");
  const lastname = useControlledInput("");
  const email = useControlledInput("");
  const password = useControlledInput("");
  const passwordConfirmation = useControlledInput("");

  return (
    <form>
      <input {...firstname} />
      <input {...lastname} />
      <input {...email} />
      <input {...password} type="password" />
      <input {...passwordConfirmation} type="password" />
    </form>
  );
}
```

## Summary
This example shows how a custom Hook **can reduce the repetition in components**. The ```useControlledInput``` Hook ***can be imported and used by any component***. We can **store the Hook function in a separate file to reduce the complexity of the components** that use it.

Take a look at the [```useDebounce```](https://github.com/lighthouse-labs/album-search/blob/master/react-albums/src/hooks/useDebounce.js) Hook that we use in the "Album Search".
```jsx
import { useEffect } from "react";

export default function useDebounce(operation, ms) {
  useEffect(() => {
    const handle = setTimeout(operation, ms);
    return () => clearTimeout(handle);
  }, [operation, ms]);
}
```

It is normal to store custom Hooks in a folder called ```src/hooks``` with each file containing a single Hook.