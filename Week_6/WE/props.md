# React Props

## Passing Props
We can pass props to a component in two different ways.

**The first way is to list each one as ```key=value``` pair.**
```jsx
  <Profile firstName="Amy" lastName="Mansel" avatar="/profile-hex.png" />  
```
**The second way uses the spread operator to destructure an object** ```{...{key: value}}```. It seems more complicated at first, but it is useful if we want to pass all the properties of an object as individual variables. Destructuring the user object when passing it to the Profile component will have the same effect as the example above.
```jsx
  const user = {firstName: "Amy", lastName: "Mansel", avatar: "/profile-hex.png"};

  <Profile {...user} />
```

## Using Props
The **properties you pass to a component are automatically stored in an object**. That **object is available as a parameter in the component definition and is commonly named ```props``` by React developers** (but technically, you could call it whatever you want).

The example below shows how the Profile component from Tweeter receives and uses the props that were passed to it.
```jsx
  function Profile (props) {
    // props will contain an object: {firstName: "Amy", lastName: "Mansel", avatar: "/profile-hex.png"}
    const firstName = props.firstName;
    const lastName = props.lastName;
    const avatar = props.avatar;

    return (
      <aside>
        <div className="profile">
          <img className="profile__image" src={avatar} />
        </div>
        <br />
        <div className="profile__name">
          <h2><span className="profile--bold">{firstName}</span> {lastName}</h2>
        </div>
      </aside>
    );
  }
```

It's common for a prop to be an entire function definition. **Remember not to call the function when it is being passed down** (no parentheses ()). *Pass only the function reference to the component*.
```jsx
  function doStuff () {
    console.log("This is the doStuff function.");
    // do stuff
  }

  // WRONG: doStuff is called instead of being passed as a reference!
  <Profile doStuff={doStuff()} />
```
Instead, pass the function reference without invoking it (no parentheses).
```jsx
  function doStuff () {
    console.log("This is the doStuff function.");
    // do stuff
  }

  // CORRECT: doStuff is passed as a reference!
  <Profile doStuff={doStuff} />
```
As you begin to use props in today's activities, don't forget to open the console in DevTools and resolve warnings early!