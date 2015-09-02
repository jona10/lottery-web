var expect = require('chai').expect;

describe("The application", function () {
    it("should serve the home page", function () {
        browser.url('http://localhost:3000/');
        browser.getText('h1').then(function (text) {
            expect(text).to.equal('Lotterie Pyxis', 'the page header');
        });
    });
});
