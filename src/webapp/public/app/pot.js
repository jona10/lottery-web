(function(lottery){
    'use strict';
lottery.Pot = function(initialAmount){
	
	this.totalAmount = initialAmount;
	this.credit = function(amount){
		this.totalAmount += amount;
	};

};

}(window.lottery = window.lottery || {}));