require('dotenv').config();

const init = () => {
  const { Pool } = require('pg');

  const isProduction = process.env.NODE_ENV === 'production'
  
  const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`
  
  const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
    ssl: isProduction,
  })
  console.log(connectionString);
  console.log('got new pool');
  return pool;
}


module.exports = init;

// function init() {
//     const { Client } = require('pg');
//     const client = new Client({
//       user: process.env.DB_USER,
//       database: process.env.DB_DATABASE,
//       password: process.env.DB_PASSWORD,
//     });
  
//     client.connect().then(console.log('gift DB is connected!'));
//     return client;
//   };
  
//   module.exports = init;
  