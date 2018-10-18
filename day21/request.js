//发送请求
var request =require('request');


request('http://www.baidu.com',function(err,res,body){
  console.log(err);
  console.log('-------');
  console.log(res);
  console.log('-------------');
  console.log(body);
})




