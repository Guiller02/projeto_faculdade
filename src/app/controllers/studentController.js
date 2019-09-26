var Student = require('../models/studentModel');

const bcrypt = require("bcryptjs");

const authConfig = require('../../config/auth');

const jwt = require("jsonwebtoken");

// Generate token
function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 300
    });
};

function random() {
    return Math.floor((Math.random() * 8999) + 1000);
};


exports.studets_register = async (req, res) => {
    try {
        const { cpf, name, email, password } = req.body;

        stop = 0;

        const hasStudent = await Student.findOne({ email });

        if (hasStudent) {
            return res.status(400).send({ error: 'usuario ja existe' })
        }
        console.log('passou aqui')

        if (await Student.findOne({ cpf }))
            res.send({ ok: true })

        // do {

        //     var student = 'A' + random();

        //     if ((!await Student.findOne({ cod_student: student })))
        //         stop = 1;

        // } while (stop == 0);

        // const createdStudent = await Student.create({
        //     cpf,
        //     name,
        //     email,
        //     password,
        //     cod_student: student
        // })

        // res.send(createdStudent)
    } catch (err) {
        res.status(400).send({ error: true })
        console.log(err)
    }
}

// exports.user_register = async (req, res) => {
//     try {
//         const { cpf, name, email, password } = req.body;

//         if (
//             (cpf == "") ||
//             (name == "") ||
//             (email == "") ||
//             (password == "")
//         )
//             res.status(400).send({ error: 'Verify fields again' });



//         if (await Student.findOne({ email }))
//             res.send({ error: true })



//         var student = 'A' + random();

//         let stop = 0;
//         do {

//             var student = 'A' + random();

//             if ((!await Student.findOne({ cod_student: student })))
//                 stop = 1;

//         } while (stop == 0);

//         const createdStudent = await Student.create({ cpf, name, email, password, cod_student: student })

//         res.send({ createdStudent });

//     }
//     catch (err) {
//         res.status(400).send({ error: 'Error in create new user' });
//         console.log(err);
//     }

// }
