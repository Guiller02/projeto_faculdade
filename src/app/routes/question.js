const express = require('express');

const question = require('../controllers/questionController')

const authMiddleware = require('../../middleware/auth');

const router = express.Router();

router.post('/',authMiddleware, question.question_create);

router.get('/', question.question_list);

module.exports = router;
