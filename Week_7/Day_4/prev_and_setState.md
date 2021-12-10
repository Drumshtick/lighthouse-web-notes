# What is prev?
```jsx
const [likes, setLikes] = useState(0);
return <button onClick={() => setLikes(prev => prev + 1)} />
```

The setLikes function (aka the function that sets the state) can take either a value or a callback that will be executed and the value that it returns will be set as the state. This callback has a parameter, and by convention, we call this parameter prev, which holds the value of the likes state BEFORE the setLikes was triggered by react. Since setState does batching, it's sometimes important to know what the previous state was when you want to update the new state based on the previous state value.

Here is an [example](https://codesandbox.io/s/hungry-flower-dp0uf?file=/src/App.js) of batching WITHOUT the use of prev. Notice how it fails to increment by five.

Here is the fixed [example](https://codesandbox.io/s/eager-williamson-7irb6?file=/src/App.js) WITH the use of prev.

This is an important consideration when using Hooks with asynchronous operations. When we depend on previous state, we should use the second form of setLikes.