const mongoose = require('../../db/mongo');

const bcrypt = require("bcryptjs");

const TeacherSchema = new mongoose.Schema({
    cod_Teacher: {
        type: String,
        required: true,
    },
    cpf: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    passwordResetToken: {
        type: String,
        select: false
    },
    passwordResetExpires: {
        type: Date,
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    mailToken: {
        type: String,
        select: false,
        required: true
    },
    active: {
        type: Boolean,
        default: false,
        required: true,
        select: false
    }
});

TeacherSchema.pre("save", async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

const Teacher = mongoose.model("Teacher", TeacherSchema);

module.exports = Teacher;