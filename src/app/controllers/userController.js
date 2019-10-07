var Student = require('../models/studentModel');

var Teacher = require('../models/teacherModel');

const bcrypt = require("bcryptjs");

const env = require('../../../.env');

const mail = require('../../services/mail');

const jwt = require("jsonwebtoken");

// Generate token
function generateToken(params = {}, option) {
    if (option == 1) {
        return jwt.sign(
            params, env.secret, {
            expiresIn: '1d'
        });
    }
    else {
        return jwt.sign(
            params, env.secret, {
            expiresIn: '4h'
        });
    }


};

exports.mail_valid = async (req, res, next) => {
    try {
        const firstRegister = req.userId.charAt(0);
        console.log('está recebendo:' + req.userId)
        if (firstRegister == 'A') {
            const { active } = await Student.findOne({ cod_student: req.userId }).select('+active');
            console.log(active)
            if (active == true) {
                return next();
            }
            else {
                return res.send({ error: 'Verify email to see this' });
            }
        }
        else if (firstRegister == 'P') {
            const { active } = await Teacher.findOne({ cod_Teacher: req.userId }).select('+active');
            console.log(active)
            if (active == true) {
                return next();
            }
            else {
                return res.send({ error: 'Verify email to see this' });
            }
        }
    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: 'invalid user' });

    }
}

//create user
exports.user_register = async (req, res) => {
    try {
        var { cpf, name, email, password, option } = req.body;

        //to see if one of the fields are blank
        if (
            (cpf == "") ||
            (name == "") ||
            (email == "") ||
            (password == "") ||
            ((option != 1) && (option != 0))
        )
            return res.status(400).send({ error: 'Verify fields again' });

        //to generate random number for register
        function random() {
            return Math.floor((Math.random() * 8999) + 1000);
        }

        //option 0 for students
        if (option == 0) {

            // //to verify if email or cpf already exist
            if (await Student.findOne({ email }))
                return res.status(400).send({ error: 'email already exist' });

            if (await Student.findOne({ cpf }))
                return res.status(400).send({ error: 'cpf has already been used' });

            //to create a stop variable for the next do
            var stop = 0;
            do {
                //create a new student register with randomic number
                var studentId = 'A' + random();

                //if does not have a student with this register, stop will receive 1 and will stop the do
                if ((!await Student.findOne({ cod_student: studentId })))
                    stop = 1;

                //if found a student with this register, will create another register
            } while (stop == 0);

            const mailToken = 'A' + generateToken({
                id: studentId

            }, 1)

            //to create a new student
            const createdStudent = await Student.create({
                cod_student: studentId,
                cpf,
                name,
                email,
                password,
                mailToken
            });

            mail.register(name, email, studentId, mailToken);

            //to not return password
            createdStudent.password = undefined

            return res.send({
                createdStudent,
                token: generateToken({
                    id: studentId

                }, 1)
            });
        };
        //option 1 for teachers
        if (option == 1) {
            // //to verify if email or cpf already exist
            if (await Teacher.findOne({ email }))
                return res.status(400).send({ error: 'email already exist' });

            if (await Teacher.findOne({ cpf }))
                return res.status(400).send({ error: 'cpf has already been used' });

            //to create a stop variable for the next do
            var stop = 0;
            do {
                //create a new Teacher register with randomic number
                var teacherId = 'P' + random();

                //if does not have a student with this register, stop will receive 1 and will stop the do
                if ((!await Teacher.findOne({ cod_Teacher: teacherId })))
                    stop = 1;

                //if found a student with this register, will create another register
            } while (stop == 0);

            const mailToken = 'P' + generateToken({
                id: teacherId

            }, 1)

            //to create a new student
            const createdTeacher = await Teacher.create({
                cod_Teacher: teacherId,
                cpf,
                name,
                email,
                password,
                mailToken
            });

            mail.register(name, email, teacherId, mailToken);

            //to not return password
            createdTeacher.password = undefined

            return res.send({
                createdTeacher,
                token: generateToken({
                    id: teacherId

                }, 1)
            });

        }

    } catch (err) {
        res.status(400).send({ error: 'Error in create new user' });
        console.log(err);
    }
};

//login
exports.user_login = async (req, res) => {
    try {
        const { register, password } = req.body

        //to return first word of the register, to know if the user is student or teacher to know which database is to search
        const firstRegister = register.charAt(0);
        console.log(register)
        //if the first register return A, the user are student
        if (firstRegister == 'A') {
            //trying to find the student with the registration and returning password too
            const student = await Student.findOne({ cod_student: register }).select('+password');
            //if student registration not found
            if (!student)
                return res.status(400).send({ error: 'user not found' });
            //if the password are not equal
            if (!(await bcrypt.compare(password, student.password)))
                return res.status(400).send({ error: 'invalid password' });

            //to send to the user token and return the user which are logged
            return res.send({
                student,
                token: generateToken({
                    id: register
                })
            });
        }
        //if the first register return P, the user are student
        else if (firstRegister == 'P') {
            //trying to find the teacher with the registration and returning password too
            const teacher = await Teacher.findOne({ cod_Teacher: register }).select('+password');
            //if student registration not found
            if (!teacher)
                return res.status(400).send({ error: 'user not found' });
            //if the password are not equal
            if (!(await bcrypt.compare(password, teacher.password)))
                return res.status(400).send({ error: 'invalid password' });

            //to send to the user token and return the user which are logged
            return res.send({
                teacher,
                token: generateToken({
                    id: register
                })
            });
        }
        //if the user are not equal to A or P, its a invalid register
        else {
            res.status(400).send({ error: 'invalid register' })
        };
    } catch (err) {
        console.log(err)
        res.status(400).send({ error: 'error in authenticate' })
    }
}

