const db = require('../db');


addEvent = function(event) {
  return db.query(
    `INSERT INTO user (title, location, data, description)
     VALUES ($1, $2, $3) RETURNING *`,
    [event.title, event.location, event.data, event.description]
  ).then(res => res.rows[0]);
};
