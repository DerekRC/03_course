




express.index= function(req,res){
  res.send('这是首页');
};


express.info = function(req,res){
  res.send('这是信息页');
};


express.error = function(req,res){
  res.send('这是错误页');
};