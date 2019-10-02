const mongoose = require('../../db/mongo');

const AnswersSchema = mongoose.Schema({
    answer: {
        type: String,
        required: true
    },
    userRegister: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Questions',
        required: true
    },
    data: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Answers', AnswersSchema)