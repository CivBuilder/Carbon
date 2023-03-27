var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sequelize = require('./utils/Database.js');
const ForumContent = require('./models/ForumContent.js');
const user = require('./models/UserModel.js');                 
const user_emissions = require('./models/UserEmissions.js');

var indexRouter = require('./api/index');
var usersRouter = require('./api/users');
var forumRouter = require('./api/forumContent');
var quizRouter = require('./api/quiz');
var userRouter = require('./api/user');
var user_emissionsRouter = require('./api/userEmissions');

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
app.use('/api/quiz', quizRouter);
app.use('/api/user', userRouter);
app.use('/api/userEmissions', user_emissionsRouter);

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
