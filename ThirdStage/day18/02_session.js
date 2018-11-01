var express = require('express');
var session = require('express-session');
var app = express();

app.listen(4000);

app.use(session({
  secret: 'keyboard cat',//通过字符串获取一个hash值，用于生产一个sessionID
  resave: false,
  //是否强制自动保存，计时数据在请求期间没有被修改
  saveUninitialized:true,
  //强制保存为初始化的session
}));

app.get('/',function(req,res){
  res.send('index');
})

//设置session
app.get('/setSession',function(req,res){
  //session是用过req来设置的
  req.session.username = 'zhangsan';
  res.end();
});

//获取session
app.get('/getSession',function(req,res){
  //session是通过req来获取的
  var username = req.session.username;
  var age = req.session.age;//查看未设置的值
  console.log(username,age);
  res.end();
});
