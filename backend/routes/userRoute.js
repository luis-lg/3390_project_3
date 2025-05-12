const express = require('express');
const router = express.Router();
const usersController = require('../controllers/userController');

router.post('/login', usersController.login);
router.post('/register', usersController.register);
router.post('/logout', requireAuth, logout);


module.exports = router