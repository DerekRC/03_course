// //引入加密模块
// var crypto = require('crypto');

// //定义一个密码123
// var pwd = '123';
// //	ICy5YqxZB1uWSwcVLSNLcA==
// pwd += "lksdhgasdgfaedfgaerklghadsjgfael;kfjklasdfkjsadfgbzsdmhnfakle";
// //加密
// var str = crypto.createHash('MD5').update(pwd).digest('base64');

// str = crypto.createHash('MD5').update(str).digest('base64');

// console.log(str);





var md5 = require('./md5/index.js');
// var pwd = '123';
// var str = md5.MD5(pwd);
// console.log(str);
// 封装模块做法
var fs = require('fs');
//提取文件的校验码(day19.txt)
fs.readFile('./day19.txt',function(err,data){
  if(err){  
    console.log(err);
  }else{
    var str = data.toString();//将data转换为string类型
    //获取MD5码
    var digest = md5MD5(str);
    console.log(digest);
  }
})











