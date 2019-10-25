const Question = require("../models/questionsModel");

const Student = require("../models/studentModel");

// Display all questions
exports.question_list = async (req, res) => {
  try {
    //to create count of answers for each question
    var count = [];

    //to list only status title userame and data in the list of all questions
    const questionsList = await Question.find({}, "status title username data")
      .sort({ data: "desc" })
      .exec();

    //to find all questions for use in forEach
    const questions = await Question.find()
      .sort({ data: "desc" })
      .exec();
    questions.forEach(question => {
      //insert into count the number of array lenght in database
      count.push(question.answers.length);
    });
    res.send({ count, questionsList });
  } catch (err) {
    console.log(err);
    res.send({ error: "error in list questions" });
  }
};

//create a new question
exports.question_create = async (req, res) => {
  try {
    //return the register of the student
    register = req.userId;

    //to return how much points the user have
    const { points } = await Student.findOne({ cod_student: register });

    //if the user has more than 1 point, the user can create a new question, else, the user cannot create a new question
    if (points <= 0) return res.status(400).send({ error: "invalid points" });

    await Student.findOneAndUpdate(
      { cod_student: register },
      { points: points - 1 }
    );

    // to return name on the student and, title and description in the req.body
    const { name } = await Student.findOne({ cod_student: register });
    const { title, description } = req.body;

    //create question
    const question = await Question.create({
      title,
      description,
      userRegister: req.userId,
      username: name
    });
    return res.send(question);
  } catch (err) {
    console.log(err);
    res.send("error");
  }
};

//get unique question
exports.question_show = async (req, res) => {
  try {
    //to show only this fields on the search
    const question = await Question.findById(
      req.params.questionId,
      "title description username answers answers:data answers.username answers.answer"
    );

    res.send({ question });
  } catch (err) {
    console.log(err);
    res.status(401).send({ error: "error in show question" });
  }
};

// Delete question
exports.question_delete = async (req, res) => {
  try {
    //returning user loged in application
    const isUser = req.userId;

    //returning the register of who created the question
    const { userRegister } = await Question.findById(req.params.questionId);

    //to compare if the user who is logged is the same as created the question
    if (userRegister != isUser)
      return res.status(401).send({ error: "not authorized" });
    //if is the user, the question will be deleted
    const question = await Question.findByIdAndDelete(req.params.questionId);
    res.send(question);
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: "error in delete question" });
  }
};

//update question
exports.question_update = async (req, res) => {
  try {
    //to return the logged user
    const isUser = req.userId;
    //to return the user who created the question
    const { userRegister } = await Question.findById(req.params.questionId);
    //to compare if the user how created the question is the same as the logged user
    if (userRegister != isUser)
      return res.status(401).send({ error: "not authorized" });
    const { title, description } = req.body;
    const updatedQuestion = await Question.findOneAndUpdate(
      req.params.questionId,
      {
        title,
        description
      },
      { new: true }
    );

    res.send(updatedQuestion);
  } catch (err) {
    res.send({ error: "error in update question" });
  }
};

// // create answer
exports.answer_create = async (req, res) => {
  try {
    //to return the register of the user who is logged
    register = req.userId;

    //to return the number of solutions and the points the user has
    const { solutions, points } = await Student.findOne({
      cod_student: register
    });

    //to atualize the number of solutions and points the user has
    await Student.findOneAndUpdate(
      { cod_student: register },
      { solutions: solutions + 1, points: points + 1 }
    );

    //to return the question id of the url
    const { questionId } = req.params;

    //to take the answer of the req.body
    const { answer } = req.body;

    //to create a new answer with the date of now
    const data = Date.now();

    //to take only the name of the student
    const { name } = await Student.findOne({ cod_student: register });

    //to create a new answer inside the questio
    const question = await Question.findById(questionId);
    await question.answers.push({
      answer,
      username: name,
      userRegister: register,
      data
    });
    question.save();
    return res.send(question);
  } catch (err) {
    res.send({ error: "error in create a new answer" });
    console.log(err);
  }
};

exports.forum_report = async (req, res) => {
  try {
    const studentReport = await Student.find({})
      .sort({ solutions: "desc" })
      .exec();
    res.send(studentReport);
  } catch (err) {
    res.status(400).send({ error: "error in show report" });
    console.log(err);
  }
};
