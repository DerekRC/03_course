//服务器启动文件
var express = require('express');
var route = require('./scripts/route.js');//引用路由
var bdParser = require('body-parser');
var app = express();
app.listen(4000);

//设置视图模板引擎
app.set('view engine','ejs');
//设置根目录
app.use(express.static('./public'));
app.use(express.static('./uploads')); 

//设置消息头 application/x-www-form-urlencoded
app.use(bdParser.urlencoded({extendrd:true}));

//处理 / 请求,显示首页内容
app.get('/',route.showIndex);

//处理 /toUpload请求,跳转到上传图片的表单页面
app.get('/toUpload',route.toUpload);

//处理post的 /doUpload请求,处理图片上传
app.post('/doUpload',route.doUpload);

//处理get方式请求，跳转到新建文件夹的页面
app.get('/newDir',route.newDir);

//处理post方式的/newDir请求，新建相册
app.post('/newDir',route.doCreate);

//处理get的/del请求，删除相册
app.get('/del',route.del);

//处理 /show/* 的请求,显示某个文件夹中的图片
app.get('/show/:dirName',route.showPics);



