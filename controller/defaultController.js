const express = require('express')

module.exports = {
  /**
   * 绑定路由
   * @param {Express} app 
   */
  createRoutes(app) {
    app.get('/', defaultHandler);
  }
}

/**
 * 默认处理器
 * @param {Request} req 
 * @param {Response} res 
 */
function defaultHandler(req, res) {
  res.send('hello ! exchange-rate')
}