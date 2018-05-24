const express = require('express');
const mysql = require('mysql');
const consolidate = require('consolidate');
const static = require('express-static');
const bodyParser = require('body-parser');
const multer = require('multer');
const multerObj = multer({
  dest: './static/upload'
});
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const expressRoute = require('express-route');



/***********   基本配置  **************************************************/

//创建express服务器连接
const app = express();
//监听
app.listen(9527);

//数据库连接
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'gra'
});

//静态资源读取
app.use('/public', express.static('public'));
app.use(express.static('views'));

//模板引擎配置
//输出html
app.set('view engine', 'html');
//模板文件位置
app.set('views', './views');
//使用引擎
app.engine('html', consolidate.ejs);


/***********  学生用户功能路由模块   **************************************************/

//学生登录模块路由
const stu_login = require('./routes/stu_login');
app.use(stu_login);

//职位列表
const search = require('./routes/search');
app.use(search);

//职位详情
const job_detail = require('./routes/job_detail');
app.use(job_detail);

//学生个人信息
const stu_info = require('./routes/stu_info');
app.use(stu_info);

//发布个人信息
const stu_generate_info = require('./routes/stu_generate_info');
app.use(stu_generate_info);

//学生投递信息
// const send = require('./routes/send');
// app.use(send);

//学生职位收藏
// const stu_like = require('./routes/stu_like');
// app.use(stu_like);

//学生搜索职位
const initiateSearch = require('./routes/initiateSearch');
app.use(initiateSearch);

//搜索结果
const searchResult = require('./routes/searchResult');
app.use(searchResult);


/***********  企业用户功能路由模块   **************************************************/

//企业登录模块路由
const comp_login = require('./routes/comp_login');
app.use(comp_login);

//企业用户信息
const comp_info = require('./routes/comp_info');
app.use(comp_info);

//发布职位
const newJob = require('./routes/newJob');
app.use(newJob);


/********************  管理员   *******************************************/

//1.获取请求数据
//get自带
app.use(bodyParser.urlencoded());
app.use(multerObj.any());

//2.cookie、session
app.use(cookieParser());
(function () {
  var keys = [];
  for (var i = 0; i < 100000; i++) {
    keys[i] = 'a_' + Math.random();
  }
  app.use(cookieSession({
    name: 'sess_id',
    keys: keys,
    maxAge: 20 * 60 * 1000 //20min
  }));
})();


////管理员登录
app.use('/admin/', require('./routes/admin/index.js')());

// const admin = require('./routes/admin');
// app.use(admin);