/* 面向对象的方式 封装一下 */
//单例模式
var mySwiper = {
  banner: null,
  imageBox: null,
  baWith: null,
  pointsBox: null,
  points: null,
  index: 1,
  startX: 0,
  moveX: 0,
  distanceX: 0,
  ISMOVS: false,
  timer: null,

  initSwiper: function () {
    //获取轮播的盒子
    this.banner = document.querySelector('.jd_banner');
    //图片的宽度
    this.baWith = this.banner.offsetWidth;
    //图片的盒子
    this.imageBox = this.banner.children[0];
    //点的集合
    this.pointBox = this.banner.children[1];
    //获取所有的点 集合
    this.points = this.pointBox.querySelectorAll('li');
    //调用 setTimer 启动定时器
    this.setTimer();
    //添加页面可见事件 visibilitychange
    document.addEventListener('visibilitychange',function(event){
      if(document.hidden){
        clearInterval(self.timer)
        self.timer = null;
      }else{
        self.setTimer();
      }
    });
    var self = this; //留住this
    //绑定过渡结束事件，重新定位到第一张图片
    this.imageBox.addEventListener('webkitTransitionEnd', function () {
        //处理过渡事件结束的逻辑
        if (self.index >= 9) {
          self.index = 1;
          //清除过渡
          self.clearTransition();
          //调动位移方法
          self.addTranslate(-self.baWith * self.index);
        } else if (self.index <= 0) {
          self.index = 8;
          self.clearTransition();
          self.addTranslate(-self.index * self.baWith);
        };
        //调用 setPoint()
        self.setPoint();
      }),
      //绑定 touchstart事件
      this.imageBox.addEventListener('touchstart', function (event) {
        event.preventDefault(); //固定套路
        // 停止轮播  关闭定时器  连接下面滑动图片
       clearInterval(self.timer);
        self.timer = null; //定时器设为null  连接下面的再次开启定时器
        //记录 startX
        self.startX = event.touches[0].pageX; //event事件里已经封装好的信息
        console.log(self.startX);
      }),
      //绑定 touchmove 事件
      this.imageBox.addEventListener('touchmove', function (event) {
        event.preventDefault();
        self.ISMOVE = true; //表示滑动了
        self.moveX = event.touches[0].pageX;
        //记录滑动距离
        self.distanceX = self.moveX - self.startX;
        //重新定位
        self.clearTransition(); //清除过渡
        self.addTranslate(-self.index * self.baWith + self.distanceX); //
        // console.log(moveX);
      }),
      //绑定 touchend 事件
      //当滑动的距离不超过图片的三分之一时，当前滑动无效，返回定位
      //滑动超过三分之一时，当前滑动生效 
      this.imageBox.addEventListener('touchend', function (event) {
        event.preventDefault();
        if (!self.ISMOVE) { //判断是否滑动过
          return;
        }
        // Math.abs() 取绝对值
        if (Math.abs(self.distanceX) > self.baWith / 3) { // 表示滑动有效
          //判断右滑动(上一张)  还是  左滑动(下一张)
          if (self.distanceX > 0) { //上一张  右滑的值比起始值大(正的)
            self.index--;
          } else { //下一张 左滑的值比起始值小(负的)
            self.index++;
          }
          //调用位移和过渡方法
          self.addTransition();
          self.addTranslate(-self.index * self.baWith);
        } else { //滑动无效
          self.addTransition();
          self.addTranslate(-self.index * self.baWith);
        }
        //重新初始化全局参数 防止对下一次滑动造成影响
        self.startX = 0,
          self.moveX = 0,
          self.distanceX = 0,
          self.ISMOVE = false;
        //再次开启定时器
        self.setTimer();
      });

  },
  //定义过渡方法
  addTransition: function ()  {
    this.imageBox.style.transition = 'all .3s ease-out';
    // 兼容写法
    this.imageBox.style.webkitTransition = 'all .3s ease-out';

  },
  // 定义位移方法
  addTranslate: function (x) {
    this.imageBox.style.transform = 'translateX(' + x + 'px)';
    this.imageBox.style.webkitTransform = 'translateX(' + x + 'px)';
  },
  //定义清除过渡方法
  clearTransition: function () {
    this.imageBox.style.transition = 'none';
    this.imageBox.style.webkitTransition = 'none';
  },
  // 定义定时器，实现自动轮播 setInterval()
  setTimer: function () {
    var self = this; //留住 this
    this.timer = setInterval(function () {
      self.index++;
      //调用 定位 过渡
      self.addTransition();
      self.addTranslate(-self.baWith * self.index);
      // console.log('图片-' + index);
    }, 1000);
  },
  //点需要跟随滚动 改变当前li的样式
  setPoint: function () {
    for (var i = 0; i < this.points.length; i++) {
      this.points[i].className = '';
    };
    this.points[this.index - 1].className = 'now';
  },
}


window.onload = function () {
  mySwiper.initSwiper();
}


