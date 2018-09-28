var http = require('http');
var fs = require('fs');
var server = http.createServer(function (req, res) {
  res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
  if (req.url == '/favicon.ico') {
    return;
  };

  if(req.url=="/circle"){
    //读取圆形页面
    fs.readFile("y.html",function(err,data){
      if(err){
        res.end("读取出错");
      }else{//读取整除，返回数据
        console.log(data);
        res.end(data);
      }
    });
  }else if(req.url=="/square"){
    //读取方形页面
    fs.readFile("f.html",function(err,data){
      if(err){
        res.end("读取出错");
      }else{//读取整除，返回数据
        res.end(data);
      }
    });
  }
  else{
    res.end("地址错误");
  }
});
server.listen(4000, 'localhost');
//  练习：
//  1.新建2个页面，分别显示红圆形与蓝方形
//  2.新建js文件，编写服务器内容
//  3.打开浏览器，输入地址
//    localhost：4000/circle 显示圆形页面
//    localhost：4000/square 显示方形页面
//    其他地址显示地址错误