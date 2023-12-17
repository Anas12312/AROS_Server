CREATE DATABASE AROS;
  
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

  CREATE TABLE IF NOT EXISTS users (
     id UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
     first_name VARCHAR(255),
     last_name VARCHAR(255),
     email VARCHAR(255) UNIQUE,
     password VARCHAR(255),
     role VARCHAR(50)
  );

/*old database structure with constrains and default value*/
CREATE TABLE IF NOT EXISTS obstacles (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  latitude FLOAT,
  longitude FLOAT,
  image_URL VARCHAR(255),
  type VARCHAR(50) CHECK(
    type IN ('accident', 'hole', 'obstacle', 'unknown')
  ),
  status VARCHAR(50) DEFAULT 'unsolved' CHECK(status IN ('solved', 'unsolved', 'pending')),
  number_of_reports INT
);

/*new database structure without constrains and default value*/
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
