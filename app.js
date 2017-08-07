var express = require('express');
var app = express();

app.set('view engine', 'ejs');

var routes = require('./routes');
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// home
app.get('/', routes.home);

// tags
app.get('/tag/:tag?', routes.tag);

// notFound
app.get('*', routes.notFound);

app.listen(3000, function() {
	console.log('localhost:3000');
});