var fs = require("fs");

//创建目录
fs.mkdir("./a",function(err){
  if(err){
    console.log("创建失败,失败原因:");
    console.log(err);
  }else{
    console.log("创建成工");
  }
});