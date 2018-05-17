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
      case 'mod':
        db.query(`SELECT * FROM banner WHERE id=${req.query.id}`, (err, data) => {
          if (err) {
            console.error(err);
            res.status(500).send('database error').end();
          } else if (data.length == 0) {
            res.status(404).send('data not found').end();
          } else {
            db.query('SELECT * FROM banner', (err, banners) => {
              if (err) {
                console.error(err);
                res.status(500).send('database error').end();
              } else {
                res.render('admin/banners.ejs', {
                  banners,
                  mod_data: data[0]
                });
              }
            });
          }
        });
        break;
      case 'del':
        db.query(`DELETE FROM banner WHERE ID=${req.query.id}`, (err, data) => {
          if (err) {
            console.error(err);
            res.status(500).send('database error').end();
          } else {
            res.redirect('/admin/banners');
          }
        });
        break;
      default:
        db.query('SELECT * FROM banner', (err, banners) => {
          if (err) {
            console.error(err);
            res.status(500).send('database error').end();
          } else {
            res.render('admin/banners.ejs', {
              banners
            });
          }
        });
        break;
    }
  });
  
  router.post('/', (req, res) => {
    var src = req.body.src;

    if (!src) {
      res.status(400).send('arg error').end();
    } else {
      if (req.body.mod_id) { //修改
        db.query(`UPDATE banner SET src='${req.body.src}' WHERE ID=${req.body.mod_id}`,
          (err, data) => {
            if (err) {
              console.error(err);
              res.status(500).send('database error').end();
            } else {
              res.redirect('/admin/banners');
            }
          }
        );
      } else { //添加
        db.query(`INSERT INTO banner (src) VALUE('${src}')`, (err, data) => {
          if (err) {
            console.error(err);
            res.status(500).send('database error').end();
          } else {
            res.redirect('/admin/banners');
          }
        });
      }
    }
  });

  return router;
};