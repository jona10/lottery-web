/* jshint -W100: true*/

'use strict';

var expect = require('chai').expect;

describe('The application', function () {
    it('should serve the home page', function () {
        browser.url('/');
        browser.getText('h1').then(function (text) {
            expect(text).to.equal('Lotterie Pyxis', 'the page header');
        });
    });

    it.skip('should display the winner\'s name and their prize after the draw', function(){
        browser.url('/');
        browser.setValue('input#participant-name', 'Audrée');
        browser.click('button#buy-ticket');
        browser.getText('li.participant .name').then(function(text){
            expect(text).to.equal('Audrée', 'the participant\'s name');
        });
        browser.getText('li.participant .ticket-number').then(function(text){
            expect(text).to.be.within(1, 3, 'the ticket\'s number');
        });
    });
});
