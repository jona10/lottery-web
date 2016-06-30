(function(lottery) {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        var inputParticipantName = document.getElementById('ParticipantNameEntry');
        var form = new lottery.RegistrationForm(inputParticipantName);

        var pot = new lottery.Pot(200);
        var tickets = [1, 2, 3];
        var ticketRoll = new lottery.TicketRoll(tickets);
        var participantRegistry = new lottery.ParticipantRegistry();
        var ticketVendor = new lottery.TicketVendor(ticketRoll, pot, participantRegistry);
        var participantListElement = document.getElementById('ParticipantList');
        var participantList = new lottery.ParticipantList(participantListElement);

        document.getElementById('EnterParticipant').addEventListener('click', function() {
            ticketVendor.sell(form.toParticipant());
            participantList.display(participantRegistry.getAll());
        });

        var draw = new lottery.Draw(participantRegistry);
        document.getElementById('Draw').addEventListener('click', function() {
            draw.Draw();
        });

    });

}(window.lottery = window.lottery || {}));
