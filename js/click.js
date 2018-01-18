
var red = function(id) {
    var x = document.getElementById(id);
    x.style.borderColor = "red";
}

function spot(id) {
    this.id2 = id;
    this.card = null;
    this.cardElem = null;
    this.actualCard = null;
}

var p11 = new spot('p11');
var p12 = new spot('p12');
var p21 = new spot('p21');
var p22 = new spot('p22');

var flop1 = new spot('flop1');
var flop2 = new spot('flop2');
var flop3 = new spot('flop3');
var turn = new spot('turn');
var river = new spot('river');

var player1 = new Player("Player 1");
var player2 = new Player("Player 2");


var p = new Poker();

var cardKeeper = {
    chosenSpot: p11,
    chooseSpot: function(spot) { // clicks on a spot
        
        var spotObject = document.getElementById(spot.id2);
        if (spotObject.hasChildNodes()) { // if the spot has a card

            
            // make the card visible in the options
            var c = document.getElementById(spot.card);
            c.style.visibility = "visible";
            
            // remove the card from the spot
            spotObject.removeChild(spot.cardElem);
            
            // remove the card from player's hand / hole cards
            
            if (spot === p11) {
                p.d.putBackCard(player1.removeCard(0));
            } else if (spot === p12) {
                p.d.putBackCard(player1.removeCard(1));
            } else if (spot === p21) {
                p.d.putBackCard(player2.removeCard(0));
            } else if (spot === p22) {
                p.d.putBackCard(player2.removeCard(1));
            } else if (spot === flop1 || spot === flop2 || spot === flop3 ||
                      spot === turn || spot === river) {
                p.d.putBackCard(spot.actualCard);
            }
                    
            spot.actualCard = null;
        }
        
        if (this.chosenSpot !== null) {
            // turns the previous chosenSpot's border black
            var prev = document.getElementById(this.chosenSpot.id2);
            prev.style.borderColor = "black";
        }
        
        
        // sets the new chosenSpot
        this.chosenSpot = spot;
        var x = document.getElementById(this.chosenSpot.id2);
        x.style.borderColor = "red";
    },
    moveCard: function(card) { //clicks on a card
        if (this.chosenSpot !== null) {

            //saves the id of the card
            this.chosenSpot.card = card;
            
            
            //gets the id of the card to hide it
            var chosenCard = document.getElementById(card);
            chosenCard.style.visibility = "hidden";
            
            // changes the border of the box with the card in it to black
            document.getElementById(this.chosenSpot.id2).style.borderColor = "black";


            // creates a new image element to put onto the spot
            var elem = document.createElement("img");
            elem.setAttribute("src", chosenCard.src);
            elem.setAttribute("height", "55px");
            elem.setAttribute("width", "40px");
            elem.setAttribute("alt", chosenCard.alt);
            
            // saves elem
            this.chosenSpot.cardElem = elem;
            
            // adds the image element to the spot
            document.getElementById(this.chosenSpot.id2).appendChild(elem);
            
            
            
            
            // makes the chosen card
            var value = card.substring(0,1);
            var suit = card.substring(1,2);

            // converts the suit
            if (suit === 'C') {
                suit = "Clubs";
            } else if (suit === 'S') {
                suit = "Spades";
            } else if (suit === 'D') {
                suit = "Diamonds";
            } else if (suit === 'H') {
                suit = "Hearts";
            }
            
            // converts the value
            if (value === 'A') {
                value = 14;
            } else if (value === 'K') {
                value = 13;
            } else if (value === 'Q') {
                value = 12;
            } else if (value === 'J') {
                value = 11;
            } else if (value === 'T') {
                value = 10;
            }

            
            
            // sets the cards for players/hole cards
            var c = new Card(suit,value);
            this.chosenSpot.actualCard = p.d.pick(c);
            if (this.chosenSpot === p11 || this.chosenSpot === p12) {
                player1.giveCard(c);
            } else if (this.chosenSpot === p21 || this.chosenSpot === p22) {
                player2.giveCard(c);
            } else if (this.chosenSpot === flop1 || this.chosenSpot === flop2 || this.chosenSpot === flop3) {
                var flop1Object = document.getElementById('flop1');
                var flop2Object = document.getElementById('flop2');
                var flop3Object = document.getElementById('flop3');
                if (flop1Object.hasChildNodes() && flop2Object.hasChildNodes() && flop3Object.hasChildNodes()) {
                    p.d.pick(flop1.actualCard);
                    p.d.pick(flop2.actualCard);
                    p.d.pick(flop3.actualCard);
                    
                    p.setFlop(flop1.actualCard,flop2.actualCard,flop3.actualCard);
                }
            } else if (this.chosenSpot === turn) {
                p.setTurn(p.d.pick(turn.actualCard));
            } else if (this.chosenSpot === river) {
                p.setRiver(p.d.pick(river.actualCard));
            }
            
            
            
            
            
            
            
            // moves the red border and the chosen spot
            var id2 = this.chosenSpot.id2;
            
            if (id2 === 'p11') {
                document.getElementById('p12').style.borderColor = "red";
                this.chosenSpot = p12;
            }
            if (id2 === 'p12') {
                document.getElementById('p21').style.borderColor = "red";
                this.chosenSpot = p21;
            }
            if (id2 === 'p21') {
                document.getElementById('p22').style.borderColor = "red";
                this.chosenSpot = p22;
            }
            if (id2 === 'p22') {
                document.getElementById('flop1').style.borderColor = "red";
                this.chosenSpot = flop1;
            }
            if (id2 === 'flop1') {
                document.getElementById('flop2').style.borderColor = "red";
                this.chosenSpot = flop2;
            }
            if (id2 === 'flop2') {
                document.getElementById('flop3').style.borderColor = "red";
                this.chosenSpot = flop3;
            }
            if (id2 === 'flop3') {
                document.getElementById('turn').style.borderColor = "red";
                this.chosenSpot = turn;
            }
            if (id2 === 'turn') {
                document.getElementById('river').style.borderColor = "red";
                this.chosenSpot = river;
            }
            if (id2 === 'river') {
                this.chosenSpot = null;
            }
            
            
            
            // execute calculateOdds
            if (p11.actualCard !== null && p12.actualCard !== null && p21.actualCard !== null && p22.actualCard !== null) {
                if (flop1.actualCard !== null && flop2.actualCard !== null && flop3.actualCard !== null) {
                    var results = p.calculateOdds(player1,player2);

                    var p1Wins = results[0];
                    var p2Wins = results[1];
                    var ties = results[2];
                    var total = results[3];


                    var p1Chance = parseFloat(p1Wins / total * 100).toFixed(2);
                    var p2Chance = parseFloat(p2Wins / total * 100).toFixed(2);
                    var tieChance = parseFloat(ties / total * 100).toFixed(2);

                    document.getElementById('player1').innerHTML = "Win: " + p1Chance + "%" +
                        "<br>Tie: " + tieChance + "%";
                    document.getElementById('player2').innerHTML = "Win: " + p2Chance + "%" +
                        "<br>Tie: " + tieChance + "%";
                } else if (flop1.actualCard === null && flop2.actualCard === null && flop3.actualCard === null) {
                    var results = p.calculateOdds(player1,player2);

                    var p1Wins = results[0];
                    var p2Wins = results[1];
                    var ties = results[2];
                    var total = results[3];


                    var p1Chance = parseFloat(p1Wins / total * 100).toFixed(2);
                    var p2Chance = parseFloat(p2Wins / total * 100).toFixed(2);
                    var tieChance = parseFloat(ties / total * 100).toFixed(2);

                    document.getElementById('player1').innerHTML = "Win: " + p1Chance + "%" +
                        "<br>Tie: " + tieChance + "%";
                    document.getElementById('player2').innerHTML = "Win: " + p2Chance + "%" +
                        "<br>Tie: " + tieChance + "%";
                }
                
            }
        }
    }

}







