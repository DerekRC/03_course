//路由文件
var express = require('express');


//创建路由对象
var route = express.Router();

//使用路由处理请求
route.get('/',function(req,res){
  res.send('这是student的/请求');
});


route.get('/a',function(req,res){
  res.send('这是student/a请求');
});

route.get('/b',function(req,res){
  res.send('这是student/b请求')
});


//暴露路由对象
module.exports = route;





