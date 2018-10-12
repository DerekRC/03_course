var db = require('./db.js');

db.find('student',{size:{$lt:5}},function(err,docs){
  console.log(err);
  console.log(docs.length);
})

// //删除数据
// var filter ={id:111};


// db.del("stu",filter,function(err,result){
//   console.log(err);
//   console.log(result);
// });

// //测试修改数据
// var filter = {id:111};
// var data = {age:28};
// db.modify("student",filter,data,function(err,result){
//   console.log(err); 
//   console.log(result);
// })

// //测试添加数据
// var data = {id:111,name:"王小明",age:14};
// db.add("student",data,function(err,result){
//   console.log(err);
//   console.log(result);
// });

// db.findAll("student",function(err,docs){
//   if(err){
//     console.log(err);
//   }else{
//     console.log(docs);
//   }
// });