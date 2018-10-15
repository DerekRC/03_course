var express = require('express');
var app = express();
app.listen(4000);


app.get('/',function(req,res){
  res.writeHead()
  res.render('<form action="/tijiao">'+'username:<input type="text" name="username">'+'password:<input type="password" name="password">'+'<input type="submit" value="submit">'+'</form>');
});


app.get('/tijiao',function(req,res){
    var name = req.body.username;
    var pwd = req.body.password;
    if(username=="zhangsan"||password=="123"){
      //用户密码正确
      //跳转到登录成功页面之前，先保存登录状态
      res.cookie('username',username);
      res.cookie('password',password);
      res.send('登录成功')
    }else{
      res.send('用户名或密码错误')
    }
})


