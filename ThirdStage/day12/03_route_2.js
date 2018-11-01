var express = require('express');
var route = require('./03_route_3_tea.js')
var app = express();
app.listen(4000);



app.get('/',function(req,res){
  res.send('这是app的/请求');
});

app.use('/student',route);
app.use('/teacher',route);
// app.use('/teacher',function(req,res){

// });
