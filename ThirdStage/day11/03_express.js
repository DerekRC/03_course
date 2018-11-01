//1. 引入 express 模块
var express = require('express');
//2.创建app应用对象
var app = express();
//3.监听端口
app.listen(4000);

//设置视图模版引擎
//默认引擎是jade，但是jade语法不习惯
app.set("view engine","ejs");
//展示03.js视图模版的内容
app.get("/show",function(req,res){
  var data = {msg:"来自服务器的信息"};
  //将数据发送给视图
  res.render("03",data);
});

//处理具体的请求
app.get("./",function(req,res){
  res.end('message from app');
});

// app.get("./a",function(req,res){
//   res.end('处理了 /a 请求');
// });

// app.get("/b",function(req,res){
//   res.send('处理了 /b 请求');
// });