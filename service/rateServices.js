const common = require('../utils/common');
const redis = require('../utils/redis')
const logger = require("../utils/logger");
const http = require("http");  

module.exports = {

  /**
   * 获取汇率
   * @param {Request} req 
   * @param {Response} res 返回
   */
  getRates(req, res) {
    redis.getClient().GET('lastUpdateTime', (err, data) => {
      if(err) {
        this.requestRatesAndReturn(res);
      }else {
        var lastTime = parseFloat(data);
        if(req.query.forceRequest == '20200516' || isNaN(lastTime) 
          || new Date().getTime() - lastTime > 3600) this.requestRatesAndReturn(res);
        else this.getRatesTempAndReturn(res);
      }
    });
  },

  /**
   * 获取汇率并返回
   * @param {Response} res 返回
   */
  requestRatesAndReturn(res) {
    doRequestRates(res, (data) => common.sendSuccess(res, '成功', data))
  },
  /**
   * 获取汇率缓存
   * @param {Response} res 返回
   */
  getRatesTempAndReturn(res) {
    if(!redis.getClient().GET('ratesTemp', (err, data) => {
      if(err) common.sendFailed(res, '失败，读取缓存错误', err);
      else common.sendSuccess(res, '成功', JSON.parse(data));
    })) common.sendFailed(res, '失败，读取缓存错误');
  },

}


var body = '';

/**
 * 请求 API
 * @param {Response} res 返回
 * @param {(data)=>void} callback 请求回调
 */
function doRequestRates(tres, callback) {
  var req = http.request('http://ali-waihui.showapi.com/waihui-list', { 
    method: 'GET',
    headers: {
      "Authorization":"APPCODE 1f941673abb946cdb3d6c62f27e7a5c8"
    }
  }, function(res) {  
    if(res.statusCode == 200) {
      res
        .on('data', (data) => body += data)
        .on('end', () => solveRates(tres, body, callback));  
    }else common.sendFailed(tres, '请求汇率数据失败：' + res.statusCode)
  }).on('error', (e) => common.sendFailed(tres, '请求汇率数据失败：' + e.message));
  req.end();
}
/**
 * 处理汇率数据
 * @param {Response} res 返回
 * @param {(data)=>void} callback 请求回调
 */
function solveRates(res, body, callback) {
  var targetData = [];
  var data = JSON.parse(body);
  var list = data.showapi_res_body.list;
  list.forEach(element => {
    var newData = {
      name: element.name,
      code: element.code,
      base: element.hui_in / 100,
    }
    targetData.push(newData);
  });
  redis.getClient().SET('lastUpdateTime', new Date().getTime().toString());
  callback(targetData);
}