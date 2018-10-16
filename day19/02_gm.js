var gm = require('gm');

gm('./1.jpg')
// .flip()//翻转180度
// .magnify()//放大了一倍
// .rotate('green', 45)//翻转45度，填充色绿色
// .blur(7, 3)//远视模糊
// .crop(300, 300, 150, 130)//剪切角度  宽高 x y 轴
// .edge(3)  //描边   
.drawCircle(10, 10, 20, 10)//  圆心坐标x，y 偏离图片原点距离x，y                    
.write('./2.jpg', function (err) {
  if (!err) console.log('crazytown has arrived');
})




