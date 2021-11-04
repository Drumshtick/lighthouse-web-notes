# JavaScript Object Notation (A data interchange format)
* used in the wild before it was names
* Born out of JS
* XML requires queries JSON doesn't (XML was the popular standard format for exchanging data.)

## JSON is built on two structures:
1. A collection of name/value pairs.
2. An ordered list of values.

These are universal data structures. *Virtually all modern programming languages support them in one form or another.* It makes sense that a data format that is interchangeable with programming languages also be based on these structures.

An Object encoded using JSON looks like this:
```json
{
  "name": "New York City",
  "boroughs": [
    "Manhattan",
    "Queens",
    "Brooklyn",
    "The Bronx",
    "Staten Island"],
  "population": 8491079,
  "area_codes": [212, 347, 646, 718, 917, 929],
  "position": { "lat": 40.7127, "lng": -74.0059 }
}
```
* Note that the keys are always double-quoted "strings", and the values can be numbers, strings, or objects themselves.
* The JSON syntax is (and must be) valid JavaScript.

## Serialization
The process of serialization **converts objects (or data structures) into a format that can be stored or transmitted between computers** (typically as a *string of text*). 
***The opposite, going from ```String → Object``` is called deserialization.***

In **JavaScript**, we have the JSON object for *serializing and deserializing.* The Mozilla Developer Network (MDN) provides good documentation on these two important methods:
### ```JSON.parse()```
**Parse a string as JSON,** optionally transform the produced value and its properties, and return the value.
### JSON.stringify()
Return a JSON string corresponding to the specified value, optionally including only certain properties or replacing property values in a user-defined manner.

## JSON Media Type
When data is sent across the web using HTTP request/responses, the *Media Type for JSON data is application/json* (compared to text/html for HTML). It is set via the Content-Type HTTP response header.

Check the Content-Type in the response header by running the following cURL command in your terminal:
```shell
curl -i ipinfo.io
```
OUTPUTS (On my computer)
```shell
HTTP/1.1 200 OK
access-control-allow-origin: *
x-frame-options: SAMEORIGIN
x-xss-protection: 1; mode=block
x-content-type-options: nosniff
referrer-policy: strict-origin-when-cross-origin
content-type: application/json; charset=utf-8
content-length: 319
date: Thu, 04 Nov 2021 17:52:25 GMT
x-envoy-upstream-service-time: 1
vary: Accept-Encoding
Via: 1.1 google

{
  "ip": "***.*.***.162",
  "hostname": "s0106**********01273.ss.*****.net",
  "city": "Saskatoon",
  "region": "Saskatchewan",
  "country": "CA",
  "loc": "52.1324,-106.6689",
  "org": "AS6327 Shaw Communications Inc.",
  "postal": "S7W",
  "timezone": "America/Regina",
  "readme": "https://ipinfo.io/missingauth"
}
```
## JSON for Configuration Like package.json
Remember how npm likes to add a package.json file into our project's root directory? Configuration/setting files like these are a great example of how JSON is used. The text read from the file is a string. NPM needs that information so it reads the file and then parses it into an object using the JSON object (or an equivalent library), just like we did above.

