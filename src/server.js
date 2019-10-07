//imports
const express = require('express');

const bodyParser = require('body-parser');

const userRoutes = require('./app/routes/user');

const studentRoutes = require('./app/routes/student');

const teacherRoutes = require('./app/routes/teacher')

require('dotenv').config();

//express
const app = express();

//middlewares
app.use(bodyParser.json());

//Routes

app.use('/auth', userRoutes);

app.use('/student', studentRoutes);

app.use('/teacher', teacherRoutes);

app.listen(3000);