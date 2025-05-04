const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
	user:  process.env.PG_USER,
	password: process.env.PG_PASSWORD,
	host: process.env.PG_HOST,
	port: process.env.PG_PORT,
	database: process.env.PG_DATABASE
});

client
.connect()
.then(() => {
  console.log('Connected to PostgreSQL database');
})
.catch((err) => {
  console.error('Error connecting to PostgreSQL database', err);
});module.exports = client;