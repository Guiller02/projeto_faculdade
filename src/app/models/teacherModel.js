const mongoose = require('../../db/database');

const User = require('../models/userModel');

const bcrypt = require("bcryptjs");

const TeacherSchema = new mongoose.Schema({
    cod_Teacher: {
        type: String,
        required: true
    },
    user: User.schema
});


const Teacher = mongoose.model("Teacher", TeacherSchema);

module.exports = Teacher;