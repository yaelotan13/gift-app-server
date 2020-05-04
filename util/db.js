require('dotenv').config()

function init() {
    const { Client } = require('pg');
    const client = new Client({
      user: process.env.DB_USER,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
    });
  
    client.connect().then(console.log('gift DB is connected!'));
    return client;
  };
  
  module.exports = init;
  