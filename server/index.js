const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRouter = require('./userRouter');
//Middleware
const morgan = require('morgan');

//cors
const cors = require('cors');

//Middleware - bodyParser
app.use(express.json());
app.use(morgan('dev'));

app.use(cors());

//Router
app.use('/api', userRouter);

//MongoDb Localhost
mongoose.connect('mongodb://localhost:27017/userAuth', 
{ useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("Server connected successfully");
});

//Port define
app.listen(5000, () => {
    console.log("localhost connected Successsfully");
});