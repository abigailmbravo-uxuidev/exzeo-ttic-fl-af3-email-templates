'use strict';

const path = require('path');

const fileManager = require('./file-manager');
const { updateRecord } = require('./helpers');

const underwritingRulesDirectory = path.join(__dirname, '../data/rules');
const policyStateRulesDirectory = path.join(__dirname, '../data/rules/policyState');

const updateRule = (context, rule) => {
  const { companyCode, state, product, code, type } = rule;

  return updateRecord(context, 'rules',
    {
      companyCode, state, product, code, type
    }, 
    rule
  );
};

const updateRules = async context => {
  const underwritingFiles = await fileManager.getFiles(context, underwritingRulesDirectory);
  const policyStateFiles = await fileManager.getFiles(context, policyStateRulesDirectory);
  return context.taskPool.forEach(context, updateRules.name,
    underwritingFiles.concat(policyStateFiles),
    async ruleFile => updateRule(context, await ruleFile.load())
  );
};

module.exports = { updateRules };
