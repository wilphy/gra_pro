const express = require('express');
const mysql = require('mysql');

var db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'gra'
});

module.exports = function () {
  var router = express.Router();

  router.get('/', (req, res) => {

    switch (req.query.act) {
      case 'del':
        db.query(`DELETE FROM stu_user WHERE ID=${req.query.id}`, (err, data) => {
          if (err) {
            console.error(err);
            res.status(500).send('database error').end();
          } else {
            res.redirect('/admin/stu_user');
          }
        });
        break;
      default:
        db.query('SELECT * FROM stu_user', (err, stu_user) => {
          if (err) {
            console.error(err);
            res.status(500).send('database error').end();
          } else {
            res.render('admin/stu_user.ejs', {
              stu_user
            });
          }
        });
        break;
    }
  });
  // router.post('/', (req, res) => {

  //   var username = req.body.username;

  //   if (req.query.act) {
  //     db.query(`DELETE FROM stu_user WHERE ID=${req.query.id}`, (err, data) => {
  //       if (err) {
  //         console.error(err);
  //         res.status(500).send('database error').end();
  //       } else {
  //         res.redirect('/admin/stu_user');
  //       }
  //     });
  //   }

  return router;
  // });
}