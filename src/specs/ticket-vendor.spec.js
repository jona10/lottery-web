'use strict';

var expect = chai.expect;

describe('The ticket vendor', function() {
    var pot;
    var ticketRoll;
    beforeEach(function() {
        pot = {
            credit: function() {}
        };
        ticketRoll = {
            getNext: function() {
                return {
                    number: 1
                };
            }
        };
    });
    it('should return the next tickets available', function() {
        ticketRoll.getNext = function() {
            return {
                number: 3
            };
        };
        var ticketVendor = new lottery.TicketVendor(ticketRoll, pot);

        expect(ticketVendor.sell({})).to.deep.equal({
            number: 3
        });
    });

    it('should not return any tickets when the draw is sold out', function() {
        ticketRoll.getNext = function() {
            return null;
        };

        var ticketVendor = new lottery.TicketVendor(ticketRoll, pot);
        expect(ticketVendor.sell({})).to.be.null;
    });

    it('should credit 10$ to the pot when selling a ticket', function() {
        pot = {
            amountCredited: 0,
            credit: function(amount) {
                this.amountCredited = amount;
            }
        };
        var ticketVendor = new lottery.TicketVendor(ticketRoll, pot);
        ticketVendor.sell({});
        expect(pot.amountCredited).to.equal(10);
    });

    it('should not credit the pot when there is no tickets left', function() {
        ticketRoll.getNext = function() {
            return null;
        };
        pot = {
            creditCalled: false,
            credit: function() {
                this.creditCalled = true;
            }
        };
        var ticketVendor = new lottery.TicketVendor(ticketRoll, pot);
        ticketVendor.sell({});
        expect(pot.creditCalled).to.be.false;
    });

    it('should add the participant to the list of active participants when selling a ticket', function() {
        var participant = {
            name: 'Audrée'
        };
        var ticketVendor = new lottery.TicketVendor(ticketRoll, pot);
        ticketVendor.sell(participant);
        expect(ticketVendor.activeParticipants).to.contains({
            name: 'Audrée',
            ticket: {
                number: 1
            }
        });
    });
});
