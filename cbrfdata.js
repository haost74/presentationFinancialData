
var mongoClient = require("mongodb").MongoClient;

var url = "mongodb://localhost:27017/CBRFdb";

module.exports.getMessage = function(data){

  for(var i = 0; i < data.length; ++i){
    serData(data[i]);
  }
};

function serData(item){
  mongoClient.connect(url, function(err, db){
    
    db.collection('mrrf').insertOne(item, function(err, result){
      if(err){
        return console.log(err);
      }
      console.log(result.ops);
      db.close();
    });
  });
};

function parseDataMmrf(item){
  var result = "{}"
};
