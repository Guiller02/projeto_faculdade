const Answer = require('../models/answersModel');

const Question = require('../models/questionsModel')

const Student = require('../models/studentModel');

//Create a new Answer
exports.answer_create = async (req, res) => {
    try {
        // const answer = req.body;
        // const updateQuestion = await Question.findByIdAndUpdate((((((((((((((()))))))))))))))
        // const userRegister = req.userId
        // const { name, solutions } = await Student.findOne({ cod_student: userRegister });
        // const { answer } = req.body;
        // const { questionId } = req.params;
        // const cratedAnswer = await Answer.create({ answer, userRegister, username: name, question: questionId });
        // await Student.findOneAndUpdate({cod_student:userRegister},{solutions:solutions+1})
        // res.send(cratedAnswer)
    } catch (err) {
        console.log(err)
        res.status(400).send({ error: 'error in create answer' });
    }
};


// // Delete Comment
// exports.Comment_delete = async (req, res) => {
//     try {
//         //Retornando usuario logado
//         const isUser = req.userId;
//         //procurando o id do usuario que fez a Commentagem
//         const { user } = await Comment.findById(req.params.CommentId);
//         console.log(user)
//         //comparando se é o mesmo usuario
//         if (isUser != user)
//             return res.status(401).send({ erro: 'usuario invalido!' });
//         const coment = await Comment.findByIdAndDelete(req.params.CommentId);
//         res.send({ coment });
//     } catch (err) {
//         console.log(err);
//         res.send({ erro: 'erro ao procurar o comentario' });
//     }
// };

// // Update Comment
// exports.Comment_update = async (req, res) => {
//     try {
//         //Retornando usuario logado
//         const isUser = req.userId;
//         //procurando o id do usuario que fez o comentario
//         const { user } = await Comment.findById(req.params.CommentId);
//         console.log(user)
//         //comparando se é o mesmo usuario
//         if (isUser != user)
//             return res.status(401).send({ erro: 'usuario invalido!' });
//         const { comment } = req.body;
//         if (comment == null)
//             res.status(400).send({ error: 'Cannot update' })
//         const updatedComment = await Comment.findByIdAndUpdate(req.params.CommentId, {
//             comment
//         }, { new: true });

//         res.send({ updatedComment });

//     } catch (err) {
//         console.log(err);
//         res.send({ erro: 'erro ao procurar o comentario' });
//     }
// };