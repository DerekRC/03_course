//引入Student类
var Stu = require("./Student.js");

//创建对象
var s1 = new Stu("张三",23);
console.log("属性："+s1.name+","+s1.age);
s1.study();
s1.sayHi();


