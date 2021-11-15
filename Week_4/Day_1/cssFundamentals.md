# CSS Essentials (Cascading Style Sheets)

## CSS Syntax (Reference [HERE](https://learnxinyminutes.com/docs/css/))
* specifies a page’s appearance.
* CSS code is made of static rules.
  * Each rule takes one or more **selectors** and gives specific values to a number of visual **properties**.
  * Those **properties** are then applied to the page elements indicated by the **selectors**.

```css
/* comments appear inside slash-asterisk, just like this line!
   there are no "one-line comments"; this is the only comment style */

/* ####################
   ## SELECTORS
   #################### */

/* the selector is used to target an element on a page. */
selector { property: value; /* more properties...*/ }

/*
Here is an example element:

<div class='class1 class2' id='anID' attr='value' otherAttr='en-us foo bar' />
*/

/* You can target it using one of its CSS classes */
.class1 { }

/* or both classes! */
.class1.class2 { }

/* or its name */
div { }

/* or its id */
#anID { }

/* or using the fact that it has an attribute! */
[attr] { font-size:smaller; }

/* or that the attribute has a specific value */
[attr='value'] { font-size:smaller; }

/* starts with a value (CSS 3) */
[attr^='val'] { font-size:smaller; }

/* or ends with a value (CSS 3) */
[attr$='ue'] { font-size:smaller; }

/* or contains a value in a space-separated list */
[otherAttr~='foo'] { }
[otherAttr~='bar'] { }

/* or contains a value in a dash-separated list, e.g., "-" (U+002D) */
[otherAttr|='en'] { font-size:smaller; }


/* You can combine different selectors to create a more focused selector. Don't
   put spaces between them. */
div.some-class[attr$='ue'] { }

/* You can select an element which is a child of another element */
div.some-parent > .class-name { }

/* or a descendant of another element. Children are the direct descendants of
   their parent element, only one level down the tree. Descendants can be any
   level down the tree. */
div.some-parent .class-name { }

/* Warning: the same selector without a space has another meaning.
   Can you guess what? */
div.some-parent.class-name { }

/* You may also select an element based on its adjacent sibling */
.i-am-just-before + .this-element { }

/* or any sibling preceding it */
.i-am-any-element-before ~ .this-element { }

/* There are some selectors called pseudo classes that can be used to select an
   element only when it is in a particular state */

/* for example, when the cursor hovers over an element */
selector:hover { }

/* or a link has been visited */
selector:visited { }

/* or hasn't been visited */
selected:link { }

/* or an element is in focus */
selected:focus { }

/* any element that is the first child of its parent */
selector:first-child {}

/* any element that is the last child of its parent */
selector:last-child {}

/* Just like pseudo classes, pseudo elements allow you to style certain parts of
    a document  */

/* matches a virtual first child of the selected element */
selector::before {}

/* matches a virtual last child of the selected element */
selector::after {}

/* At appropriate places, an asterisk may be used as a wildcard to select every
   element */
* { } /* all elements */
.parent * { } /* all descendants */
.parent > * { } /* all children */

/* Group any number of selectors to define styles that affect all selectors
   in the group */
selector1, selector2 { }

/* ####################
   ## PROPERTIES
   #################### */

selector {

    /* Units of length can be absolute or relative. */

    /* Relative units */
    width: 50%;       /* percentage of parent element width */
    font-size: 2em;   /* multiples of element's original font-size */
    font-size: 2rem;  /* or the root element's font-size */
    font-size: 2vw;   /* multiples of 1% of the viewport's width (CSS 3) */
    font-size: 2vh;   /* or its height */
    font-size: 2vmin; /* whichever of a vh or a vw is smaller */
    font-size: 2vmax; /* or greater */

    /* Absolute units */
    width: 200px;     /* pixels */
    font-size: 20pt;  /* points */
    width: 5cm;       /* centimeters */
    min-width: 50mm;  /* millimeters */
    max-width: 5in;   /* inches */

    /* Colors */
    color: #F6E;                    /* short hex format */
    color: #FF66EE;                 /* long hex format */
    color: tomato;                  /* a named color */
    color: rgb(255, 255, 255);      /* as rgb values */
    color: rgb(10%, 20%, 50%);      /* as rgb percentages */
    color: rgba(255, 0, 0, 0.3);    /* as rgba values (CSS 3) Note: 0 <= a <= 1 */
    color: transparent;             /* equivalent to setting the alpha to 0 */
    color: hsl(0, 100%, 50%);       /* as hsl percentages (CSS 3) */
    color: hsla(0, 100%, 50%, 0.3); /* as hsl percentages with alpha */

    /* Borders */
    border-width:5px;
    border-style:solid;
    border-color:red;      /* similar to how background-color is set */
    border: 5px solid red; /* this is a short hand approach for the same */
    border-radius:20px;    /* this is a CSS3 property */

    /* Images as backgrounds of elements */
    background-image: url(/img-path/img.jpg); /* quotes inside url() optional */

    /* Fonts */
    font-family: Arial;
    /* if the font family name has a space, it must be quoted */
    font-family: "Courier New";
    /* if the first one is not found, the browser uses the next, and so on */
    font-family: "Courier New", Trebuchet, Arial, sans-serif;
}
```

