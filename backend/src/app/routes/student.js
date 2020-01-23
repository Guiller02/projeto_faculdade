const express = require("express");

const Question = require("../controllers/questionController");

const User = require("../controllers/userController");

const Student = require("../controllers/studentController");

const authMiddleware = require("../../middleware/auth");

const router = express.Router();

router.use(authMiddleware, Student.isStudent);

router.get("/points", authMiddleware, Student.getPoints);

//grades routes
router.get("/semester", Student.show_semester);

router.get("/discipline", Student.show_discipline);

//forum routes
router.get("/forum", Question.question_list);

router.post("/forum", Question.question_create);

router.delete("/forum/:questionId", Question.question_delete);

router.get("/forum/:questionId", Question.question_show);

router.put("/forum/:questionId", Question.question_update);

router.put("/forum/createAnswer/:questionId", Question.answer_create);

module.exports = router;
