'use strict';

var expect = chai.expect;

describe('The participant list', function() {
    it('should display participants', function() {
        var element = document.createElement('div');
        var participantList = new lottery.ParticipantList(element);
        var participants = [{name:'Audrée', ticket:{number:1}}];
        participantList.display(participants);
        displaysInOrder(participants, element);

        var participantsUpdated = [{name:'Audrée', ticket:{number:1}}, {name:'Jo', ticket:{number:2}}];
        participantList.display(participantsUpdated);
        displaysInOrder(participantsUpdated, element);
    });

    var displaysInOrder = function(participants, element){
        var participantsDisplayed = element.querySelectorAll('.Participant');
        expect(participantsDisplayed).to.have.length(participants.length);
        
        for (var i=0; i<participantsDisplayed.length; i+=1){
            var participantName = participantsDisplayed[i].querySelectorAll('.ParticipantName');
            expect(participantName[0].innerHTML).to.equal(participants[i].name);

            var ticketNumber = participantsDisplayed[i].querySelectorAll('.TicketNumber');
            expect(ticketNumber[0].innerHTML).to.equal(participants[i].ticket.number.toString());
        }
        
    };
});
