var app = require('express')();
var request = require('request');

app.listen(4000);


app.get('/',function(req,res){
  // res.send('测试数据');
  request('http://www.baidu.com',function(err,response,body){
    res.send(body);
  })
});


