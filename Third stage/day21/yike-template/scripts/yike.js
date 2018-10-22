//创建angular应用模块
var app = angular.module('app',['ngRoute','Controller']);


/* 
 * 当app应用创建完成后，立即调用app.run方法
 run方法针对全局，是整个应用，只能依赖根作用域
*/
app.run(['$rootScope',function($rootScope){
  //console.log("app启动了");


  //  页面刚加载时，isShow不起效，不显示
  $rootScope.isShow = false;
  //给菜单按钮添加单击事件toggle
  $rootScope.toggle = function(){
    //alert('单机了');
    /*if( $rootScope.isShow == true){
      $rootScope.isShow = false;
    }else{
      $rootScope.isShow = true;
    }*/
    $rootScope.isShow = ! $rootScope.isShow;
    //选择所有的dd
    var dd = document.querySelectorAll('dd');
    //当面板向右移动时，dd也向右移动，显示出来(isShow:true)
    //当面板向左移动时，dd也向左移动，显示出来(isShow:false)
    //向右移动显示
    if( $rootScope.isShow){
      for(var i=0; i<dd.length; i++) {
        dd[i].style.transitionDuration = (i + 1) * 0.15 + 's';
        dd[i].style.transitionProperty = 'all';
        dd[i].style.transitionDelay = '0.2s';
        dd[i].style.transitionTimingFunction = 'ease-out';
        dd[i].style.transform = 'translate(0)';
        }
      }else{
        for(var i=dd.length - 1; i>=0; i--) {
          dd[i].style.transitionDuration = (dd.length - i + 1) * 0.05 + 's';
          dd[i].style.transitionProperty = 'all';
          dd[i].style.transitionDelay = '';
          dd[i].style.transitionTimingFunction = 'ease-out';
          dd[i].style.transform = 'translate(-100%)';
        }
      }
    }
    }
  ])


//修改路由锚点错误的bug
app.config(["$locationProvider",function($locationProvider){
  //$locationProvider.html5Mode(false);//可加可不加
  $locationProvider.hashPrefix("");
}]);


//配置路由
app.config(['$routeProvider',function($routeProvider){
  $routeProvider.when('/',{
    redirectTo:'/index'//请求时，直接跳转到index首页
  }).when('/index',{
    templateUrl:"/index",//发送index请求
    controller:"index"
  }).when('/older',{
    templateUrl:"/index",
    controller:"older"
  }).when('/author',{
    templateUrl:"/index",
    controller:"author"
  }).when('/category',{
    templateUrl:"/index",
    controller:"category"
  }).when('/favourite',{
    templateUrl:"/index",
    controller:"favourite"
  }).when('/settings',{
    templateUrl:"/index",
    controller:"settings"
  }).otherwise({


  })
}])