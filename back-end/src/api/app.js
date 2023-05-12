const express = require('express');
const cors = require('cors');
const loginRouter = require('../database/routes/LoginRouter');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/login', loginRouter);

module.exports = app;
