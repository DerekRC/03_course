//1 引入ejs模块
var ejs = require('ejs');

//创建一个模版
var str = "今天开始学习<%= msg %>";

//模拟一个填充的数据
//数据必须是k-v的json对象，其中key在模版中被调用
var data = {msg:"ejs"};

//将数据填充到模版中
//返回值为一个完整的视图
var html = ejs.render(str,data);

console.log(html);