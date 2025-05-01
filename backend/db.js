const { Client } = require('pg');

const client = new Client({
	user: 'postgres',
	password: 'Superhen28',
	host: 'localhost',
	port: 5432,
	database: '3390_final_project',
});

client
.connect()
.then(() => {
  console.log('Connected to PostgreSQL database');
})
.catch((err) => {
  console.error('Error connecting to PostgreSQL database', err);
});