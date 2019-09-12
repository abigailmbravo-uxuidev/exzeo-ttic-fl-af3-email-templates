'use strict';

const { argv } = require('yargs')
  .usage('Usage: $0 <command> [options]')
  .example('$0 update rules', '(updates rules)')
  .example('$0 update email', '(updates email templates)')
  .example('$0 update coveragedetails', '(updates coverage details')
  .example('$0 update --all', '(updates rules, email templates, coveragedetails)')
  .help('h')
  .alias('h', 'help');

const updateCommand = argv._.includes('update');
const updateAll = updateCommand ? (argv.all || false) : false;
const updateRules = (updateAll) || (updateCommand && argv._.includes('rules'));
const updateEmail = (updateAll) || (updateCommand && argv._.includes('email'));
const updateCoverageDetails = (updateAll) || (updateCommand && argv._.includes('coveragedetails'));

const service = require('exframe-service');

service.init({ logger: require('./lib/logger'), timeout: 0 });

const taskPool = require('exframe-task-pool').create();

taskPool.on('progress', ({ name, percentComplete }) => console.log(`${name}: ${percentComplete}`));

const user = { userId: 'mpardue', userName: 'mpardue' };

const context = {
  user,
  taskPool
};

console.log(argv);

Promise.all([
  updateRules && require('./lib/update-rules').updateRules(context),
  updateEmail && require('./lib/update-email').updateEmail(context),
  updateCoverageDetails && require('./lib/update-coveragedetails').updateCoverageDetails(context)
])
  .then(() => service.gracefulShutdown());
