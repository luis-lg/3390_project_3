const db = require('../db');

exports.addRsvp = function(rsvp) {
  return db.query(
    `INSERT INTO rsvps (user_id, event_id) VALUES ($1, $2) RETURNING *`,
    [rsvp.user_id, rsvp.event_id]
  ).then(res => res.rows[0]);
};

exports.deleteRsvp = function(rsvp, userId, eventId) {
  return db.query(
    `DELETE FROM rsvps WHERE user_id = $1 AND event_id = $2`,
    [userId, eventId]
  ).then(res => res.rows[0]);
};

exports.getRsvpsForEvent = event_id =>
  db.query(
      `SELECT u.id AS user_id, u.username FROM rsvps r
       JOIN users u ON u.id = r.user_id WHERE r.event_id = $1`,
      [event_id]
    )
    .then(r => r.rows);

exports.getRsvpsForUser = user_id =>
  db.query(
      `SELECT e.id AS event_id, e.band, e.venue, e.location, e.date FROM rsvps r
       JOIN events e ON e.id = r.event_id WHERE r.user_id = $1
       ORDER BY e.date ASC`,
      [user_id]
    )
    .then(r => r.rows);