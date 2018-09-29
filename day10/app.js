var route = require("./route.js");

var http = require('http');

http.createServer(function(req,res){
  if(req.url == 'favicon.ico'){
    return;
  }
  res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
  if(req.url == '/'){
    route.showIndex(req,res);
  }else if(req.url=='/info'){
    route.showInfo(req,res);
  }else{
    route.showError(req,res);
  }
}).listen(4000,'localhost');







