# What is Asynchronous Programming?
**Asynchronous programming** is when a ***unit of work is run separately from the main thread of the program*** and notifies the program of its completion.
## Asynchronous Callbacks
Here is an example to illustrate the point. Don't get too worried about the fs (file system) module and function being used. Our goal here isn't about learning fs specifically.
```javascript
const fs = require("fs");

console.log('BEFORE writeFile call');

fs.writeFile("./test_async.txt", "h3ll0 file!\n", (error) => {
  if (error) {
    // Handle error
    console.log("Failed to write to file");
    return;
  }
  // Success!
  console.log("Successfully wrote to file");
});

console.log('AFTER writeFile call');
```
Notice that the **writeFile** function takes in not only the file path and the contents to write, **but also a third parameter – a callback function.** This callback function is executed ***after*** the file-writing is complete.
This code would execute logs as such:
1. BEFORE writeFile call
2. AFTER writeFile call
3. Successfully wrote to file
