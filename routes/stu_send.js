const express = require('express');
const mysql = require('mysql');

var stu_send = express.Router();

//数据库
let db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'gra'
});



//学生投递信息
stu_send.get('/stu_send.html', (req, res) => {

  db.query('SELECT * FROM stu_send', (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send('database error').end();
    } else {
      // console.log(data);
      res.render('stu_send.ejs', {
        stu_send: data
      });
    }
  });
});


module.exports = stu_send;;