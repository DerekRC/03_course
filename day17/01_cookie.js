var express = require('express');
var app = express();
app.listen(4000);


//访问 /请求，服务器生成cookie发送给浏览器
//浏览器保存cookie
app.get('/',function(req,res){
  //设置cookie
  //属性名为username ， 值为 Jim Green
  res.cookie('username','Jim Green');
  //可以设置多个cookie，但是属性名不能一样
  res.cookie('age','25');
  res.cookie('sex','M');
  //属性名一样，后设置的值会覆盖前面的值
  res.cookie('username','zhangsan');



  res.send('访问/请求');
})