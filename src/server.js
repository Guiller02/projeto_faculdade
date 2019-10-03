//imports
const express = require('express');

const bodyParser = require('body-parser');

const userRoutes = require('./app/routes/user');

const studentRoutes = require('./app/routes/student');

const questionsRoutes = require('./app/routes/question');

require('dotenv').config();

//express
const app = express();

//middlewares
app.use(bodyParser.json());

//Routes

app.use('/auth', userRoutes);

app.use('/question', questionsRoutes);

app.listen(3000);