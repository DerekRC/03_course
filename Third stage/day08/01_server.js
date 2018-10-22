//1 引入http模块
var http = require("http");

//2 通过http创建服务器
var server = http.createServer(function(req,res){
  //4 编写服务器内容
  // end方法的作用：借宿请求，返回相应
  // res.end("This is my first NodeJs Page!");
  //如果要使用中文，需要先设置消息头
  res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
  res.end("我的第一个nodejs页面!");
  
});

//3 开启服务，监听端口
server.listen(4000,"localhost");















