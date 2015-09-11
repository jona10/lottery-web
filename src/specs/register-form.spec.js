'use strict';

var expect = chai.expect;

describe('The registration form', function() {
    it('should create a participant named "name"', function() {
        var element = document.createElement('input');
        element.value = 'name';

        var form = new lottery.RegistrationForm(element);

        expect(form.toParticipant()).to.deep.equal({name: 'name'});
    });
    it('should create a participant named "Audrée"', function() {
        var element = document.createElement('input');
        element.value = 'Audrée';

        var form = new lottery.RegistrationForm(element);

        expect(form.toParticipant()).to.deep.equal({name: 'Audrée'});
    });
});
