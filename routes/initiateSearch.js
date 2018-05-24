const express = require('express');
const mysql = require('mysql');
const ejs = require('ejs');


var initiateSearch = express.Router();

//数据库
let db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'gra'
});

//搜索
initiateSearch.get('/initiateSearch', (res, req) => {

  let keyWord = req.query;

  db.query(`SELECT job_name FROM job WHERE job_name LIKE "% '${keyWord}' %"`, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send('database error').end();
    } else {
      // console.log(data);
      // res.render('search.ejs', {
      //   job_list: data
      // });
    }
  });
});

module.exports = initiateSearch;