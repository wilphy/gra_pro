const express = require('express');
const mysql = require('mysql');

var comp_info = express.Router();

//数据库
let db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'gra'
});

//学生个人信息
comp_info.get('/comp_info.html', (req, res) => {

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


module.exports = comp_info;;