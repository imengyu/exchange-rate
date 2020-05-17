const constConf = require("../conf/constConf");
const redis = require('redis');
const client = redis.createClient(constConf.REDIS_PORT, constConf.REDIS_PASSWORD, {
  password: constConf.REDIS_PASSWORD == '' ? undefined : constConf.REDIS_PASSWORD
});

module.exports = {
  getClient() {
    return client;
  }
}