### Usage
* Save a CSS stylesheet with the extension **.css**.

```html
<!-- You need to include the css file in your page's <head>. This is the
     recommended method. Refer to http://stackoverflow.com/questions/8284365 -->
<link rel='stylesheet' type='text/css' href='path/to/style.css'>

<!-- You can also include some CSS inline in your markup. -->
<style>
   a { color: purple; }
</style>

<!-- Or directly set CSS properties on the element. -->
<div style="border: 1px solid red;">
</div>
```

### Precedence or Cascade
* An element may be targeted by multiple selectors and may have a property set on it in more than once.
  * In these cases, one of the rules takes precedence over others.
  * ** Rules with a more specific selector take precedence over a less specific one**, and ***a rule occurring later in the stylesheet overwrites a previous one*** (which also means that if two different linked stylesheets contain rules for an element and if the rules are of the same specificity, then order of linking would take precedence and the sheet linked latest would govern styling) .
* This process is called cascading, hence the name Cascading Style Sheets.

Given the following CSS:
```css
/* A */
p.class1[attr='value']

/* B */
p.class1 { }

/* C */
p.class2 { }

/* D */
p { }

/* E */
p { property: value !important; }
```
and the following markup:
```html
<p style='/*F*/ property:value;' class='class1 class2' attr='value'>
```

The precedence of style is as follows. Remember, the precedence is for each property, not for the entire block.

* E has the **highest precedence** because of the keyword ***!important. It is recommended that you avoid its usage.***
* F is next, because it is ***an inline style.***
* A is next, because it is **more “specific” than anything else.** It has **3 specifiers:** The name of the **element p**, its **class class1**, an **attribute attr='value'**.
* C is next, even though it has the same specificity as B. **This is because it appears after B.**
* B is next.
* D is the last one.

### Media Queries
* CSS Media Queries are a feature in CSS 3 which allows you to **specify when certain CSS rules should be applied**, such as **when printed**, or when on a **screen with certain dimensions or pixel density**. They do not add to the selector’s specificity

```css 
/* A rule that will be used on all devices */
h1 {
  font-size: 2em;
  color: white;
  background-color: black;
}

/* change the h1 to use less ink on a printer */
@media print {
  h1 {
    color: black;
    background-color: white;
  }
}

/* make the font bigger when shown on a screen at least 480px wide */
@media screen and (min-width: 480px) {
  h1 {
    font-size: 3em;
    font-weight: normal;
  }
}
```
Media queries can include these features: 
* width
* height
* device-width
* device-height
* orientation
* aspect-ratio
* device-aspect-ratio
* color
* color-index
* monochrome
* resolution
* scan
* grid 

***Most of these features can be prefixed with min- or max-.***

The **```resolution``` feature** is not supported by *older devices*, instead use ```device-pixel-ratio```.

Many smartphones and tablets will attempt to ***render the page as if it were on a desktop unless you provide a viewport ```meta```-tag.***

```html
<head>
  <meta name="viewport" content="width=device-width; initial-scale=1.0">
</head>
```

## Specificity (Reference [HERE](http://www.smashingmagazine.com/2007/07/27/css-specificity-things-you-should-know/))
Specificity essentially **determines how CSS rules are prioritized** when rendering a page.

