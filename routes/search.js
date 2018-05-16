const express = require('express');
const mysql = require('mysql');

var search = express.Router();

//数据库
let db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'gra'
});



//职位列表
search.get('/search.html', (req, res) => {

  db.query('SELECT job_id,job_name,job_comp FROM job', (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send('database error').end();
    } else {
      // console.log(data);
      res.render('search.ejs', {
        job_list: data
      });
    }
  });
});


module.exports = search;;