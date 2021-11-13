# Basic Elements

Some of the fundamental HTML elements:

* ```<html>``` - represents the root of an HTML document
* ```<head>``` - provides general information (metadata) about the document
* ```<title>``` - defines the title of the document, shown in a browser's title bar
* ```<link>``` - specifies relationships between the current document and an external resource
* ```<body>``` - represents the content of an HTML document
* ```<h1>```, ```<h2>```, ... Heading elements implement six levels of document headings
* ```<p>``` - represents a paragraph of text
* ```<div>``` - Division Element, generic container for flow content
* ```<ol>```, ```<ul>``` list of items with, or without numerical ordering
* ```<li>``` - represents an item in a list
* ```<a>``` - anchor element; defines a hyperlink to a location or page on the Web
* ```<table>``` - display a data table. Note: not to be used for layout
* ```<tr>``` - a table row
* ```<td>``` - a cell in a table row
* Reference For HTML elements [here](https://developer.mozilla.org/en/docs/Web/HTML/Element)

Styling With CSS

There are three ways to add CSS rules to a page:

1. Directly to an element. For example: <p style="color: red"></p>
2. Inline with HTML using a <style> tag. <style> tags usually go inside the <head> tag. An example is: <style> p { color: red; } </style>
3. Linking to a CSS file using a <link> tag. Here is an example of that tag: <link rel="stylesheet" href="style.css">

**We will focus on the third method**, linking a CSS file. ***You are encouraged to avoid 1 and 2***. They are generally *considered bad practice* as they encourage unnecessary coupling of structure (HTML) and style (CSS) code.