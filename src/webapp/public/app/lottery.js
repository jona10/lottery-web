(function(lottery){
    'use strict';

    document.addEventListener("DOMContentLoaded", function(){
      		var inputParticipantName = document.getElementById("ParticipantNameEntry");
        	var form = new lottery.RegistrationForm(inputParticipantName);

         	var pot = new lottery.Pot(200);
        	var tickets = [1,2,3];
    		var ticketVendor = new lottery.TicketVendor(tickets, pot);
    		var participantListElement = document.getElementById("ParticipantList");
    		var participantList = new lottery.ParticipantList(participantListElement);
    		
    	document.getElementById("EnterParticipant").addEventListener("click", function(){
    		ticketVendor.sell(form.toParticipant());
    		participantList.display(ticketVendor.activeParticipants);
    	});

    });

}(window.lottery = window.lottery || {}));
