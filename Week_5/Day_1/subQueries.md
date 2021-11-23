# Sub Queries

In SQL, we can nest a query within another query. This means we can write a SELECT inside of a SELECT. This exercise will explain the different ways that we can do this and why it is a useful technique when writing more complex queries.

## As a column in SELECT

Lets say we want to get the **total number of incomplete assignments for a specific student.** We could calculate this by taking the total number of submissions for a student and subtracting that from the total number of assignments that exist.
```sql
SELECT count(assignments) - count(assignment_submissions)
...
WHERE students.name = 'Ibrahim Schimmel';
```
This query **requires the use of a three different tables**, so our first thought might be to just JOIN all of the tables together. joining students to assignment_submissions makes sense, since we only want submissions for a specific student. ***But we don't really want to join assignments, we just want the total number of entries in that table.***

The count(assignments) part is separate to the rest of the query. In fact, it's so separate that we could write these out as two different queries.

#### Get the total number of assignments
```sql
SELECT count(*)
FROM assignments;
```
result: 424

#### Get the total number of in complete assignment submissions for a student
```sql
SELECT 424-count(assignment_submissions)
FROM assignment_submissions
JOIN students ON students.id = student_id
WHERE students.name = 'Ibrahim Schimmel';
```
But hard coding the value 424 is bad. What if the total number of assignments changes? Luckily for us, we can use a sub query here. A sub query is a ....
```sql
SELECT (
  SELECT count(assignments)
  FROM assignments
)-count(assignment_submissions) as total_incomplete
FROM assignment_submissions
JOIN students ON students.id = student_id
WHERE students.name = 'Ibrahim Schimmel';
```
Run this query

If a query returns a single value, we can use it in our SELECT statement just like any other value.
```sql
SELECT (
  SELECT count(*)
  FROM table_name
) as total, other_column
FROM other_table_name
ORDER BY total;
```

## FROM sub select table
The ***result of a select is effectively a table that can be used as you would use a table
So a select statement may be used as a data source of another select statement.***


So we could do something like this:
```sql
SELECT * FROM (
  SELECT something_id
  FROM someTable
  WHERE something
) as sub_table;
```
Now imagine that we want to **calculate the average number of students that attend a cohort**. We can calculate the total number of students for each cohort with the following query.
```sql
SELECT count(students)
FROM students
JOIN cohorts on cohorts.id = cohort_id
GROUP BY cohorts;
```
Enter this query

But how do we get a single number for the average number of students per cohort?
```sql
SELECT avg(count(students))
FROM students
JOIN cohorts on cohorts.id = cohort_id
GROUP BY cohorts;
Enter this query
```
We get an error.
```sql
LINE 1: SELECT avg(count(students))
```
This query doesn't work and is a little bit difficult to read. Luckily for us, the result of our first query can be used as a table in our FROM clause. If we run the first query
```sql
SELECT count(students) as total_students
FROM students
JOIN cohorts on cohorts.id = cohort_id
GROUP BY cohorts;
```
Our results look like a table with a single column total_students
```
 total_students 
----------------
             18
             11
             19
             14
...
```
If we treat this as a table, ***we essentially want to find the average of the total_students column.***
```sql
SELECT avg(total_students) as average_students
FROM (
  SELECT count(students) as total_students
  FROM students
  JOIN cohorts on cohorts.id = cohort_id
  GROUP BY cohorts
) as totals_table;
```
The ```as totals_table``` part ***gives an alias to the sub query*** so that we can use it's name like we would use any other table's name. **For example, the first line of that query could be written like this:**
```sql
SELECT avg(totals_table.total_students) as average_students
```

In this case, the inner query can contain as many columns as we like:

```sql
SELECT avg(total_students) as average_students
FROM (
  SELECT count(students) as total_students, cohorts.name as cohort_name
  FROM students
  JOIN cohorts on cohorts.id = cohort_id
  GROUP BY cohorts.name
) as totals_table;
```

## Search within a result set IN
**A sub query's results can also be used within the ```WHERE``` clause of a query.** This is perhaps the most common way of using a sub select.

Let's say we wanted to **get the name of all incomplete assignments for a student**. It's a fairly simple query to get all completed assignments for a student.
```sql
SELECT assignment_id
FROM assignment_submissions
JOIN students ON students.id = student_id
WHERE students.name = 'Ibrahim Schimmel';
```

Run this query.

This **query essentially returns a list of ids.** These ***ids represent all completed assignments for this specific student.*** We could actually re write the results as a list of ids.
```sql
(1, 2, 3, 4, 5, ...)
```
Given this list of ids, we just need get the names of all assignments with an id that doesn't exist in this list.
```sql
SELECT assignments.name
FROM assignments 
WHERE id NOT IN (1, 2, 3, 4, 5, ...)
```
If we had the complete list here, this query would work. It would return the name of all of the assignments not completed by 'Ibrahim Schimmel'. However, we're cheating here because we're hard coding the list.

***If the result of a query returns only one column, we can use that sub query in our WHERE clause.***
```sql
SELECT assignments.name
FROM assignments 
WHERE id NOT IN
(
  SELECT assignment_id
  FROM assignment_submissions
  JOIN students ON students.id = student_id
  WHERE students.name = 'Ibrahim Schimmel'
);
```
Run this query.

This will return the name of all assignments not completed by 'Ibrahim Schimmel'.
```sql
SELECT * FROM table
WHERE id IN (
  SELECT something_id
  FROM someTable
  WHERE something
);
```