var express = require('express');
var bobyParse = require('body-parser');
var fortune = require('./lib/fortune.js');

var async = require('async');
var request = require('request'); //запрос на обновления страници

//---------------------- save MongoDB --------------------

var dateCB = require('./lib/saveMongodb.js');
var parseString = require('xml2js').parseString;
var fs = require('fs');
var MongoClient = require("mongodb").MongoClient;

// ----------------------- request SBRF -----------------

var os = require("os");
var cbrfdata = require("./cbrfdata");

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

  var str = '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/"><Body xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><mrrf xmlns="http://web.cbr.ru/"><fromDate>'
  + request.body.From + ':00' + '</fromDate><ToDate>'+ request.body.To + ':00' + '</ToDate></mrrf></Body></Envelope>';
  //str = '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/"><Body xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><mrrf xmlns="http://web.cbr.ru/"><fromDate>2017-01-01T00:00:00</fromDate><ToDate>2017-12-31T00:00:00</ToDate></mrrf></Body></Envelope>';

 //console.log(str);
    //console.log(request.body.From);
    //console.log(request.body.To);
   var userName = os.userInfo().username;
   var result = "";
  //var rt = JSON.stringify(cbrfdata.getMessage("1", parseString));
  var BasicHttpBinding =  require('wcf.js').BasicHttpBinding
    , Proxy = require('wcf.js').Proxy
    , binding = new BasicHttpBinding()
    , proxy = new Proxy(binding, "http://www.cbr.ru/DailyInfoWebServ/DailyInfo.asmx")
    , message = str;//'<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/"><Body xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><mrrf xmlns="http://web.cbr.ru/"><fromDate>2017-01-01T00:00:00</fromDate><ToDate>2017-12-31T00:00:00</ToDate></mrrf></Body></Envelope>'

     var rex = response;

     proxy.send(message, "http://web.cbr.ru/mrrf", function(response, ctx) {
              var result =soap(response, rex);
              });
});

function soap(response, rex){
  var rt;
parseString(response, function(err, result){

    if(err){
      rex.send({msag:'Нет данных за выбранный период.'});
      return;
    };

   rt = JSON.stringify(result['soap:Envelope']['soap:Body']);
   var par = JSON.parse(rt);
   var obj = par[0]['mrrfResponse'];
   var count = obj[0]['mrrfResult'][0]['diffgr:diffgram'][0]['mmrf'][0]['mr'].length;
   var temps = obj[0]['mrrfResult'][0]['diffgr:diffgram'][0]['mmrf'][0]['mr'];


   cbrfdata.getMessage(temps, "mrrf");
   rex.send(String(temps.length));

});};


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
