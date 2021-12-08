# What is a Mixin?
A Mixin is a block of code that **lets us group CSS declarations we may reuse throughout our site.**

Take, for example, displaying an HTML element as a Flex element.
```scss
.row {
    display: -webkit-flex;
    display: flex;
}
```
There are many elements we want displayed flex, and typing this declaration above over and over gets boring pretty fast. This is where Sass Mixins come in.

## Creating a Mixin
Creating a Mixin is very simple, all we have to do is use @mixin command followed by a space and our Mixin name, then we open and close our curly brackets. Something like this.
```scss
@mixin flex {
    // write the css here
    display: -webkit-flex;
    display: flex;
}
```
Now we can add our flex declaration and use the Mixin anywhere in our code.

## Use a Mixin
Now that we know how to declare Mixins, we can now learn how to use them in our SCSS code.

To use a Mixin, we simply use @include followed by the name of the Mixin and a semicolon.
```scss
.row {
    @include flex;
}
```
After compiling this SCSS code into CSS, our CSS file should look like this.
```css
.row {
    display: -webkit-flex;
    display: flex;
}
```
## Passing Arguments to Mixins
Mixins can also take in arguments to make the output more dynamic. For example, let’s assume we are building a grid system, and we can choose whether to use flexbox for our layout or floats.

We can create a Mixin, pass an argument to tell it to alternate between flex or floats.

To pass arguments to a Mixin, we simply do this.
```scss
@mixin grid($flex) {
    @if $flex {
        @include flex;
    } @else {
        display: block;
    }
}
```
Now, when we call the grid Mixin, we must pass a truthy argument to the Mixin. Just as you’d expect, pass an argument to an invoked Mixin like this.
```scss
@include grid(true);
```
To let a Mixin receive multiple arguments, we comma-separate the arguments like this.
```scss
@mixin grid($flex, $full-width) {
    // code goes in here
}
```
## Default Mixin Arguments
Functions in programming languages (SASS included) allow default arguments, it only makes sense for mixins too.

The syntax for passing a default argument to a Mixin looks like this.
```scss
@mixin grid($flex: true) {
    // code here
}
```
We can pass as many variables as we want. But, any variable that has a default/optional argument needs to be at the end of the argument list.

Meaning, **you can’t do this.**
```scss
@mixin grid($flex: true, $max-width) {
    // code here
}
```
SCSS will throw an error that states Required argument $max-width must come before any optional arguments..

