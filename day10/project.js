var http = require('http');
var fs = require("fs");
var server = http.createServer(function (req, res) {
  if (req.url == '/favicon.ico') {
    return;
  }
  fs.readFile("./project/index.html",function(err,data){
    if(err){
      console.log(err);
    }else{
      console.log(data);
    }
  });
});
server.listen(4000, 'localhost');