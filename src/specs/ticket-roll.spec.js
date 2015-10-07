'use strict';

var expect = chai.expect;

describe('The ticket roll', function() {
    it('should return the next tickets available', function() {
        var tickets = [1,2];
        var ticketRoll = new lottery.TicketRoll(tickets);

        expect(ticketRoll.getNext()).to.deep.equal({number:1});
        expect(ticketRoll.getNext()).to.deep.equal({number:2});
    });

    it('should not return any tickets when the draw is sold out', function() {
        var ticketRoll = new lottery.TicketRoll([]);
        expect(ticketRoll.getNext()).to.be.null;
    });
});