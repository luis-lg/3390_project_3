const db = require('../db');


exports.addComment = function({ user_id, event_id, body }) {
  return db.query(
      `INSERT INTO comments (user_id, event_id, body) VALUES ($1, $2, $3)
       RETURNING id, user_id, event_id, body, created_at`,
      [user_id, event_id, body]
    )
    .then(r => r.rows[0]);
};

exports.getEventComments = function(event_id) {
  return db.query(
    `SELECT c.id,
            c.body,
            c.created_at,
            u.username
     FROM comments c
     JOIN users   u ON u.id = c.user_id
     WHERE c.event_id = $1 ORDER BY c.created_at ASC`,
    [event_id]
    )
    .then(r => r.rows);
};