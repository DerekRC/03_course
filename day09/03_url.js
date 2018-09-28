var http = require('http');
var url = require("url");//引入url模块
var server = http.createServer(function (req, res) {
  if (req.url == '/favicon.ico') {
    return;
  }
  //获取请求地址(包括请求路径与请求参数)
  var urlStr = req.url;
  //使用url模块调用其parse方法，来转换urlStr字符串
  var urlObj = url.parse(urlStr,true);
  //第二个参数默认是false
  /*
    如果不写或者false，则表示解析出来的url对象中的query属性为未解析未解码的字符串
    第二个参数为true时，则会将query属性解析为一个对象，方便我们调用其中参数的属性值
  */
  console.log("urlStr",urlStr);
  console.log("============");
  console.log("urlObj",urlObj);


  //结束请求
  res.end();
});
server.listen(4000, 'localhost');