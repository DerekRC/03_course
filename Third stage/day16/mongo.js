var express = require('express');
var bdParser = require('body-parser');
var mongoClient = require('mongodb').MongoClient;
var db = require('../day15/db/db.js');
var app = express();
app.listen(4000);

app.set('view engine','ejs');


//设置消息头 application/x-www-form-urlencoded
app.use(bdParser.urlencoded({extended:true}));

app.get('/',function(req,res){
  db.findAll("message",function(err,docs){
  if(err){
    console.log(err);
  }else{
    res.render('show',{msg:docs});
    console.log(docs);
  }
});
});

//连接数据库
app.post('/tijiao',function(req,res){
  var name = req.body.username;
  var txt = req.body.message;

  var json1 = {name:name,txt:txt};
  console.log(json1);

  var url = "mongodb://localhost:27017";
  mongoClient.connect(url,function(err,client){
    if(err){
      console.log(err);
      res.send('连接服务器失败');
      return;
    }
    var coll = client.db("message").collection('message');
    coll.insertOne(json1,function(err,result){
      if(err){
        console.log(err);
        res.send('注册失败');
      }else{
        res.redirect('/');
      }
      client.close();
    });


  })
});

