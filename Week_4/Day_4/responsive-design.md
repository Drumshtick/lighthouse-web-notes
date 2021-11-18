# Responsive Design

## "Mobile First" Development
* Dictates that all design of a new website should center around how it will be viewed and navigated on a mobile platform.
  * Only when a mobile design is perfected, will the team then use CSS to adjust the sizes and layout of elements for desktop.
* The rationale behind this approach is that **it is much easier to adapt a good looking and well functioning mobile website for desktop, than to go the other way and to adapt a desktop one for mobile.**
* In a mobile layout, an element needs to take up more screen space in order to be easy to view. In a desktop layout this is less necessary.
  * If you design your website in a way that requires multiple, large elements to be visible at the same time, shrinking it to all fit on a small screen could prove more challenging.

### Media Queries
Format:

```media-type and (media-features) ...```

media-type can include: ref [HERE](https://www.w3.org/TR/mediaqueries-4/#media-types)
* screen
* print (for printing the doc!)
* handheld
* tv
* projector
* all

media-features can include:
* width
* height
* min-height
* max-height
* color
* etc...

#### ex

```html
@media all and (max-width: 600px) {
  .class {
    width: 100%;
  }
}
```
* when (max-width: 600px) is TRUE apply these styles
  * anything less than 600px will have this new style

  ```html
@media all and (max-width: 600px) and (max-width: 800px) {
  .class {
    width: 100%;
  }
}
```
* Now it is a RANGE of 600px and 800px

```html
@media not screen {
  .class {
    width: 100%;
  }
}
```
* Now any media-type that is NOT screen apply these styles (i.e 'print' wouldnt be considered screen)

```html
@media not screen, screen and (max-width: 600px) {
  .class {
    width: 100%;
  }
}
```
* comma (,) acts as a logical OR
  * Reads as ***Anything that is not a screen OR is a screen with max 400 px in width***

2 Methods for storing media-queries
1. embedded directly inside the main css file
2. in a separate style sheet, (can slow down page loads as it adds another resource)

## Targeting media types ref [HERE](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries)

* ```@media print { ... }```
* You can also target multiple devices.
  * ```@media screen, print { ... }```

## Targeting media features
* ```@media (hover: hover) { ... }```
* Many media features are range features, which means they can be prefixed with "min-" or "max-" to express "minimum condition" or "maximum condition" constraints. For example, this CSS will apply styles only if your browser's viewport width is equal to or narrower than 12450px:
  * ```@media (max-width: 12450px) { ... }```

## Combining multiple types or features
* ```@media (min-width: 30em) and (orientation: landscape) { ... }```
* ```@media screen and (min-width: 30em) and (orientation: landscape) { ... }```

## Testing for multiple queries
* You can use a comma-separated list to apply styles when the user's device matches any one of various media types, features, or states. 
  * ```@media (min-height: 680px), screen and (orientation: portrait) { ... }```

## Inverting a query's meaning
* ```@media not all and (monochrome) { ... }```

## Improving compatibility with older browsers
* The only keyword prevents older browsers that do not support media queries with media features from applying the given styles. It has no effect on modern browsers.
  * ```@media only screen and (color) { ... }```

## Negating a feature with not
* Using not() around a media feature negates that feature in the query. For example, not(hover) would match if the device had no hover capability:
  * ```@media (not(hover)) { ... }```

## Testing for multiple features with or
* You can use or to test for a match among more than one feature, resolving to true if any of the features are true. For example, the following query tests for devices that have a monochrome display or hover capability:
  * ```@media (not (color)) or (hover) { ... }```

# Viewport units (ref [HERE](https://web-design-weekly.com/viewport-units-vw-vh-vmin-vmax/))
* The viewport is the area where the browser renders the site.
* This is **your screen minus the reserved space of the browser chrome.**
* Sometimes you want to size an element based on that viewport, like a sidebar.
  * This can be done using a unit we’re all familiar with: percentages.
```css
.sidebar { width: 25% }
```
the height equal to the viewport.
```css
html, body { height: 100%; }
    
.sidebar {
  height: 100%;
  width: 100%;
}
```

## Viewport-percentage lengths
* The viewport units are a new set of units designed for the challenges we face today. One-pagers, full-width grids, typography, and many other things rely on the size of the viewport. Previously, we hacked these challenges using percentages as mentioned earlier, or JavaScript.
* This new set of units **consists of four different units**. 
  * Two for each axis
  * A minimum and maximum value of the two.
    * vw: 1/100th viewport width
    * vh: 1/100th viewport height
    * vmin: 1/100th of the smallest side
    * vmax: 1/100th of the largest side

>Note: IE9 uses vm instead of vmin. It does not support vmax.

## Real-world usage
A very common use for these units is typography. With the viewport units, you can easily put text over the entire width or height of the screen, like so:

```css
/*
 * Font-size is 5% of the viewport width.
 * When the width of the viewport changes,
 * so does the font-size.
 */

h1 { font-size: 5vw; }
```

```html
<div class="container">
  <h1>My special headline</h1>
  <p>Re-size the viewport and see the headline magically resize!</p>
</div>
```