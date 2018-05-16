const express = require('express');
const mysql = require('mysql');

var stu_like = express.Router();

//数据库
let db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'gra'
});



//学生投递信息
stu_like.get('/stu_like.html', (req, res) => {

  db.query('SELECT * FROM stu_like', (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send('database error').end();
    } else {
      // console.log(data);
      res.render('stu_like.ejs', {
        stu_like: data
      });
    }
  });
});


module.exports = stu_like;;