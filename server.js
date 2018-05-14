const express = require('express');
const mysql = require('mysql');
const consolidate = require('consolidate');


const router = require('./routes/router');

const app = express();

app.listen(8080);

//数据库
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'gra'
});


//静态文件读取
app.use('/public', express.static('public'));
app.use('/static', express.static('static'));
app.use(express.static('views'));


app.use(router);


//模板引擎配置
//输出html
app.set('view engine', 'html');
//模板文件位置
app.set('views', './views');
//使用引擎
app.engine('html', consolidate.ejs);



//学生个人信息
app.get('/stu_info.html', (req, res) => {

  db.query('SELECT * FROM stu_info', (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send('database error').end();
    } else {
      // console.log(data);
      res.render('stu_info.ejs', {stu_info: data});
    }
  });
});


//学生投递信息
app.get('/stu_send.html', (req, res) => {

  db.query('SELECT * FROM stu_send', (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send('database error').end();
    } else {
      // console.log(data);
      res.render('stu_send.ejs', {stu_send: data});
    }
  });
});

//学生职位收藏
app.get('/stu_like.html', (req, res) => {

  db.query('SELECT * FROM stu_like', (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send('database error').end();
    } else {
      // console.log(data);
      res.render('stu_like.ejs', {stu_like: data});
    }
  });
});

