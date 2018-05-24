const express = require('express');
const mysql = require('mysql');

var send = express.Router();

//数据库
let db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'gra'
});

//学生投递信息
send.get('/send', (req, res) => {


  db.query(`INSERT INTO applicate (name) VALUES('${name}')`, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send('database error').end();
    } else {
      // console.log(data);
      res.json({
        msg: '申请成功'
      });
    }
  });
});


module.exports = send;