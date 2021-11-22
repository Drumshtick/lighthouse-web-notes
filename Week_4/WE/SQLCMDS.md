# Pattern Matching Strings

SELECT <category> FROM <table> WHERE <category> LIKE 'B%';
* You can use WHERE name LIKE 'B%' to find the category that start with "B".
  * The % is a wild-card it can match any characters
* '%b' would return category that ENDS with b
* '%x%' returns anything containing 'x'
* 'C%ia' would return - Start with 'C' and ends with 'ia'
* '%oo%' would return anything containing a 'oo'
* '%a%a%a%' returns category that contain 3 'a's

SELECT <category> FROM <table> WHERE <category> LIKE '_n%' ORDER BY <category>;
* the underscore as a single character wildcard.
* '_n%' return category that has 'n' as second character
* '%o__o%' returns Moldova or Lesotho (search char seperated by two placeholders)
* '____' would return all with 4 characters (because 4 * _)

SELECT <category> FROM <table> WHERE <category> LIKE <other category>
* will match category and other category and return when they match

SELECT <category> FROM <table> WHERE <category> LIKE concat(<category>, ' string')
* returns matches where category plus 'string' matches

SELECT <category>, <category> FROM <table> WHERE <category> RLIKE <category>
* looks for categories that contain the string in category with RLIKE

SELECT name, continent, population FROM world
* list all these categories from world table

SELECT name FROM world WHERE population > 200000000
* returns countries where category population is greater than 200000000