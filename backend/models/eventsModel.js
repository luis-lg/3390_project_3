const db = require('../db');

addEvent = function(event) {
  return db.query(
    `INSERT INTO events (band, venue, locatiion, date, genre) VALUES ($1, $2, $3) RETURNING *`,
    [event.band, event.venue, event.location, event.date, event.genre]
  ).then(res => res.rows[0]);
};

exports.getEventsByCity = function(city) {
  return db
    .query(
      `SELECT id, band, venue, location, date, genre, image_url
       FROM events WHERE location ILIKE $1
       ORDER BY date ASC`,
      [city]
    )
    .then(res => res.rows);
};

exports.getEventById = function(id) {
  return db
    .query(
      `SELECT id, band, venue, location, date, genre, image_url
       FROM events WHERE id = $1`,
      [id]
    )
    .then(res => {
      if (res.rows.length === 0) throw new Error('Event not found');
      return res.rows[0];
    });
};
