var db = require('./db.js');

db.find('student',{size:2},function(err,docs){
  console.log(err);
  console.log(docs);
});


//删除数据
/* var filter = {id:102};
db.del("student",filter,function(err,result){
  console.log(err);
  console.log(result);
}); */


// 测试修改数据
/* var filter = {id:102};
var data = {age:28};
db.modify("student",filter,data,function(err,result){
  console.log(err);
  console.log(result);
}); */


//测试添加数据
/* var data = {id:112,name:"小樱",age:13};
db.add("student",data,function(err,result){
  console.log(err);
  console.log(result);
}); */

//测试查询所有数据
/* db.findAll("student",function(err,docs){
  if(err){
    console.log(err);
  }else{
    console.log(docs);
  }
}); */
