The SQL commands that let us interact with our data are sometimes referred to as Data Manipulation Language (DML) These include:

SELECT: get data from tables.
INSERT: add rows to a table.
UPDATE: update rows within a table.
DELETE: delete rows from a table.


# SQL ```INSERT``` (REF [HERE](https://www.tutorialspoint.com/sql/sql-insert-query.htm))
* The SQL INSERT INTO Statement is used to add new rows of data to a table in the database.
* Syntax
  * There are two basic syntaxes of the INSERT INTO statement which are shown below.
```sql
INSERT INTO TABLE_NAME (column1, column2, column3,...columnN)  
VALUES (value1, value2, value3,...valueN);
```
* Here, column1, column2, column3,...columnN are the names of the columns in the table into which you want to insert the data.

* **You may not need to specify the column(s) name in the SQL query if you are adding values for all the columns of the table.** But make sure the order of the values is in the same order as the columns in the table.

### Example
The following statements would create six records in the CUSTOMERS table.
```sql
INSERT INTO CUSTOMERS (ID,NAME,AGE,ADDRESS,SALARY)
VALUES (1, 'Ramesh', 32, 'Ahmedabad', 2000.00 );

INSERT INTO CUSTOMERS (ID,NAME,AGE,ADDRESS,SALARY)
VALUES (2, 'Khilan', 25, 'Delhi', 1500.00 );

INSERT INTO CUSTOMERS (ID,NAME,AGE,ADDRESS,SALARY)
VALUES (3, 'kaushik', 23, 'Kota', 2000.00 );

INSERT INTO CUSTOMERS (ID,NAME,AGE,ADDRESS,SALARY)
VALUES (4, 'Chaitali', 25, 'Mumbai', 6500.00 );

INSERT INTO CUSTOMERS (ID,NAME,AGE,ADDRESS,SALARY)
VALUES (5, 'Hardik', 27, 'Bhopal', 8500.00 );

INSERT INTO CUSTOMERS (ID,NAME,AGE,ADDRESS,SALARY)
VALUES (6, 'Komal', 22, 'MP', 4500.00 );
```

# DELETE (REF [HERE](https://www.tutorialspoint.com/sql/sql-delete-query.htm))

* The SQL DELETE Query is used to delete the existing records from a table.

* You can use the WHERE clause with a DELETE query to delete the selected rows, otherwise all the records would be deleted.

* Syntax
  * The basic syntax of the DELETE query with the WHERE clause is as follows −
```sql
DELETE FROM table_name
WHERE [condition];
```
* You can combine N number of conditions using AND or OR operators.

* Example
  * Consider the CUSTOMERS table having the following records −
```sql
+----+----------+-----+-----------+----------+
| ID | NAME     | AGE | ADDRESS   | SALARY   |
+----+----------+-----+-----------+----------+
|  1 | Ramesh   |  32 | Ahmedabad |  2000.00 |
|  2 | Khilan   |  25 | Delhi     |  1500.00 |
|  3 | kaushik  |  23 | Kota      |  2000.00 |
|  4 | Chaitali |  25 | Mumbai    |  6500.00 |
|  5 | Hardik   |  27 | Bhopal    |  8500.00 |
|  6 | Komal    |  22 | MP        |  4500.00 |
|  7 | Muffy    |  24 | Indore    | 10000.00 |
+----+----------+-----+-----------+----------+
```
* The following code has a query, which will DELETE a customer, whose ID is 6.
```sql
SQL> DELETE FROM CUSTOMERS
WHERE ID = 6;
```
Now, the CUSTOMERS table would have the following records.
```sql
+----+----------+-----+-----------+----------+
| ID | NAME     | AGE | ADDRESS   | SALARY   |
+----+----------+-----+-----------+----------+
|  1 | Ramesh   |  32 | Ahmedabad |  2000.00 |
|  2 | Khilan   |  25 | Delhi     |  1500.00 |
|  3 | kaushik  |  23 | Kota      |  2000.00 |
|  4 | Chaitali |  25 | Mumbai    |  6500.00 |
|  5 | Hardik   |  27 | Bhopal    |  8500.00 |
|  7 | Muffy    |  24 | Indore    | 10000.00 |
+----+----------+-----+-----------+----------+
```
***If you want to DELETE all the records from the CUSTOMERS table, you do not need to use the WHERE clause and the DELETE query would be as follows −***
```sql
SQL> DELETE FROM CUSTOMERS;
```

