//1 引入模块 获取mongo客户端对象
var mongoClient = require('mongodb').MongoClient;
//2 定义mongo服务器的地址
var url = "mongodb://localhost:27017";
//3 数据库名称
var dbName = "web1807";
//4 集合名称
var collection = "student";

//开始连接服务器
mongoClient.connect(url,function(err,client){
  if(err){
    console.log(err);
    return;
  }
  //没有出错，连接成功
  //通过client获取数据库
  var db = client.db(dbName);
  //获取集合
  var coll = db.collection(collection);
  //向集合中插入数据
  // coll.insertOne({id:106,name:"张小三",age:23},function(err,result){
  //   if(err){
  //     console.log(err);
  //     return;
  //   }
  //   //插入成功
  //   console.log(result);
   
  //   //关闭连接
  //   client.close();
  // });

  //删除集合中的某个数据
  coll.remove({id:106},function(err,result){
    if(err){
      console.log(err);
      return;
    }
    console.log(result);
    //关闭连接
    client.close();
  })

});





