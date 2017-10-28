var MongoClient = require("mongodb").MongoClient;

//var user = {name: "Tom_2", age: 45};
//setDataMongodb(user, "users");


function setDataMongodb(obj, nameCollection){
  var mongoClient = require("mongodb").MongoClient;
  mongoClient.connect("mongodb://localhost:27017/CBRFdb", function(app, db){

    var collection = db.collection(nameCollection);
        //var user = {name: "Tom", age: 23};
        collection.insertOne(obj, function(err, result){

            if(err){
                return console.log(err);
            }
            console.log(result.ops);
            db.close();
        });
  });
};