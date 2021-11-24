# Now()
The member_since value will almost always going to be Now() because that's the best way of getting the current timestamp. Instead of having to include that function in every single INSERT statement for this table, we can set this to be the default value for the table.
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  birth_year SMALLINT NOT NULL,
  member_since TIMESTAMP NOT NULL DEFAULT Now()
);
```