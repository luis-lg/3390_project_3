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

exports.getById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const event = await eventsModel.getEventById(id);
    res.json(event);
  } catch (err) {
    if (err.message === 'Event not found') {
      return res.status(404).json({ error: 'No event with that ID' });
    }
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const event = await eventsModel.getEventById(id);
    res.json(event);
  } catch (err) {
    if (err.message === 'Event not found') {
      return res.status(404).json({ error: 'No event with that ID' });
    }
    next(err);
  }
};