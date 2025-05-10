const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/eventsController');
const requireAuth = require('../auth');

// for all users
router.get('/search', eventsController.searchByCity);
//for logged in users
router.get('/:id', requireAuth, eventsController.getById);



module.exports = router;
