const hanaConnection = require("../../db/hana");

const Student = require("../models/studentModel");

const Teacher = require("../models/teacherModel");

//midleware to see if he is a teacher
exports.isTeacher = async (req, res, next) => {
  const firstRegister = req.userId.charAt(0);
  console.log("está recebendo:" + req.userId);
  if (firstRegister != "P") {
    res.status(401).send({ error: "not authorized" });
  } else next();
};

//show students this teacher gives lesson with the class id of class and discipline
exports.show_students = async (req, res) => {
  try {
    const isTeacher = await Teacher.findOne({ cod_Teacher: req.userId });

    if (!isTeacher) {
      return res.status(401).json({ error: "user not found" });
    }
    const { idDiscipline, idClass } = req.params;

    console.log(idDiscipline);

    hanaConnection.connection.connect(hanaConnection.params, err => {
      if (err) {
        console.log(err);
        return res.status(400).send({ error: "error in show disciplines" });
      }
      const sql = `SELECT DISCIPLINA.ST_NOME_DISCIPLINA, HISTORICO.ST_COD_ALUNO, HISTORICO.FL_NOTA_ALUNO
              FROM HISTORICO
              JOIN DISCIPLINA
              ON HISTORICO.INT_ID_DISCIPLINA = DISCIPLINA.INT_ID_DISCIPLINA
              WHERE HISTORICO.INT_ID_DISCIPLINA = '${idDiscipline}'
              AND HISTORICO.ST_COD_PROFESSOR = '${isTeacher.cod_Teacher}'
              AND HISTORICO.INT_COD_TURMA = '${idClass}'
              ;`;

      hanaConnection.connection.exec(sql, async (err, rows) => {
        hanaConnection.connection.disconnect();

        for (var prop in rows) {
          var valor = rows[prop];

          console.log(valor.ST_COD_ALUNO);

          const student = await Student.findOne({
            cod_student: valor.ST_COD_ALUNO
          });

          valor.ST_NOME_ALUNO = student.name;
        }

        if (err) {
          console.log(err);
          return res.status(400).send({ error: `SQL execute error: ${err}` });
        }
        if (rows.length === 0) {
          return res.status(400).send({ error: "nothing to show" });
        }

        return res.json(rows);
      });
    });
  } catch (err) {
    res.status(400).send({ error: "error in show discipline" });
    console.log(err);
  }
};

//insert grades in student
exports.insert_grades = async (req, res) => {
  const { materia, usuarios } = req.body;
  const errorStatus = [];

  const hanaPromisify = promisify(
    hanaConnection.connection.connect(hanaConnection.params, err => {
      let sql = "";

      usuarios.forEach(usuario => {
        sql = `CALL ALTERARNOTA(${usuario.nota}, '${usuario.cod_aluno}', '${req.professorToken}', ${materia.turma}, ${materia.disciplina});`;
        hanaConnection.connection.exec(sql, (erro, status) => {
          hanaConnection.connection.disconnect();
          if (erro) {
            return res.status(500).json({
              erro: "Erro interno no servidor"
            });
          }

          if (status === 0) {
            errorStatus.push(usuario.cod_aluno);
          }
        });
      });

      if (err) return res.status(400).send({ error: "bad request" });
    })
  );

  (async function() {
    try {
      await hanaPromisify;
      console.log("deu");
    } catch (error) {
      console.log(error);
    }
  });

  await res.json(
    errorStatus
      ? {
          error: `Não foi possível lançar as notas dos alunos: ${errorStatus.toString()}`
        }
      : { success: "Lançadas" }
  );

  console.log("FIM");
};
