/*eslint linebreak-style: ["error", "windows"]*/
//var favicon = require('serve-favicon');
const path = require('path');
path.join2 = path.join;
path.sep = '/';
path.join = function(){
	var res = path.join2.apply({}, arguments);
	res = res.replace(/\\/g, path.sep);
	return res;
};
const cookieParser = require('cookie-parser');
const errorHandlers = require('./modules/error-handlers');

//const config = require(['.', 'config', 'config'].join(path.sep));

const app = require(['.', 'config', 'express'].join(path.sep));

// view engine setup
app.set('views', './public/views');
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(cookieParser());
//app.use(require('connect-livereload')(config.livereload));

// catch 404 and forward to error handler
app.use((req, res, next) => {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(errorHandlers.developmentHandler);
}

// production error handler
// no stacktraces leaked to user
app.use(errorHandlers.productionHandler);

module.exports = app;
