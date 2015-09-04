var expect = chai.expect;

describe("The registration form", function() {
    it.skip("should create a participant", function() {
        var element = document.createElement("input");
        element.value = "name";

        var form = new window.lottery.RegistrationForm(element);

        expect(form.toParticipant()).to.deep.equal({name: "name"})
    });
});
