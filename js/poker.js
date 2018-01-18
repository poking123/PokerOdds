/* eslint-disable */

function Poker() {

    this.d = new Deck();
    this.holeCards = new Array(5);
    this.flop = false;
    this.turn = false;
	this.river = false;
	this.numOfHoleCards = 0;
    
    
    
    this.showFlop = function() {
        for (var i = 0; i <= 3; i++) {
			this.holeCards[i] = d.draw(); // draws a card from the deck
		}
		this.flop = true;
		this.numOfHoleCards = 3;
    }
    this.showTurn = function() {
        if (this.flop) {
			var i = 3;
			this.holeCards[i] = d.draw();
			this.turn = true;
			this.numOfHoleCards = 4;
		} else {
			alert("Action not executed. The flop has not been played yet.");
		}
    }
    this.showRiver = function() {
        if (this.turn) {
			var i = 4;
			this.holeCards[i] = d.draw();
			this.river = true;
			this.numOfHoleCards = 5;
		} else {
			alert("Action not executed. The turn has not been played yet.");
		}
    }
    
    this.setFlop = function(c1,c2,c3) {
        this.holeCards[0] = c1;
		this.holeCards[1] = c2;
		this.holeCards[2] = c3;
		if (this.numOfHoleCards == 0) {
			this.numOfHoleCards = 3;
		}
		this.flop = true;
    }
    this.setTurn = function(c) {
        if (this.flop) {
			this.holeCards[3] = c;
			if (this.numOfHoleCards == 3) {
				this.numOfHoleCards = 4;
			}
			this.turn = true;
		} else {
			alert("Turn not set. Need to see a flop first.");
		}
    }
    this.setRiver = function(c) {
        if (this.turn) {
			this.holeCards[4] = c;
			if (this.numOfHoleCards == 4) {
				this.numOfHoleCards = 5;
			}
			this.river = true;
		} else {
			alert("Cannot set River. Need to have a turn first.");
		}
    }
    
    this.printHoleCards = function() {
        var print = "Hole Cards:\n";
		if (flop) {
			print += holeCards[0] + "\n";
			print += holeCards[1] + "\n"; 
			print += holeCards[2] + "\n"; 
		}
		
		if (this.flop && this.turn) {
			print += holeCards[3] + "\n"; 
		}
		
		if (this.flop && this.turn && this.river) {
			this.print += holeCards[4]; 
		}
		
		alert(this.print);
    }
    
    this.playerHand = function(player,holeCards) {
        var playerHand = player.getHand();
		var cards = new Array(7);
        
		
		for (var i = 0; i <= 4; i++) {
			cards[i] = holeCards[i];
		}
		cards[5] = playerHand[0];
		cards[6] = playerHand[1];
		return cards;
    }
    
    this.hasAceStraightFlush = function(player) {
        var cards = this.playerHand(player, this.holeCards);
		
		// sorts the 7 card hand into decreasing order (highest to lowest)
		this.insertionSortCards(cards);
		
		
		var iterator = 0;
		var counter = 1;
		var found = false;
		var stay = true;
		var indices = "";
		
		// checks for A-5-4-3-2
		// greater straights found in isAStraight (so 6-5-4-3-2 is not found here)
		if (cards[0].getValue() == 14) {
			var suit = cards[0].getSuit();
			if (cards[1].getValue() != 5) {
				if (cards[2].getValue() != 5) {
					if (cards[3].getValue() != 5) { // impossible to have a 5-4-3-2-A straight
						return "";
					} else {
						if (cards[3].getSuit() === suit) {
							iterator = 3;
							indices = cards[3].getStrValue();
						}
					}
				} else {
					if (cards[2].getSuit() === suit) {
						iterator = 2;
						indices = cards[2].getStrValue();
					}
				}
			} else {
				if (cards[1].getSuit() === suit) {
					iterator = 1;
					indices = cards[1].getStrValue();
				}
			}
			
			// if got here, then there is at least one 5 in indices 1-3
			
			while (iterator < 6 && stay) {
				if (cards[iterator].getValue() == cards[iterator+1].getValue()) {
					if (cards[iterator+1].getSuit() === suit) {
						indices = cards[iterator + 1].getStrValue() + indices;
						counter++;
					}
				} else if (cards[iterator].getValue() == cards[iterator+1].getValue()+1) {
					if (cards[iterator+1].getSuit() === suit) {
						indices = cards[iterator + 1].getStrValue() + indices;
						counter++;
					}
				} else {
					stay = false;
				}
				iterator++;
				if (counter == 4) {
					found = true;
					stay = false;
				}
			}
			
			if (found) {
				indices = cards[0].getStrValue() + indices;
				return indices;
			} else {
				return "";
			}
			
		} else {
			return "";
		}
    }
    this.hasAStraightFlush = function(player) {
        var cards = this.playerHand(player, this.holeCards);
		
		// sorts the 7 card hand into decreasing order (highest to lowest)
		this.insertionSortCards(cards);
		
		
		var iterator = 0;
		var counter = 1;
		var found = false;
		var indices = "";
		
		
		while (iterator < 3 && !found) {
			var iteratorValue = cards[iterator].getValue();
			var suit = cards[iterator].getSuit();
			indices = cards[iterator].getStrValue();
			counter = 1;
			
			// need 5 in a row for a straight
			for (var j = iterator + 1; j < 7; j++) {
				if (cards[j].getValue()+1 == iteratorValue) {
					if (suit === cards[j].getSuit()) {
						iteratorValue--;
						indices = cards[j].getStrValue() + indices;
						counter++;
					}
				} else if (cards[j].getValue() != iteratorValue) {
					break;
				} else {
					//visited = true;
					if (cards[j].getSuit() === suit) {
						indices = cards[j].getStrValue() + indices;
						counter++;
					}
				}
				
				if (counter >= 5) {
					found = true;
					break;
				}
				
			}

			iterator++;
			
			
		}
		// does not include the case of ace-2-3-4-5
		if (found) {
			return indices;
		} else {
			return "";
		}
    }
    this.hasAStraight = function(player) {
        var cards = this.playerHand(player, this.holeCards);
		
		// sorts the 7 card hand into decreasing order (highest to lowest)
		this.insertionSortCards(cards);
		
		
		var iterator = 0;
		var counter = 1;
		var found = false;
		var indices = "";
		
		
		while (iterator < 3 && !found) {
            counter = 1;
			indices = iterator.toString();
			// need 5 in a row for a straight
			for (var j = iterator + 1; j < 7; j++) {
				if (cards[j].getValue()+1 == cards[j-1].getValue()) {
					indices = cards[j].getStrValue() + indices;
					counter++;
				} else if (cards[j].getValue() != cards[j-1].getValue()) {
					break;
				}
				
				if (counter >= 5) {
					found = true;
					break;
				}
			}
			iterator++;

		}
		// does not include the case of ace-2-3-4-5
		if (found) {
			return indices;
		} else {
			return "";
		}
    }
    this.hasAceStraight = function(player) {
        var cards = this.playerHand(player, this.holeCards);
		
		// sorts the 7 card hand into decreasing order (highest to lowest)
		this.insertionSortCards(cards);
		
		
		var iterator = 0;
		var counter = 1;
		var found = false;
		var stay = true;
		var indices = "";
		
		
		// checks for A-5-4-3-2
		// greater straights found in isAStraight (so 6-5-4-3-2 is not found here)
		if (cards[0].getValue() == 14) {
			if (cards[1].getValue() != 5) {
				if (cards[2].getValue() != 5) {
					if (cards[3].getValue() != 5) { // impossible to have a 5-4-3-2-A straight
						return "";
					} else {
						iterator = 3;
						indices = cards[3].getStrValue();
					}
				} else {
					iterator = 2;
					indices = cards[2].getStrValue();
				}
			} else {
				iterator = 1;
				indices = cards[1].getStrValue();
			}
			
			// if got here, then there is at least one 5 in indices 1-3
			
			while (iterator < 6 && stay) {
				if (cards[iterator].getValue() == cards[iterator+1].getValue()) {
					iterator++;
				} else if (cards[iterator].getValue() == cards[iterator+1].getValue()+1) {
					indices = cards[iterator + 1].getStrValue() + indices;
					counter++;
					iterator++;
				} else {
					stay = false;
				}
				
				if (counter == 4) {
					found = true;
					stay = false;
				}
			}
			
			if (found) {
				indices = cards[0].getStrValue() + indices;
				return indices;
			} else {
				return "";
			}
			
		} else {
			return "";
		}
    }
    this.hasAFlush = function(player) {
        var cards = this.playerHand(player, this.holeCards);
		
		// sorts the 7 card hand into decreasing order (highest to lowest)
		this.insertionSortCards(cards);
		
		var indices = "";
		var flush = false;
		var suit = -1;
		var suits = Array(4);
		// 0 = hearts
		// 1 = diamonds
		// 2 = spades
		// 3 = clubs
        
		for (var i = 0; i < 7; i++) {
			if (cards[i].getSuit() === "Hearts") {
				suits[0]++;
			} else if (cards[i].getSuit() === "Diamonds") {
				suits[1]++;
			} else if (cards[i].getSuit() === "Spades") {
				suits[2]++;
			} else { // clubs
				suits[3]++;
			}
		}
		
		for (var i = 0; i < 4; i++) {
			if (suits[i] >= 5) {
				flush = true;
				suit = i;
			}
		}
		
		if (flush) {
			var iterator = 0;
			var count = 0;
			if (suit == 0) {
				while (count != 5) {
					if (cards[iterator].getSuit() === "Hearts") {
						indices = cards[iterator].getStrValue() + indices;
						count++;
					}
						
					iterator++;
				}
			} else if (suit == 1) {
				while (count != 5) {
					if (cards[iterator].getSuit() === "Diamonds") {
						indices = cards[iterator].getStrValue() + indices;
						count++;
					}
						
					iterator++;
				}
			} else if (suit == 2) {
				while (count != 5) {
					if (cards[iterator].getSuit() === "Spades") {
						indices = cards[iterator].getStrValue() + indices;
						count++;
				}
					
				iterator++;
				}
			} else {
				while (count != 5) {
					if (cards[iterator].getSuit() === "Clubs") {
						indices = cards[iterator].getStrValue() + indices;
						count++;
					}
					
					iterator++;
				}
			}
			return indices;
			
		} else {
			return "";
		}
    }
    this.hasAFullHouse = function(player) {
        var cards = this.playerHand(player, this.holeCards);
		
		// sorts the 7 card hand into decreasing order (highest to lowest)
		this.insertionSortCards(cards);
		
		var iterator = 0;
		var stay = true;
		var tripleStart = -1;
		var pairStart = -1;
		var indices = "";
		
		while (iterator < 6 && stay) {
			if (iterator == 5 && tripleStart == -1) {
				stay = false;
			} else if (cards[iterator].getValue() == cards[iterator+1].getValue()) {
				if (tripleStart == -1) {
					if (cards[iterator].getValue() == cards[iterator+2].getValue()) {
						tripleStart = iterator;
						iterator += 2; // extra iteration++s because the 2nd number in a 3 of a kind could be called a pair
					} else {
						if (pairStart == -1) {
							pairStart = iterator;
							iterator++;
						}
						
					}
				} else {
					pairStart = iterator;
					iterator++;
				}
			}
			iterator++;
			if (tripleStart != -1 && pairStart != -1) {
				stay = false;
			}
		}
		
		if (tripleStart != -1 && pairStart != -1) {
			// makes the hand (5 cards)
			indices = cards[tripleStart].getStrValue() + indices;
			indices = cards[tripleStart + 1].getStrValue() + indices;
			indices = cards[tripleStart + 2].getStrValue() + indices;
			indices = cards[pairStart].getStrValue() + indices;
			indices = cards[pairStart + 1].getStrValue() + indices;
			return indices;
		} else {
			return "";
		}
    }
    this.hasFourOfAKind = function(player) {
        var cards = this.playerHand(player, this.holeCards);

		// sorts the 7 card hand into decreasing order (highest to lowest)
		this.insertionSortCards(cards);
				
		var iterator = 0;
		var found = false;
		var indices = "";
		
		while (!found && iterator < 4) {
			var target = cards[iterator].getValue();
			
			// if there is a three of a kind
			if (target == cards[iterator+1].getValue() &&
					target == cards[iterator+2].getValue() &&
					target == cards[iterator+3].getValue()) {
				found = true;
				var j = iterator;
				indices = cards[j].getStrValue() + indices;
				indices = cards[j + 1].getStrValue() + indices;
				indices = cards[j + 2].getStrValue() + indices;
				indices = cards[j + 3].getStrValue() + indices;
				var count = 4;
				iterator = 0;
				while (count != 5) {
					if (iterator != j && iterator != (j+1) && iterator != (j+2) && iterator != (j+3)) {
						indices = cards[iterator].getStrValue() + indices;
						count++;
					}
					iterator++;
				}
			}
			iterator++;
		}
		
		if (found) {
			return indices;
		} else {
			return "";
		}
    }
    this.hasThreeOfAKind = function(player) {
        var cards = this.playerHand(player, this.holeCards);
		
		// sorts the 7 card hand into decreasing order (highest to lowest)
		this.insertionSortCards(cards);
		
		var iterator = 0;
		var found = false;
		var indices = "";
		var counter = 0;
		
		while (!found && iterator < 5) {
			var target = cards[iterator].getValue();
			
			// if there is a three of a kind
			if (target == cards[iterator+1].getValue() &&
					target == cards[iterator+2].getValue()) {
				found = true;
				var j = iterator;
				indices = cards[j].getStrValue() + indices;
				indices = cards[j + 1].getStrValue() + indices;
				indices = cards[j + 2].getStrValue() + indices;
				counter += 3;
				iterator = 0;
				while (counter != 5) {
					if (iterator != j && iterator != (j+1) && iterator != (j+2)) {
						indices = cards[iterator].getStrValue() + indices;
						counter++;
					}
					iterator++;
				}
			} else {
				if (counter < 2) {
					indices = indices + cards[iterator+1].getStrValue() + cards[iterator].getStrValue();
					counter += 2;
				}
			}
			iterator++;
		}
		
		if (found) {
			return indices;
		} else {
			return "";
		}
    }
    this.hasTwoPair = function(player) {
        var cards = this.playerHand(player, this.holeCards);
		
		// sorts the 7 card hand into decreasing order (highest to lowest)
		this.insertionSortCards(cards);
		
		var first = -1;
		var second = -1;
		var iterator = 0;
		var stay = true;
		var indices = "";
		var counter = 0;
		
		while (iterator < 6 && stay) {
			if (cards[iterator].getValue() == cards[iterator+1].getValue()) {
				if (first != -1) {
					second = iterator;
					stay = false;
				} else {
					first = iterator;
				}
				iterator++;
			} else {
				if (counter < 1) {
					indices = cards[iterator].getStrValue() + indices;
					counter++;
				}
			}
			iterator++;
		}
		
		if (second != -1) {
			indices = indices + cards[second].getStrValue();
			indices = indices + cards[second + 1].getStrValue();
			indices = indices +  cards[first].getStrValue();
			indices = indices +  cards[first + 1].getStrValue();
			
			counter += 4;
			iterator = 0;
			while (counter != 5) {
				if (iterator != first && iterator != (first+1) &&
						iterator != second && iterator != (second+1)) {
					indices = cards[iterator].getStrValue() + indices;
					counter++;
				}
				iterator++;
			}
			// we get here if two pair has been found
			return indices;
		}
		
		// we get here if two pair has not been found
		return "";
    }
    this.hasAPair = function(player) {
        var cards = this.playerHand(player, this.holeCards);
		
		// sorts the 7 card hand into decreasing order (highest to lowest)
		this.insertionSortCards(cards);
		
		var iterator = 0;
		var found = false;
		var indices = "";
		var counter = 0;
		
		// sorts the cards and then compares each card with the one next to it
		// pairs should be next to each other
		while (!found && iterator < 6) {
			var target = cards[iterator].getValue();
			var j = iterator + 1;

			if (cards[j].getValue() == target) {
				found = true;
				// adds the indices of the pair to the variable indices
				indices = indices + cards[j].getStrValue();
				indices = indices + cards[j - 1].getStrValue();
				counter += 2; // counter how many indices have been added (counts to 5)
				iterator = 0;
				while (counter != 5) { // adds in remaining cards
					if (iterator != (j - 1) && iterator != j) {
						indices = cards[iterator].getStrValue() + indices;
						counter++;
					}
					iterator++;
				}
			} else {
				if (counter < 3) {
					indices = cards[iterator].getStrValue() + indices;
					counter++;
				}
			}
			iterator++;
		}
		
		if (found) {
			return indices;
		} else {
			return "";
		}
    }
    
    this.declareHand = function(player) {
        // 8 - straight flush
		// 7 - four of a kind
		// 6 - full house
		// 5 - flush
		// 4 - straight
		// 3 - three of a kind
		// 2 - two pair
		// 1 - one pair
		// 0 - high card

        var cards = this.playerHand(player, this.holeCards);
        
		// sorts the 7 card hand into decreasing order (highest to lowest)
		this.insertionSortCards(cards);

        var highestCards = cards[4].getStrValue() + cards[3].getStrValue() + cards[2].getStrValue() +
				cards[1].getStrValue() + cards[0].getStrValue();
  
		
		// put four of a kind over three of a kind and a pair
		var temp = this.hasAStraightFlush(player);
        //alert("Straight Flush: " + temp);
        
		if (temp) { // straight flush
			return 8 + temp;
		}
        
		temp = this.hasAceStraightFlush(player);
        //alert("Ace Straight Flush: " + temp);
		if (temp) {
			return 8 + temp;
		}
		
		temp = this.hasFourOfAKind(player);
        //alert("Four of a Kind " + temp);
		if (temp) {
			return 7 + temp;
		}
        
		temp = this.hasAFullHouse(player);
        //alert("Full House " + temp);
		if (temp) {
			return 6 + temp;
		} 
		
		temp = this.hasAFlush(player);
        //alert("Flush " + temp);
		if (temp) {
			return 5 + temp;
		} 
		
		temp = this.hasAStraight(player);
        //alert("Straight " + temp);
		if (temp) {
			return 4 + temp;
		} 
		
		temp = this.hasAceStraight(player);
        //alert("Ace Straight " + temp);
		if (temp) {
			return 4 + temp;
		} 
		
		temp = this.hasThreeOfAKind(player);
        //alert("Three of a Kind " + temp);
		if (temp) {
			return 3 + temp;
		} 
		
		temp = this.hasTwoPair(player);
        //alert("Two Pair " + temp);
		if (temp) {
			return 2 + temp;
		} 
		
		temp = this.hasAPair(player);
        //alert("One Pair " + temp);
		if (temp) {
			return 1 + temp;
		} 
		//alert("High Card " + temp);
		
		return 0 + highestCards;
    }
    
    this.compareHand = function(player1, player2) {
        //alert("here at compareHand");
        var p1Hand = this.declareHand(player1);
		var p2Hand = this.declareHand(player2);
        //alert("finished declareHand");
        
		var p1 = parseInt(p1Hand.substring(0,1));
		var p2 = parseInt(p2Hand.substring(0,1));
        //alert("some one will win?");
		if (p1 > p2) {
			return 0;
		} else if (p1 < p2) {
			return 1;
		} else { // p1 = p2
			var iterator = 5;
			//alert("tie")
			while (iterator > 0) {
				// value of 1st, 2nd, ... card
				var p1Temp;
				var p2Temp;
                // changes string value to numerical value
				if (p1Hand.substring(iterator,iterator+1) === "A") {
					p1Temp = 14;
				} else if (p1Hand.substring(iterator,iterator+1) === "K") {
					p1Temp = 13;
				} else if (p1Hand.substring(iterator,iterator+1) === "Q") {
					p1Temp = 12;
				} else if (p1Hand.substring(iterator,iterator+1) === "J") {
					p1Temp = 11;
				} else if (p1Hand.substring(iterator,iterator+1) === "T") {
					p1Temp = 10;
				} else {
					p1Temp = parseInt(p1Hand.substring(iterator,iterator+1));
				}
				
				if (p2Hand.substring(iterator,iterator+1) === "A") {
					p2Temp = 14;
				} else if (p2Hand.substring(iterator,iterator+1) === "K") {
					p2Temp = 13;
				} else if (p2Hand.substring(iterator,iterator+1) === "Q") {
					p2Temp = 12;
				} else if (p2Hand.substring(iterator,iterator+1) === "J") {
					p2Temp = 11;
				} else if (p2Hand.substring(iterator,iterator+1) === "T") {
					p2Temp = 10;
				} else {
					p2Temp = parseInt(p2Hand.substring(iterator,iterator+1));
				}
				//alert("ready to compare");
                //alert("p1Temp is " + p1Temp);
                //alert("p2Temp is " + p2Temp);
				if (p1Temp > p2Temp) {
                    //alert("Player 1 Wins!");
					return 0;
				} else if (p1Temp < p2Temp) {
                    //alert("Player 2 Wins!");
					return 1;
				}
				iterator--;
			}
            //alert("Tie!");
			return 2; // signifies a tie (Equal hand strength)
			
		}
    }
    
    this.calculateOdds = function(player1,player2) {
        
        var first = this.d.getCards() - 1;
		var total = 0;
		var p1Win = 0;
		var p2Win = 0;
		var tie = 0;
		if (!this.flop) { // flop has not been dealt
            
			for (var a = first; a >= 4; a--) {
				for (var b = a - 1; b >= 3; b--) {
					for (var c = b - 1; c >= 2; c--) {
						this.setFlop(this.d.getDeck()[a],this.d.getDeck()[b],this.d.getDeck()[c]);
						for (var d = c - 1; d >= 1; d--) {
							this.setTurn(this.d.getDeck()[d]);
							for (var e = d - 1; e >= 0; e--) {
								this.setRiver(this.d.getDeck()[e]);
								//alert("starting compareHand");
								var compare = this.compareHand(player1,player2);
                                //alert("ending compareHand");
								if (compare == 0) {
									p1Win++;
								} else if (compare == 1) {
									p2Win++;
								} else {
									tie++;
								}
								total++;
							}
						}
					}
				}
			}
		} else if (!this.turn) { // turn has not been dealt
			for (var a = first; a >= 1; a--) {
				this.setTurn(this.d.getDeck()[a]);
				for (var b = a - 1; b >= 0; b--) {
				this.setRiver(this.d.getDeck()[b]);
				
				var compare = this.compareHand(player1,player2);

				if (compare == 0) {
					p1Win++;
				} else if (compare == 1) {
					p2Win++;
				} else {
					tie++;
				}
					total++;
				}
				
			}
		} else if (!this.river) { // river has not been dealt
			for (var a = first; a >= 0; a--) {
				this.setRiver(this.d.getDeck()[a]);
				
				var compare = this.compareHand(player1,player2);

				if (compare == 0) {
					p1Win++;
				} else if (compare == 1) {
					p2Win++;
				} else {
					tie++;
				}
				total++;
			}
		} else { // all hole cards have been dealt
			var compare = this.compareHand(player1,player2);
			
			if (compare == 0) {
				p1Win++;
			} else if (compare == 1) {
				p2Win++;
			} else {
				tie++;
			}
			total++;
		}
        
		
		var r = [p1Win,p2Win,tie,total];
		return r;
    }
    
    this.insertionSortCards = function(cards) {
        if (cards.length != 7) {
			alert("Cards Error: Will not perform insertion sort hand that is not of length 7.");
		} else {
			for (var j = 1; j < 7; j++) {
				var key = cards[j];
				var i = j - 1;
				
				while (i > -1 && cards[i].getValue() < key.getValue()) {
					cards[i+1] = cards[i];
					i--;
				}
				cards[i+1] = key;
			}
		}
    }
    
}


