'use strict';

const path = require('path');

const fileManager = require('./file-manager');
const { updateRecord } = require('./helpers');

const emailDirectory = path.join(__dirname, '../data/email/json');

const updateEmailTemplate = (context, email) => {
  const { companyCode, state, product, name } = email;

  return updateRecord(context, 'emailtemplates',
    {
      companyCode, state, product, name
    },
    email
  );
};

const updateEmail = async context => {
  return context.taskPool.forEach(context, updateRecord.name,
    await fileManager.getJSONFiles(context, emailDirectory),
    async emailFile => updateEmailTemplate(context, await emailFile.load())
  );
};

module.exports = { updateEmail };
