
/**
 * 返回成功
 * @param {Response} res 
 * @param {string} message 
 * @param {any} data 
 * @param {number} code 
 */
function sendSuccess(res, message, data, code) {
  if(!code) code = 200;
  if(!message) message = '成功';
  if(!data) data = null;
  res.send({
    success: true,
    code: code,
    message: message,
    data: data
  });
}
/**
 * 返回失败 json
 * @param {Response} res 
 * @param {string} message 
 * @param {*} data 
 * @param {number} code 
 */
function sendFailed(res, message, data, code) {
  if(!code) code = 400;
  if(!data) data = null;
  if(!message) message = '失败';
  res.send({
    success: false,
    message: message,
    code: code,
    data: data
  });
}

Date.prototype.format = function (formatStr) {
  var str = formatStr ? formatStr : 'YYYY-MM-dd HH:ii:ss';
  //var Week = ['日','一','二','三','四','五','六'];   
  str = str.replace(/yyyy|YYYY/, this.getFullYear());
  str = str.replace(/MM/, pad(this.getMonth() + 1, 2));
  str = str.replace(/dd|DD/, pad(this.getDate(), 2));
  str = str.replace(/HH/, pad(this.getHours(), 2));
  str = str.replace(/hh/, pad(this.getHours() > 12 ? this.getHours() - 12 : this.getHours(), 2));
  str = str.replace(/mm/, pad(this.getMinutes(), 2));
  str = str.replace(/ii/, pad(this.getMinutes(), 2));
  str = str.replace(/ss/, pad(this.getSeconds(), 2));
  return str;
}
/**
 * 数字补0
 */
function pad(num, n) {
  var len = num.toString().length;
  while (len < n) {
    num = "0" + num;
    len++;
  }
  return num;
}

module.exports = {
  sendSuccess,
  sendFailed,
  pad
}