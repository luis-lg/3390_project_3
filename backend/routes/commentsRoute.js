const express = require('express');
const router = express.Router({ mergeParams: true });
const commentsController = require('../controllers/commentsController');
const requireAuth = require('../auth');

router.use(requireAuth);

// post new comment
router.post('/:id/comments', commentsController.add);

// get comments for event page
router.get('/:id/comments', commentsController.showComments);

module.exports = router;
