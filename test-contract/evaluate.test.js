'use strict';

const chai = require('chai');
chai.use(require('chai-shallow-deep-equal'));
const { expect } = chai;

const { getAccessToken } = require('./support/auth');
const { evaluateDocument } = require('./support/evaluate');

context('Evaluate Documents', () => {
  describe('POST /rules/:type/evaluate', () => {
    describe('Underwriting rules', () => {
      it('Returns 200 and empty arrays when evaluating a document with no underwriting errors or actions', async () => {
        const accessToken = await getAccessToken('TTIC_CSR_HO3');
        const response = await evaluateDocument('underwriting', {
          document: {
            product: 'HO3',
            transactionType: 'Renewal',
            coverageLimits: {
              dwelling: {
                amount: 100000
              },
              otherStructures: {
                amount: 70000
              }
            }
          }
        }, { accessToken });
        expect(response).to.shallowDeepEqual({ status: 200, statusText: 'OK' });
        const { data: { result } } = response;
        expect(result).to.deep.equal({ eligibility: 'Yes', underwritingActions: [], underwritingExceptions: [] });
      });
    });
  });
});