### An Overview #
* Specificity determines, which CSS rule is applied by the browsers.
* Specificity is usually the reason why your CSS-rules don’t apply to some elements, although you think they should.
* Every selector has its place in the specificity hierarchy.
* If two selectors apply to the same element, the one with higher specificity wins.
* There are four distinct categories which define the specificity level of a given selector: inline styles, IDs, classes, attributes, and elements.
* You can understand specificity if you love Star Wars: [CSS Specificity Wars](https://www.stuffandnonsense.co.uk/archives/css_specificity_wars.html).
* You can understand specificity if you love poker: CSS Specificity for Poker Players
* When selectors have an equal specificity value, the latest rule is the one that counts.
* When selectors have an unequal specificity value, the more specific rule is the one that counts.
* Rules with more specific selectors have a greater specificity.
* The last rule defined overrides any previous, conflicting rules.
* The embedded style sheet has a greater specificity than other rules.
* ID selectors have a higher specificity than attribute selectors.
* You should always try to use IDs to increase the specificity.
* A class selector beats any number of element selectors.
* The universal selector and inherited selectors have a specificity of 0, 0, 0, 0.
* You can calculate CSS specificity with CSS Specificity Calculator.

### Specificity Hierarchy
1. Inline styles (Presence of style in document). An inline style lives within your XHTML document. It is attached directly to the element to be styled. E.g. ```<h1 style=“color: #fff;”>```
2. IDs (# of ID selectors) ID is an identifier for your page elements, such as #div.
3. Classes, attributes and pseudo-classes (# of class selectors). This group includes .classes, [attributes] and pseudo-classes such as :hover, :focus etc.
4. Elements and pseudo-elements (# of Element (type) selectors). Including for instance :before and :after.

### How To Measure Specificity?

        Memorize how to measure specificity. “Start at 0, add 1000 for style attribute, add 100 for each ID, add 10 for each attribute, class or pseudo-class, add 1 for each element name or pseudo-element. So in

So...
```body #content .data img:hover```

the specificity value would be ***122 (0,1,2,2 or 0122)***: **100 for #content**, **10 for .data**, **10 for :hover**, **1 for body** and **1 for img**.” [CSS Specificity]

### Specificity: Basic Principles
* **Equal specificity**: ***the latest rule is the one that counts.*** 
  * “*If you have written the same rule into your external style sheet twice*, then **the lower rule in your style sheet is closer to the element to be styled**, it is deemed to be more specific and therefore will be applied. When selectors have an equal specificity value, such as

```css 
#content h1 {
padding: 5px;
}

#content h1 {
padding: 10px;
}
```

where both rules have the specificity 0, 1, 0, 1, the latter rule is always applied.

### Specificity Rules
* **ID selectors** have a ***higher specificity than attribute selectors***.
  * For example, in HTML, the selector ```#p123``` is more specific than ```[id=p123]``` in terms of the cascade. 
  * Example: in
```css
A:
a#a-02 { background-image : url(n.gif); }

and

B:
a[id="a-02"] { background-image : url(n.png); }
```
  * the first rule (A) is more specific than the second one (B)
* **Contextual selectors** are ***more specific than a single element selector.***
  * It also holds for other selectors involving more than one HTML element selector.
* The embedded style sheet is closer to the element to be styled. So in the following situation

CSS:
```css
#content h1 {
padding: 5px;
}
```
(X)HTML:
```html
<style type="text/css">
#content h1 {
padding: 10px;
}
</style>
```
***the latter rule will be applied.***
* The **last rule defined** ***overrides any previous, conflicting rules.*** 
  * For example, given these two rules
```css
p { color: red; background: yellow }
p { color: green }
```
  * **paragraphs would appear in green text**. They would also have a yellow background, however, because the first rule is not completely negated.
* A **class selector** ***beats any number of element selectors***.
  * ```.introduction``` beats ```html``` ```body``` ```div``` ```div``` ```h2``` ```p```
* The **universal selector** has ***a specificity of 0, 0, 0, 0.*** ```*```, ```body *``` and similar selectors ***have a zero specificity***.
  * **Inherited values** also have ***a specificity of 0, 0, 0, 0.***

### Specificity Example
```html
A: h1
B: #content h1
C: <div id="content">
<h1 style="color: #fff">Headline</h1>
</div>
```
* The specificity of **A** is 0,0,0,1 (one element)
* The specificity of ***B*** is 0,1,0,1 (one ID reference point and one element)
* The specificity value of ***C*** is 1,0,0,0, since it is an inline styling.

…***the third rule has a greater level of specificity,*** and therefore will be applied. *If the third rule didn’t exist, the second rule would have been applied.*


### Specificity In Practice
* **Use LVHA for link styling**. “To ensure that you see your various link styles, ***you’re best off putting your styles in the order “link-visited-hover-active”***, or *“LVHA” for short.”*
* **Never use ```!important```.** “If you’re having specificity issues, there’s some quick ways to solve it. First, avoid ```!important```.” “The ```!important``` declaration overrides normal declarations, but is unstructured and rarely required in an author’s style sheet.”
* **Use id to make a rule more specific.** Replacing ```a.highlight``` with ```ul#blogroll``` ```a.highlight``` ***changes the specificity from 0, 0, 1, 1 to 0, 1, 1, 2.***
* **Minimize the number of selectors.** “Use the ***least number of selectors required to style*** an element.”

### CSS specificity calculator Calculates the specificity of a given selector. [HERE](https://specificity.keegan.st/)

### What Is What? 
A selector is the element that is linked to a particular style. E.g. p in
```css
p { padding: 10px; }
```
A class selector is a selector that uses a defined class (multiple per page). E.g. p.section in
```css
p.section { padding: 10px; }
```
An ID selector is a selector that uses an individually assigned identifier (one per page). E.g. p#section in
```html
CSS: #section { padding: 10px; }
(X)HTML: <p id="section">Text</>
```
A contextual selector is a selector that defines a precise cascading order for the rule. E.g. p span in
```
p span { font-style: italic; }
```
defines that all span-elements within a p-element should be styled in italics.

An attribute selector matches elements which have a specific attribute or its value. E.g. p title in
```css
p[title] { font-weight: bold; }
```
matches all p-elements which have a title attribute.

Pseudo-classes are special classes that are used to define the behavior of HTML elements. They are used to add special effects to some selectors, which are applied automatically in certain states. E.g. :visited in
```css
a:visited { text-decoration: underline; }
```
Pseudo-elements provide designers a way to assign style to content that does not exist in the source document. Pseudo-element is a specific, unique part of an element that can be used to generate content “on the fly”, automatic numbering and lists. E.g. :first-line or :after in
```css
p:first-line { font-variant: small-caps; }
a:link:after { content: " (" attr(href) ")"; }
```