const express = require('express');
const mysql = require('mysql');

var job_detail = express.Router();

//数据库
let db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'gra'
});


//职位详情
job_detail.get('/job_detail', (req, res) => {
  if (req.query.id) {
    db.query(`SELECT *FROM job WHERE job_id=${req.query.id}`, (err, data) => {
      if (err) {
        res.status(500).send('database error').end();
      } else {
        if (data.length == 0) {
          res.status(404).send('请求的页面找不到').end();
        } else {
          // var jobData = data[0];
          // jobData.content = jobData.content.replace(/^/gm, '</p>').replce(/$/gm, '</p>')
          res.render('job_detail.ejs', {
            job_data: data[0]
          })
        }
      }
    });
  } else {
    res.status(404).send('请求的页面不存在')
  }
});


module.exports = job_detail;;