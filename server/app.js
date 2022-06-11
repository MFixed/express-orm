const port = process.env.PORT || 3000
const user = process.env.MYSQL_USER || "root"
const pass = process.env.MYSQL_PASS || ""
const dataBaseName = process.env.NAME_DATABASE_MYSQL || 'company_db'


var createError = require('http-errors');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');


const { Sequelize } = require('sequelize');

var express = require('express');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Routes and public folder
app.use('/static',express.static(path.join(__dirname+"/server/", 'public')));
app.use('/', require('./routes/index'))


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


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


async function Database (){
const sequelize = new Sequelize(dataBaseName, user, pass,{
  host: 'localhost',
  dialect: 'mysql' 
})

try {
 await sequelize.authenticate()  
  console.log("Database is Connected")
} catch (error) {
  console.log("error Database " + error)
}

}
Database()

module.exports = app;
