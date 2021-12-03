# Node postgres (DOCS [HERE](https://node-postgres.com/))
### Getting started
This is the simplest possible way to connect, query, and disconnect with async/await:
```sql
const { Client } = require('pg')
const client = new Client()
await client.connect()
const res = await client.query('SELECT $1::text as message', ['Hello world!'])
console.log(res.rows[0].message) // Hello world!
await client.end()
```
And here's the same thing with callbacks:
```sql
const { Client } = require('pg')
const client = new Client()
client.connect()
client.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
  console.log(err ? err.stack : res.rows[0].message) // Hello World!
  client.end()
})
```