/* eslint-disable */

function Player(name) {
    this.name = name;
    this.hand = new Array(2);
    this.cards = 0;
    
    this.giveCard = function(card) {
        
        if (this.cards != 2) {
			if (this.hand[0] == null) {
				this.hand[0] = card;
			} else {
				this.hand[1] = card;
			}
			this.cards++;
		} else {
			alert("Could not draw another card for " + this.name + ". " + this.name + " already has 2 cards.");
		}
    }
    
    this.removeCard = function(index) {
		if (this.hand[index] != null) {
            var temp = this.hand[index];
			this.hand[index] = null;
            this.cards--;
            return temp;
		} else {
			alert("There is no card at index " + index + ".");
		}
	}
    
    this.getName = function() {return this.name}
    this.getNumOfCards = function() {return this.cards}
    this.getHand = function() {return this.hand}
}

