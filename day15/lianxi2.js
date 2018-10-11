var express = require('express');
var bdParser = require('body-parser');
var mongoClient = require('mongodb').MongoClient;
var app = express();
app.listen(4000);


app.set('view engine','ejs');
//设置请求解析方式
app.use(bdParser.urlencoded({extended:true}));




app.get('/',function(req,res){
  res.render("login");
});


app.post('/login',function(req,res){
  //获取请求参数
var name = req.body.username;//获取用户名
  var pwd = req.body.password;//获取密码
//将需要保存进数据库的数据组合成一个新的json对象
var json1 = {name1:name,pwd1:pwd};
console.log(json1);
//连接数据库，保存数据
//数据库地址
var url = "mongodb://localhost:27017";
mongoClient.connect(url,{useNewUrlParser:true},function(err,client){
  if(err){
    console.log(err);
    res.send('链接服务器失败')
    return;
  }
  //连接成功，保存数据
  var coll=client.db("web1807").collection("stu");
  coll.find(json1).toArray(function(err,docs){
    if(err){
      console.log(err);
      res.send('登录失败');
    }else{
      if(docs.length>0){
        res.send('登录成功'); 
      }else{
        res.send('登录失败，用户名或密码错误');
      }
     
    }
    //关闭连接
    client.close();
  })
})
})