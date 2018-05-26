const express = require('express');
const mysql = require('mysql');

var findStu = express.Router();

//数据库
let db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'gra'
});

//职位列表
findStu.get('/stu_list.html', (req, res) => {

  db.query('SELECT realname,school,email,intro,spareTime FROM stu_list', (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send('database error').end();
    } else {
      // console.log(data);
      res.render('stu_list.ejs', {
        stu_list: data
      });
    }
  });
});

module.exports = findStu;;