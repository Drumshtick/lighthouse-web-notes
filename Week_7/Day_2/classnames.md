# classnames() Usage [HERE](https://github.com/JedWatson/classnames#usage)

### BAD
```jsx
export default function Button(props) {
  let buttonClass = "button";

  if (props.confirm) {
    buttonClass += " button--confirm";
  }
  if (props.danger) {
    buttonClass += " button--danger";
  }
  if (props.someOtherClass) {
    buttonClass += " button--some-other-class";
  }
  ...

  return <button className={buttonClass}>{props.children}</button>;
}
```

### A better way

```jsx
classNames('foo', 'bar'); // => 'foo bar'
```

In the example above, adding foo and bar as arguments to the classNames function returns the string 'foo bar'.

Now look closely at the next two examples:
```jsx
classNames('foo', { bar: true }); // => 'foo bar'
classNames('foo', { bar: false }); // => 'foo'
```

In the example above, **the first argument** ***is a string***, but **the second argument** ***is an object***. **The string foo is always returned**, but bar is a key to a boolean value. ***If the boolean value is true, bar is added to the string that is returned. If false, bar is not added.***

### Importing classnames

install with:
```bash
npm install classnames --save
```

then import: 
```jsx
import classNames from "classnames";
```

### Using classNames

```jsx
//BAD
...
  let buttonClass = "button";

  if (props.confirm) {
    buttonClass += " button--confirm";
  }
  if (props.danger) {
    buttonClass += " button--danger";
  }
  if (props.someOtherClass) {
    buttonClass += " button--some-other-class";
  }
...

// GOOD
...
  const buttonClass = classNames({
    button: true, // base class will always be present
    'button--confirm': props.confirm,
    'button--danger': props.danger
  });
...
```