var parseString = require('xml2js').parseString;

module.exports.getMessage = function(flag, data){

  var BasicHttpBinding =  require('wcf.js').BasicHttpBinding
    , Proxy = require('wcf.js').Proxy
    , binding = new BasicHttpBinding()
    , proxy = new Proxy(binding, "http://www.cbr.ru/DailyInfoWebServ/DailyInfo.asmx")
    , message = '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/"><Body xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><mrrf xmlns="http://web.cbr.ru/"><fromDate>2017-01-01T00:00:00</fromDate><ToDate>2017-12-31T00:00:00</ToDate></mrrf></Body></Envelope>'


     proxy.send(message, "http://web.cbr.ru/mrrf", function(response, ctx) {
              return soap(response, parseString);
              });
}
 function soap(response){
   var rt = "{n:10}";
 parseString(response, function(err, result){
    rt = JSON.stringify(result['soap:Envelope']['soap:Body']);
 });



 return rt;

}
