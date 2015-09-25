(function(lottery){
    'use strict';
	var ticketPrice = 10;
	lottery.TicketVendor = function(ticketNumbers, pot){

		this.activeParticipants = [];

		this.sell = function(participant){
			var nextTicketNumber = ticketNumbers.shift();
			if (!nextTicketNumber){
				return null;
			}

			pot.credit(ticketPrice);

			var ticketSold = {number: nextTicketNumber};

			participant.ticket = ticketSold;
			this.activeParticipants.push(participant);
			
			return ticketSold;
		};
	};

}(window.lottery = window.lottery || {}));