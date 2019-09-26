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

        function random(){
            return Math.floor((Math.random() * 8999) + 1000);
        }
        if (option == 0) {

            const hasStudentEmail = await Student.findOne({email}
        );
            if(hasStudentEmail)
                res.status(400).send({error:'Student already exist'})

            var stopStudent = 0;
            do {

                var studant = 'A' + random();

                const hasStudent = await Student.findOne({ cod_student: studant });
                
                if (!hasStudent) {
                    stopStudent = 1;
                }
            } while (stopStudent == 0);

            const createdStudant = await Student.create({ 
                cod_student: studant, 
                user: {
                 cpf, 
                 name, 
                 email, 
                 password 
            } });
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
