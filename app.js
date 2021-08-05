/* I did not add much to this file,  i simply just added the route and helmet*/

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
/*const helmet = require("helmet");*/
require('dotenv').config();

/*importing router to main code*/
const fetchRouter = require('./routes/dataEndPoint');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/*Removed helmet i will do some more research on csp and how to allow images i tried a few settings could not make it work
* in react to make the inline scripts csp allowed i added this to package.json build
* set INLINE_RUNTIME_CHUNK=false&&react-scripts build
* but unsure on how to allow images from other sources such as github*/
/*app.use(helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
        "img-src": ["*"]
    }
}));*/

/*this is the only router i added to the code */
app.use('/', fetchRouter);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "/myappfrontend/build")));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, "myappfrontend", "build", "index.html"))
    });
} else {
    app.get("/", (req, res) => {
        res.send("API Running")
    });
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
