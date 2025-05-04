const db = require('../db');

exports.addUser = function(user) {
  return db.query(
    `INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *`,
    [user.username, user.password, user.email]
  ).then(res => res.rows[0]);
};

exports.getUserPassword = function(name) {
  return db.query(
    `SELECT password FROM users WHERE name = $1`,
    [name]
  ).then(res => {
    if (res.rows.length === 0) throw "User not found";
    return res.rows[0].password;
  });
};

exports.getUser = function(name) {
  return db.query(
    `SELECT id, name, email, created_at FROM users WHERE name = $1`,
    [name]
  ).then(res => {
    if (res.rows.length === 0) throw "User not found";
    return res.rows[0];
  });
};