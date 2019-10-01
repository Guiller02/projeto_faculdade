var Question = require('../models/questionsModel');

var Answers = require('../models/answersModel');

const Student = require('../models/studentModel');

// Display all questions
exports.question_list = async (req, res) => {
    try {
        const questions = await Question.find({},'title description username data');
        res.send(questions);

    } catch (err) {
        console.log(err)
        res.send({ error: 'error in list questions' });
    }
};

//create new question
exports.question_create = async(req,res)=>{
    try{
        const {name} = await Student.findOne({cod_student:req.userId});
        const username = name
        const {title,description} = req.body;
        const createdQuestion = await Question.create({title,description,username,userRegister:req.userId});
        res.send(createdQuestion)
    }catch(err){
        res.send({error:'error in creating user'})
        console.log(err)
    }
}

