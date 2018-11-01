var express = require('express');


var route = express.Router();

route.use('/',function(req,res){
  res.send('这是teacher的请求')
});

route.get


module.exports = route;