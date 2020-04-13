function init() {
    const { Client } = require('pg');
    const client = new Client({
      user: 'yael',
      database: 'gifts',
      password: 'ct,h kvmkhj',
    });
  
    client.connect().then(console.log('gift DB is connected!'));
    return client;
  };
  
  module.exports = init;
  