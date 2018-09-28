var http = require("http");

var server = http.createServer(function(req,res){
  if(req.url=='/favicon.ico'){
    return;
  }
  res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
  //res.write() 返回数据  但是不结束请求  可以反复使用
  res.write("第一次返回数据");
  res.write("<h1>第二次返回</h1>");
  res.write("<div style='border:1px solid red'>第三次返回</div>");
  //结束请求，并返回数据
  res.end("返回数值");
});

server.listen(4000,"localhost");
