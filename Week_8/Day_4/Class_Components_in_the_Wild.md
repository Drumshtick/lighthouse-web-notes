# Class Components in the Wild

## Classes
ES6 provides a new Class syntax that resembles some of the most popular object-oriented programming languages. As the adoption of ES6 rose between 2016 and 2018 the React team replaced the usage of their custom ```React.createClass``` function with official ES6 Class syntax.

A React component declared using an ES6 class must follow additional rules that we will cover in the following sections. We will start with the structure of a class.

```jsx
import React, { Component } from "react";

class Application extends Component {
 render() {
  return <div></div>;
 }
} 
```

This ```Application``` component renders a single div element and represents a basic example of a class-based component. It returns an empty div, which isn't very useful, but it does follow the first and second rules.
  1. All class-based React components **must extend the ```React.Component``` class.**
  2. All class-based React components **must override the render method of the ```React.Component``` superclass** that they extend.

In this example, we import ```Component``` using its name. **If we did not**, we would **need to write ```class Application extends React.Component```**.

We can write the same component as a function for comparison.
```jsx
import React, { Component } from "react";

function Application(props) {
  return <div></div>;
}
```

The ```render``` method in a class returns the React elements. **The behaviour of JSX is no different whether we use a Function or a Class** to declare our component.

## Constructors
Another point of confusion for new developers who build components using the class API surrounds the constructor method. **We are not required to override the constructor method, but if we do, then we must follow an important rule to ensure that our component works properly.**

We must call the ```super()``` method, and **we must pass it the props object.**

```jsx
import React, { Component } from "react";

class Application extends Component {
 constructor(props) {
  /* If we add a constructor to our class, we must pass props to the super class */
  super(props);
 }

 render() {
  return <div></div>;
 }
}
```

This ```constructor``` does not perform any operation, but it is still performing its only required responsibility. **A constructor must call the super(props) method.**


The details are unimportant at this moment. The ```super()``` **calls the constructor of the superclass and in this case, we must pass it the props.**

## Class Properties
Updates to ECMAScript are continually changing the way we approach React development. It is hard to determine how much influence the React community has on the direction of ECMAScript, but one thing is certain. **The React developer experience evolves with the language, and over time, *the constructor has become less relevant*.**

