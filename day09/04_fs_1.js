var fs = require("fs");

var start = new Date();
// console.log(1)
fs.readFile("./day09.txt", "utf-8", function (err, data) {
  // console.log(2)
  if (err) {
    console.log(err); //出错了
  } else {
    console.log(data); //没出错
  }
});
// console.log(3)
// 同步的读取文件
var result = fs.readFileSync("./day09.txt");
var end = new Date();

console.log("程序执行一共花了" + (end - start) + "ms");