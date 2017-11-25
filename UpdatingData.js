var mongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/datacb";
var fs = require('fs');

//точка входа в расширяющий файл
module.exports.getMessage = function(){
var path = "E:/mongoDbTest/temp/toData.txt";

if(fs.existsSync(path)){
  fs.readFile(path, function(err, content){
    if(err){
      console.log(err + " 1217");
    }

    var data = JSON.parse(String(content));
    var d = new Date(data["date"]);
    var date = new Date();

    if(d.getDate() != date.getDate()){
     createRequer();

      fs.writeFile(path, JSON.stringify(data), function(err){ if(err)  console.log(err);});
    }
    else {
      createRequer();
    }
  });
} else {
  var date = new Date();
  fs.writeFile(path, String(date), function(err){
    if(err){
        console.log(err);
    }
  });
}

};

function getData(){

};


function createRequer(){

  var date = new Date();
  var day = date.getDate();
  var fromMonth = date.getMonth();
  var toMonth = fromMonth + 1;
  var year = date.getYear() + 1900;

   var str = '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/"><Body xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><mrrf xmlns="http://web.cbr.ru/"><fromDate>'
  + year + '-' + fromMonth+ '-' + day +  'T00:00:00' + '</fromDate><ToDate>'+ year + '-' + toMonth+ '-' + day +  'T00:00:00' + '</ToDate></mrrf></Body></Envelope>';

  var BasicHttpBinding =  require('wcf.js').BasicHttpBinding
    , Proxy = require('wcf.js').Proxy
    , binding = new BasicHttpBinding()
    , proxy = new Proxy(binding, "http://www.cbr.ru/DailyInfoWebServ/DailyInfo.asmx")
    , message = str;
     //var rex = response;

     proxy.send(message, "http://web.cbr.ru/mrrf", function(response, ctx) {
              //var result =soap(response, rex);
              });
};

function soap(response, rex){
  console.log(rex);
}


function convrtStrinByte(str){
  var myBuffer = [];
  var buffer = new Buffer(str, 'utf16le');
  for (var i = 0; i < buffer.length; i++) {
      myBuffer.push(buffer[i]);
}
console.log(myBuffer);
};
