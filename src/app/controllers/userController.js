var Student = require('../models/studentModel');

var Teacher = require('../models/teacherModel');

var User = require('../models/userModel');

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
        const { cpf, name, email, password, option } = req.body;

        const createdUser = await User.create({ cpf, name, email, password });

        const random = await Math.floor((Math.random() * 8999) + 1000);

        if (option == 0) {
            do {
                var stop = 0;
                const StudentRandom = 'A' + random
                if (Student.findOne({ StudentRandom })) {
                    stop = 1;
                }


            } while (stop == 0)
            const createdStudant = await Student.create({ cod_student: StudentRandom, user: createdUser });
            res.send({ createdStudant })
        }
        else if (option == 1) {
            const createdTeacher = await Teacher.create({ cod_Teacher: 'P' + random, user: createdUser });
            res.send({ createdTeacher })
        }

    } catch (err) {
        res.status(400).send({ error: 'Error in create new user' })
        console.log(err)
    }

}
