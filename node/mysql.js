const http = require('http');
const fs = require('fs');
const mysql = require('mysql');
const urlStr = require(url);

//数据库连接
let db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: "123456",
  database: 'gra'
});

//http服务器连接
let httpServer = http.createServer((req, res) => {
  
});

httpServer.listen(8080);
// // 查询

// //增
// db.query('INSERT INTO stu_user_table (username, password, online) VALUES("wangwu", "111", 0))', (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(JSON.stringify(data));
//   }
// });

// //删
// db.query('DELETE FROM stu_user_table WHERE ID=7', (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(JSON.stringify(data));
//   }
// });

// //改
// db.query('UPDATE stu_user_table SET password="111111" WHERE ID=1)', (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(JSON.stringify(data));
//   }
// });

// //查
// db.query('SELECT username,online FROM stu_user_table)', (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(JSON.stringify(data));
//   }
// });