//1 引入http
var http = require("http");
//引入fs模块
var fs = require("fs");
//2
var server = http.createServer(function(req,res){
  //4 
  /*
    因为NodeJs没有根目录，所以无法通过
    localhost：4000/02——root。html来访问该文件中的内容
    可以使用fs模块来实现这个功能
  */
  //使用fs来读取02_root.html的内容，并将读取到数据作为响应内容返回给页面
  fs.readFile("./02_root.html",function(err,data){
    if(err){
      //读取文件出错了
      console.log(err);//打印错误信息
      res.end("read file error!");//结束响应 返回信息
    }else{
      //读取文件成功
      console.log(data.toString());//查看data
      res.end(data);//返回读取的数据
    }
  });
});

//3
server.listen(4000,"localhost");













