'use strict';

const axios = require('axios');
const { URL } = require('url');

const { config: { default: { ruleservice: { port } } } } = require('exframe-configuration');

const evaluateDocument = (type, document, { accessToken }) => {
  const url = new URL(`http://localhost:${port}/rules/${type}/evaluate`);

  console.log('URL', url);
  
  return axios({
    method: 'post',
    url: url.toString(),
    headers: {
      'harmony-access-key': accessToken
    },
    data: document,
    validateStatus: null
  });
};

module.exports = { evaluateDocument };
