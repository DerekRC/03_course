            //倒计时
       
            //1. 指定倒计时的到期时间(2018-5-29 21:08:49)
            //可以直接使用年月日时分秒来创建一个date对象，但是月是从0开始的
            var to = new Date(2018, 4, 29, 20, 20, 10);
 
            function antitime() {
                var now = new Date();
 
                //2. 拿到当前时间和过期时间之间的时间差（毫秒）
                var deltaTime = to - now; //到期时间和当前时间相差的毫秒数
                
                //如果超时了，就停止倒计时
                if (deltaTime <= 0) {
                    //停止计时器
                    window.clearInterval(timer);
                    //停止执行下面的代码
                    return;
                }
                
                //已知毫秒数，算出几分几秒几秒
                var m = Math.floor(deltaTime / (60*1000)); 
                //算出有多少秒
                var s = Math.floor(deltaTime / 1000 % 60);
                //算出多少毫秒, 毫秒数只显示10位和百位
                var ms = Math.floor(deltaTime % 1000 / 10); 
                    
                //把时间的数字转成字符串， 如果分秒毫秒不足10， 则前面补0
                var timeStr = "" + (m<10?"0"+m:m) + (s<10?"0"+s:s) + (ms<10?"0"+ms:ms);
                console.log(timeStr);
 
                //063535
 
                //each是用来遍历.num元素， 其实你可以理解成循环
 
                $(".secondkill .num").each(function(index, span) {
                    //console.log(span);
                    $(span).html(timeStr.substring(index, index+1));
 
                    //$(span), span默认是一个js对象，需要用$(span)变成一个jquery对象
                    //$(span).html();这个方法是用来设置span里面的值的
                    //timeStr.subSring();该方法是用来截取字符串 “abcdefg”
                });
            }
 
            //每十毫秒执行一次
            var timer = setInterval(antitime, 10);
        });
