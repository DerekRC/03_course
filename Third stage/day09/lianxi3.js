var fs = require("fs");
var wenjian = "";
var wenjianjia = "";
fs.readdir("./a",function(err,files){
  if(err){
    console.log(err);
    return;
  }
  console.log(files);
  //递归
  (function a(i){
    //先判断递归结束的条件
   if(i==files.length){//当i与数组长度一样，说明遍历结束了
    console.log("文件有："+wenjian);
    console.log("文件夹有："+wenjianjia);
    return;
   }
   //遍历没有结束  检查判断每一个元素的状态
   fs.stat("./a/"+files[i],function(err,stats){
     if(err){
      console.log(err);
      return;
     }
     if(stats.isFile()){
       wenjian+= files[i]+" ";
       console.log(files[i]+"是一个文件");
     }else{
       console.log(files[i]+"是一个文件夹");
       wenjianjia+=files[i]+" ";
     }
     a(++i);
   });
  })(0)
});
