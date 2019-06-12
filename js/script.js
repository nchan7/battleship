// Credit to Bill Mei for code related to random ship placement.
// Credit to https://github.com/LearnTeachCode for code related to the ai board 


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
var aiBoard = 
[[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0]];
const EMPTY = 0;
const MISS = 1;
const SHIP = 2;
const HIT = 3;
const SUNK = 4; 
const VERTICAL = 0;
const HORIZONTAL = 1;
// 0 = empty, 1 = miss, 2 = undamaged ship, 3 = damaged ship, 4 = sunken ship
var rowCoord; 
var colCoord;
var selectedShip; 
var rowCoordPlayer;
var colCoordPlayer;
var divs = [];

// Need AI random placement...ai placement for ship if x or y is less than or equal to a certain number. Loop through ids

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
var h2El = document.getElementById("end");

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


// Selects the ship that I want to place.
carrierButton.addEventListener("click", function(e) {
    selectedShip = p1Ships[0];
    console.log(selectedShip);
});
battleshipButton.addEventListener("click", function(e) {
    selectedShip = p1Ships[1];
    console.log(selectedShip);
});
destroyerButton.addEventListener("click", function(e) {
    selectedShip = p1Ships[2];
    console.log(selectedShip);
});
submarineButton.addEventListener("click", function(e) {
    selectedShip = p1Ships[3];
    console.log(selectedShip);
});
patrolButton.addEventListener("click", function(e) {
    selectedShip = p1Ships[4];
    console.log(selectedShip);
});

rotateButton.addEventListener("click", function(e) {
    //Need to hold the ship that you chose and then rotate the ship. 
    rotateShip(selectedShip);
});


    
playerBoard.addEventListener("click", function(e) {
    // Place ships
    // Call the ships 
    rowCoordPlayer = e.target.id.substring(1,2);
    colCoordPlayer = e.target.id.substring(2,3);
    var rowID = [];
    var colID = [];
    console.log(selectedShip);
    selectedShip.location = placeShip(selectedShip, rowCoordPlayer, colCoordPlayer);
    var p1ShipLocation = selectedShip.location; 
    console.log(p1ShipLocation);
    console.log(e.target)
    
});


playerBoard.addEventListener("mouseover", function (e) {
    rowCoordPlayer = e.target.id.substring(1,2);
    colCoordPlayer = e.target.id.substring(2,3);
    var row = parseInt(rowCoordPlayer);
    var col = parseInt(colCoordPlayer);
    var position = [];
    var ids = [];
    console.log(selectedShip);
    for (var i = 0; i < selectedShip.length; i++) {
		if (selectedShip.dir === VERTICAL) {
            position[i] = row + i;
            ids = position.map(function(loc) {
                return '#p' + loc + col;
            });
		} else {
            position[i] = col + i;
            ids = position.map(function(loc) {
                return '#p' + row + loc;
            });
		}
    }
    // console.log(ids.join(", "));
    divs = document.querySelectorAll(ids.join(", "));
    for (let i = 0; i < divs.length; i++) {
        divs[i].classList.add("ship");
    }
});

playerBoard.addEventListener("mouseout", function(e) {
    for (let i = 0; i < divs.length; i++) {
        divs[i].classList.remove("ship");
    }
});


// battleshipButton.addEventListener("click", function(e) {

// });

// destroyerButton.addEventListener("click", function(e) {

// });

// submarineButton.addEventListener("click", function(e) {

// });

// patrolButton.addEventListener("click", function(e) {

// });



resetButton.addEventListener("click", function(e) {
    resetGame();
});



// Additional Functions
// function aiPlay() {
    
// }

function placeShip(ship, rowCoordPlayer, colCoordPlayer) { // Source: Modified from Bill Mei
    var position = [];
    var newPosition = [];
    var row = parseInt(rowCoordPlayer);
    var col = parseInt(colCoordPlayer);
	for (var i = 0; i < ship.length; i++) {
		if (ship.dir === VERTICAL) {
            position[i] = row + i;
            newPosition = position.map(function(loc) {
                return 'p' + loc + col;
            });
		} else {
            position[i] = col + i;
            newPosition = position.map(function(loc) {
                return 'p' + row + loc;
            });
		}
    }
    document.getElementById(selectedShip.name).disabled = true; 
	return newPosition;
}


