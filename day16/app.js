var express = require('express');
var bdParser = require('body-parser');
var mongoClient = require('mongodb').MongoClient;
var db = require('./mongo.js');
var app = express();
app.listen(4000);

app.set('view engine','ejs');

app.use(express.static('./public'));
app.use(express.static('./uploads')); 

//设置消息头 application/x-www-form-urlencoded
app.use(bdParser.urlencoded({extended:true}));

app.get('/',function(req,res){
  res.render("index");
});

app.get('/show',function(req,res){
  res.render("show");
});

//连接数据库
app.post('/tijiao',function(req,res){
  var name = req.body.username;
  var pwd = req.body.password;

  var json1 = {name:name,pwd:pwd};
  var json2 = {name:name,txt:txt};
  console.log(json1);

  var url = "mongodb://localhost:27017";
  mongoClient.connect(url,function(err,client){
    if(err){
      console.log(err);
      res.send('连接服务器失败');
      return;
    }
    var coll = client.db("message").collection('message');
    coll.insertOne(json2,function(err,result){
      if(err){
        console.log(err);
        res.send('发送成功');
      }else{
        res.redirect('/show');
      }
      client.close();
    });

    coll.find(json1).toArray(function(err,docs){
      if(err){
        console.log(err);
        res.send('登录失败');
      }else{
        if(docs.length>0){
          res.redirect('/show');
        }
      }
      client.close();
    })
  })
});






