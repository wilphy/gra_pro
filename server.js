const http = require('http');
const fs = require('fs');
const mysql = require('mysql');
const url = require('url');
const express = require('express');
const path = require('path');


const app = express();

app.use(express.static('public'));
app.use(express.static('static'));

//数据库
let db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'gra'
});

db.query(`SELECT * FROM stu_user`, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log('数据库连接成功');
  }
});



//hhtp服务器 登录、注册
let httpServer = http.createServer((req, res) => {

  let {
    pathname,
    query
  } = url.parse(req.url, true);

  //注册接口
  if (pathname == '/reg') {

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
      res.end();

    } else if (!/^.{6,32}$/.test(pass)) {
      res.write(JSON.stringify({
        code: 1,
        msg: '密码不符合规范'
      }));
      res.end();

    } else {

      //2.检验用户名是否重复
      db.query(`SELECT * FROM stu_user WHERE username='${user}'`, (err, data) => {
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
          db.query(`INSERT INTO stu_user (username, password,online) VALUES('${user}', '${pass}', 0)`, err => {
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

              // fs.readFile(`/views/reg_succes.html`, (err, data) => {
              //   if(err) {
              //     res.writeHead(404);
              //     res.write('Not Found');
              //   } else {
              //     res.write(data);
              //   }
              // });

              // res.end();

            }
          });
        }
      });
    }

    console.log('请求了注册', query);


    //登录接口
  } else if (pathname == '/login') {


    let {
      user,
      pass
    } = query;

    //1.校验数据
    if (!/^\w{6,32}$/.test(user)) {
      res.write(JSON.stringify({
        code: 1,
        msg: '用户名不符合规范'
      }));
      res.end();

    } else if (!/^\w{6,32}$/.test(pass)) {
      res.write(JSON.stringify({
        code: 1,
        msg: '密码不符合规范'
      }));
      res.end();

    } else {
      //2.取数据
      db.query(`SELECT ID,password FROM stu_user WHERE username='${user}'`, (err, data) => {
        if (err) {
          res.write(JSON.stringify({
            code: 1,
            msg: '数据库有误'
          }));
          res.end();

        } else if (data.length == 0) {
          res.write(JSON.stringify({
            code: 1,
            msg: '用户名不存在'
          }));
          res.end();

        } else if (data[0].password != pass) {
          res.write(JSON.stringify({
            code: 1,
            msg: '用户名或密码错误'
          }));
          res.end();

        } else {
          //3.设置状态
          db.query(`UPDATE stu_user SET online=1 WHERE ID=${data[0].ID}`, (err, data) => {
            if (err) {
              res.write(JSON.stringify({
                code: 1,
                msg: '数据库有误'
              }));
              res.end();

            } else {
              res.write(JSON.stringify({
                code: 0,
                msg: '登录成功'
              }));
              res.end();
            }
          });
        }
      });

    }

    console.log('请求了登录', query);

  } else {
    //读文件
    fs.readFile(`views${pathname}`, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.write('Not Found');
      } else {
        res.write(data);
      }

      res.end();
    });
  }
  
});

httpServer.listen(8080);