function rotateShip(ship) {
    if (ship.dir === VERTICAL) {
        ship.dir = HORIZONTAL; 
    } else {
        ship.dir = VERTICAL;
    }
}



// function checkPlacement() {

// }

// Computer Board 

// Get random x and y coordinates



function placeAIShipsRandomly() { // Source: Modified from Bill Mei
	// var shipCoords;
	for (var i = 0; i < aiShips.length; i++) {
        // Prevents the random placement of already placed ships
        var notPlaced = true; 
        while (notPlaced) {
            var randomRow = Math.floor(9 * Math.random());
            var randomCol = Math.floor(9 * Math.random());
            var randomDirection = Math.round(Math.random());
            
            if (checkPlacement(randomRow, randomCol, aiShips[i])) {
                create(randomRow, randomCol, aiShips[i], randomDirection);
                // shipCoords = this.fleetRoster[i].getAllShipCells();
                notPlaced = false;
            }
        };
    };
}; 

function checkPlacement (row, col, ship) { // Source: Modified from Bill Mei
	// first, check if the ship is within the grid...
	if (checkWithinBounds(row, col, ship)) {
		// ...then check to make sure it doesn't collide with another ship
		for (var i = 0; i < ship.length; i++) {
			if (ship.dir === 0) {
				if (aiBoard[row + i][col] === SHIP ||
					aiBoard[row + i][col] === MISS ||
					aiBoard[row + i][col] === SUNK) {
					return false;
				}
			} else {
				if (aiBoard[row][col + i] === SHIP ||
					aiBoard[row][col + i] === MISS ||
					aiBoard[row][col + i] === SUNK) {
					return false;
				}
			}
		}
		return true;
	} else {
		return false;
	}
};


function checkWithinBounds (row, col, ship) { // Source: Modified from Bill Mei
	if (ship.dir === VERTICAL) {
		return row + ship.length <= 9;
	} else {
		return col + ship.length <= 9;
	}
};

function create(row, col, ship, direction) { // Source: Modified from Bill Mei
	// This function assumes that you've already checked that the placement is legal
	rowCoord = row;
    colCoord = col;
    ship.dir = direction;
    for (var i = 0; i < ship.length; i++) {
        if (ship.dir === VERTICAL) {
            aiBoard[rowCoord + i][colCoord] = SHIP;
        } else {
            aiBoard[rowCoord][colCoord + i] = SHIP;
        }
    }

	
};

placeAIShipsRandomly();
console.log(aiBoard);


cBoardHandle = computerBoard.addEventListener("click", function(e) {
    // target a square
    // change the color 
    // hit or miss
    if(!(p1Targeted[e.target.id]) && !gameOver) {
        p1Targeted.push(e.target.id);
        rowCoord = e.target.id.substring(1,2);
        colCoord = e.target.id.substring(2,3);
        // Check space
        checkSpace(aiBoard, e, rowCoord, colCoord);
    }

    // If player 

})

function checkSpace(array, e, rowCoord, yCoord) {
    if (array[rowCoord][yCoord] === 0) {
        e.target.classList.add("miss");
        array[rowCoord][colCoord] = 1;
    } else if (array[rowCoord][colCoord] === 2) {
        e.target.classList.add("hit");
        array[rowCoord][colCoord] = 3;
        p1HitCount++;
        // Check win
        // checkSunk(array);
        checkWin();

    };
}
function checkSunk() {
    
    //check if position matches placement
}

function checkWin() {
    if(p1HitCount >= 17 || aiHitCount >= 17) {
        endGame();
    }
}

function endGame() {
    gameOver = true;
    computerBoard.removeEventListener("click", cBoardHandle); 
    if (p1HitCount >= 17) {
        h2El.textContent = "Your enemy has been annihilated. You're due for a promotion."
    } else {
        h2El.textContent = "Your navy has been decimated."
    }
}

function resetGame() {
    gameOver = false;

}


// What do I need in one turn? 
// 1. Choose location
// 2. Hit or miss or sunk
// 3. If miss then what? Hit then what? Sunk then what? 
// 4. Next person