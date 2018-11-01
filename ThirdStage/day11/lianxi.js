var express = require('express');//获取express
var app = express();//创建应用多选
app.listen(4000);//监视端口

app.get('./',function(req,res){
  res.send('这是首页');
});

