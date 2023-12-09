const pool = require("./postgres");

(async () => {
    const userQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        email VARCHAR(255),
        password VARCHAR(255)
      );
    `;
  
    const adminQuery = `
      CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        role VARCHAR(255)
      );
    `;
  
    try {
        await pool.query(userQuery);
        await pool.query(adminQuery);
        console.log('Tables created successfully');
    } catch (error) {
      console.error('Error creating tables', error);
    }
    
})();
  
