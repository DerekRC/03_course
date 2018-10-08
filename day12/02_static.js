var express = require('express');
var app = express();
app.listen(4000);

//设置视图模版
app.set('view engine','ejs');
//设置根目录
//参数路径相对于当前js文件
app.use(express.static('./pubic'));

app.get('/',function(req,res){
  res.render('02_static');
});



