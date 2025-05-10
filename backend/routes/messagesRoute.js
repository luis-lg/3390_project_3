const express = require('express');
const router = express.Router({ mergeParams: true });
const messagesController = require('../controllers/messagesController');
const requireAuth = require('../auth');

router.use(requireAuth);

// Send message
router.post('/:id/messages', messagesController.send);

// Get my inbox
router.get('/me/messages', messagesController.inbox);

// Get conversation with a user
router.get('/:id/messages', messagesController.conversation);

module.exports = router;
