const express = require('express');
const mysql = require('mysql');

var stu_login = express.Router();

//数据库
let db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'gra'
});

//学生注册
stu_login.get('/stu_reg', function (req, res) {
  let {
    user,
    pass
  } = req.query;

  if (!/^\w{6,32}$/.test(user)) {
    res.json({
      code: 1,
      msg: '用户名不符合规范'
    });

  } else if (!/^.{6,32}$/.test(pass)) {
    res.json({
      code: 1,
      msg: '密码不符合规范'
    });

  } else {

    //2.检验用户名是否重复
    db.query(`SELECT * FROM stu_user WHERE username='${user}'`, (err, data) => {
      if (err) {
        res.json({
          code: 1,
          msg: '数据库有误'
        });

      } else if (data.length > 0) {
        res.json({
          code: 1,
          msg: '用户名已存在'
        });

      } else {
        //3.插入
        db.query(`INSERT INTO stu_user (username,password,online) VALUES('${user}', '${pass}', 0)`, err => {
          if (err) {
            res.json({
              code: 1,
              msg: '数据库有误'
            });

          } else {
            res.json({
              code: 0,
              msg: '注册成功'
            });
          }
        });
      }
    });
  }
  console.log('学生请求了注册', req.query);
});

//登录
stu_login.get('/stu_login', function (req, res) {
  let {
    user,
    pass
  } = req.query;

  //1.校验数据
  if (!/^\w{6,32}$/.test(user)) {
    res.json({
      code: 1,
      msg: '用户名不符合规范'
    });

  } else if (!/^\w{6,32}$/.test(pass)) {
    res.json({
      code: 1,
      msg: '密码不符合规范'
    });

  } else {
    //2.取数据
    db.query(`SELECT ID,password FROM stu_user WHERE username='${user}'`, (err, data) => {
      if (err) {
        res.json({
          code: 1,
          msg: '数据库有误'
        });

      } else if (data.length == 0) {
        res.json({
          code: 1,
          msg: '用户名不存在'
        });

      } else if (data[0].password != pass) {
        res.json({
          code: 1,
          msg: '用户名或密码错误'
        });

      } else {
        //3.设置状态
        db.query(`UPDATE stu_user SET online=1 WHERE ID=${data[0].ID}`, (err, data) => {
          if (err) {
            res.json({
              code: 1,
              msg: '数据库有误'
            });

          } else {
            //设置浏览器cookie
            res.cookie('user', user);
            res.json({
              code: 0,
              msg: '登录成功'
            })
          }
        });
      }
    });
  }
  console.log('学生请求了登录', req.query);
});

module.exports = stu_login;