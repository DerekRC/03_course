var http = require('http')
var fs = require('fs');
var fd = require('formidable');
var sd = require('silly-datetime');

http.createServer(function (req, res) {
  if (req.url == '/favicon.ico') {
    return;
  }
  if (req.url == '/') {
    //读取表单页面
    fs.readFile('./01_form.html', function (err, data) {
      if (err) {
        console.log(err);
        res.end("页面加载错误");

      }
      res.end(data);
    })
  }else if(req.url=="/tijiao"&&req.method.toLowerCase()=='post'){
    var form = new fd.IncomingForm();
    //设置上传文件保存的路径
    form.uploadDir = "./uploads"
    form.parse(req,function(err,fields,files){
      console.log(11);
      res.end('aa');
      //对文件改名
      //获取旧路径
      var oldPath = files.pic.path;
      //设置新路径
      var oldName = files.pic.name;//获取名称
      var arr = oldName.split(".");
      var ext = arr[arr.length-1];//获取后缀名
      //设置名称
      var name = sd.format(new Date(),"YYYYMMDDHHmmss");
      //上传文件的新名称
      var newName = name+"."+ext;
      //新路径
      var newPath = "./uploads/"+newName;

      fs.rename(oldPath,newPath,function(err){
        if(err){
          console.log(err);
          res.end('重命名失败');
          return;
        }
        res.end('error');
      });
    })
  }else{
   
  }
}).listen(4000, 'localhost');