const mongoose = require('../../db/database');

const User = require('../models/userModel');

const StudentSchema = new mongoose.Schema({
    cod_student: {
        type: String,
        required: true
    },
    user: User.schema
});

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;