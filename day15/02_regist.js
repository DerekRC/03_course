var express = require('express');
var bdParser = require('body-parser');
var mongoClient = require('mongodb').MongoClient;
var app = express();
app.listen(4000);

app.set('view engine','ejs');
app.get('/',function(req,res){
  res.render('regist');
})
//设置请求解析的方式 application/x-www-form-urlencoded
app.use(bdParser.urlencoded({extendrd:true}));



//处理post发送的请求
app.post('/regist',function(req,res){
  //获取请求参数
  var params = req.body;
  // console.log(params);
  var username = params.username;//获取用户名
  var pwd = params.password;//获取密码

  //将需要保存进数据库的数据组合成一个新的json对象
  var json = {name:username,pwd:pwd};
  //连接数据库 保存数据
  //数据库地址
  var url = "mongodb://localhost:27017";
  mongoClient.connect(url,function(err,client){
    if(err){
      console.log(err);
      res.send('连接服务器失败');
      return;
    }
    //连接成功,保存数据
    var coll = client.db("web1807").collection("student");
    coll.insertOne(json,function(err,result){
      if(err){
        console.log(err);
        res.send('注册失败');
      }else{
        res.send('注册成功');
      }
      //关闭连接
      client.close();
    });
  })


  // res.end();
});