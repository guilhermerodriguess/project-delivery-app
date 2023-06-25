const express = require('express');
const cors = require('cors');
const path = require('path');
const loginRouter = require('./routes/LoginRouter');
const registerRouter = require('./routes/RegisterRouter');
const customerRouter = require('./routes/CustomerRouter');
const sellerRouter = require('./routes/SellerRouter');
const adminRouter = require('./routes/AdminRouter');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/admin', adminRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/customer', customerRouter);
app.use('/seller', sellerRouter);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
