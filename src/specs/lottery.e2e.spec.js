/* global describe it browser */

var expect = require('chai').expect;

describe("The application", function() {
    it("should serve the home page", function() {
        browser.get('http://juliemr.github.io/protractor-demo/');

        expect(browser.getTitle()).toEqual('Super Calculator');
    });
});