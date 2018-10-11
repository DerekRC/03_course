var express = require("express");
var mongoClient = require('mongodb').MongoClient;
var app=express();
app.listen(4000);


app.set('view engine','ejs');


app.get('/',function(req,res){
 //查询数据库获取数据
  var url = "mongodb://localhost:27017";
mongoClient.connect(url,{useNewUrlParser:true},function(err,client){
  if(err){
    console.log(err);
    res.send('链接数据库失败')
    return;
  }
  //连接成功，保存数据
  var coll=client.db("web1807").collection("stu");
  coll.find({}).toArray(function(err,docs){
    if(err){
      console.log(err);
      res.send('查询失败');
    }else{
      //返回视图页面
      res.render('show',{stus:docs});
      console.log(docs);
      
    }
    //关闭连接
   client.close();
  })
})
  
});