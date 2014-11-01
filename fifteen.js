//fifteen puzzle javascript

"use strict";
function testStrict(){
    var x;
    x = 3.14; // This does not cause an error. 
}

var MAIN = 300;
var MAIN2= 300;
var PUZZLEAREA = [];

// initialize the page as soon as it's finished loading by creating the fifteen
// puzzlepiece squares and attaching 'shufflebutton' click handler
window.onload = function() {
  generatingATile();
  $("shufflebutton").observe("click", shuffling);
};

// attaches puzzlepiece class to each div in the puzzlearea
// and positions each div, while attaching a click and mouseover 
// handler to each div
function generatingATile() {
	PUZZLEAREA = $$('#puzzlearea div');
	var j = 0;
	var t = 3;
	for (var i = 0; i < PUZZLEAREA.length; i++) {
		for (var x = 0; x <= t; x++) {
			PUZZLEAREA[i].addClassName("puzzlepiece");
			PUZZLEAREA[i].style.top = 100 * j + "px";
			PUZZLEAREA[i].style.left = 100 * x  + "px";
			PUZZLEAREA[i].style.backgroundPosition = -x * 100 + "px " + j * -100 + "px";
			PUZZLEAREA[i].observe("click", movementsOfTile);
			PUZZLEAREA[i].observe("mouseover", hover);
			i++;
		}
		j++;
		if (j > 2) {
			t = 2;
		}
		i--;
	}
}	

// Attaches a class movablepiece while cursor hovers over square 
// if it neighbors the blank square
function hover(event) {
	if (neighborTest(this.style.left, this.style.top)) {
		this.addClassName("movablepiece");
	} else if (this.hasClassName("movablepiece")) {
		this.removeClassName("movablepiece");
	}
}

// Helper method that switches the given tile's position with 
// the blank square's position
function tileHelp(movetile) {
	if (neighborTest(movetile.style.left, movetile.style.top)) {
		var tempX = movetile.style.left;
		var tempY = movetile.style.top;
		movetile.style.left = MAIN + "px";
		movetile.style.top = MAIN2 + "px";
		MAIN = parseInt(tempX);
		MAIN2 = parseInt(tempY);
	}
}

// outsources the tile movement to a helper method
function movementsOfTile(events) {
	tileHelp(this);
}

// shuffles the tiles by simulating 200 puzzle moves randomly
function shuffling() {
	var temp = [];
	for (var i = 0; i < 200; i++) {
		for (var j = 0; j < PUZZLEAREA.length; j++) {
			if (neighborTest(PUZZLEAREA[j].style.left, PUZZLEAREA[j].style.top)) {
				temp.push(PUZZLEAREA[j]);
			}
		}
		tileHelp(temp[Math.floor(Math.random() * temp.length)]);
		temp = [];
	}
}

// tests whether a given tile neighbors the blank square
function neighborTest(a,b) {
	if (Math.abs(MAIN - parseInt(b)) == 100) {
		if (Math.abs(MAIN - parseInt(a)) === 0) {
			return true;
		}
	} else if (Math.abs(MAIN - parseInt(a)) == 100) {
		if (Math.abs(MAIN2 - parseInt(b)) === 0) {
			return true;
		}
	}
	return false;
}