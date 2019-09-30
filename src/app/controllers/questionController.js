var Question = require('../models/questionsModel');

var Answers = require('../models/answersModel');

// Display all questions
exports.question_list = async (req, res) => {
    try {
        const questions = await Question.find()
        res.send(questions)

    } catch (err) {
        console.log(err)
        res.send({ error: 'error in list questions' })
    }
}

// // Create a new question
// exports.question_create = async (req, res) => {
//     try {
//         const { title, description } = req.body;
//         const question = await question.create({ title, description, user: req.userId });
//         res.send(question);
//     } catch (err) {
//         console.log(err);
//         res.send({ erro: 'erro ao tentar cadastrar uma nova pergunta' });
//     }
// };