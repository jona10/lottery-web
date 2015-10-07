'use strict';

var expect = chai.expect;

describe('The participant registry', function() {
    it('should retrieve a participant by his ticket', function() {
        var participant = {
            name: 'Audrée',
            ticket: {
                number: 1
            }
        };
        var participantRegistry = new lottery.ParticipantRegistry();
        participantRegistry.add(participant);
        expect(participantRegistry.get({number:1})).to.deep.equal({
            name: 'Audrée',
            ticket: {
                number: 1
            }
        });
    });
    it('should retrieve all the participants', function() {
        var participant = {
            name: 'Audrée',
            ticket: {
                number: 1
            }
        };
        var participantRegistry = new lottery.ParticipantRegistry();
        participantRegistry.add(participant);
        expect(participantRegistry.getAll()).to.contain({
            name: 'Audrée',
            ticket: {
                number: 1
            }
        });
    });
});