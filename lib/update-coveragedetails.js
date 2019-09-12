'use strict';

const path = require('path');

const { getFiles, updateRecord } = require('exframe-company-package');

const coverageLimitDirectory = path.join(__dirname, '../data/coveragedetails/coverageLimit');
const coverageOptionDirectory = path.join(__dirname, '../data/coveragedetails/coverageOption');
const deductibleDirectory = path.join(__dirname, '../data/coveragedetails/deductible');

const updateCoverageDetail = (context, rule) => {
  const { companyCode, state, product, type, name } = rule;

  return updateRecord(context, 'coveragedetails',
    {
      companyCode, state, product, type, name
    },
    rule);
};

const updateCoverageDetails = async context => {
  return context.taskPool.forEach(context, updateCoverageDetails.name,
    [...await getFiles(context, deductibleDirectory),
      ...await getFiles(context, coverageOptionDirectory),
      ...await getFiles(context, coverageLimitDirectory)
    ],
    async ruleFile => updateCoverageDetail(context, await ruleFile.load()));
};

module.exports = { updateCoverageDetails };
