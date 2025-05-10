const db = require('../db');

addRsvp = function(rsvp) {
  return db.query(
    `INSERT INTO rsvps (user_id, event_id)
     VALUES ($1, $2 RETURNING *`,
    [rsvp.user_id, rsvp.event_id]
  ).then(res => res.rows[0]);
};

deleteRsvp = function(rsvp, userId, eventId) {
  return db.query(
    `DELETE FROM rsvps
     WHERE user_id = $1 AND event_id = $2`,
    [userId, eventId]
  ).then(res => res.rows[0]);
};