const express = require('express');
const mysql = require('mysql');

var send_router = express.Router();

//数据库
let db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'gra'
});

send_router.get('/send', (res, req) => {
  console.log('请求了发送');
  res.end();
});


module.exports = send_router;