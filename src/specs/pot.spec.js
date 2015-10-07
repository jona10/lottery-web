'use strict';

var expect = chai.expect;

describe('The pot', function() {
    it('should credit the given amount', function() {
        var pot = new lottery.Pot(0);
        pot.credit(10);
        expect(pot.totalAmount).to.equal(10);
    });
});
