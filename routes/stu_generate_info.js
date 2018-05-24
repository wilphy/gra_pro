const express = require('express');
const mysql = require('mysql');

var stu_generate_info = express.Router();

//数据库
let db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'gra'
});


stu_generate_info.get('/stu_generate_info', function (req, res) {

  let {
    realname,
    school,
    email,
    intro,
  } = req.query;

  if (!realname || !school || !email || !intro) {
    res.json({
      code: 1,
      msg: '参数错误'
    });

  } else {
    //插入
    db.query(`INSERT INTO stu_info (realname,school,email,intro) VALUES('${realname}', '${school}', '${email}', '${intro}')`, err => {
      if (err) {
        res.json({
          code: 1,
          msg: '数据库有误'
        });

      } else {
        res.json({
          code: 0,
          msg: '发布成功'
        });
      }
    });
  }

  console.log('请求了发布', req.query);


});



module.exports = stu_generate_info;