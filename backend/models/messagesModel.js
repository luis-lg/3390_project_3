const db = require('../db');

exports.sendMessage = function(message) {
  return db.query(
    `INSERT INTO messages (sender_id, receiver_id, body)
     VALUES ($1, $2, $3) RETURNING *`,
    [message.sender_id, message.receiver_id, message.body]
  ).then(res => res.rows[0]);
};

exports.getInbox = user_id =>{
  return db.query(
      `SELECT DISTINCT
         p.id AS user_id, p.username
       FROM (
         SELECT receiver_id AS id
         FROM messages
         WHERE sender_id = $1
         UNION
         SELECT sender_id   AS id
         FROM messages
         WHERE receiver_id = $1
       ) AS friends
       JOIN users p ON p.id = friends.id`,
      [user_id]
    )
    .then(r => r.rows);
  }


exports.getConversation = (user1, user2) =>
  db
    .query(
      `SELECT m.id, m.sender_id, su.username AS sender_username, m.receiver_id, 
      ru.username AS receiver_username, m.body, m.created_at
      FROM messages m JOIN users su ON su.id = m.sender_id
      JOIN users ru ON ru.id = m.receiver_id
       WHERE (m.sender_id = $1 AND m.receiver_id = $2) OR (m.sender_id = $2 AND m.receiver_id = $1)`,
      [user1, user2]
    )
    .then(r => r.rows);