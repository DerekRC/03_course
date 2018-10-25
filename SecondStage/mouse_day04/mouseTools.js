'use strict'; //严格模式下执行
/* 创建对象 */

var eventMouse = {
  /* 
    添加一个方法
    绑定事件：addEventListener(事件名称，事件处理函数，bool：默认冒泡阶段处理事件) //事件监听函数
    参数：
      elem：绑定事件的DOM对象
  */

  addMouse: function (elem, mouseDown, mouseMove, mouseUp) {
    if (!elem || typeof elem !== 'object') {
      return;
    };
    var self = this;//ggl
    /* 绑定mousedown */
    elem.addEventListener('mousedown', function (event) {
      // 调用 getPoint, 获取坐标值
      event.points = getPoint(event);
      //内部调用 mouseDown 方法
      mouseDown && mouseDown.call(self,event);
    });
    /* 绑定mousemove */
    elem.addEventListener('mousemove', function (event) {
      // 调用 getPoint, 获取坐标值
      event.points = getPoint(event);
      mouseMove && mouseMove.call(self,event);
    });
    /* 绑定mouseup */
    elem.addEventListener('mouseup', function (event) {
      // 调用 getPoint, 获取坐标值
      event.points = getPoint(event);
      mouseUp && mouseUp.call(self,event);
    });
    /* 获取鼠标的X，Y轴坐标 
     参数 event -> event对象  ||||||||    elem -> 绑定的DOM元素
  */
    function getPoint(event) {
      //event对象记录了坐标值  pageX pageY
      var x = event.pageX - elem.offsetLeft,
        y = event.pageY - elem.offsetTop;
      return {
        dx: x,
        dy: y
      }
    }
  },

};