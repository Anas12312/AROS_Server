CREATE DATABASE AROS;
CREATE TABLE users (id SERIAL PRIMARY KEY, first_name VARCHAR(255), last_name VARCHAR(255), email VARCHAR(255), password VARCHAR(255));
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