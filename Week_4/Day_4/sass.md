# Install Sass
When you install Sass on the command line, you'll be able to run the sass executable to compile .sass and .scss files to .css files. For example:
```shell
sass source/stylesheets/index.scss build/stylesheets/index.css
```
First install Sass using one of the options below, then run sass --version to be sure it installed correctly. If it did, this will include 1.43.4. You can also run sass --help for more information about the command-line interface.

* More about Sass [HERE](https://sass-lang.com/guide)

## Install Anywhere (Standalone)
You can install Sass on Windows, Mac, or Linux by downloading the package for your operating system from GitHub and adding it to your PATH. That’s all—there are no external dependencies and nothing else you need to install.
* link to install [HERE](https://github.com/sass/dart-sass/releases/tag/1.43.4)

## Install Anywhere (npm)
If you use Node.js, you can also install Sass using npm by running
```shell
npm install -g sass
```
However, ***please note that this will install the pure JavaScript implementation of Sass, which runs somewhat slower than the other options listed here.*** But it has the same interface, so it’ll be easy to swap in another implementation later if you need a bit more speed!

# Preprocessing
* Sass has features that don't exist in CSS yet like nesting, mixins, inheritance, and other nifty goodies that help you write robust, maintainable CSS.
* Once you start tinkering with Sass, it will take your preprocessed Sass file and save it as a normal CSS file that you can use in your website.
* The most direct way to make this happen is in your terminal.
  * Once Sass is installed, you can compile your Sass to CSS using the ```sass``` command. You'll need to tell Sass which file to build from, and where to output CSS to. 
  * For example, running ```sass input.scss output.css``` from your terminal would take a single Sass file, ```input.scss```, and compile that file to ```output.css```
* You can also **watch individual files or directories with the ```--watch``` flag.**
  * The watch flag tells Sass to watch your source files for changes, and re-compile CSS each time you save your Sass. If you wanted to watch (instead of manually build) your input.scss file, you'd just add the watch flag to your command, like so:
    ```shell
      sass --watch input.scss output.css
    ```
* You can watch and output to directories by using folder paths as your input and output, and separating them with a colon. In this example:
  ```shell
    sass --watch app/sass:public/stylesheets
  ```
  * Sass would watch all files in the app/sass folder for changes, and compile CSS to the public/stylesheets folder.

# Variables
* Think of variables as a way to store information that you want to reuse throughout your stylesheet. You can store things like colors, font stacks, or any CSS value you think you'll want to reuse. Sass uses the $ symbol to make something a variable. Here's an example:
```scss
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```
OR
```scss
$font-stack: Helvetica, sans-serif
$primary-color: #333

body
  font: 100% $font-stack
  color: $primary-color

```
INTO 
```css
body {
  font: 100% Helvetica, sans-serif;
  color: #333;
}
```
* When the Sass is processed, it takes the variables we define for the $font-stack and $primary-color and outputs normal CSS with our variable values placed in the CSS. This can be extremely powerful when working with brand colors and keeping them consistent throughout the site.

# Nesting
* When writing HTML you've probably noticed that it has a clear nested and visual hierarchy. CSS, on the other hand, doesn't.

* Sass will let you nest your CSS selectors in a way that follows the same visual hierarchy of your HTML. Be aware that overly nested rules will result in over-qualified CSS that could prove hard to maintain and is generally considered bad practice.

* With that in mind, here's an example of some typical styles for a site's navigation:
SCSS
```scss
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li { display: inline-block; }

  a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
  }
}
```
OR
SASS
```scss
nav
  ul
    margin: 0
    padding: 0
    list-style: none

  li
    display: inline-block

  a
    display: block
    padding: 6px 12px
    text-decoration: none

```
INTO
```css
nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
nav li {
  display: inline-block;
}
nav a {
  display: block;
  padding: 6px 12px;
  text-decoration: none;
}
```

# Partials
* You can create partial Sass files that contain little snippets of CSS that you can include in other Sass files.
* This is a great way to modularize your CSS and help keep things easier to maintain. **A partial is a Sass file named with a leading underscore.**
  * You might name it something like ```_partial.scss```. 
  * The underscore lets Sass know that the file is only a partial file **and that it should not be generated into a CSS file.**
* ***Sass partials are used with the ```@use``` rule.***

# Modules
* You don't have to write all your Sass in a single file.
* You can split it up however you want with the ```@use``` rule. 
* This rule loads another Sass file as a module, which means you can refer to its variables, mixins, and functions in your Sass file with a namespace based on the filename. 
* Using a file will also include the CSS it generates in your compiled output!
```scss
// _base.scss
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```
```scss
// styles.scss
@use 'base';

.inverse {
  background-color: base.$primary-color;
  color: white;
}
```
OR
```scss
// _base.sass
$font-stack: Helvetica, sans-serif
$primary-color: #333

body
  font: 100% $font-stack
  color: $primary-color

```
```scss
// styles.sass
@use 'base'

.inverse
  background-color: base.$primary-color
  color: white

```
INTO
```css
body {
  font: 100% Helvetica, sans-serif;
  color: #333;
}

.inverse {
  background-color: #333;
  color: white;
}
```

Notice we're using ```@use 'base'```; in the ```styles.scss``` file. 
* When you use a file **you don't need to include the file extension.** Sass is smart and will figure it out for you.

# Mixins
* Some things in CSS are a bit tedious to write, especially with CSS3 and the many vendor prefixes that exist.
* A mixin lets you make groups of CSS declarations that you want to reuse throughout your site. It helps keep your Sass very DRY.
* You can even pass in values to make your mixin more flexible. Here's an example for theme.
```scss
@mixin theme($theme: DarkGray) {
  background: $theme;
  box-shadow: 0 0 1px rgba($theme, .25);
  color: #fff;
}

.info {
  @include theme;
}
.alert {
  @include theme($theme: DarkRed);
}
.success {
  @include theme($theme: DarkGreen);
}
```
OR
```scss
SASS SYNTAX
@mixin theme($theme: DarkGray)
  background: $theme
  box-shadow: 0 0 1px rgba($theme, .25)
  color: #fff

.info
  @include theme

.alert
  @include theme($theme: DarkRed)

.success
  @include theme($theme: DarkGreen)
```

INTO
```css
.info {
  background: DarkGray;
  box-shadow: 0 0 1px rgba(169, 169, 169, 0.25);
  color: #fff;
}

.alert {
  background: DarkRed;
  box-shadow: 0 0 1px rgba(139, 0, 0, 0.25);
  color: #fff;
}

.success {
  background: DarkGreen;
  box-shadow: 0 0 1px rgba(0, 100, 0, 0.25);
  color: #fff;
}
```
* To create a mixin you use the ```@mixin``` directive and give it a name. We've named our mixin theme. We're also using the variable $theme inside the parentheses so we can pass in a theme of whatever we want. After you create your mixin, you can then use it as a CSS declaration starting with ```@include``` followed by the name of the mixin.

# Extend/Inheritance
* Using ```@extend``` lets you **share a set of CSS properties from one selector to another.**
* In our example we're going to create a simple series of messaging for errors, warnings and successes using another feature which goes hand in hand with extend, placeholder classes. A placeholder class is a special type of class that only prints when it is extended, and can help keep your compiled CSS neat and clean
```scss
/* This CSS will print because %message-shared is extended. */
%message-shared {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

// This CSS won't print because %equal-heights is never extended.
%equal-heights {
  display: flex;
  flex-wrap: wrap;
}

.message {
  @extend %message-shared;
}

.success {
  @extend %message-shared;
  border-color: green;
}

.error {
  @extend %message-shared;
  border-color: red;
}

.warning {
  @extend %message-shared;
  border-color: yellow;
}
```
OR
```scss
/* This CSS will print because %message-shared is extended. */
%message-shared
  border: 1px solid #ccc
  padding: 10px
  color: #333


// This CSS won't print because %equal-heights is never extended.
%equal-heights
  display: flex
  flex-wrap: wrap


.message
  @extend %message-shared


.success
  @extend %message-shared
  border-color: green


.error
  @extend %message-shared
  border-color: red


.warning
  @extend %message-shared
  border-color: yellow
```
INTO
```css
/* This CSS will print because %message-shared is extended. */
.message, .success, .error, .warning {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

.success {
  border-color: green;
}

.error {
  border-color: red;
}

.warning {
  border-color: yellow;
}
```
What the above code does is tells .message, .success, .error, and .warning to behave just like %message-shared. That means anywhere that %message-shared shows up, .message, .success, .error, & .warning will too. The magic happens in the generated CSS, where each of these classes will get the same CSS properties as %message-shared. This helps you avoid having to write multiple class names on HTML elements.

You can extend most simple CSS selectors in addition to placeholder classes in Sass, but using placeholders is the easiest way to make sure you aren't extending a class that's nested elsewhere in your styles, which can result in unintended selectors in your CSS.

Note that the CSS in %equal-heights isn't generated, because %equal-heights is never extended.

# Operators
* Doing math in your CSS is very helpful. Sass has a handful of standard math operators like ```+, -, *, math.div()```, and ```%```. In our example we're going to do some simple math to calculate widths for an article and aside.
```scss
@use "sass:math";

.container {
  display: flex;
}

article[role="main"] {
  width: math.div(600px, 960px) * 100%;
}

aside[role="complementary"] {
  width: math.div(300px, 960px) * 100%;
  margin-left: auto;
}
```
OR
```scss
SASS SYNTAX
@use "sass:math"

.container
  display: flex

article[role="main"]
  width: math.div(600px, 960px) * 100%

aside[role="complementary"]
  width: math.div(300px, 960px) * 100%
  margin-left: auto
```
INTO
```css
.container {
  display: flex;
}

article[role="main"] {
  width: 62.5%;
}

aside[role="complementary"] {
  width: 31.25%;
  margin-left: auto;
}
```

We've created a very simple fluid grid, based on 960px. Operations in Sass let us do something like take pixel values and convert them to percentages without much hassle.