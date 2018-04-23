const http = require('http');
const fs = require('fs');
const mysql = require('mysql');
const url = require('url');

//数据库连接
let db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: "123456",
  database: 'gra'
});

//数据库查询


//测试数据库连接
db.query(`SELECT * FROM stu_user_table`, (err, data) => {
  if(err) {
    console.log(err);
  } else {
    console.log('成功了');
    console.log(JSON.stringify(data));
  }
});

//http服务器
let httpServer = http.createServer((req, res) => {

  let {
    pathname,
    query
  } = url.parse(pathname, true);

  if (pathname == '/reg') {
    //注册接口
    let {
      user,
      pass
    } = query;

    //1.检验数据
    if (!/^\w{6,32}$/.test(user)) {
      res.write(JSON.stringify({
        code: 1,
        msg: '用户名不符合规范'
      }));
    } else if (!/^.{6,32}$/.test(pass)) {
      res.write(JSON.stringify({
        code: 1,
        msg: '密码不符合规范'
      }));
    } else {
      //2.检验用户名是否重复
      db.query(`SELECT * FROM stu_user_table WHERE username='${user}'`, (err, data) => {
        if (err) {
          res.write(JSON.stringify({
            code: 1,
            msg: '数据库有误'
          }));
          res.end();
        } else if (data.length > 0) {
          res.write(JSON.stringify({
            code: 1,
            msg: '用户名已存在'
          }));
          res.end();
        } else {
          //3.插入
          db.query(`INSERT INTO stu_user_table (username, password,online) VALUES('${user}', '${pass}', 0)`, err => {
            if (err) {
              res.write(JSON.stringify({
                code: 1,
                msg: '数据库有误'
              }));
              res.end();
            } else {
              res.write(JSON.stringify({
                code: 0,
                msg: '注册成功'
              }));
              res.end();
            }
          });
        }
      });
    }


  } else if (pathname == '/login') {
    //登录接口
    console.log('请求了登录');
  } else {
    fs.readFile(`www${pathname}`, (err, data) => {

    });
  }
  
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