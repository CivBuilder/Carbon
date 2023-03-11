var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sequelize = require('./utils/Database.js');
const ForumContent = require('./models/ForumContent.js');
const user = require('./models/user.js');                 //NOTE : do we prefer to rename this? I see how forumContent is set to match the DB Table name but there is a route in routes/users.js
const user_emissions = require('./models/user_emissions');//Same note as Above - Angel 

// //~~~ASSOCIATIONS BETWEEN FOREIGN KEYS~~~~//
// user.hasMany(user_emissions);

var indexRouter = require('./routes/index');
var forumRouter = require('./routes/forumContent');
var userRouter = require('./routes/user');
var user_emissionsRouter = require('./routes/user_emissions')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/forumcontent', forumRouter);
app.use('/api/user', userRouter);
app.use('/api/user_emissions', user_emissionsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

sequelize.sync();



module.exports = app;
