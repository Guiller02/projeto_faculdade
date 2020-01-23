const mongoose = require("../../db/mongo");

const QuestionsSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  userRegister: {
    type: String,
    required: true
  },
  answers: [
    {
      answer: {
        type: String,
        required: true
      },
      username: {
        type: String,
        required: true
      },
      userRegister: {
        type: String,
        required: true
      },
      data: {
        type: Date,
        required: true
      }
    }
  ],
  username: {
    type: String,
    required: true
  },
  data: {
    type: Date,
    default: Date.now
  },
  status: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model("Questions", QuestionsSchema);
