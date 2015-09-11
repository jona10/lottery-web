(function(lottery){
    'use strict';

lottery.RegistrationForm = function(element){
	
	this.toParticipant = function(){
		var name = element.value;
		return {name: name};
	};
};

}(window.lottery = window.lottery || {}));