### Always include a WHERE clause when deleting.

# UPDATE (REF [HERE](https://www.tutorialspoint.com/sql/sql-update-query.htm))
* The SQL UPDATE Query is used to **modify the existing records in a table.** You can use the WHERE clause with the UPDATE query to update the selected rows, otherwise all the rows would be affected.

* Syntax
  * The basic syntax of the UPDATE query with a WHERE clause is as follows −
```sql
UPDATE table_name
SET column1 = value1, column2 = value2...., columnN = valueN
WHERE [condition];
```
* You can combine N number of conditions using the AND or the OR operators.

* Example
    * Consider the CUSTOMERS table having the following records −
```sql
+----+----------+-----+-----------+----------+
| ID | NAME     | AGE | ADDRESS   | SALARY   |
+----+----------+-----+-----------+----------+
|  1 | Ramesh   |  32 | Ahmedabad |  2000.00 |
|  2 | Khilan   |  25 | Delhi     |  1500.00 |
|  3 | kaushik  |  23 | Kota      |  2000.00 |
|  4 | Chaitali |  25 | Mumbai    |  6500.00 |
|  5 | Hardik   |  27 | Bhopal    |  8500.00 |
|  6 | Komal    |  22 | MP        |  4500.00 |
|  7 | Muffy    |  24 | Indore    | 10000.00 |
+----+----------+-----+-----------+----------+
```
* The following query will update the ADDRESS for a customer whose ID number is 6 in the table.
```sql
SQL> UPDATE CUSTOMERS
SET ADDRESS = 'Pune'
WHERE ID = 6;
```
Now, the CUSTOMERS table would have the following records −
```sql
+----+----------+-----+-----------+----------+
| ID | NAME     | AGE | ADDRESS   | SALARY   |
+----+----------+-----+-----------+----------+
|  1 | Ramesh   |  32 | Ahmedabad |  2000.00 |
|  2 | Khilan   |  25 | Delhi     |  1500.00 |
|  3 | kaushik  |  23 | Kota      |  2000.00 |
|  4 | Chaitali |  25 | Mumbai    |  6500.00 |
|  5 | Hardik   |  27 | Bhopal    |  8500.00 |
|  6 | Komal    |  22 | Pune      |  4500.00 |
|  7 | Muffy    |  24 | Indore    | 10000.00 |
+----+----------+-----+-----------+----------+
```
* ***If you want to modify all the ADDRESS and the SALARY column values in the CUSTOMERS table,*** you do not need to use the WHERE clause as the UPDATE query would be enough as shown in the following code block.
```sql
SQL> UPDATE CUSTOMERS
SET ADDRESS = 'Pune', SALARY = 1000.00;
```
Now, CUSTOMERS table would have the following records −
```sql
+----+----------+-----+---------+---------+
| ID | NAME     | AGE | ADDRESS | SALARY  |
+----+----------+-----+---------+---------+
|  1 | Ramesh   |  32 | Pune    | 1000.00 |
|  2 | Khilan   |  25 | Pune    | 1000.00 |
|  3 | kaushik  |  23 | Pune    | 1000.00 |
|  4 | Chaitali |  25 | Pune    | 1000.00 |
|  5 | Hardik   |  27 | Pune    | 1000.00 |
|  6 | Komal    |  22 | Pune    | 1000.00 |
|  7 | Muffy    |  24 | Pune    | 1000.00 |
+----+----------+-----+---------+---------+
```