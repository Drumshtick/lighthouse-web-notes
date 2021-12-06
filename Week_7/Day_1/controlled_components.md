# Controlled Components

HTML form elements play an important part of interactive websites. They allow a user to provide input to the website to intake and process that data. 
  * **One key thing that form elements do is keep track of their own state.**

An ```<input>``` element **keeps track of its current value.** The *same is true for* ```<textarea>``` and ```<select>``` elements. However, recall that a key feature of React is to keep track of the application's state. **Instead of using HTML's built-in state management, it is preferable to use React to track the entire application's state.**
___________________________________________________________________________________________________________________________________

#### ***When we create components that override HTML form elements to let React control their state, we call them controlled components.*** ###

___________________________________________________________________________________________________________________________________

The pattern involves:
  1. **Setting a variable that is stored in state as the value attribute on the form element.**
  2. Using an ```onChange``` event **that uses the *setter* of your state to set a new value when the input changes.**

Recall from reading about [event handling](https://web.compass.lighthouselabs.ca/b631bae2-8484-42cf-88f9-8cf856c9e11c) that events in the DOM generate event objects which have lots of useful information for programmers. **When the user types on the keyboard, that triggers the onChange event and the value of the data is found in** ```event.target.value```.

By using ***controlled components***, **we have the current value of the input in state, and we can use it in other areas of the app.** You can now pass the value to other UI elements, or reset it from other event handlers.

Consider the example below:
```jsx
function DisplayWord(props) {
  const [word, setWord] = useState("");

  return (
    <main>
      <input
        value={word}
        onChange={(event) => setWord(event.target.value)}
        placeholder="Please enter a word"
      />
      <h1>Your word is: {word}.</h1>
    </main>
  );
}
```

As noted above, the ```<input>``` element **becomes a *controlled component*** when we provide a ```value prop``` and an ```onChange``` event handler that can update the value.

Let's consider what is happening **at each step of the input cycle:**
  1. A **user types a single character** "A" into the input element.
  2. The ```onChange``` event handler **is triggered**.
  3. It invokes the ```setWord``` function **to change the state**.
  4. *When the state changes*, **React calls the component function**.
  5. The ```useState``` call **returns the current value** which is "A".
  6. The ```input``` element **has its value set** to "A".
  7. The **browser displays the "Your word is: {word}." message** as "Your word is: A."

As the **user types more letters, we run this process for each change** to the input. ***The value of the word state always contains the most recent user input***. Another benefit is that **you can call** ```setWord("")``` (with an empty string) **at any point to empty or reset the ```<input>```**.

________________________________________________________________________________________________________________________________________________________________________

## <center>More info on React forms [HERE](https://reactjs.org/docs/forms.html)</center>

________________________________________________________________________________________________________________________________________________________________________
