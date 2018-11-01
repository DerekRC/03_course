var express = require('express');
var bdParser = require('body-parser');
var cookieParser = require('cookie-parser');//引入模块
var app = express();
app.listen(4000);

app.set('view engine','ejs');

//设置cookie解析方式
app.use(cookieParser());

app.get('/',function(req,res){
  //查询cookie中是否有登录信息
  var cookies = req.cookies;
  //判断cookie中有没有登录的信息(登录的用户名)
  if(cookies.username){
    //说明已经登录了
    res.send('欢迎你'+cookies.username);
  }else{
    res.render('welcome.ejs');
  }
});


app.get('/denglu',function(req,res){
  var username = req.query.username;
  var password = req.query.password;
  if(username=="xxx"||password=="123"){
    //用户密码正确
    //跳转到登录成功页面之前，先保存登录状态
    res.cookie('username',username);
    res.cookie('password',password);
    res.send('欢迎你'+cookies.username)
  }else{
    res.send('登录错误');
  }
})
