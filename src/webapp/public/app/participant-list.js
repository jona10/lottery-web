(function(lottery) {
    'use strict';
    lottery.ParticipantList = function(listElement) {

        this.display = function(participants) {
            var table = document.createElement('table');
            participants.forEach(function(participant, index) {
                var row = table.insertRow(index);
                row.classList.add('Participant');

                var nameCell = row.insertCell(0);
                nameCell.classList.add('ParticipantName');
                nameCell.innerHTML = participant.name;

                var ticketNumberCell = row.insertCell(1);
                ticketNumberCell.classList.add('TicketNumber');
                ticketNumberCell.innerHTML = participant.ticket.number.toString();
            });

            listElement.innerHTML = '';
            listElement.appendChild(table);
        };

    };

}(window.lottery = window.lottery || {}));
