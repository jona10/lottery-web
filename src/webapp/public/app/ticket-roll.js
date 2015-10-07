(function(lottery){
    'use strict';
	lottery.TicketRoll = function(ticketNumbers){

		this.getNext = function(){
			var nextTicketNumber = ticketNumbers.shift();
			if (!nextTicketNumber){
				return null;
			}

			var nextTicket = {number: nextTicketNumber};
			return nextTicket;
		};
	};

}(window.lottery = window.lottery || {}));