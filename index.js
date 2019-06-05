'use strict';

const service = require('exframe-service');
service.init({ logger: require('./lib/logger'), timeout: 0 });

const taskPool = require('./lib/task-pool').create();
taskPool.on('progress', ({ name, percentComplete }) => console.log(`${name}: ${percentComplete}`));

const user = { userId: 'mpardue', userName: 'mpardue' };

const context = {
  user,
  taskPool
};

Promise.all([
  require('./lib/update-rules').updateRules(context)
])
  .then(() => service.gracefulShutdown());
