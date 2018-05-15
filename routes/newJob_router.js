const express = require('express');
const mysql = require('mysql');

var newJob_router = express.Router();

//数据库
let db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'gra'
});

newJob_router.get('/newJob', (res, req) => {
  db.query(`INSERT INTO job_search_list (job_title,job_desc,job_req) VALUES('${job_title}', '${job_desc}', '${job_req}')`, (res, req) => {
    if (err) {
      res.send('database error')
    } else {
      res.send('sussecs')
    }
  });
});


module.exports = newJob_router;