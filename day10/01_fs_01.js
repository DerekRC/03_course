var fs = require("fs");

fs.mkdir("./project",function(err){
  if(err){
    console.log(err);
  }
  console.log("c创建成功")
});