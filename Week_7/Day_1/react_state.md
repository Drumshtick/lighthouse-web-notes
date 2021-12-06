# React State

State:
  * In computer science, the state of a program is defined as its condition regarding stored inputs. The term "state" here is used similarly to how it is used in science — whereas the state of an object, for instance, as a gas, liquid or solid, shows its current physical makeup, the state of a computer program shows its current values or contents.

State in React
  * The state in React allows us to **dynamically change one or many elements at once based on one variable.** State encompasses the key parts of our UI that change based on user input. *State allows us to retain information across multiple renders.* **To store state, we need to use a feature of React called "hooks" - specifically, the ```useState``` hook.**

## Using State In React
To use state in our project, **we need to import the ```useState``` hook into the module.** It is often **imported on the same line as React like so:**
```jsx
import React, { useState } from "react";
```
The ```useState``` function **receives an optional argument which is the default value for the state.** ```useState``` *returns an array.* The first element of the array is the current value for the state. The second element is a function that can update the state and cause a render. Note how *array destructuring is done on the left side of the assignment operator to immediately create two variables* from the array returned by useState.
```jsx
function Application(props) {
  const [count, setCount] = useState(0);

  return (
    <main>
      <Button onClick={(event) => setCount(count + 1)}>Increment</Button>
      <h1>Button was clicked {count} times.</h1>
    </main>
  );
}
```
The ```useState``` hook **uses array destructuring syntax to return two different values**. The pair of values returned in the array are related. 
  * One is used to **get a value** (a *"getter"*) 
  * The other is **used to set a value** (a *"setter"*).

In the example above, in the Application component we render the current value of count. We pass the setter that modifies the value of count to the Button component.