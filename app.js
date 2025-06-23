var createError = require('http-errors');
var express = require('express');
var path = require('path');
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors"); 
require('dotenv').config(true);

var indexRouter = require('./src/routes/index');

var app = express();

// Set the view engine
app.set('view engine', 'ejs');

// Set the views directory (optional if you use default './views')
app.set('views', path.join(__dirname, 'views'));

// // swagger connection
// const swagger = require("./utils/swagger");
// const swaggerUi = require("swagger-ui-express");
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swagger.swaggerSpec));


// socket connection. render the frontend page for socket
app.get('/', (req, res) => {
    res.render('chat');
});

app.use(logger("dev"));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ limit: '1mb', extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'utils/fileUpload/media')));
app.use('/api', indexRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.statusCode  || 500);
    res.send({
      status: err.statusCode || 500,
      message: err.message
    });
});

module.exports = app;
