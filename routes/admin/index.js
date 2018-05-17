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

  router.get('/', (req, res) => {
    res.render('admin/index.ejs', {});
  });

  router.use('/login', require('./login')());
  router.use('/banners', require('./banners')());
  router.use('/stu_user', require('./stu_user')());
  router.use('/comp_user', require('./comp_user')());
  //TODO  custom

  return router;
};