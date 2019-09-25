//imports
const express = require('express');

const bodyParser = require('body-parser');

const userRoutes = require('./app/routes/student');


//express
const app = express();

//middlewares
app.use(bodyParser.json());

//Routes

app.use('/auth', userRoutes);

app.listen(3000);