var express = require('express');
var app = express();
var session = require('express-session');
app.listen(4000);

//配置session
app.use(session({
  secret:'keybora cat',
  resave:false,
  saveUinitiallsed:true,
  cookie:{maxAge:60000},
}));

var history = [];//保存历史搜索记录

//处理/search请求，每一次都将用户搜索的结果全部显示在页面上
app.get('/search',function(req,res){
  //获取搜索的参数
  var name = req.query.name;
  //获取session中层级保存的history
  var history = req.session.history || [];
  //判断输入的参数是不是undefined或者是空字符串
  //如果是，就不做操作
  //如果不是，就将其添加到历史数组中
  if( !(name==undefined||name.trim()=="")){
    //先判断历史记录中是否已经保存了本次搜索的记录
    history.push(name);
  }
  //将history保存进session
  req.session.history = history;
  //将历史记录显示在页面是
  res.send(history);
});








