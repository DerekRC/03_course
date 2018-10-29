/* 移动端轮播
  1.自动轮播( 定时器 + C3-位移+过渡，无缝衔接 - 过渡结束 + 定位)
  2.点要跟随轮播改变样式
  3.可以滑动轮播图  (touch事件)
*/
window.onload = function () {
  mySwiper(); //页面加载时就调用这个函数
  search();
}
//1.自动轮播
function mySwiper() {
  //获取轮播的盒子
  var banner = document.querySelector('.jd_banner');
  //图片的宽度
  var baWith = banner.offsetWidth;
  //图片的盒子
  var imageBox = banner.children[0];
  //点的集合
  var pointBox = banner.children[1];
  //获取所有的点 集合
  var points = pointBox.querySelectorAll('li');

  //定义过渡方法
  var addTransition = function () {
    imageBox.style.transition = 'all .3s ease-out';
    // 兼容写法
    imageBox.style.webkitTransition = 'all .3s ease-out';
  };
  // 定义位移方法
  var addTranslate = function (x) {
    imageBox.style.transform = 'translateX(' + x + 'px)';
    imageBox.style.webkitTransform = 'translateX(' + x + 'px)';
  }
  //定义清除过渡方法
  var clearTransition = function () {
    imageBox.style.transition = 'none';
    imageBox.style.webkitTransition = 'none';
  }
  var index = 1;
  // 定义定时器，实现自动轮播 setInterval()
  var timer = setInterval(function () {
    index++;
    addTransition();
    addTranslate(-baWith * index);
    console.log('图片-' + index);
  }, 1000);
  //绑定过渡结束事件，重新定位到第一张图片
  imageBox.addEventListener('webkitTransitionEnd', function () {
    //处理过渡事件结束的逻辑
    if (index >= 9) {
      index = 1;
      //清除过渡
      clearTransition();
      //调动位移方法
      addTranslate(-baWith * index);
    } else if (index <= 0) {
      index = 8;
      clearTransition();
      addTranslate(-index * baWith);
    };
    //调用 setPoint()
    setPoint();
  });
  //点需要跟随滚动 改变当前li的样式
  function setPoint() {
    for (var i = 0; i < points.length; i++) {
      points[i].className = '';
    };
    points[index - 1].className = 'now';
  }
  /* 绑定touch事件，滑动图片功能
    需要初始化的变量：
    startX,moveX,isMove   
  */
  var startX = 0, //记录开始触摸的x轴坐标       初始化
    moveX = 0, //记录滑动的x轴坐标
    distanceX = 0, //记录滑动的距离 moveX - startX
    ISMOVE = false; //表示是否滑动
  //绑定 touchstart事件
  imageBox.addEventListener('touchstart', function (event) {
    event.preventDefault(); //固定套路
    // 停止轮播  关闭定时器  连接下面滑动图片
    clearInterval(timer);
    timer = null; //定时器设为null  连接下面的再次开启定时器
    //记录 startX
    startX = event.touches[0].pageX; //event事件里已经封装好的信息
    console.log(startX);
  });
  //绑定 touchmove 事件
  imageBox.addEventListener('touchmove', function (event) {
    event.preventDefault();
    ISMOVE = true; //表示滑动了
    moveX = event.touches[0].pageX;
    //记录滑动距离
    distanceX = moveX - startX;
    //重新定位
    clearTransition(); //清除过渡
    addTranslate(-index * baWith + distanceX); //
    // console.log(moveX);
  })
  //绑定 touchend 事件
  //当滑动的距离不超过图片的三分之一时，当前滑动无效，返回定位
  //滑动超过三分之一时，当前滑动生效 
  imageBox.addEventListener('touchend', function (event) {
    event.preventDefault();
    if (!ISMOVE) { //判断是否滑动过
      return;
    }
    // Math.abs() 取绝对值
    if (Math.abs(distanceX) > baWith / 3) { // 表示滑动有效
      //判断右滑动(上一张)  还是  左滑动(下一张)
      if (distanceX > 0) { //上一张  右滑的值比起始值大(正的)
        index--;
      } else { //下一张 左滑的值比起始值小(负的)
        index++;
      }
      //调用位移和过渡方法
      addTransition();
      addTranslate(-index * baWith);
    } else { //滑动无效
      addTransition();
      addTranslate(-index * baWith);
    }
    //重新初始化全局参数 防止对下一次滑动造成影响
    startX = 0,
      moveX = 0,
      distanceX = 0,
      ISMOVE = false;
    //再次开启定时器
    timer = setInterval(function () {
      index++;
      addTransition();
      addTranslate(-index * baWith);
    }, 1000)
  });
}

/* 搜索区域滚动效果 
 
*/
function search() {
  /* 
    1.颜色随着页面滚动 逐渐加深(变的不透明)
    2.当滚动的距离超过轮播图的高度时，颜色保持不变
      浏览器滚动事件
      window.onscroll 
      监听 滚动高度 document.body.scrollTop 
  */
  //搜索盒子
  var searchBox = document.querySelector('.jd_header_box');
  //获取轮播图高度
  var bannerh = document.querySelector('.jd_banner').offsetHeight;
  //监听 scroll 滚动事件
  window.onscroll = function () {
    //获取页面滚动的高度
    var top = document.body.scrollTop;
    var opacity = 0;
    if (top <= bannerh) {
      //设置透明度
      opacity = top / bannerh;
    } else {
      opacity = 1;
    };
    searchBox.style.background = 'rgba(201,21,35,' + opacity + ')';
  }
}


/* 设计倒计时 */
function downTime() {
  var to = new Date("2018/11/11").getTime();
  var span_obj = document.querySelector('.sk_time');
  var p1_obj = span_obj.children[0];
  var p2_obj = span_obj.children[1];
  var p3_obj = span_obj.children[3];
  var p4_obj = span_obj.children[4];
  var p5_obj = span_obj.children[6];
  var p6_obj = span_obj.children[7];
  var now = new Date().getTime();
  console.log(to)
  console.log(now)
  // console.log(span_obj)

  var deltaTime = (to - now)/1000;
  // console.log(deltaTime);

 
  var d = Math.floor(deltaTime/60/60/24);
  console.log(d)
  // console.log(d)
  var h = Math.floor((deltaTime-(d*24*3600))/3600);
  var m = Math.floor((deltaTime-(d*24*3600)-(h*3600))/60);
  var s = Math.floor(deltaTime-(d*24*3600)-(h*3600)-(m*60));
  console.log(h)
  console.log(m)
  console.log(s)
  

  var timeStr = "" + (h<10?"0"+m:m) + (m<10?"0"+s:s)+(s<10?"0"+s:s);
  console.log(timeStr);

  p1_obj.innerHTML = Math.floor(h/10);
  p2_obj.innerHTML = h%10;
  p3_obj.innerHTML = Math.floor(m/10);
  p4_obj.innerHTML = m%10;
  p5_obj.innerHTML = Math.floor(s/10);
  p6_obj.innerHTML = s%10;

}

setInterval(downTime,1000);