# Which is best? When? Where? Why?

We know that **ids are used to identify unique elements on a page**, and **classes are used to identify elements of the same type.**

## Multiple classes
* An element *can have 0 to n classes.*
* NOTE ***Classes imply stylistic or behavioral properties about an element***
* ```<nav class="secondary disabled">```
  * describes a navigational element that is **secondary** and for whatever reason is also **disabled** at this time.
  * **secondary** could bring with it certain styles, perhaps the navigation is smaller / less prominent compared to the primary nav.
  * The **disabled** class may also affect its style by making it appear grayed out, and it may also attach JavaScript behavior such as not allowing the user to expand or click the links within the nav.
### Use classes most of the time
> As a general rule, classes should be used much more frequently than IDs.
* Q: So when do I use IDs, exactly?
  * IDs may be used when you *have a unique element* such as a call to action **that is styled and/or behaves very differently than other elements** on a page or website.
* IDs also need be used *when you need to reference them from the URL using the anchor hash value* (**also called the page fragment**). Eg: ```http://yourdomain.com#comments``` will **jump to the element with ID comments**.

## Using IDs is more *performant*
* Some developers will argue that **browsers can work much faster when targeting elements by ID**, and we should therefore *use IDs liberally.*
  * This performance difference makes sense *since the browser has only one element to search for and can stop the search once it finds the first instance.*
  * Often times *prioritizing performance can in fact be at odds with writing clean, modular code* and thus more maintainable code. This is one such example.

## Use neither unless necessary
Q: So should I use classes liberally, effectively classifying everything on a page?
  * Glad you asked... This is an important point actually: if you don't need them, don't use them!
  * In fact, before assigning a class or id to an element, ***ask yourself what you would have to do if you did not specify the class.***

* By taking advantage of nesting, tag names, and pseudo-classes, we can craft a CSS selector to target any possible element. However, if the CSS selector that will need to be written in order to accurately target the element is too verbose, then you should consider classifying the element.






# Extras

### There are no browser defaults for any ID or Class
* Adding a class name or ID to an element **does nothing to that element by default.**
* Classes and ID’s don’t have any styling information to them all by themselves. They require CSS to target them and apply styling.