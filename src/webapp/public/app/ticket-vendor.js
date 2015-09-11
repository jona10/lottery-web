(function(lottery){
    'use strict';
var ticketPrice = 10;
lottery.TicketVendor = function(ticketNumbers, pot){

	this.sell = function(participant){
		var nextTicketNumber = ticketNumbers.shift();
		if (!nextTicketNumber)
			return null;

		pot.credit(ticketPrice);

		var ticketSold = {number: nextTicketNumber};
		return ticketSold;
	};
};

}(window.lottery = window.lottery || {}));