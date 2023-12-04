const { Pool } = require('pg');

const createTables = async () => {
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        email VARCHAR(255),
        password VARCHAR(255)
      );
    `;
   
    try {
      await Pool.query(query);
      console.log('Tables created successfully');
    } catch (error) {
      console.error('Error creating tables', error);
    }
};
   
module.exports = createTables;   