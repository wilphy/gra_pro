const express = require('express');
const mysql = require('mysql');
// const common=require('../libs/common');

// var admin_login = express.Router();

//数据库
let db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'gra'
});

module.exports = function () {
  var router = express.Router();

  //检查登录状态
  router.use((req, res, next) => {
    if (!req.session['admin_id'] && req.url != '/login') { //没有登录
      res.redirect('/admin/login');
    } else {
      next();
    }
  });

  //
  router.get('/login', (req, res) => {
    res.render('admin/login.ejs', {});
  });
  router.post('/login', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    db.query(`SELECT * FROM admin WHERE username='${username}'`, (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('database error').end();
      } else {
        if (data.length == 0) {
          res.status(400).send('no this admin').end();
        } else {
          if (data[0].password == password) {
            //成功
            req.session['admin_id'] = data[0].ID;
            res.redirect('/admin/');
          } else {
            res.status(400).send('this password is incorrect').end();
          }
        }
      }
    });
  });

  router.get('/', (req, res) => {
    res.render('admin/index.ejs', {});
  });

  router.get('/banners', (req, res) => {
    res.render('admin/banners.ejs', {})
  });

  return router;
};