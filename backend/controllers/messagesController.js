const messagesModel = require('../models/messagesModel');

exports.send = async (req, res, next) => {
  try {
    const sender_id   = req.session.userId;
    const receiver_id = parseInt(req.params.id, 10);
    const { body }     = req.body;

    if (!body || !body.trim()) {
      return res.status(400).json({ error: 'Message body is required' });
    }

    const msg = await messagesModel.sendMessage({ sender_id, receiver_id, body });
    res.status(201).json(msg);
  } catch (err) {
    next(err);
  }
};

exports.inbox = async (req, res, next) => {
  try {
    const user_id = req.session.userId;
    const msgs    = await messagesModel.getInbox(user_id);
    res.json(msgs);
  } catch (err) {
    next(err);
  }
};

exports.conversation = async (req, res, next) => {
  try {
    const user1 = req.session.userId;
    const user2 = parseInt(req.params.id, 10);
    const msgs  = await messagesModel.getConversation(user1, user2);
    res.json(msgs);
  } catch (err) {
    next(err);
  }
};
