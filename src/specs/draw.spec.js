'use strict';

var expect = chai.expect;

describe('The draw', function() {
    it.skip('should pick the winners', function() {
        var participantRegistry = {
            get: function(ticket) {
                if (ticket.number === 1) {
                    return {
                        name: 'Audrée1',
                        ticket: {
                            number: 1
                        }
                    };
                }

                if (ticket.number === 2) {
                    return {
                        name: 'Audrée2',
                        ticket: {
                            number: 2
                        }
                    };
                }

                if (ticket.number === 3) {
                    return {
                        name: 'Audrée3',
                        ticket: {
                            number: 3
                        }
                    };
                }
            }
        };

        var ballMachine = {
            balls: [1, 2, 3],
            getBallNumber: function() {
                var ball = this.balls[0];
                this.balls.splice(0, 1);
                return ball;
            }
        };

        var pot = {
            removedAmount: 0,
            debit: function(amount) {
                this.removedAmount = amount;
            }
        };

        var prizeDistribution = {
            getPrize: function(ranking) {
                if (ranking === 1) {
                    return 5;
                }

                if (ranking === 2) {
                    return 10;
                }

                if (ranking === 3) {
                    return 15;
                }
            }
        };

        var draw = new lottery.Draw(participantRegistry, ballMachine, pot, prizeDistribution);
        var winners = draw.draw();
        
        var firstWinner = winners[0];
        expect(firstWinner).to.deep.equal({
            name: 'Audrée1',
            prize: 5
        });

        var secondWinner = winners[1];
        expect(secondWinner).to.deep.equal({
            name: 'Audrée2',
            prize: 10
        });

        var thirdWinner = winners[2];
        expect(thirdWinner).to.deep.equal({
            name: 'Audrée3',
            prize: 15
        });

        expect(pot.removedAmount).to.equal(30);
    });
});
