const express  = require ('express');
const app = express();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const router = require('./Routes/Routes.js');
const errorHandler = require('./Routes/error.js')
const cors = require('cors');
require('./database/db');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(morgan('tiny'));
app.use(cors({
    origin:'*'
}));


// Routes
app.use('/',router);

// Error handling
app.use(errorHandler);



app.listen(5000,()=>{
    console.log('express server started');
});