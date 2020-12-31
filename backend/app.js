const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const connectDb = require('./database/db');
const AdminRoutes = require('./api/routes/admin');
const UserRoutes = require('./api/routes/user');

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

connectDb();
app.use('/api/admin/', AdminRoutes);
app.use('/api/user/', UserRoutes);

// Middleware for non-existing routes
app.use((req,res,next)=>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

//Middleware for handling all kinds of errors in the application.
app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({error:{message:error.message}});
});

module.exports = app;