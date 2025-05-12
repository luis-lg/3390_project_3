const express = require('express');
const router = express.Router();
const requireAuth = require('../auth'); 
const usersController = require('../controllers/userController');


router.post('/login', usersController.login);
router.post('/register', usersController.register);
router.post('/logout', requireAuth, usersController.logout);


module.exports = router