const express = require('express');
const mysql = require('mysql');

var like = express.Router();

//数据库
let db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'gra'
});

//收藏接口
like.get('/like', (req, res) => {

  db.query(`INSERT INTO stu_like (username,password,online) VALUES('${user}', '${pass}', 0)`, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send('database error').end();
    } else {
      // console.log(data);
      res.render('like.ejs', {
        like: data
      });
    }
  });
});

module.exports = like;;