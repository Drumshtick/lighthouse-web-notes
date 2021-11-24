# Removing a Table
This can be dangerous, but if we need to remove a table we can do that using the DROP TABLE command. Of course, doing this will also remove all data stored in a table, so be careful. The following command is all that is needed to delete the users table.
```sql
DROP TABLE users;
```
If we have multiple tables in our database, CASCADE will make sure that all records from other tables that depend on this table will also be deleted.
```sql
DROP TABLE users CASCADE;
```
And to avoid any SQL errors, it's good to make sure the table exists before dropping it.
```sql
DROP TABLE IF EXISTS users CASCADE;
```