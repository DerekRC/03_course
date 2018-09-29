var http = require('http');
var fs = require('fs');
var server = http.createServer(function (req, res) {
  if (req.url == '/favicon.ico') {
    return;
  }
  //localhost:4000 打开form页面
  if(req.url=='/'){//读取form页面
    fs.readFile('./05_form.html',function(err,data){
      if(err){//读取出错
        console.log(err);
        res.end("加载页面失败");
        return;
      }
      //读取成功 读取到的数据加载显示在页面上
      res.end(data);
    });
  }
  if(req.url=="/tijiao" && req.method.toLowerCase()=="post"){
    //因为nodejs是单线程非I/O阻塞，为了追求效率，数据是一小段一小段的上传
    //这样就会产生2种状态：正在接收，接收完成
    //提前声明一个变量，用于保存每一次得到的一小段数据
    var allData = "";
    
    //data：表示正在接收书库的状态
    //chunk：表示每次接收到的一小段数据
    //addlistener方法与on方法功能一样
    req.on("data",function(chunk){
      //拼接每次得到的一小段数据
      allData += chunk;
    });
    //end：表示接收完成的状态，当数据全部接收完毕，进入该状态
    req.on("end",function(){
      //进入接收完成状态;说明数据已经接收完毕
      console.log(allData);
      res.end();//返回响应
    });
  }
});
server.listen(4000, 'localhost');