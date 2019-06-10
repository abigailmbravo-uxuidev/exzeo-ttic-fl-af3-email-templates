'use strict';

const chai = require('chai');
chai.use(require('chai-shallow-deep-equal'));
const { expect } = chai;

const { getAccessToken } = require('./support/auth');
const { selfCheck } = require('./support/selfCheck');

context('Self Check', () => {
  describe('POST /selfCheck', () => {
    it('Returns correct body when all tests pass', async () => {
      const accessToken = await getAccessToken('TTIC_CSR_HO3');
      const response = await selfCheck({ accessToken });

      console.log(JSON.stringify(response.data.result, null, 2));

      if (response.data.result.failedTests && response.data.result.failedTests.length > 0) {
        console.log(
          response.data.result.failedTests
            .map(
              ({ ruleCode, description, diff }) => ({
                ruleCode, description,
                message: diff.map(({ kind, path, lhs, rhs }) => `  Expected ${path.join('.')} to be ${JSON.stringify(rhs)} but got ${JSON.stringify(lhs)}.`)
              })
            )
            .map(({ ruleCode, description, message }) => `${ruleCode}: ${description}\n${message.join('\n')}`)
            .join('\n')
        );
      }

      const { data: { result } } = response;
      expect(result).to.deep.equal({ testsPassed: 77, testsFailed: 0, failedTests: [] });
    });
  });
});
