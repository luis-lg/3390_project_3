const express = require('express');
const router  = express.Router();
const eventsController = require('../controllers/eventsController');
const requireAuth      = require('../middleware/auth');

// for all users
router.get('/', eventsController.list);

// for logged in users only
router.get('/:id/details', requireAuth, eventsController.details);


module.exports = router;
