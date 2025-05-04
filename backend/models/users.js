const db = require('../db');

addUser = function(user) {
  return db.query(
    `INSERT INTO users (name, password, email)
     VALUES ($1, $2, $3) RETURNING *`,
    [user.name, user.password, user.email]
  ).then(res => res.rows[0]);
};

getUserPassword = function(name) {
  return db.query(
    `SELECT password FROM users WHERE name = $1`,
    [name]
  ).then(res => {
    if (res.rows.length === 0) throw "User not found";
    return res.rows[0].password;
  });
};

getUser = function(name) {
  return db.query(
    `SELECT id, name, email, created_at FROM users WHERE name = $1`,
    [name]
  ).then(res => {
    if (res.rows.length === 0) throw "User not found";
    return res.rows[0];
  });
}; module.exports = userdb