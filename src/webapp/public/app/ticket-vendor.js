(function(lottery) {
    'use strict';
    var ticketPrice = 10;
    lottery.TicketVendor = function(ticketRoll, pot) {

        this.activeParticipants = [];

        this.sell = function(participant) {
            var ticketSold = ticketRoll.getNext();
            if (!ticketSold) {
                return null;
            }

            pot.credit(ticketPrice);
            participant.ticket = ticketSold;
            this.activeParticipants.push(participant);

            return ticketSold;
        };
    };

}(window.lottery = window.lottery || {}));
