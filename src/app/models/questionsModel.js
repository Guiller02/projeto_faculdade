const mongoose = require('../../db/mongo');

const QuestionsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
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
    data: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Questions', QuestionsSchema)