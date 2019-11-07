const { should: chaiShould, request, expect } = require('chai'),
  server = require('../../../app'),
  should = chaiShould();

describe('/user/session POST', () => {
  beforeEach(() => Promise.resolve());
  it('Should be true', () => {
    '1'.should.be.equal('1');
  });
});
