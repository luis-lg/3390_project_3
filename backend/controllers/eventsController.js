const eventsModel = require('../models/eventsModel');

exports.searchByCity = async (req, res, next) => {
  try {
    const city = req.query.city;
    if (!city) {
      return res.status(400).json({ error: 'city query param is required' });
    }
    const events = await eventsModel.getEventsByCity(city);
    res.json(events);
  } catch (err) {
    next(err);
  }
};