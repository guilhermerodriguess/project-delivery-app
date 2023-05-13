const express = require('express');
const cors = require('cors');
const loginRouter = require('./routes/LoginRouter');
const userRouter = require('./routes/UserRouter');
const productRouter = require('./routes/ProductRouter');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/login', loginRouter);
app.use('/register', userRouter);
app.use('/customer', productRouter);

module.exports = app;
