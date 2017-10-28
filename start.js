var express = require('express');
var bobyParse = require('body-parser');
var fortune = require('./lib/fortune.js');

//---------------------- save MongoDB --------------------

var dateCB = require('./lib/saveMongodb.js');

// ----------------------- request SBRF -----------------

var parseString = require('xml2js').parseString;
var fs = require('fs');
var MongoClient = require("mongodb").MongoClient;

var os = require("os");
var cbrfdata = require("./cbrfdata");
var greeting = require("./greeting");

//-------------------------------------------------------



var app = express();

var jsonParser = bobyParse.json();


var handlebars = require('express-handlebars')
.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));


app.post("/user", jsonParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);

   //fortune: fortune.getFortune()

   //requestsCBRF.getMmft("hello", "world");
   var userName = os.userInfo().username;
  //console.log(greeting.getMessage(userName));
  console.log(cbrfdata.getMessage("1", "2"));

  //greeting.getMessage(userName);
   response.json(JSON.stringify(request.body));
});

app.get('/', function(req, res) {
res.render('home');
});

app.get('/page', function(req, res){
  res.render('page');
});

app.get('/about', function(req, res){
res.render('about', { fortune: fortune.getFortune() });
});

//app.get('/home', function(req, res){
  //res.render('home', {dateCB:dateCB.setDataMongodb()})
//});

// Обобщенный обработчик 404 (промежуточное ПО)
app.use(function(req, res, next){
res.status(404);
res.render('404');
});
// Обработчик ошибки 500 (промежуточное ПО)
app.use(function(err, req, res, next){
console.error(err.stack);
res.status(500);
res.render('500');
});

app.listen(app.get('port'), function(){
console.log( 'Express запущен на http://localhost:' +
app.get('port') + '; нажмите Ctrl+C для завершения.' );
});
