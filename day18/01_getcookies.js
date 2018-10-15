var express = require('express');
var cookieParser = require('cookie-parser');//引入模块
var app = express();
app.listen(4000);

//设置cookie解析方式
app.use(cookieParser());

app.get('/',function(req,res){
  res.send('这是首页');
});

//设置cookie
app.get('/setCookie',function(req,res){
  //设置2个cookie，username，password
  res.cookie('username','zhangsan');
  res.cookie('password','123123');
  res.send('设置cookie成功');
});

//获取cookie
app.get('/getCookie',function(req,res){
  console.log(req.cookies);
  res.send('获取成功');
})



