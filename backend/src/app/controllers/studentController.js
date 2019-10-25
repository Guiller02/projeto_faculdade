const hanaConnection = require("../../db/hana");

const Student = require("../models/studentModel");

const Teacher = require("../models/teacherModel");

//midleware to see if he is a student
exports.isStudent = async (req, res, next) => {
  const firstRegister = req.userId.charAt(0);
  console.log("está recebendo:" + req.userId);
  if (firstRegister != "A") {
    res.status(401).send({ error: "not authorized" });
  } else next();
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
        console.log(err);
        return res.status(400).json({ error: "error in show semester" });
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
        }

        if (err) {
          return res.status(401).json({ error: `SQL execute error` });
        }

        if (rows.length === 0) {
          return res.json({ error: "no results for this student" });
        }

        return res.json(rows);
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: "Error in show semester" });
  }
};

//show discipline that student has
exports.show_discipline = async (req, res) => {
  try {
    const isStudent = await Student.findOne({ cod_student: req.userId });

    if (!isStudent) {
      return res.status(401).json({ error: "user not found" });
    }

    hanaConnection.connection.connect(hanaConnection.params, err => {
      if (err) {
        console.log(err);
        return res.status(400).send({ error: "error in show disciplines" });
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
    res.status(400).send({ error: "error in show discipline" });
    console.log(err);
  }
};

async function enterCourse(discipline, cod_student, semester, cod_Teacher) {
  try {
    await hanaConnection.connection.connect(
      hanaConnection.params,
      async err => {
        if (err) console.log(err);

        //Show semester and disciplines
        const sql = `INSERT INTO HISTORICO (INT_ID_DISCIPLINA, ST_COD_ALUNO, IT_SEMESTRE, INT_COD_TURMA, ST_COD_PROFESSOR)
            values(${discipline}, '${cod_student}', ${semester}, 1,'${cod_Teacher}');`;

        await hanaConnection.connection.exec(sql, async err => {
          await hanaConnection.connection.disconnect();
          if (err) {
            console.log(err);
          }
        });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: "Error in show semester" });
  }
}

exports.enter_course = async (cod_student, course, semester) => {
  try {
    console.log("antes do if");
    if (course == 1) {
      console.log("primeiro if");
      if (semester === 1) {
        console.log("segundo if");
        await enterCourse(1, cod_student, 1, "P5127");
        await enterCourse(2, cod_student, 1, "P1455");
      } else if (semester === 2) {
        console.log("segundo if");
        await enterCourse(6, cod_student, 2, "P5127");
        await enterCourse(7, cod_student, 2, "P1455");
      }
    } else if (course == 2) {
      console.log("primeiro if");
      if (semester == 1) {
        console.log("segundo if");
        enterCourse(22, cod_student, 1, "P4996");
        enterCourse(23, cod_student, 1, "P5005");
      } else if (semester == 2) {
        console.log("segundo if");
        enterCourse(26, cod_student, 2, "P5005");
        enterCourse(27, cod_student, 2, "P8481");
      }
    } else if (course == 3) {
      console.log("primeiro if");
      if (semester == 1) {
        console.log("segundo if");
        enterCourse(34, cod_student, 1, "P7554");
        enterCourse(35, cod_student, 1, "P9767");
      } else if (semester == 2) {
        console.log("segundo if");
        enterCourse(39, cod_student, 2, "P7554");
        enterCourse(40, cod_student, 2, "P1307");
      }
    }
  } catch (err) {
    console.log(err);
  }
};
