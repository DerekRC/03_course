var mongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";
var dbName = "web18807";
var collection = "stu";

mongoClient.connect(url,function(err,client){
  if(err){
    console.log(err);
    return;
  }
  var db = client.db(dbName);
  var coll = db.collection(collection);
   
  // coll.insertOne({id:108,name:"jjj",age:100},function(err,result){
  //   if(err){
  //     console.log(err);
  //     return;
  //   }
  
  //   console.log(result);
  //   client.close();
  // })

  // coll.remove({id:108},function(err,result){
  //   if(err){
  //     console.log(err);
  //     return;
  //   }
  //   console.log(result);
  //   client.close();
  // })

  // coll.updateOne({id:108},{$set:{age:2000}},function(err,result){
  //   if(err){
  //     console.log(err);
  //     return;
  //   }
  //   console.log(result);
  //   client.close();
  // })

  coll.find({id:108}).toArray(function(err,docs){
    if(err){
      console.log(err);
      return;
    }
    console.log(docs);
    client.close();
  })
});
