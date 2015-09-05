'use strict';

var expect = chai.expect;

describe('The application', function() {
    it('should export the test variable', function() {
        expect(window.test).to.equal(100);
    });
});
