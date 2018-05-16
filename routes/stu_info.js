const express = require('express');
const mysql = require('mysql');

var stu_info = express.Router();

//数据库
let db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'gra'
});



//学生个人信息
stu_info.get('/stu_info', (req, res) => {

  db.query('SELECT * FROM stu_user', (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send('database error').end();
    } else {
      // console.log(data);
      res.render('stu_info.ejs', {
        stu_info: data
      });
    }
  });
});


module.exports = stu_info;;