'use strict';

const path = require('path');

const fileManager = require('./file-manager');
const { updateRecord } = require('./helpers');

const rulesDirectory = path.join(__dirname, '../data/rules');

const updateRule = (context, rule) => {
  const { companyCode, state, product, code } = rule;

  context.log.debug('Updating rule', { companyCode, state, product, code })

  return updateRecord(context, 'rules',
    {
      companyCode, state, product, code
    }, 
    rule
  );
};

const updateRules = async context => {
  context.log.info('Uploading rules');

  return context.taskPool.forEach(
    await fileManager.getFiles(context, rulesDirectory),
    async ruleFile => updateRule(context, await ruleFile.load())
  );
};

module.exports = { updateRules };
