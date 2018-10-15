var express = require('express');
var session = require('express-session');
var app = express();

app.listen(4000);

app.use(session({
  secret:'abc',
  resave:false,
  saveUninitialized:true,
  cookie:{maxAge:(365*24*60*60*1000)*500},
}));


app.get('/',function(req,res){
  if(req.session.username){
    //找到了登录信息,已经登录
    res.send('欢迎你'+req.session.username+'<a href="/denglu">退出登录</a>');
  }else{
    //没有找到登录信息
    res.render('welcome.ejs');
  }
});
  

//获取session
app.get('/denglu',function(req,res){
  //session是通过req来获取的
  var username = req.query.username;
  var password = req.query.password;
  if(username=='勇士'&&password=='qqq'){
    req.session.username = username;
    //跳转页面
    res.send('你好：'+username+' 我是你赛丽亚，欢迎来到阿拉德大陆'+'<a href="/denglu">退出登录</a>');
  }else{
    res.send('用户名或密码错误');
  }
});

//处理/denglu请求，退出登录
app.get('/denglu',function(req,res){
  //删除session
  req.session.destroy(function(err){
    if(err){
      res.send('退出失败');
    }else{
      res.redirect('/denglu');
    }
  });
});











