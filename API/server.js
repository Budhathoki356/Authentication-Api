var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var express = require('express');
var app = express();

require('./config/mongoose.config');

/**
 * third party middleware
 */

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * internal files
 */
var apiRoute = require('./controller/api.router');    


/**
 * middlewares
 */
app.use('/api',apiRoute);

/** 
 * server conncetion check
 */
app.listen(4000, function(err, done){
    if(err) {
        console.log(err);
    } else {
        console.log('listening on port 4000'); 
    }
});