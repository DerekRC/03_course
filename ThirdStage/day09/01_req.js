var http = require("http");

var server = http.createServer(function(req,res){
  if(req.url== "/favicon.ico"){
    //如果请求时/favicon.ico，直接返回，不处理
    return;
  }
  // console.log(req);
  console.log(req.url);
  /*
    req.url可以获取请求路径与参数，不能获取锚点
    获取到的值是一个url格式的字符串
  */ 
  //res.end()  结束请求 不需要向页面发送任何数据 
  // 通常用于测试
  res.end();
});

server.listen(4000,"127.0.0.1");