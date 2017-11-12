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

      

      data["date"] = date;
      console.log(date);
      fs.writeFile(path, JSON.stringify(data), function(err){ if(err)  console.log(err);});
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
