'use strict';

const chai = require('chai');
chai.use(require('chai-shallow-deep-equal'));
const { expect } = chai;

const { getAccessToken } = require('./support/auth');
const { evaluateDocument } = require('./support/evaluate');

context('Evaluate Documents', () => {
  describe('POST /rules/:type/evaluate', () => {
    describe('Underwriting rules', () => {
      it('Returns 200 and an underwriting exception when an underwriting rule is broken.', async () => {
        const accessToken = await getAccessToken('TTIC_CSR_HO3');
        const response = await evaluateDocument('underwriting', {
          document: {
            companyCode: 'TTIC',
            state: 'FL',
            zip: '32025',
            product: 'AF3',
            transactionType: 'New Business',
            property: {
              id: '',
              physicalAddress: {
                zip: '32025'
              }
            },
            lookupFields: [
              {
                name: 'zipcodesettings',
                type: 'builtIn',
                builtInConfig: {
                  name: 'zipcodesettings'
                }
              }
            ]
          }
        }, { accessToken });
        expect(response.status).to.equal(200);
        const { data: { result } } = response;
        expect(result.underwritingActions).to.exist;
        expect(result.underwritingActions.length).to.equal(0);
        expect(result.underwritingExceptions).to.exist;
        expect(result.underwritingExceptions.length).to.be.greaterThan(0);
      });
    });
  });
});
