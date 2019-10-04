const express = require('express');

const Question = require('../controllers/questionController');

const Student = require('../controllers/studentController');

const user = require('../controllers/userController');

const authMiddleware = require('../../middleware/auth');

const router = express.Router();

router.use(authMiddleware, Student.isStudent)

router.get('/', Question.question_list);

router.post('/', Question.question_create);

router.delete('/:questionId', Question.question_delete);

router.get('/:questionId', Question.question_show);

router.put('/:questionId', Question.question_update);

router.put('/createAnswer/:questionId', Question.answer_create);

module.exports = router;

