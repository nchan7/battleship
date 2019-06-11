console.log("loaded");
// Declare Variables
var gameOver = false;
var p1HitCount = 0;
var aiHitCount = 0;
var carrier = {name: 'carrier', length: 5, dir: 0, location: [], hit: []};
var battleship = {name: 'battleship', length: 4, dir: 0, location: [], hit: []};
var destroyer = {name: 'destroyer', length: 3, dir: 0, location: [], hit: []};
var submarine = {name: 'submarine', length: 3, dir: 0, location: [], hit: []};
var patrol = {name: 'patrol', length: 2, dir: 0, location: [], hit: []};
// dir = direction -> 0 = vertical, 1 = horizontal
var p1Ships = [carrier, battleship, destroyer, submarine, patrol];
var aiShips = [carrier, battleship, destroyer, submarine, patrol];
var p1Targeted = [];
var player = 0; // 0 is human and 1 is AI
// var aiBoard = 
// [[0,0,0,0,0,2,2,2,2,2],
// [0,0,0,0,0,0,0,0,0,0],
// [0,0,0,0,0,0,0,0,0,0],
// [0,0,0,0,0,0,0,0,0,0],
// [0,0,0,0,0,0,0,0,0,0],
// [0,0,0,0,0,0,0,0,0,0],
// [0,0,0,0,0,0,0,0,0,0],
// [0,0,0,0,0,0,0,0,0,0],
// [0,0,0,0,0,0,0,0,0,0],
// [0,0,0,0,0,0,0,0,0,0]];
// 0 = empty, 1 = miss, 2 = undamaged ship, 3 = damaged ship, 4 = sunken ship
var xCoord; 
var yCoord;

//drag and drop library jQuery UI

// DOM References 
var playerBoard = document.getElementById("playerboard");
var computerBoard = document.getElementById("computerboard");
var resetButton = document.getElementById("reset");
var startButton = document.getElementById("start");
var carrierButton = document.getElementById("carrier");
var battleshipButton = document.getElementById("battleship");
var destroyerButton = document.getElementById("destroyer");
var submarineButton = document.getElementById("submarine");
var patrolButton = document.getElementById("patrol");
var rotateButton = document.getElementById("rotate");

// Create gameboards
for (let i = 0; i <= 9; i++) {
    for (let j = 0; j <= 9; j++) {
        var playerSquare = document.createElement("div");
        playerBoard.appendChild(playerSquare);
        playerSquare.classList.add("square")
        playerSquare.id = "p" + i + j; 
        var computerSquare = document.createElement("div");
        computerBoard.appendChild(computerSquare);
        computerSquare.classList.add("square")
        computerSquare.id = "c" + i + j; 
        
    }
}

// Event Listeners

playerBoard.addEventListener("click", function(e) {
    // Place ships
    // Call the ships 
    xCoordPlayer = e.target.id.substring(1,2);
    yCoordPlayer = e.target.id.substring(2,3);
    carrierButton.addEventListener("click", function(e) {
        var p1ShipCarrier = p1Ships[0];
        rotateButton.addEventListener("click", function(e) {
            rotateShip(p1ShipCarrier);
        })
        p1ShipCarrier.location = placeShip(p1ShipCarrier, xCoordPlayer, yCoordPlayer);
        var p1ShipCarrierLocation = p1ShipCarrier.location; 
        console.log(p1ShipCarrierLocation);
    });
    battleshipButton.addEventListener("click", function(e) {
        var p1ShipBattleship = p1Ships[1];
        rotateButton.addEventListener("click", function(e) {
            rotateShip(p1ShipBattleship);
        })
        p1ShipBattleship.location = placeShip(p1ShipBattleship, xCoordPlayer, yCoordPlayer);
    });
    destroyerButton.addEventListener("click", function(e) {
        var p1ShipDestroyer = p1Ships[2];
        rotateButton.addEventListener("click", function(e) {
            rotateShip(p1ShipDestroyer);
        })
        p1ShipDestroyer.location = placeShip(p1ShipDestroyer, xCoordPlayer, yCoordPlayer);
    });
    submarineButton.addEventListener("click", function(e) {
        var p1ShipSubmarine = p1Ships[3];
        rotateButton.addEventListener("click", function(e) {
            rotateShip(p1ShipSubmarine);
        })
        p1ShipSubmarine.location = placeShip(p1ShipSubmarine, xCoordPlayer, yCoordPlayer);
    });
    patrolButton.addEventListener("click", function(e) {
        var p1ShipPatrol = p1Ships[4];
        rotateButton.addEventListener("click", function(e) {
            rotateShip(p1ShipPatrol);
        })
        p1ShipPatrol.location = placeShip(p1ShipPatrol, xCoordPlayer, yCoordPlayer);
    });

});

computerBoard.addEventListener("click", function(e) {
    // target a square
    // change the color 
    // hit or miss
    if(!(p1Targeted[e.target.id]) && !gameOver) {
        p1Targeted.push(e.target.id);
        xCoord = e.target.id.substring(1,2);
        yCoord = e.target.id.substring(2,3);
        // Check space
        checkSpace(aiBoard, e, xCoord, yCoord);
    }

    // If player 

})



// battleshipButton.addEventListener("click", function(e) {

// });

// destroyerButton.addEventListener("click", function(e) {

// });

// submarineButton.addEventListener("click", function(e) {

// });

// patrolButton.addEventListener("click", function(e) {

// });

// rotateButton.addEventListener("click", function(e) {
//     //Need to hold the ship that you chose and then rotate the ship. 
//     rotateShip(p1Ships[i]);
// });

resetButton.addEventListener("click", function(e) {
    resetGame();
});



// Additional Functions
// function aiPlay() {
    
// }

function placeShip(ship, xCoordPlayer, yCoordPlayer) { // Source from Bill Mei 
    var position = [];
    var newPosition = [];
    x = parseInt(xCoordPlayer);
    y = parseInt(yCoordPlayer);
	for (var i = 0; i < ship.length; i++) {
		if (ship.dir === 0) {
            position[i] = x + i;
            newPosition = position.map(function(loc) {
                return 'p' + loc + y;
            });
		} else {
            position[i] = y + i;
            ewPosition = position.map(function(loc) {
                return 'p' + x + loc;
            });
		}
	}
	return newPosition;
}


function rotateShip(ship) {
    if (ship.dir === 0) {
        ship.dir = 1; 
    } else {
        ship.dir = 0;
    }
}

function checkPlacement() {

}


function checkSpace(array, e, xCoord, yCoord) {
    if (array[xCoord][yCoord] === 0) {
        e.target.classList.add("miss");
        array[xCoord][yCoord] = 1;
    } else if (array[xCoord][yCoord] === 2) {
        e.target.classList.add("hit");
        array[xCoord][yCoord] = 3;
        // Check win
        // checkSunk(array);
        checkWin();

    };
}
function checkSunk() {
    
    //check if position matches placement
}

function checkWin() {
    if(!p1Ships.length || !aiShips.length) {
        endGame();
    }
}

function endGame() {
    gameOver = true;
    //create class with all values as true or false...in endGame change them all to true;
}

function resetGame() {
    gameOver = false;

}


// What do I need in one turn? 
// 1. Choose location
// 2. Hit or miss or sunk
// 3. If miss then what? Hit then what? Sunk then what? 
// 4. Next person