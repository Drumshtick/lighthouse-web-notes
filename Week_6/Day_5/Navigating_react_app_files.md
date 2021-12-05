# Navigating React App Files

When we use the ```create-react-app``` package to build the structure of our project, we are met with a bunch of files that were automatically created. Let's see what they do.

## Main Project Folder
```shell
 ./
    node_modules/ 
    public/  
    src/ 
    README.md  
    package.json  
    yarn.lock
```

In the main project folder, we have the typical ```package.json``` and ```yarn.lock``` or ```package-lock.json```. 
  * Those files are ***keeping track of the installed dependencies and configurations*** for your project.

*The only file out of those three that we may want to edit would be* the ```package.json``` file
  * where we can **add additional scripts or configs**, **change the name of the project**, **update the author name, etc**.

The ```README.md``` file **has instructions on how to use the project we just set up.** It **should be updated with instructions relevant to our project.**

## node_modules Folder

```shell
 ./node_modules/
    ...
    A LOT of files!
    ...
```

As usual, the ```node_modules/``` folder is **populated with all the installed packages for our project.** *There is no need to edit this folder* since it's managed by our ```npm``` commands.

## public Folder
```shell
  ./public/
    favicon.ico
    index.html  
    logo192.png  
    logo512.png  
    manifest.json  
    robots.txt
```
As with TinyApp, the ```public/``` folder **contains elements that will be accessible to the browser when the development server is running**. 
  * **The most important file in this folder** is the ```index.html``` ***file since it is where our React app will attach itself.***


×
Congrats on completing activity 'Building Our React App'!
Navigating React App Files
Reading
10 minutes
 Status
Incomplete
When we use the create-react-app package to build the structure of our project, we are met with a bunch of files that were automatically created. Let's see what they do.

Main Project Folder
  ./
    node_modules/ 
    public/  
    src/ 
    README.md  
    package.json  
    yarn.lock
In the main project folder, we have the typical package.json and yarn.lock or package-lock.json. Those files are keeping track of the installed dependencies and configurations for your project.

The only file out of those three that we may want to edit would be the package.json file, where we can add additional scripts or configs, change the name of the project, update the author name, etc.

The README.md file has instructions on how to use the project we just set up. It should be updated with instructions relevant to our project.

node_modules Folder
  ./node_modules/
    ...
    A LOT of files!
    ...
As usual, the node_modules/ folder is populated with all the installed packages for our project. There is no need to edit this folder since it's managed by our npm commands.

public Folder
  ./public/
    favicon.ico
    index.html  
    logo192.png  
    logo512.png  
    manifest.json  
    robots.txt
As with TinyApp, the public/ folder contains elements that will be accessible to the browser when the development server is running. The most important file in this folder is the index.html file since it is where our React app will attach itself.

## src Folder
```shell
  ./src/
    App.css  
    App.js  
    App.test.js  
    index.css  
    index.js  
    logo.svg  
    reportWebVitals.js  
    setupTests.js
```

Lastly we have the ```src/``` folder, **which contains all of the code for our app.**
  * As a starting point, the ```create-react-app``` package **creates one component file** (```App.js```) and an ```index.js``` that will render our component in the previously mentioned ```index.html``` file.
  * **A base test file is also generated, along with css files to style the components.**

## App.js
Let's have a look at the provided ```App.js``` file
```jsx
  import logo from './logo.svg';
  import './App.css';

  function App() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }

  export default App;
```
