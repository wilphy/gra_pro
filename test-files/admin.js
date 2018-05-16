const express = require('express');
const mysql = require('mysql');

// var admin_login = express.Router();

// //数据库
// let db = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: '123456',
//   database: 'gra'
// });

// //学生个人信息
// admin_login.get('/admin_login', (req, res) => {

//   db.query('SELECT * FROM admin', (err, data) => {
//     if (err) {
//       console.log(err);
//       res.status(500).send('database error').end();
//     } else {
//       // console.log(data);
//       res.render('admin_login.ejs', {
//         admin_login: data
//       });
//     }
//   });
// });



module.exports=function (){
  var router=express.Router();

  //检查登录状态
  router.use((req, res, next)=>{
    if(!req.cookie && req.url!='/login'){ //没有登录
      res.redirect('/admin/login');
    }else{
      next();
    }
  });
  

  //
  router.get('/login', (req, res)=>{
    res.render('admin/login.ejs', {});
  });

  return router;
};
