(function(lottery) {
    'use strict';
    lottery.ParticipantRegistry = function() {

        var activeParticipants = {};

        this.add = function(participant) {
            activeParticipants[participant.ticket.number] = participant;
        };

        this.get = function(ticket) {
            return activeParticipants[ticket.number];
        };

        this.getAll = function() {
            var participants = [];
            for (var number in activeParticipants) {
                if (activeParticipants.hasOwnProperty(number)) {
                    participants.push(activeParticipants[number]);
                }
            }

            return participants;
        };
    };

}(window.lottery = window.lottery || {}));
