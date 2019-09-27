const express = require('express');

const User = require('../controllers/userController');

const authMiddleware = require('../../middleware/auth')

// const authMiddleware = require('../controllers/auth');

const router = express.Router();

router.post('/register', User.user_register);

router.post('/login', User.user_login)

router.get('/profile', authMiddleware, User.user_profile)

module.exports = router;