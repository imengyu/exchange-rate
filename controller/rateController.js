module.exports = {
  /**
   * 绑定路由
   * @param {Express} app 
   */
  createRoutes(app) {
    app.get('/rates', getRates);
  }
}

const rateServices = require("../service/rateServices");

/**
 * 获取汇率
 * @param {Request} req 
 * @param {Response} res 
 */
function getRates(req, res) {
  rateServices.getRates(req, res);
}
