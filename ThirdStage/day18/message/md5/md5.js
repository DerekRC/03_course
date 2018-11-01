var crypto = require('crypto');

exports.MD5 = function(pwd){
 var str = crypto.createHash('MD5').update(pwd).digest('base64');
 //将第一次加密得到的密文截取一部分
str = str.substr(5,10);
//加密截取的部分密文
str = str = crypto.createHash('MD5').update(str).digest('base64');
return str;
}

