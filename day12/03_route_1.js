var express = require('express');
var app = express();
var route = require('./03_route.js')
app.listen(4000);


// app.get('/',route.index);
//上面的写法还可以简写成下面的方式
// app.use(route.index);

app.get('/',route.index);
app.get('/info',route.info);
app.get('/error',route.error);
