const Question = require('../models/questionsModel');

const Student = require('../models/studentModel');

const Answers = require('../models/answersModel');

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
        const firstRegister = register.charAt(0);
        if (firstRegister == 'A'){
            const {title,description} = req.body;
            const createdQuestion = await Question.create({title,description,username:name,userRegister:req.userId});
            res.send(createdQuestion)
    }
    else{
        return res.status(401).send({error:'not authorized'})
    }
    }catch(err){
        res.send({error:'error in creating user'})
        console.log(err)
    }
}

//get unique question
exports.question_show = async (req, res) => {
    try {
        const question = await Question.findById(req.params.questionId);
        const answer = await Answers.find({ question: req.params.questionId }, ('answer username data'))
        res.send({ question, answer });
    } catch (err) {
        console.log(err);
        res.status(401).send({ error: 'error in show question' });
    }
};

// Delete question
exports.question_delete = async (req, res) => {
    try {
        //returning user loged
        const isUser = req.userId
        const { userRegister } = await Question.findById(req.params.questionId);
        console.log(isUser, userRegister)
        if (userRegister != isUser)
            return res.status(401).send({ error: 'not authorized' });
        const question = await Question.findByIdAndDelete(req.params.questionId);
        res.send(question)
    } catch (err) {
        console.log(err)
        res.status(400).send({ error: 'error in delete question' })
    }
};

//update question
exports.question_update = async (req, res) => {
    try {
        const isUser = req.userId
        const { userRegister } = await Question.findById(req.params.questionId);
        if (userRegister != isUser)
            return res.status(401).send({ error: 'not authorized' });
        const { title, description } = req.body;
        const updatedQuestion = await Question.findOneAndUpdate(req.params.questionId, {
            title,
            description
        }, { new: true });

        res.send(updatedQuestion);

    } catch (err) {
        res.send({ error: 'error in update question' });
    }
}


