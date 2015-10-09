/* jshint -W100: true */

'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
chaiAsPromised.transferPromiseness = browser.transferPromiseness;
chai.Should();

describe('The application', function () {
    it('should serve the home page', function () {
        return browser.url('/').getText('h1').should.eventually.equal('Lotterie Pyxis');
    });

    it.skip('should display the winner\'s name and their prize after the draw', function(){
        return browser.url('/')
            .setValue('#ParticipantNameEntry', 'Audrée')
            .click('#EnterParticipant')
            .getText('.ParticipantName').should.eventually.equal('Audrée', 'the participant\'s name')
            .getText('.TicketNumber').should.eventually.be.within(1, 3, 'the ticket\'s number')
            .click('#Draw')
            .getText('#Winners .WinnerName').should.eventually.contain('Audrée');
    });
});
