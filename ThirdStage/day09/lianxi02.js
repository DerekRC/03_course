var http = require('http');
var fs = require('fs');
var url = require("url");  
var server = http.createServer(function (req, res) {

  if (req.url == '/favicon.ico') {
    return;
  }
  res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
  //调用url模块的parse方法，转换req.url字符串
  var urlObj = url.parse(req.url,true);
  var pathname = urlObj.pathname;//获取请求路径
  var query = urlObj.query;//获取请求参数
  if(pathname=="/"){
    //显示form页面
    fs.readFile("./form.html",function(err,data){
      if(err){//页面出错
        console.log(err);//打印错误信息
        res.end("加载页面出错");//返回相应
        return;
      }
      res.end(data);//正确结果，返回数据
    });
  }
  else if(pathname=="/tijiao"){//处理/提交的请求
    // console.log(req.url);
    // res.end("成功接收到请求数据");
    var username = query.username;
    var password = query.password;
    console.log(username,password);
    //返回响应
    res.end("用户名:"+username+"密码："+password);
  }else{
    //其他情况不做出来直接返回
    res.end("请求地址出错");
  }
});
server.listen(4000, 'localhost');