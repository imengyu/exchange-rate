const express = require('express')
const app = express()
const bodyParser = require('body-parser');

const constConf = require("./conf/constConf");
const logger = require("./utils/logger");

const defaultController = require("./controller/defaultController");
const rateController = require("./controller/rateController");
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redis = require('redis')

let client = redis.createClient({
  host: constConf.REDIS_HOST,
  port: constConf.REDIS_PORT,
})

app.use(bodyParser.json());
app.use(session({
  cookie: {
    maxAge: 640000
  },
  secret: 'lgjzb_server',
  store: new RedisStore({
    client: client,
    host: constConf.REDIS_HOST,
    port: constConf.REDIS_PORT,
    ttl: 60 * 60 * 24 * 30, 
    prefix: 'ss',
  }),
  saveUninitialized: false,
  resave: false,
}));

defaultController.createRoutes(app);
rateController.createRoutes(app);

app.listen(constConf.APP_PORT, () => logger.info('[Server] App listening on port ' + constConf.APP_PORT + '!'))
app.all('/*', function(req, res, next){
  logger.info(`[Request] ${req.method} ${req.url} / ${req.ip}`);
  next();
});
