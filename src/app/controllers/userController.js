var Student = require('../models/studentModel');

var Teacher = require('../models/teacherModel');

const bcrypt = require("bcryptjs");

const authConfig = require('../../config/auth');

const jwt = require("jsonwebtoken");

// Generate token
function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 300
    });
};

exports.user_register = async (req, res) => {
    try {
        var { cpf, name, email, password, option } = req.body;

        if (
            (cpf == "") ||
            (name == "") ||
            (email == "") ||
            (password == "") ||
            ((option != 1) && (option != 0))
        )
            return res.status(400).send({ error: 'Verify fields again' })

        function random() {
            return Math.floor((Math.random() * 8999) + 1000);
        }
        if (option == 0) {

            if (await Student.findOne({ email }))
                return res.status(400).send({ error: 'email already exist' });
            if (await Student.findOne({ cpf }))
                return res.status(400).send({ error: 'cpf has already been used' });

            var stop = 0;
            do {

                var studant = 'A' + random();

                if ((!await Student.findOne({ cod_student: studant })))
                    stop = 1;

            } while (stop == 0);

            const createdStudant = await Student.create({
                cod_student: studant,
                cpf,
                name,
                email,
                password
            });
            return res.send({ createdStudant })
        }

        if (option == 1) {

            if (await Teacher.findOne({ email }))
                return res.status(400).send({ error: 'email already exist' });
            if (await Teacher.findOne({ cpf }))
                return res.status(400).send({ error: 'cpf has already been used' });

            stop = 0;
            do {

                var teacher = 'P' + random();

                if ((!await Teacher.findOne({ cod_Teacher: teacher })))
                    stop = 1;

            } while (stop == 0);

            const createdTeacher = await Teacher.create({
                cod_Teacher: teacher,
                cpf,
                name,
                email,
                password
            });
            res.send({ createdTeacher })
        }

    } catch (err) {
        res.status(400).send({ error: 'Error in create new user' });
        console.log(err);
    }

}
