const express = require('express');
const mysql = require('mysql');

var stu_list = express.Router();

//数据库
let db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'gra'
});

//职位列表
stu_list.get('/stu_list.html', (req, res) => {

  db.query('SELECT job_id,job_name,job_comp FROM job', (err, data) => {
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

module.exports = stu_list;;