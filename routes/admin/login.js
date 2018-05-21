const express = require('express');
const mysql = require('mysql');
const common = require('../../lib/common');


const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'gra'
});

module.exports = function () {
  var router = express.Router();

  router.get('/', (req, res) => {
    res.render('admin/login.ejs', {});
  });
  router.post('/', (req, res) => {
    var username = req.body.username;
    var password = common.md5(req.body.password);

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

  return router;
};