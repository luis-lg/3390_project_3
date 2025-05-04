const db = require('../db');

sendMessage = function(message) {
  return db.query(
    `INSERT INTO users (sender_id, receiver_id, body)
     VALUES ($1, $2, $3) RETURNING *`,
    [message.sender_id, message.receiver_id, message.body]
  ).then(res => res.rows[0]);
};

exports.getUserMessages = function(userId) {
  return db.query(
    `SELECT * FROM messages WHERE sender_id = $1 OR receiver_id = $1
     ORDER BY created_at DESC`,
    [userId]
  ).then(res => res.rows);
};

exports.getMessagesBetweenUsers = function(user1, user2) {
  return db.query(
    `SELECT * FROM messages WHERE (sender_id = $1 AND receiver_id = $2)
    OR (sender_id = $2 AND receiver_id = $1) ORDER BY created_at DESC`,
    [user1, user2]
  ).then(res => res.rows);
};