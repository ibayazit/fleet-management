const serverless = require("serverless-http");
const app = require('./src/main');

module.exports.handler = serverless(app);
