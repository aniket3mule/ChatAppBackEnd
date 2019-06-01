const {Client , Pool} = require('pg');

// const connectionString = 'postgressql://aniket:lightroom@localhost:5432/chatappbridge'

// const client = Client ({
//     connectionString = connectionString
// })
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'chatappbridge',
    password: 'lightroom',
    port: 5432,
  })

  // client.connect();

  module.exports = client