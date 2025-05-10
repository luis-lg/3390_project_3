const commentsModel = require('../models/commentsModel');

exports.add = async (req, res, next) => {
  try {
    const user_id  = req.session.userId;
    const event_id = parseInt(req.params.id, 10);
    const { body } = req.body;

    if (!body || !body.trim()) {
      return res.status(400).json({ error: 'Comment text is required' });
    }

    const comment = await commentsModel.addComment({ user_id, event_id, body});
    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
};

exports.showComments = async (req, res, next) => {
  try {
    const event_id = parseInt(req.params.id, 10);
    const comments = await commentsModel.getEventComments(event_id);
    res.json(comments);
  } catch (err) {
    next(err);
  }
};
