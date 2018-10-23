//get | post
/*封装get请求 */
function xhr_get(url,data,success){
  //1.创建xhr
  var xhr = new XMLHttpRequest();
  //2.建立连接
  if(data){
    url+="?"+data;
  }
  xhr.open('get',url);
  //3.发送请求
  xhr.send(null);
  //4.注册监听
  xhr.onreadystatechange = function(){
    if(xhr.readyState===4&&xhr.status===200){
      success(xhr.responseText);
    }
  }
}


// xhr_get('xxx.php','name=baidu',function(data){
//   console.log(data);
// })
/*封装post请求 */
function xhr_post(url,data){
  //1.创建xhr
  var xhr = new XMLHttpRequest();
  //2.建立连接
  xhr.open('post',url);
  //3.发送请求
  xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
  if(data){
     xhr.send(data);
  }else{
    xhr.send(null);
  }
  //4.注册监听
  xhr.onreadystatechange = function(){
    if(xhr.readyState===4&&xhr.status===200){
      console.log(xhr.responseText);
    }
  }
}


/* 将get和post请求封装到一起
  参数：
    url：请求地址
    data：请求参数
    method：请求方式 get/post
    success：数据获取成功的回调函数


*/


function xhr(obj){
  var xhr = new XMLHttpRequest();
  var methods=obj.methods;
  var url=obj.url;
  var data=obj.data;
  var success=obj.success;
  //判断 methods
  if(methods.toLowerCase() === 'get'){
    if(data){
      //调用 setData
      url+="?"+setDate(data);
    }
    xhr.open(methods,url);
    //3.发送请求
    xhr.send(null);
    
  }else if(methods.toLowerCase() === 'post'){
    xhr.open(methods,url);
  //3.发送请求
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    if(data){
      //调用 setData
      xhr.send(setDate(data));
    }else{
      xhr.send(null);
    }
   
  }
 //4.注册监听
  xhr.onreadystatechange = function(){
    if(xhr.readyState===4&&xhr.status===200){
      //执行回调函数
      success(xhr.responseText);
    }
  }
}


// 处理data，变成字符串键值对
function setDate(data){
  var urlData='';
  //遍历data
  for(var key in data){
    urlData += "&" +key+ '=' +data[key];
  }
  return urlData.slice(1);
}