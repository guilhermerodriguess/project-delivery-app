const express = require('express');
const cors = require('cors');
const loginRouter = require('../database/routes/LoginRouter');
const registerRouter = require('../database/routes/RegisterRouter');
const customerRouter = require('../database/routes/CustomerRouter');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/customer', customerRouter);

module.exports = app;
