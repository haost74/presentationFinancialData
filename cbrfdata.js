var pString = "";

module.exports.getMessage= function(data, parseString){
  console.log("h1");
  pString = parseString;
  var BasicHttpBinding = require('wcf.js').BasicHttpBinding
    , Proxy = require('wcf.js').Proxy
    , binding = new BasicHttpBinding()
    , proxy = new Proxy(binding, "http://www.cbr.ru/DailyInfoWebServ/DailyInfo.asmx")
    , message = '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/"><Body xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><mrrf xmlns="http://web.cbr.ru/"><fromDate>2017-01-01T00:00:00</fromDate><ToDate>2017-12-31T00:00:00</ToDate></mrrf></Body></Envelope>'

 console.log("h2");
    proxy.send(message, "http://web.cbr.ru/mrrf", function(response, ctx){

      parse(response);

    });
};

function parse(response){
  console.log("h3");
  pString(response, function(er, result){
    var rt = JSON.stringify(result['soap:Envelope']['soap:Body']);
    console.log(rt);
  });
};
