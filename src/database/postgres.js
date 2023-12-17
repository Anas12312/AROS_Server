const pg = require('pg');
require('dotenv').config();

const pool = new pg.Pool({
   host: process.env.DB_HOST,
   port: process.env.DB_PORT,
   user: process.env.DB_USER,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_NAME
});

console.log('Successful connection to the database');

module.exports = pool;
