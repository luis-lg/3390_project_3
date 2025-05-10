const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/eventsController');

// for all users
router.get('/search', eventsController.searchByCity);


module.exports = router;
