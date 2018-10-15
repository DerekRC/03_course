var express = require('express');
var bdParser = require('body-parser');
var fd = require('formidable');
var fs = require('fs');
var sd = require('silly-datetime');

var app = express();
app.listen(4000);

app.set('view engine','ejs');

app.use(express.static('./public'));
app.use(express.static('./uploads'));

app.use(bdParser.urlencoded({extended:true}));

app.get('/',function(req,res){
  //file读取uploads文件夹下面的所有文件夹，route然后将其发送给index页面   files文件
  fs.readdir('./uploads',function(err,files){
    if(err){
      console.log(err);
      res.send('读取出错');
      return;
    }
    //读取，将files发送给index
    res.render('index',{dirs:files});
  })
});

//跳转到上传页面
app.get('/toUpload',function(req,res){
  // res.render('upload');  //出错了  需要传递数据
  //读取现有哪些文件夹，将其传递给上传页面供其选择
  fs.readdir('./uploads',function(err,files){
    if(err){
      console.log(err);
      res.send('读取出错');
      return;
    }
    //读取，将files发送给index
    res.render('upload',{dirs:files});
  });
});

//处理上传图片
app.post('/doUpload',function(req,res){
  //获取表单对象
  var form = new fd.IncomingForm();
  //设置上传文件的保存路径
  form.uploadDir = './';
  //解析请求
  form.parse(req,function(err,fields,files){
      // console.log(err);
      // console.log(fields);
      // console.log(files);
      // res.end();
      //获取上传的文件夹名称
      var dirName = fields.dirName;
      //获取文件对象
      var pic = files.pic;
      //通过文件对象获取 文件路径(oldPath),原名称(name)
      var oldPath = pic.path;
      var name = pic.name;
      var arr = name.split('.');
      var ext = arr[arr.length-1];
      //新名称
      var newName = sd.format(new Date(),'YYYYMMDDHHmmss')+'.'+ext;
      //新路径
      var newPath = './uploads/'+dirName+'/'+newName;
      console.log(newPath);
      console.log(oldPath);
      //改名字
      fs.rename(oldPath,newPath,function(err){
        res.redirect('/');
      });
  });
});












