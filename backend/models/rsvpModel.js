const db = require('../db');

addRsvp = function(rsvp) {
  return db.query(
    `INSERT INTO users (user_id, event_id)
     VALUES ($1, $2 RETURNING *`,
    [rsvp.user_id, rsvp.event_id]
  ).then(res => res.rows[0]);
};