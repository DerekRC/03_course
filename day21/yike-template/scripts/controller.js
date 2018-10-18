//封装控制器模块
//该模块的主要作用：创建控制器


//创建控制器模块名称为Controller
angular.module('Controller',[])
//创建navs的控制器
.controller('navs',["$scope",function($scope){
  //将导航栏的标题及其他内容绑定
  $scope.navs = [
    {link:"#/index",icon:"icon-home",text:"今日一刻"},
    {link:"#/older",icon:"icon-file-empty",text:"往期内容"},
    {link:"#/author",icon:"icon-pencil",text:"热门作者"},
    {link:"#/category",icon:"icon-menu",text:"栏目浏览"},
    {link:"#/favourite",icon:"icon-heart",text:"我的喜欢"},
    {link:"#/settings",icon:"icon-cog",text:"设置"},
  ]
}])

//定义index控制器
.controller('index',['$scope','$rootScope',function($scope,$rootScope){
  $scope.msg = '来自控制器的数据';
  //绑定标题
  //标题不是某一个控制器独有的，每一个控制器都能修改标题，所以将其绑定在根作用域上
  $rootScope.title = '今日一刻';
  //选中状态，将数组的下标($index)与点击的值进形比较
  //绑定点击的值
  $rootScope.index = 0;
  //面板整体向左移动
  $rootScope.toggle();
}])

//定义older控制器
.controller('older',['$scope','$rootScope',function($scope,$rootScope){
  $scope.msg = '来自older的数据';
  $rootScope.title = '往期内容';
  $rootScope.older = 0;
  $rootScope.toggle();
}])

//定义author控制器
.controller('author',['$scope','$rootScope',function($scope,$rootScope){
  $scope.msg = '来自author的数据';
  $rootScope.title = '热门作者';
  $rootScope.older = 0;
  $rootScope.toggle();
}])

//定义category控制器
.controller('category',['$scope','$rootScope',function($scope,$rootScope){
  $scope.msg = '来自category的数据';
  $rootScope.title = '栏目浏览';
  $rootScope.older = 0;
  $rootScope.toggle();
}])

//定义favourite控制器
.controller('favourite',['$scope','$rootScope',function($scope,$rootScope){
  $scope.msg = '来自favourite的数据';
  $rootScope.title = '我的喜欢';
  $rootScope.older = 0;
  $rootScope.toggle();
}])

//定义settings控制器
.controller('settings',['$scope','$rootScope',function($scope,$rootScope){
  $scope.msg = '来自settings的数据';
  $rootScope.title = '设置';
  $rootScope.older = 0;
  $rootScope.toggle();
}])






