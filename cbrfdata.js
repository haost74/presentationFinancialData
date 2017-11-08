
var mongoClient = require("mongodb").MongoClient;

var url = "mongodb://localhost:27017/datacb";

module.exports.getMessage = function(data){

  for(var i = 0; i < data.length; ++i){
    //serData(data[i]);
    console.log(obj[i]["D0"]);
    console.log(obj[i]["p1"]);
    console.log(obj[i]["p2"]);
    console.log(obj[i]["p3"]);
    console.log(obj[i]["p4"]);
    console.log(obj[i]["p5"]);
    console.log(obj[i]["p6"]);
    return;
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