//show profile
exports.user_profile = async (req, res) => {
    try {
        //to search if the user is student or teacher
        const isTeacher = await Teacher.findOne({ cod_Teacher: req.userId });
        const isStudent = await Student.findOne({ cod_student: req.userId });

        //if is student render student if is teacher render teacher, or return error
        if (isStudent) {
            res.send(isStudent);
        } else if (isTeacher) {
            res.send(isTeacher);
        }
        else
            res.send({ erro: 'user not found' })

    } catch (err) {
        console.log(err)
        res.status(400).send({ error: 'error in show profile' });
    }
}

//show unique user
exports.user_search_profile = async (req, res) => {
    try {
        //to take only the :id in the params
        const { id } = req.params;
        //to return the first character of the id
        firstRegister = id.charAt(0);

        //if the :id start with A, is a student, if start with P, is a teacher or is nothing
        if (firstRegister == 'A') {
            student = await Student.findOne({ cod_student: id }, 'name cod_student createdAt solutions');
            return res.send(student);
        }
        else if (firstRegister == 'P') {
            teacher = await Teacher.findOne({ cod_Teacher: id });
            return res.send(teacher);
        }
        else {
            return res.send({ error: 'user not found' })
        }

    } catch (err) {
        console.log(err)
        res.status(400).send({ error: 'error in search user' });
    }
}

exports.user_update = async (req, res) => {
    try {
        //to return id in the route
        const { id } = req.params;

        //to see if the id of the route is the same of the user loged
        if (req.userId != id)
            return res.status(401).send({ error: 'invalid user' });

        //to return first register to see if the user is student or teacher
        const { name, password, email, cpf } = req.body;
        const firstRegister = req.userId.charAt(0);

        //if the first register start with A, is student, or if start with P, is teacher
        if (firstRegister == 'A') {

            await Student.findOneAndUpdate({ cod_student: id }, {
                email: undefined,
                password: null,
                cpf: undefined
            });

            //in case of the new email already exists in another user
            if ((await Student.findOne({ email }) || (await Student.findOne({ cpf }))))
                return res.status(400).send({ error: 'user already exist' });

            //to see if one of the fields are equal to null or blank
            if (
                (name == "") || (name == null) ||
                (email == "") || (email == null) ||
                (cpf == "") || (cpf == null) ||
                (password == "") || (password == null)
            )
                return res.status(400).send({ error: 'verify fields again' });

            //update user with all fields
            const updatedStudent = await Student.findOneAndUpdate({ cod_student: id }, {
                name,
                email,
                cpf
            }, { new: true });

            updatedStudent.password = password
            await updatedStudent.save();

            return res.send(updatedStudent);

        } else if (firstRegister == 'P') {
            await Teacher.findOneAndUpdate({ cod_Teacher: id }, {
                email: undefined,
                password: 0,
                cpf: undefined
            });

            //in case of the new email already exists in another user
            if ((await Teacher.findOne({ email }) || (await Teacher.findOne({ cpf }))))
                return res.status(400).send({ error: 'user already exist' });

            //to see if one of the fields are equal to null or blank
            if (
                (name == "") || (name == null) ||
                (email == "") || (email == null) ||
                (cpf == "") || (cpf == null) ||
                (password == "") || (password == null)
            )
                return res.status(400).send({ error: 'verify fields again' });

            //update user with all fields
            const updatedTeacher = await Teacher.findOneAndUpdate({ cod_Teacher: id }, {
                name,
                email,
                cpf,
            }, { new: true });
            updatedTeacher.password = password
            await updatedTeacher.save();

            return res.send(updatedTeacher);
        }
    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: 'error in update user' });
    }
}

//authenticate email
exports.user_authenticate_email = async (req, res) => {
    const { token } = req.params
    console.log(token)
    firstToken = token.charAt(0)
    if (firstToken == 'A') {
        const isStudent = await Student.findOne({ mailToken: token })
        if (isStudent) {
            const updatedStudent = await Student.findOneAndUpdate({ mailToken: token }, {
                mailToken: undefined,
                active: true
            }, { new: true })
            return res.send(updatedStudent);
        }
        else
            return res.send('invalid token');
    }
    else if (firstToken == 'P') {
        const isTeacher = await Teacher.findOne({ mailToken: token })
        if (isTeacher) {
            const updatedTeacher = await Teacher.findOneAndUpdate({ mailToken: token }, {
                mailToken: undefined,
                active: true
            }, { new: true })
            return res.send(updatedTeacher);
        }
        else
            return res.send('invalid token');
    }
    else {
        return res.send('Token inválido')
    }

}