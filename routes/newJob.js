const express = require('express');
const mysql = require('mysql');

var newJob = express.Router();

//数据库
let db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'gra'
});


newJob.get('/newJob', function (req, res) {

  let {
    job_name,
    job_comp,
    job_desc,
    job_req
  } = req.query;

  if (!job_name || !job_comp || !job_desc || !job_req) {
    res.json({
      code: 1,
      msg: '参数错误'
    });

  } else {
    //插入
    db.query(`INSERT INTO job (job_name,job_comp,job_desc,job_req) VALUES('${job_name}', '${job_comp}', '${job_desc}', '${job_req}')`, err => {
      if (err) {
        res.json({
          code: 1,
          msg: '数据库有误'
        });

      } else {
        res.json({
          code: 0,
          msg: '发布成功'
        });
      }
    });
  }

  console.log('请求了发布', req.query);


});



module.exports = newJob;