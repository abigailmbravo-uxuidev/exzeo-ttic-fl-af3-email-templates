'use strict';

console.log(process.env);
console.log(require('exframe-configuration').config);
const { data: { mongoUrl } } = require('exframe-configuration').config.default;
const db = require('exframe-db');
const logger = require('./logger');

db.init({ logger, dbUrl: mongoUrl });

module.exports = db.mongoose;