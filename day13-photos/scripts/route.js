//路由文件,处理各种请求的逻辑,如果涉及到数据,找专门处理数据的模块
var file = require('./file.js');//引入处理数据的模块
var fd = require('formidable');
var sd = require('silly-datetime');

//展示首页
exports.showIndex = function(req,res){
  // res.render('index');
  // 显示首页,将uploads中的所有文件夹显示在页面上
  // 这就需要读取uploads中的内容
  // var dirs = file.getDirs();//获取数据
  // console.log(dirs);
  // res.render('index',{dirs:dirs});
  file.getDirs(function(err,files){
    if(err){
      console.log(err);
      //返回信息,出错了
      res.send('读取目录失败,稍后再试');
    }else{
      // 返回正确结果
      res.render('index',{dirs:files});
    }
  });
}

//显示某个文件夹中的图片
exports.showPics = function(req,res){
  // 获取参数:被点击的文件夹名称
  var dirName = req.params.dirName;
  // res.send(dirName);
  file.getPics(dirName,function(err,files){
    if(err){
      console.log(err);
      res.send('读取图片出错,稍后再试');
    }else{
      //成功读取到图片,将其展示在页面上
      // res.send(files);
      // 将数据传递给show视图
      // pics:读取到的所有将要展示的图片
      // dirName: 图片所在的文件夹
      res.render('show',{pics:files,dirName:dirName});
    }
  });
}

//跳转到上传图片的页面
exports.toUpload = function(req,res){
  // 跳转上传页面,需要知道上传到哪个文件夹中去,
  // 这就需要将现有的文件夹传递给上传页面
  file.getDirs(function(err,files){
    res.render('upload',{dirs:files});
  });
}

//处理 post的/doUpload请求,上传图片操作
exports.doUpload = function(req,res){
  // 解析请求,获取上传的数据(上传的路径,即文件夹名称,上传的图片)
  var form = new fd.IncomingForm();
  // 设置上传路径(作为一个临时保存的路径)
  form.uploadDir = "./";
  // 解析req,获取数据
  form.parse(req,function(err,fileds,files){
    if(err){
      console.log(err);
      res.send('上传失败,稍后再试');
    }else{
      // console.log(fileds);
      // console.log(files);
      //获取上传的文件夹名称
      var dirName = fileds.dirName;
      //获取文件夹的path与name
      var oldPath = files.pic.path;
      var name = files.pic.name;
      var arr = name.split(".");
      var ext = arr[arr.length-1];// 后缀名
      var time = sd.format(new Date(),'YYYYMMDDHHmmss');
      var newPath = './uploads/'+dirName+'/'+time+'.'+ext;
      file.save(oldPath,newPath,function(err){
        if(err){
          console.log(err);
          res.send('重命名失败');
        }else{
          res.redirect("/show/"+dirName);
        }
      });
    }
  });
}



// 跳转到新建相册的页面
exports.newDir = function(req,res){
  res.render('newDir');

}

//新建相册
exports.doCreate = function(req,res){
  // console.log(req.body);
  var dirName = req.body.dirName;//获取文件夹名称
  file.createDir(dirName,function(err){
    if(err){
      console.log(err);
      res.send('创建相册失败');
    }else{
      //创建成功，跳转到首页
      res.redirect('/');
    }
  })
  // res.end();
}

//删除相册
exports.del = function(req,res){
  //获取参数：将要删除的问价名称
  var dirName = req.query.dirName;
  //将文件夹的路径补充完整
  dirName = './uploads/'+dirName;
  file.del(dirName,function(err){
    if(err){
      console.log(err);
      res.send('删除失败')
    }else{
      res.redirect('/');
    }
  })
}