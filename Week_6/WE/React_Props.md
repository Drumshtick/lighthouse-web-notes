# React Props

In JavaScript, we would use function parameters that can hold different data each time the function is called. **In React, we pass data to components as "props" (short for properties).**

**So what are props?** *They are properties that we give to a component.* 
  * Just like JavaScript function arguments, a property can be a piece of data or an entire function.
  * In JSX, **we pass properties to components the same way we would assign attributes to HTML elements.** 
    * In HTML however, attribute names are fixed. 
    * In JSX, you define the property names (just as you specify variable names when you list parameters in a function definition).

## Passing Props

We can pass props to a component **in two different ways.** 

#### The first way is to list each one as ```key=value``` pair.
```jsx
<Profile firstName="Amy" lastName="Mansel" avatar="/profile-hex.png" />  
```

#### The second way **uses the spread operator to destructure an object ```{...{key: value}}```**. It seems more complicated at first, but it is useful if we want to pass all the properties of an object as individual variables. Destructuring the user object when passing it to the Profile component will have the same effect as the example above.
```jsx
  const user = {firstName: "Amy", lastName: "Mansel", avatar: "/profile-hex.png"};

  <Profile {...user} />
```

## Using Props