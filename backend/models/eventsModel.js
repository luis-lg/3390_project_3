const db = require('../db');

addevent = function(user) {
  return db.query(
    `INSERT INTO users (title, location, data, description)
     VALUES ($1, $2, $3) RETURNING *`,
    [user.name, user.password, user.email]
  ).then(res => res.rows[0]);
};

