
var mongoClient = require("mongodb").MongoClient;

var url = "mongodb://localhost:27017/datacb";

module.exports.getMessage = function(data){

  for(var i = 0; i < data.length; ++i){
    //serData(data[i]);
    console.log(data[i]["D0"][0]);
    console.log(data[i]["p1"][0]);
    console.log(data[i]["p2"][0]);
    console.log(data[i]["p3"][0]);
    console.log(data[i]["p4"][0]);
    console.log(data[i]["p5"][0]);
    console.log(data[i]["p6"][0]);
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
