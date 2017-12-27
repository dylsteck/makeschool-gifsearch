// app.js
var express = require('express');
var app = express();
var exphbs  = require('express-handlebars');
// require http module
var http = require('http');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
  console.log(req.query.term);
  var queryString = "funny cat";
  // encode to remove whitespace + restricted characters
  var term = encodeURIComponent(queryString);
  // search put in giphy api search
   var url = 'http://api.giphy.com/v1/gifs/search?q=' + term + '&api_key=dc6zaTOxFJmzC';

   http.get(url, function(response) {
	   	//set encoding response
	   	response.setEncoding('utf8');

	   	var body = '';

	   	response.on('data', function(d) {
	   		//when data fully received, parse
	   		var paresed = JSON.parse(body);
	   		//render home template with gifs
	   		res.render('home', {gifs: parsed.data});
		}); 
   });
});

app.get('/greetings/:name', function (req, res) {
  var name = req.params.name;
  res.render('greetings', {name: name});
});

//runs the app on port 3000
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