One example is the addition of [class properties](https://github.com/tc39/proposal-class-fields). Through the use of transpilaton tools like ```Babel```, we have gained the ability to test out new features and determine if they are popular before making them officially a part of the language.

**Most of the time**, **we expect to see a *constructor* at the *top of a class-based component* when the component *needs to set initial state* or *bind its action methods*.**

More details on setting initial state and binding context in later sections. This example illustrates why constructors are common in class-based components.

```jsx
class Application extends Component {
 constructor(props) {
  super(props);

  this.state = {
   count: 0
  };

  this.increment = this.increment.bind(this);
 }

 increment(event) {
  this.setState(previousState => ({
   count: previousState.count + 1
  }));
 }

 render() {
  return <button onClick={this.increment}>{this.state.count}</button>;
 }
}
```

Class properties provide a different syntax that is popular due to its simplicity. We are assigning an object to the state class property. The increment class property is assigned the reference to an arrow function that contains increment behaviour.

```jsx
class Application extends Component {
 state = {
  count: 0
 };

 increment = (event) => {
  this.setState(previousState => ({
   count: previousState.count + 1
  }));
 }

 render() {
  return <button onClick={this.increment}>{this.state.count}</button>;
 }
}
```

It doesn't look much different at first, but it becomes clear why we prefer this style for React components. In the wild projects will use either of these forms or a combination.

## Component Instances
The ES6 class definition describes the name of the component, the initial state and the instance methods used to manage logic. When we create a component, we are creating a new instance of the class.

The ```React.Component``` class definition provides common methods and properties that we use to access props and manage state. Every component that we create as a class inherits this.props, this.state and this.setState.

```jsx
class Counter extends Component {
 render() {
  return <button onClick={this.props.onClick}>{this.props.count}</button>;
 }
}

class Application extends Component {
 state = {
  count: 0
 };

 increment = event => {
  this.setState(previousState => ({
   count: previousState.count + 1
  }));
 };

 render() {
  return <Counter onClick={this.increment} count={this.state.count} />;
 }
}
```

  * The Counter accepts two props, which it accesses internally as this.props.onClick and this.props.count.
  * The Application sets the initial state using a class property.
  * In the render method of the Application component, we can access the increment instance method using this.
  * We store our state in an object called state that we can change using the setState method.

We access each of the methods and properties on the instance of the class component using this.
  * this.props
  * this.state
  * this.setState

## Setting State
The ```setState``` method is important **because it allows us to change the state of an otherwise static user interface**. There are guidelines for using the ```this.setState``` method.

### 1. Never set state directly

#### Bad
The code below **is an evil pattern** that we must avoid.
```jsx
show = event => {
  this.state = {
    visible: true
  }
};
```

#### Good
We must use the setState method to change state.
```jsx
show = event => {
  this.setState({
    visible: true
  });
}
```

### 2. State updates are merged
In the following example, we can see an example of this behaviour. **Only the value of the visible property is updated**. The value of ```this.state.unchanged``` **will remain unaffected** and will still be available in the render method.
```jsx
class App extends React.Component {
  state = {
    unchanged: true,
    visible: false
  };

  show = event => {
    this.setState({
      visible: true // Unchanged is unaffected
    });
  };

  render() {
    return (
      <button onClick={this.show}>
        {this.state.unchanged ? "Unchanged" : "Changed"}{" "}
        {this.state.visible ? "Visible" : "Hidden"}
      </button>
    );
  }
}
```


**This is different than when we are using ```useState```** which *requires us to manage the merging of our state*. **With Hooks**, we would have to **use ```setState({...state, show: visible})``` to retain the unchanged state**.

### 3. State updates are **asynchronous**
When we call ```this.setState``` **we cannot immediately access the new values on ```this.state```**. In the following example, we default to false and then set the ```visible``` state to true. The logged value is still false.
```jsx
  state = {
    visible: false
  };

  show = event => {
    this.setState({
      visible: true
    });

    console.log(this.state.visible);
  };
```

3. State updates are asynchronous
When we call this.setState we cannot immediately access the new values on this.state. In the following example, we default to false and then set the visible state to true. The logged value is still false.
```jsx
  state = {
    visible: false
  };

  show = event => {
    this.setState({
      visible: true
    });

    console.log(this.state.visible);
  };
```
It is only evident when React starts batching updates that we sometimes need to use a second form of ```this.setState```. If we call ```this.setState``` **five times quickly, then our component will not update five times.** As ***a performance optimization, React will batch updates***.

We can work around the issues by following a rule that says **we must use the second form if our new state depends on our old state**.
```jsx
increment = event => {
 this.setState(previousState => ({
  count: previousState.count + 1
 }));
};
```

In the example **above we pass a function to ```this.setState```**. When React is ready to update the state asynchronously, it will call the function and pass in what it knows to be the existing state. **The function must return a new object that represents the desired changes to ```this.state```**.

## Lifecycle
Lifecycle is the last topic to review before we start writing class-based components. There is an entire activity dedicated to applying patterns to handle side effects using classes, so we will only introduce the idea here.

**React predefines the available lifecycle methods**. React ***calls them at specific points during the life of a React component***. With class-based components, **lifecycle methods are the API we use to perform side effects.**

We can perform side effects like data fetching or connecting to a WebSocket when the component mounts to the DOM. **Lifecycle methods inform us when a component updates, or when React is about to remove one from the DOM**.

# Summary
This review focused on the differences, but not the details. There are well-written resources that do provide details.
  * [React.Component](https://reactjs.org/docs/react-component.html)
  * [State and Lifecycle](https://reactjs.org/docs/state-and-lifecycle.html)
  * [Component State](https://reactjs.org/docs/faq-state.html)

# More stuff
```React.Component```
We inherit the behaviour from a base component class provided by React. Sometimes we would see React.Component instead, if we aren't using named imports.

```render()```
We must define a render method in our class. **It is the only method that must exist for a component to work in React.**

```this.props```
React attaches the props object to the component instance. We can access props using this.props.

Initial State
We can **initialize the state in the constructor or using class property syntax**. We have decided not to use constructors for this project.

```this.state```
Similar to how props are attached to the instance, the same is true for this.state. We can access the state for the instance of the component using this.state.

```this.setState```
To change the existing state, we need to call the setState instance method provided by React. A component will render when after we called setState.

```Instance Methods```
There are instance methods that we inherit from React.Component like this.setState. We also create our own to help organize our logic.

Binding Context
When we start to pass functions around, we need to be careful of maintaining the correct context.

