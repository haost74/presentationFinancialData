
var mongoClient = require("mongodb").MongoClient;

var url = "mongodb://localhost:27017/datacb";

//точка входа в расширяющий файл
module.exports.getMessage = function(data, nameRequest){
    if(data.length == 0){  return;  };

      mongoClient.connect(url, function(err, db){

        parseData(data, db);
        console.log("end");
        db.close();
      });
};

//разбирает полученные данные и создает объект для сохранения в базу данных
//сохраняет объект в mongodn
function parseData(data, db){
  for(var i = 0; i < data.length; ++i){

    var nameParaneters = Object.getOwnPropertyNames(data[i]);
    var date = data[i][nameParaneters[1]][0];
    var mass = [
      data[i][nameParaneters[2]][0],
      data[i][nameParaneters[3]][0],
      data[i][nameParaneters[4]][0],
      data[i][nameParaneters[5]][0],
      data[i][nameParaneters[6]][0],
      data[i][nameParaneters[7]][0]
    ];

    for(var k = 0; k < mass.length; k++){
      var item = {"date": date, "value":  mass[k]};

      var nameCollection;

      switch (k) {
        case 0:
          nameCollection = "InternationalReserves";
        break;
        case 1:
          nameCollection = "ForeignExchangeReserves";
        break;
        case 2:
          nameCollection = "ForeignCurrency";
        break;
        case 3:
          nameCollection = "AccountSDR";
        break;
        case 4:
         nameCollection = "StandbyPositionMVF";
        break;
        case 5:
         nameCollection = "MonetaryGold";
        break;
        default:
         nameCollection = "";
      };

      if(nameCollection == "" ) break;

      var collection = db.collection(nameCollection);
      collection.insert(item);
    };
  };
};
