'use strict';

const taskPool = require('./lib/task-pool').create();

const user = { userId: 'mpardue', userName: 'mpardue' };

const context = {
  user,
  taskPool,
  log: require('./lib/logger')
};

Promise.all([
  require('./lib/update-rules').updateRules(context)
])
  .then(process.exit);
