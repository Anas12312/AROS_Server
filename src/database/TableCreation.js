const pool = require("./postgres");

(async () => {
  const createExtension = `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  `;

  const userSchema = `
  CREATE TABLE IF NOT EXISTS users (
     id UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
     first_name VARCHAR(255),
     last_name VARCHAR(255),
     email VARCHAR(255) UNIQUE,
     password VARCHAR(255),
     role VARCHAR(50)
  );
  `;

  const ObstacleSchema = `
  CREATE TABLE IF NOT EXISTS obstacles (
   id UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
   user_id UUID REFERENCES users(id),
   latitude FLOAT,
   longitude FLOAT,
   image_URL VARCHAR(255),
   type VARCHAR(50),
   status VARCHAR(50),
   number_of_reports INT
  );
  `;



  try {
    await pool.query(createExtension);
    await pool.query(userSchema);
    await pool.query(ObstacleSchema);
    console.log('Tables created successfully');
  } catch (error) {
    console.error('Error creating tables', error);
  }

})();
