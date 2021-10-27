# How to iterate through objects for...in
## Say we create an object:
```javascript
var planetMoons = {
  mercury: 0,
  venus: 0,
  earth: 1,
  mars: 2,
  jupiter: 67,
  saturn: 62,
  uranus: 27,
  neptune: 14
};
```
In the above example, our planetMoons object has 8 keys - one for each planet in our solar system.

***We can traverse all the properties of this object using a for-loop, like so:***
``` javascript
for (var planet in planetMoons) {
  var numberOfMoons = planetMoons[planet];
  console.log("Planet: " + planet + ", # of Moons: "+ numberOfMoons);
}
```
We have the key available to us within the scope of the loop; in the above example it is the planet variable. *****Notice how we access the object using a variable,***** ```planetMoons[planet]```. The variable planet iterates over each key ("mercury", "venus", ...) using the for-loop.

## Limitations of for ... in
We should be careful with this looping technique, as it ***can produce some unexpected results.*** For reasons which we'll cover in later activities, **objects can sometimes have properties that they inherit from their prototype chain as well as method names**. An additional filtering step is sometimes necessary:
```javascript
for (var planet in planetMoons) {
  // additional filter for object properties:
  if (planetMoons.hasOwnProperty(planet)) {
    //  ...
  }
}
```