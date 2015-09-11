'use strict';

var expect = chai.expect;

describe('The ticket vendor', function() {
	var pot;
	beforeEach(function(){
		pot = { credit: function(){}};
	});
    it('should return the next tickets available', function() {
    	var tickets = [1,2];
    	var ticketVendor = new lottery.TicketVendor(tickets, pot);

    	expect(ticketVendor.sell({})).to.deep.equal({number:1});
    	expect(ticketVendor.sell({})).to.deep.equal({number:2});
    });

	it('should return the next tickets available', function() {
    	var ticketVendor = new lottery.TicketVendor([], pot);
    	expect(ticketVendor.sell({})).to.be.null;
    });

	it('should credit 10$ to the pot when selling a ticket', function() {
    	var tickets = [1];
    	pot = {
    		amountCredited: 0, 
    		credit: function(amount){
    			this.amountCredited = amount;
    		}
    	};
    	var ticketVendor = new lottery.TicketVendor(tickets, pot);
    	ticketVendor.sell({});
    	expect(pot.amountCredited).to.equal(10);
    });

    it('should not credit the pot when there is no tickets left', function() {
    	var tickets = [];
    	pot = {
    		creditCalled: false, 
    		credit: function(){
    			this.creditCalled = true;
    		}
    	};
    	var ticketVendor = new lottery.TicketVendor(tickets, pot);
    	ticketVendor.sell({});
    	expect(pot.creditCalled).to.be.false;
    });

    it.skip('should add the participant to the list of active participants when selling a ticket', function(){
    	var tickets = [1];
    	var participant = {name: "Audrée"};
    	var ticketVendor = new lottery.TicketVendor(tickets, pot);
    	ticketVendor.sell(participant);
    	expect(ticketVendor.activeParticipants).to.contains({name:"Audrée", ticket:{number:1}});
    });
});
