const express = require('express');

const Question = require('../controllers/questionController');

const Answer = require('../controllers/answerController');

const authMiddleware = require('../../middleware/auth');

const router = express.Router();

router.get('/', Question.question_list);

router.post('/', authMiddleware, Question.question_create);

router.delete('/:questionId', authMiddleware, Question.question_delete);

router.get('/:questionId', Question.question_show);

router.put('/:questionId', authMiddleware, Question.question_update);

router.post('/:questionId', authMiddleware, Answer.answer_create);

module.exports = router;