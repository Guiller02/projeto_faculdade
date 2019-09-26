const express = require('express');

const User = require('../controllers/userController');

const student = require('../controllers/studentController')

// const authMiddleware = require('../controllers/auth');

const router = express.Router();

router.post('/register', User.user_register);

module.exports = router;