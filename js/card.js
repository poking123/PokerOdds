/* eslint-disable */

function Card(suit, value) {
    var suitError = false;
    var valueError = false;

    if (suit === "Hearts" || suit === "Diamonds" || suit === "Spades" || suit === "Clubs") {
        this.suit = suit;
    } else {
        suitError = true;
        
    }

    if (value < 2 || value > 14) {
        valueError = true;
    } else {
        this.value = value;
        if (value < 10) {
            this.strValue = value.toString();
        } else if (value == 10) {
            this.strValue = "T";
        } else if (value == 11) {
            this.strValue = "J";
        } else if (value == 12) {
            this.strValue = "Q";
        } else if (value == 13) {
            this.strValue = "K";
        } else {
            this.strValue = "A";
        }
    }

    
    if (suitError && valueError) {
        alert("Value Error: Value must be between 2 and 14, inclusive.\n" +
                    "Suit Error: Only Possible suits are: \"Hearts\", \"Diamonds\", \"Spades\", or \"Clubs\".");
    } else if (suitError) {
        alert("Suit Error: Only Possible suits are: \"Hearts\", \"Diamonds\", \"Spades\", or \"Clubs\".");
    } else if (valueError) {
        alert("Value Error: Value must be between 2 and 14, inclusive.");
    }
    
    this.getSuit = function() {return this.suit}
    this.getValue = function() {return this.value}
    this.getStrValue = function() {return this.strValue}
    this.toString = function() {
        var s;
        if (value >= 11 && value <= 14) {
			if (value == 11) {
				s = "Jack";
			} else if (value == 12) {
				s = "Queen";
			} else if (value == 13){
				s = "King";
			} else {
				s = "Ace";
			}
			
			return s + " of " + suit;
		} else {
			return value + " of " + suit;
		}
    }

}
