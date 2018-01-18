/* eslint-disable */

function Deck() {
    // creates a deck of 52 playing cards
    this.deck = new Array(52);
    this.cards = 52;
    
    var counter = 0;
    var suit = "-1";
    
    for (var i = 1; i <= 4; i++) { // decides the suits
			if (i == 1) {
				suit = "Hearts";
			} else if (i == 2) {
				suit = "Diamonds";
			} else if (i == 3) {
				suit = "Spades";
			} else if (i == 4) {
				suit = "Clubs";
			}
			
			for (var j = 2; j <= 14; j++) { // decides the number
				this.deck[counter] = new Card(suit,j);
				counter++;
			}
    }
    
    // switches the chose card out of the deck
	this.pick = function(c) {
		for (var i = 0; i < 52; i++) {
            
			if (this.deck[i].getSuit() === c.getSuit() && this.deck[i].getValue() == c.getValue()) {
				this.swapCards(i,this.cards-1);
				this.cards--;
				break;
			}
		}
		return c;
		
	}
    
    this.putBackCard = function(c) {
        if (this.cards < 52) {
           for (var i = this.cards; i <= 51; i++) {
               if (this.deck[i].getSuit() === c.getSuit() && this.deck[i].getValue() == c.getValue()) {
				this.swapCards(i,this.cards);
				this.cards++;
				break;
                }
           } 
        } else {
            alert("The deck is full! Cannot put back a card.")
        }
        
    }
    
    
    this.shuffle = function() {
        if (this.cards <= 0) {
			alert("Cards Error: Number of cards is not between 1 and 52");
		} else {
			
			for (var i = 1; i <= 1000; i++) {
				for (var j = 0; j < this.cards; j++) {
					this.swapCards(j,Math.floor(Math.random()*this.cards));
				}
			}
		}
    }
    
    this.draw = function() {
        if (this.cards <= 0) {
			alert("Cards Error: No point in drawing in a deck with no cards!");
		}
		var top = this.deck[cards - 1];
		this.cards--;
		return top;
    }
    
    this.swapCards = function(a,b) {
        if (a < 0 || a > 51 || b < 0 || b > 51) {
			alert("\nIndexOutOfBoundsError: Indices need to be between 0 and 51, inclusive.\na = " + a + " and b = " + b + ".");
		} else {
			var temp = this.deck[b];
			this.deck[b] = this.deck[a];
			this.deck[a] = temp;
		}
    }
    
    this.getCards = function() {return this.cards}
    this.getDeck = function () {return this.deck}
}



