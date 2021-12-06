# setState()

```jsx
import { setState } from 'react';
```

```jsx
function SomeComponent() {
  const [state, setState] = useState(<initializer value>);

  return (
    ...
  );
};
```


Beware of a common error by those new to React: the setter function returned by useState must always be used to assign a new value to the state. Doing something like this can cause problems:
```jsx
let [x, setX] = useState(42);
// WRONG!
x = 99;

// CORRECT!
setX(99);
``` 

Updating The States Of Our Components
Since we want to update the states of our components based on a click event, that means that we will need to use the onClick event to count the clicks. One pattern to keep the JSX clean when doing actions on events is to create a function that only needs to be referenced.
```jsx
  const handleClick = (event) => setState(event.target.value ? event.target.value : "");

  <button onClick={handleClick} />

  // instead of

  <button onClick={event => setState(event.target.value ? event.target.value : "")} />
```

## EX
#### AngryButton
When this component is clicked, we want to increment the current value of anger by 0.1, unless the value is bigger than 1. In that case we want to reset the value to 0.

Create a handleClick function that satisfies the condition above for the state. Add a click event listener to the HTML button tag.

Once done, your code should look like this:
```jsx
  function AngryButton(props) {
    const [anger, setAnger] = useState(0);

    const handleClick = () => {
      if (anger < 1) {
        setAnger(anger + 0.1);
      } else {
        setAnger(0);
      }
    }

    return (
      <button style={{ backgroundColor: `rgba(255,0,0,${anger})` }} onClick={handleClick} className="AngryButton">
        {anger < 1 && <span>Don't click me too much!</span>}
        {anger > 1 && <span>Rawr!</span>}
      </button>
    );
  }
```

## Where to keep logic for changing state

It is good practice to **keep logic that changes the state near the declaration, and not in a child component.** The reason behind this is that if the code that changes the state is written in a component that is several levels down, *it can be hard to find the source of a bug.*

If we prepare the logic in our App component, and then give a pre-made function to the children component, it would work the same way as earlier, but this time with the added value that the logic is safe in App