const pool = require("./postgres");

(async () => {
  const userSchema = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        email VARCHAR(255),
        password VARCHAR(255),
        role VARCHAR(50) DEFAULT 'user' CHECK(role IN ('admin', 'user'))
      );
    `;

  const ObstacleSchema = `
    CREATE TABLE IF NOT EXISTS obstaclereport (
      report_id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id),
      latitude FLOAT,
      longitude FLOAT,
      image_URL VARCHAR(255),
      type VARCHAR(50) CHECK(type IN ('accident', 'hole', 'obstacle', 'unknown')),
      status VARCHAR(50) DEFAULT 'unsolved' CHECK(status IN ('solved', 'unsolved', 'pending')),
      number_of_reports INT
  );
  `;

  try {
    await pool.query(userSchema);
    await pool.query(ObstacleSchema);
    console.log('Tables created successfully');
  } catch (error) {
    console.error('Error creating tables', error);
  }

})();

