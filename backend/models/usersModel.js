const db = require('../db');

exports.addUser = function(user) {
  return db.query(
    `INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *`,
    [user.username, user.password, user.email]
  ).then(res => res.rows[0]);
};


exports.getUserbyName = function(username) {
  return db.query(
    `SELECT id, username, email, password, created_at FROM users WHERE username = $1`,
    [username]
  ).then(res => {
    if (res.rows.length === 0) throw "User not found";
    return res.rows[0];
  });
};