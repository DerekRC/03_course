var app = require('express')();
var request = require('request');

app.listen(4000);


app.get('/',function(req,res){
  // res.send('测试数据');
  request('https://moment.douban.com/api/stream/date/2017-5-11?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&format=full&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6',function(err,response,body){
    res.send(body);
  })
});


