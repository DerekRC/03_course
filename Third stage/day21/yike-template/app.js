var express = require('express');
var app = express();

app.listen(4000);


app.set('view engine','ejs');

//设置根目录
app.use(express.static('./public'));
app.use(express.static('./scripts'));

//处理 /请求 显示首页
app.get('/',function(req,res){
  res.render('index');
});

//处理angular路由发送的/index请求
app.get('/index',function(req,res){
  res.render('test');
});


