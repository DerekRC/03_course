var express = require('express');
var app = express();
var db = require('./db/db.js');
var sd = require('silly-datetime');
var bdParser = require('body-parser');
//获取objectid对象
var objiectId = require('mongodb').ObjectId;
var session = require('express-session');


app.listen(4000);


//设置模板引擎
app.set('view engine','ejs');


//设置根目录
app.use(express.static('./public'));


//设置请求解析方式
app.use(bdParser.urlencoded({extended:true}));


//配置session的解析
app.use(session({
  secret:'message',
  resave:false,
  saveUninitialized:true,
  cookie:{maxAge:24*60*60*1000}
}))


//定义常量
const message = 'message';//message集合
const user = 'user';//user集合


//判断用户是否登录，在其他请求处理之前判断
app.use(function(req,res,next){             
  //判断用户是否登录，实际上就是查看session中是否保存的用户的信息
  if(req.session.username||req.url=='/login'//登录请求
  ||req.url=='/regist'){
    //查到了数据，说明已经登陆了，不需要重新登录
    //可以直接进行后续的操作
    next();
  }else{
    //没查到数据，没有登录跳转登录页面
    res.render('login');
  }
});


// 访问 / 请求,跳转到首页
app.get('/',function(req,res){
  // res.render('index');
  //获取登录的用户名
  //用户名在登录成功的时候已经被保存在session中了
  var username = req.session.username;
  // 查询数据库,获取数据库中的数据
  db.findAll(message,function(err,docs){
    if(err){
      console.log(err);
      res.render('error',{errMsg:"查询数据失败"});
    }else{
      // console.log(docs);
      // 查询到结果,将结果返回给index页面
      res.render('index',{msg:docs,username:username});
    }
  })
});


//处理get /tijiao 请求，将数据保存进数据库，同时刷新页面
app.get('/tijiao',function(req,res){
  //获取数据
  var query = req.query;
  // console.log(query);
  // res.end();
  //获取时间戳
  var time= sd.format(new Date(),"YYYY-MM-DD HH:mm:ss");
  query.time = time;
  // console.log(query);
  // res.end();
  //判断username和message是否为空
  /* if(query.username==undefined||query.username.trim()==""){
     res.render('error',{errMsg:"用户名不能为空"});
     return;
  }*/
  //username不再从页面获取。而是从session中获取
  var username = req.session.username;
  //将username加入到query中
  query.username = username;
  //判断message是否为空
  if(query.message==undefined||query.message.trim()==""){
    res.render('error',{errMsg:"留言不能为空"});
    return;
  }
  //将数据保存进数据库的message集合中
  db.add(message,query,function(err,result){
    if(err){
      //插入出错，打印错误信息，同时跳转到错误页面
      console.log(err);
      res.render('error',{errMsg:"留言失败"});
    }else{
      //留言成功，刷新首页
      res.redirect('/');
    }
  })
})


//处理get的删除请求 /delete 删除某一条留言数据
app.get('/delete',function(req,res){
  //获取参数id
  var id = req.query.id;
  console.log(id);
  // res.end();
  //必须是objectId类型，下面是字符串拼接出来的字符串，不是objectId
  // id='ObjectId("'+id+'")';
  //将id转换为ObjectId类型
  id = objiectId(id);
  //将id改写成json格式的数据，作为删除数据的条件
  var filter = {_id:id};
  console.log(filter);
  db.del(message,filter,function(err,result){
    // res.end();
    if(err){
      res.render('error',{errMsg:"删除数据失败"});
    }else{// 删除成功
      res.redirect('/');
    }
  })
})


//处理get的修改请求 /update/... 跳转到修改留言页面
app.get('/update/:id',function(req,res){
  //获取参数
  var id = req.params.id;
  //根据id去数据库查询到对应的一条数据
  id = objiectId(id);//将字符串id转换为 objiectId类型
  //查询对应的数据
  db.find(message,{_id:id},function(err,docs){
    if(err){
      res.render('error',{errMsg:"查询数据失败"});
    }else{
      // 查询成功
     if(docs.length==0){
       //没有查到数据
       res.render('error',{errMsg:"查无此留言"});
       return;
     }else{
       //查到了数据，取第一个元素，返回给次改页面
       res.render('update',{msg:docs[0]});
     }
    }
  })
})


//处理post的修改请求 /update 修改留言，刷新首页
app.post('/update',function(req,res){
  //获取参数
  var id = req.body.id;
  var msg = req.body.message;
  // 判断msg是否有值
  if(msg==undefined||msg.trim()==""){
    //也可以直接跳转到首页，不去数据库进行修改
    //res.redirect('/');
    res.render('error',{errMsg:"留言不能为空"});
    return;
  }
  // console.log(id);
  // console.log(message);
  // res.end();
  id = objiectId(id);
   //修改的条件
  var filter = {_id:id};
  var time= sd.format(new Date(),"YYYY-MM-DD HH:mm:ss");
  //修改的数据
  var data = {message:msg,time:time};
  console.log(msg);
  
  //调用修改数据的方法
  db.modify(message,filter,data,function(err,result){
    if(err){
      console.log(err);
      res.render('error',{errMsg:"修改数据失败"});
    }else{
      //修改成功
      res.redirect('/');
    }
  })
})


//处理post的 /login登录请求
app.post('/login',function(req,res){
  //获取请求参数
  var username = req.body.username;
  var password = req.body.password;
  //设置查询用户信息的条件
  var filter = {username:username,password:password};
  //链接数据库开始查询
  db.find(user,filter,function(err,docs){
    if(err){
      console.log(err);
      res.render('error',{errMsg:"登录失败"});
      return;
    }
    if(docs.length==0){
      //没有查到数据
      res.render('error',{errMsg:"用户名或密码错误"});
    }else{
      //查到数据,说明登录成功
      //保存登录状态
      req.session.username = username;
      //跳转到首页
      res.redirect('/');
    }
  });
  
  
})


//处理get /regist请求，跳转注册页面
app.get('/regist',function(req,res){
  res.render('regist');
})


//处理post /regist请求，注册用户信息
app.post('/regist',function(req,res){
  //获取参数
  var username = req.body.username;
  var password = req.body.password;
  //判断用户名密码是否为空
  if(username==undefined||password.trim()==""){
    res.render('error',{errMsg:"用户名不能为空"});
    return;
  }
  if(password==undefined||password.trim()==""){
    res.render('error',{errMsg:"密码不能为空"});
    return;
  }
  //判断用户名是否被占用
  db.find(user,{username:username},function(err,docs){
    if(err){
      console.log(err);
      res.render('error',{errMsg:"网络出错"});
      return;
    }
    if(docs.length>0){
      //说明查到了数据，用户名已经被占用
      res.render('error',{errMsg:"用户名已经被占用"});
    }else{
      //docs长度为0 ，空数组，没数据。用户名可以用
      //将用户名和密码保存进数据库
      var data = {username:username,password:password};
      db.add(user,data,function(err,docs){
        if(err){
          console.log(err);
          res.render('error',{errMsg:"网络出错"});
          return;
        }
        //保存成功
        //1）直接跳转到登录页面，用户重新输入用户名和密码登录
        //res.redirect('/');
        //2）不需要用户重新输入用户名和密码
        //注册成功后，系统自动登录、
        req.session.username = username;
        res.redirect('/');
      })
    }
  })
})