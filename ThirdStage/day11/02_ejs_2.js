//1
var ejs = require('ejs');
//2 创建模版
var str = '这是一个数组：<%= stus[0].name %>';
//3 模拟数组
var data = {names:['jack','rose','lily']};
var stus = {stus:[
                  {name:'zs'},
                  {name:'lisi'},
                  {name:'wangwu'}
]}
//4 填充
var html = ejs.render(str,stus);

console.log(html);