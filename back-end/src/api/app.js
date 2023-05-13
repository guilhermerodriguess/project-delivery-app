const express = require('express');
const cors = require('cors');
const loginRouter = require('../database/routes/LoginRouter');
const registerRouter = require('../database/routes/RegisterRouter');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/login', loginRouter);
app.use('/register', registerRouter);

module.exports = app;
