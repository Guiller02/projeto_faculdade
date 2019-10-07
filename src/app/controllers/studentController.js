const hanaConnection = require('../../db/hana');

const Student = require('../models/studentModel');

const Teacher = require('../models/teacherModel')

//midleware to see if he is a student
exports.isStudent = async (req, res, next) => {
    const firstRegister = req.userId.charAt(0);
    console.log('está recebendo:' + req.userId);
    if (firstRegister != 'A') {
        res.status(401).send({ error: 'not authorized' });
    }
    else
        next();
};

//show student semester
exports.show_semester = async (req, res) => {
    try {
        const isStudent = await Student.findOne({ cod_student: req.userId });

        if (!isStudent) {
            return res.status(401).json({ error: "user not found" });
        }
        hanaConnection.connection.connect(hanaConnection.params, err => {
            if (err) {
                return res.status(401).json({ erro: `${err}` });
            }

            //Show semester and disciplines
            const sql = `SELECT DISCIPLINA.ST_NOME_DISCIPLINA, HISTORICO.FL_NOTA_ALUNO, HISTORICO.IT_SEMESTRE,HISTORICO.ST_COD_PROFESSOR
            FROM HISTORICO
            JOIN DISCIPLINA
            ON HISTORICO.INT_ID_DISCIPLINA = DISCIPLINA.INT_ID_DISCIPLINA
            WHERE HISTORICO.ST_COD_ALUNO = '${isStudent.cod_student}'`;

            hanaConnection.connection.exec(sql, async (err, rows) => {
                hanaConnection.connection.disconnect();
                for (var prop in rows) {
                    var valor = rows[prop];

                    const teacher = await Teacher.findOne({
                        cod_Teacher: valor.ST_COD_PROFESSOR
                    });

                    if (valor.FL_NOTA_ALUNO == null) valor.FL_NOTA_ALUNO = "-";
                    valor.ST_NOME_PROFESSOR = teacher.name;
                };

                if (err) {
                    return res.status(401).json({ error: `SQL execute error: ${err}` });
                };

                if (rows.length === 0) {
                    return res.json({ error: "no results for this student" });
                };

                return res.json(rows);
            });
        });

    } catch (err) {
        return res.status(400).send({ error: 'Error in show semester' })
        console.log(err);
    }
};

exports.show_discipline = async (req, res) => {
    try {

        const isStudent = await Student.findOne({ cod_student: req.userId });

        if (!isStudent) {
            return res.status(401).json({ error: "user not found" });
        }

        hanaConnection.connection.connect(hanaConnection.params, err => {
            if (err) {
                console.log(err)
                return res.status(400).send({ error: 'error in show disciplines' })
            }

            const { discipline } = req.body;

            //-ME TRAZ O SEMESTRE, DISCIPLINA E A NOTA--
            const sql = `SELECT DISCIPLINA.ST_NOME_DISCIPLINA, HISTORICO.FL_NOTA_ALUNO, HISTORICO.ST_COD_PROFESSOR,HISTORICO.IT_SEMESTRE
      FROM HISTORICO
      JOIN DISCIPLINA
      ON HISTORICO.INT_ID_DISCIPLINA = DISCIPLINA.INT_ID_DISCIPLINA
      WHERE (LOWER(DISCIPLINA.ST_NOME_DISCIPLINA) LIKE LOWER('%${discipline}%')
      AND HISTORICO.ST_COD_ALUNO = '${isStudent.cod_student}');`;

            hanaConnection.connection.exec(sql, async (err, rows) => {
                hanaConnection.connection.disconnect();

                if (err) {
                    return res.status(401).json({ error: `SQL execute error: ${err}` });
                }
                if (rows.length === 0) {
                    return res.json({ error: "no results for this student" });
                }

                for (var prop in rows) {
                    var valor = rows[prop];

                    const teacher = await Teacher.findOne({
                        cod_Teacher: valor.ST_COD_PROFESSOR
                    });

                    if (valor.FL_NOTA_ALUNO == null) valor.FL_NOTA_ALUNO = "-";
                    valor.ST_NOME_PROFESSOR = teacher.name;
                }

                return res.json(rows);
            });
        });
    } catch (err) {
        res.status(400).send({ error: 'error in show discipline' });
        console.log(err);

    }


};

