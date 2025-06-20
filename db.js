import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const pgclient = new Pool({
  connectionString: process.env.DATABASE_URL, // or use user, password, host, etc.
  ssl: {
    rejectUnauthorized: false // allows self-signed certs
  }
});

export default pgclient;
