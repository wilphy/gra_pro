const express = require('express');
const mysql = require('mysql');
const consolidate = require('consolidate');


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
app.use('/static', express.static('static'));
app.use(express.static('views'));




//模板引擎配置
//输出html
app.set('view engine', 'html');
//模板文件位置
app.set('views', './views');
//使用引擎
app.engine('html', consolidate.ejs);


//学生登录模块路由
const stu_login = require('./routes/stu_login');
app.use(stu_login);

//企业登录模块路由
const comp_login = require('./routes/comp_login');
app.use(comp_login);

// //简历投递
// const send_router = require('./routes/send_router');
// app.use(send_router);

//发布新职位
// const newJob_router = require('./routes/newJob_router');
// app.use(newJob_router);

//职位列表
const search = require('./routes/search');
app.use(search);


//职位详情
const job_detail = require('./routes/job_detail');
app.use(job_detail);


//学生个人信息
const stu_info = require('./routes/stu_info');
app.use(stu_info);

//学生个人信息
const stu_send = require('./routes/stu_send');
app.use(stu_send);


//学生职位收藏
const stu_like = require('./routes/stu_like');
app.use(stu_like);

//企业个人信息
app.get('/comp_info.html', (req, res) => {

  db.query('SELECT * FROM comp_info', (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send('database error').end();
    } else {
      // console.log(data);
      res.render('comp_info.ejs', {
        comp_info: data
      });
    }
  });
});