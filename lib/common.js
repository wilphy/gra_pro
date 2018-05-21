const crypto = require('crypto');

module.exports = {
  MD5_SUFFIX: 'WEY2GBY',    //添加后缀
  md5: function (str) {
    var obj = crypto.createHash('md5');

    obj.update(str);

    return obj.digest('hex'); //hex：16进制模式
  }
};