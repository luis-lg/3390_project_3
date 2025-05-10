const rsvpsModel = require('../models/rsvpModel');

exports.rsvp = async (req, res, next) => {
  try {
    const user_id = req.session.userId;
    const event_id = parseInt(req.params.id, 10);
    const rsvp = await rsvpsModel.addRsvp({ user_id, event_id });
    res.status(201).json(rsvp);
  } catch (err) {
    // if already rsvp
    if (err.code === '23505') {
      return res.status(409).json({ error: 'Already RSVPed to this event' });
    }
    next(err);
  }
};

exports.unrsvp = async (req, res, next) => {
  try {
    const user_id = req.session.userId;
    const event_id = parseInt(req.params.id, 10);
    await rsvpsModel.deleteRsvp({ user_id, event_id });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

exports.listEventRsvps = async (req, res, next) => {
  try {
    const event_id = parseInt(req.params.id, 10);
    const list = await rsvpsModel.getRsvpsForEvent(event_id);
    res.json(list);
  } catch (err) {
    next(err);
  }
};

exports.listUserRsvps = async (req, res, next) => {
  try {
    const user_id = req.session.userId;
    const list = await rsvpsModel.getRsvpsForUser(user_id);
    res.json(list);
  } catch (err) {
    next(err);
  }
};