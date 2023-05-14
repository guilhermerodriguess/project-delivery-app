const express = require('express');
const cors = require('cors');
const path = require('path');
const loginRouter = require('./routes/LoginRouter');
const userRouter = require('./routes/UserRouter');
const productRouter = require('./routes/ProductRouter');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/login', loginRouter);
app.use('/register', userRouter);
app.use('/customer', productRouter);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
