const log4js = require("log4js");
const log4jsConf = require("../conf/logConf.json");
const chalk = require('chalk');

log4js.configure(log4jsConf);

const http_logger = log4js.getLogger("http");
const logger = log4js.getLogger("default");

var outPutToConsole = true

module.exports = {
  /**
   * 获取 logger
   */
  getLogger() { return logger },
  /**
   * 设置是否输出到控制台
   * @param {boolean} output 
   */
  setOutPutToConsole(output) { outPutToConsole = output },


  log(...args) {
    logger.log(args);
    if(outPutToConsole) console.log(args);
  }, 
  error(message, ...args) {
    logger.error(message, args);
    if(outPutToConsole) console.error(chalk.red(message), args);
  },
  warn(message, ...args) {
    logger.warn(message, args);
    if(outPutToConsole) console.warn(chalk.yellow(message), args);
  },
  info(message, ...args) {
    logger.info(message, args);
    if(outPutToConsole) console.info(chalk.blue(message), args);
  },
}

