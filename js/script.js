// Credit to Bill Mei for code related to random ship placement.
// Credit to https://github.com/LearnTeachCode for code related to the ai board 


console.log("loaded");
// Declare Variables
var gameOver = false;
var p1HitCount = 0;
var aiHitCount = 0;
var carrier = {name: 'carrier', length: 5, dir: 0, location: [], hit: [], placed: false};
var battleship = {name: 'battleship', length: 4, dir: 0, location: [], hit: [], placed: false};
var destroyer = {name: 'destroyer', length: 3, dir: 0, location: [], hit: [], placed: false};
var submarine = {name: 'submarine', length: 3, dir: 0, location: [], hit: [], placed: false};
var patrol = {name: 'patrol', length: 2, dir: 0, location: [], hit: [], placed: false};
// dir = direction -> 0 = vertical, 1 = horizontal
var p1Ships = [carrier, battleship, destroyer, submarine, patrol];
var aiShips = [carrier, battleship, destroyer, submarine, patrol];
var p1Targeted = [];
var aiTargeted = [];
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
var cBoardHandle;
var pBoardHandle;
var mouseoutHandle;
var mouseoverHandle;

// Need AI random placement...ai placement for ship if x or y is less than or equal to a certain number. Loop through ids


// DOM References 
document.addEventListener("DOMContentLoaded", function() {
    var playerBoard = document.getElementById("playerboard");
    var computerBoard = document.getElementById("computerboard");
    var resetButton = document.getElementById("reset");
    var startButton = document.getElementById("start");
    var commenceOperationButton = document.getElementById("fire")
    var carrierButton = document.getElementById("carrier");
    var battleshipButton = document.getElementById("battleship");
    var destroyerButton = document.getElementById("destroyer");
    var submarineButton = document.getElementById("submarine");
    var patrolButton = document.getElementById("patrol");
    var rotateButton = document.getElementById("rotate");
    var intro = document.getElementById("intro")
    var h2El = document.getElementById("instructions1");
    var h3El = document.getElementById("instructions2");
    var h2El2 = document.getElementById("end");
    var pFleetEl = document.getElementById("player");
    var cFleetEl = document.getElementById("enemy");
    var hitSound = document.getElementById("hitsound");
    var missSound = document.getElementById("misssound");
    var backgroundSound = document.getElementById("backgroundsound");
    var body = document.getElementById("body");
    var main = document.getElementById("main");
    var footer = document.getElementById("footer");
    

    
    
    function playHitSound() {
        hitSound.pause();
        hitSound.currentTime = 0;
        hitSound.play();
        console.log("loadedHitSound");
    }

    function playMissSound() {
        missSound.pause();
        missSound.currentTime = 0;
        missSound.play();
        console.log("loadedMissSound");
    }

    function playBackgroundSound() {
        backgroundSound.pause();
        backgroundSound.currentTime = 0;
        backgroundSound.play();
        console.log("loadedBackgroundSound");
    }

    // Create gameboards
    function createGameBoards () {
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
    };





// Selects the ship that I want to place.


// Initialize Game
// 1. Splash Screen 
// 2. Place ships and don't fire on opponenet
// 3. Once ships are placed you can commence operation
// 4. Once you win or the game is over you can reset
// 5. Reset clears the board.             

// 1. Splash Screen
// Opening sequence and start
// Background and text and start button
startButton.addEventListener("click", function(e) {
    playBackgroundSound();
});


// 2. Once you hit the start button
// Load the squares
// Place the ships
// Prevent firing on opponent
// AI loads their board. 
    
    function dropShip(ship, rowCoordPlayer, colCoordPlayer) { // Source: Modified from Bill Mei
    var position = [];
    var newPosition = [];
    var row = parseInt(rowCoordPlayer);
    var col = parseInt(colCoordPlayer);
    if (!ship.placed) {
        for (var i = 0; i < ship.length; i++) {
            if (ship.dir === VERTICAL) {
                if (row <= 10 - ship.length) {
                    
                    position[i] = row + i;
                    newPosition = position.map(function(loc) {
                        return 'p' + loc + col;
                    });
                    ship.placed = true;
                    document.getElementById(selectedShip.name).disabled = true; 
                }
            } else {
                if (col <= 10 - ship.length) {
                    position[i] = col + i;
                    newPosition = position.map(function(loc) {
                        return 'p' + row + loc;
                    });
                    ship.placed = true;
                    document.getElementById(selectedShip.name).disabled = true; 
                }
            }
        }
        
    }
    return newPosition;
    };        
    
    function rotateShip(ship) {
        if (ship.dir === VERTICAL) {
            ship.dir = HORIZONTAL; 
        } else {
            ship.dir = VERTICAL;
        }
    };
    // Place human player ships
    function placeShips() {
                    
                    
                    
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
        
        // This is for showing where the player is thinking about placing the ship
        playerBoard.addEventListener("mouseover", mouseoverHandle);
        
        
        function mouseoverHandle(event) {
            rowCoordPlayer = event.target.id.substring(1,2);
            colCoordPlayer = event.target.id.substring(2,3);
            var row = parseInt(rowCoordPlayer);
            var col = parseInt(colCoordPlayer);
            var position = [];
            var ids = [];
            console.log(selectedShip);
            for (var i = 0; i < selectedShip.length; i++) {
                if (selectedShip.dir === VERTICAL) {
                    if (row <= 10 - selectedShip.length) {
                        position[i] = row + i;
                        ids = position.map(function(loc) {
                            return '#p' + loc + col;
                        });
                    }
                } else {
                    if (col <= 10 - selectedShip.length) {
                        position[i] = col + i;
                        ids = position.map(function(loc) {
                            return '#p' + row + loc;
                        });
                    }
                }
            }
            // console.log(ids.join(", "));
            divs = document.querySelectorAll(ids.join(", "));
            for (let i = 0; i < divs.length; i++) {
                divs[i].classList.add("ship");
            }
        };
        
        
        // playerBoard.removeEventListener("mouseover", mouseoverHandle);
        
        playerBoard.addEventListener("mouseout", mouseoutHandle);

        function mouseoutHandle(event) {
            
            for (let i = 0; i < divs.length; i++) {
                divs[i].classList.remove("ship");
            }
            
        };
        // playerBoard.removeEventListener("mouseout", mouseoutHandle);
        
        playerBoard.addEventListener("click", pBoardHandle); 
        
        
        function pBoardHandle(event) {
            // Place ships
            // Call the ships 
            rowCoordPlayer = event.target.id.substring(1,2);
            colCoordPlayer = event.target.id.substring(2,3);
            var rowID = [];
            var colID = [];
            console.log(selectedShip);
            selectedShip.location = dropShip(selectedShip, rowCoordPlayer, colCoordPlayer);
            var p1ShipLocation = selectedShip.location;
            p1ShipLocation = p1ShipLocation.map(function(loc){
                return '#' + loc;
            });
            var locationIDs = document.querySelectorAll(p1ShipLocation.join(", "));
            console.log(locationIDs);
            for (let i = 0; i < locationIDs.length; i++) {
                locationIDs[i].classList.add("placed");
            }
            
        }
        // playerBoard.removeEventListener("mouseover", mouseoverHandle);
        // playerBoard.removeEventListener("mouseout", mouseoutHandle);
        
    };    

    // Begin placement of AI ships. First function checks whether or not placement is within the bounds of the grid.
    function checkWithinBounds (row, col, ship) { // Source: Modified from Bill Mei
        if (ship.dir === VERTICAL) {
            if (row + ship.length < 9) {
                return true;
            } else {
                return false;
            }
        } else {
            if (col + ship.length < 9) {
                return true;
            } else {
                return false;
            }
        }
    };
    
    // Creates the location array which positions the AI ship
    function create(row, col, ship, direction) { // Source: Modified from Bill Mei
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
    
    // Check placement to make sure ships are not placed on top of each other
    function checkPlacement (row, col, ship) { // Source: Modified from Bill Mei
        // First, check if the ship is within the grid
        if (checkWithinBounds(row, col, ship)) { // Source: Modified from LearnTeachCode
            // Then check to make sure it doesn't collide with another ship
            for (var i = 0; i < ship.length; i++) {
                if (ship.dir === VERTICAL) {
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

    // Function that combines three previous functions to place AI ships randomly
    function placeAIShipsRandomly() { // Source: Modified from Bill Mei
        // var shipCoords;
        for (var i = 0; i < aiShips.length; i++) {
            // Prevents the random placement of already placed ships
            var notPlaced = true; 
            while (notPlaced) {
                var randomRow = Math.floor(5 * Math.random());
                var randomCol = Math.floor(5 * Math.random());
                var randomDirection = Math.round(Math.random());
                
                if (checkPlacement(randomRow, randomCol, aiShips[i])) {
                    create(randomRow, randomCol, aiShips[i], randomDirection);
                    // shipCoords = this.fleetRoster[i].getAllShipCells();
                    notPlaced = false;
                }
            };
        };
    }; 
    
    
   
    function gameInit() {
        main.classList.remove("hidden");
        main.classList.add("visible");
        footer.classList.remove("hidden");
        footer.classList.add("visible");
        createGameBoards();
        // if (carrierButton.disabled && battleshipButton.disabled && destroyerButton.disabled && submarineButton.disabled && patrolButton.disabled) {
        //     startButton.disabled = false; 
        // } else {
        //     startButton.disabled = true;
        // }
        placeShips();
        placeAIShipsRandomly();
        commenceOperationButton.disabled = false;
        console.log(aiBoard);
    };
            
            
    startButton.addEventListener("click", function(e) {
        gameInit();
        intro.removeChild(startButton);
        intro.removeChild(h2El);
        h3El.classList.add("visible");
        // startButton.classList.add("hidden"); 
        // h2El.classList.add("hidden");
    })        
            
            
            
            
            
            
            // Additional Functions
// 3. Game play 
    function commenceOperation() {
        
        function endGame() {
            gameOver = true;
            computerBoard.removeEventListener("click", cBoardHandle); 
            if (p1HitCount >= 17) {
                h2El2.textContent = "Your enemy has been annihilated. You're due for a promotion."
                pFleetEl.classList.add("position2");
                cFleetEl.classList.add("position2");
            } else {
                h2El2.textContent = "Your navy has been decimated."
                pFleetEl.classList.add("position2");
                cFleetEl.classList.add("position2");
            }
        };
        
        
        function checkWin() {
            if(p1HitCount >= 17 || aiHitCount >= 17) {
                endGame();
            }
        };
        
        
        function checkSpace(array, e, rowCoord, colCoord) {
            if (array[rowCoord][colCoord] === 0) {
                e.target.classList.add("miss");
                playMissSound();
                array[rowCoord][colCoord] = 1;
            } else if (array[rowCoord][colCoord] === 2) {
                e.target.classList.add("hit");
                playHitSound();
                array[rowCoord][colCoord] = 3;
                p1HitCount++;
                // Check win
                // checkSunk(array);
                
                
            };
        }
        
        function aiGuess() {
            var randomRow = Math.floor(9 * Math.random());
            var randomCol = Math.floor(9 * Math.random());
            var pID = "p" + randomRow + randomCol; 
            console.log(pID);
            if (!aiTargeted.includes(pID)) {
                //Check the id and see if it's in any of hte location and if it is store in hit and 
                for (let i = 0; i < p1Ships.length; i++) {
                    if (p1Ships[i].location.includes(pID) && !p1Ships[i].hit.includes(pID)) {   
                        p1Ships[i].hit.push(pID);
                        document.getElementById(pID).classList.remove("placed");
                        document.getElementById(pID).classList.add("hit");
                        playHitSound();
                        aiTargeted.push(pID);
                        aiHitCount++;
                    } else if (!p1Ships[i].location.includes(pID)) {
                        document.getElementById(pID).classList.add("miss");
                        playMissSound();
                        aiTargeted.push(pID);
                    }
                }
            }
        };
        
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
            setTimeout(function() {
                aiGuess() 
            }, 1000);
            checkWin();
            
            
            
        });
    };


    commenceOperationButton.addEventListener("click", function(e) {
        commenceOperation();
        commenceOperationsButton.disabled = true; 
    });

            
// 4. Reset           
            
            
    function resetGame() {
        gameOver = false;
        for (let i = 0; i < p1Ships.length; i++) {
            document.getElementById(p1Ships[i].name).disabled = false; 
            document.getElementById(p1Ships[i].placed = false);
            document.getElementById(p1Ships[i].name).classList.remove("placed");
            document.getElementById(p1Ships[i].location = []);
            document.getElementById(p1Ships[i].hit = []);
        };
        p1HitCount = 0;
        aiHitCount = 0;
        p1Targeted = [];
        aiTargeted = [];     
        aiBoard = 
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
        rowCoord = 0; 
        colCoord = 0;
        selectedShip = null; 
        rowCoordPlayer = "";
        colCoordPlayer = "";
        divs = [];
        while (playerBoard.firstChild) {
            playerBoard.removeChild(playerBoard.firstChild);
        };
        while (computerBoard.firstChild) {
            computerBoard.removeChild(computerBoard.firstChild);
        };
        h2El2.textContent = "";
        gameInit();
        playBackgroundSound();

        
    };

    resetButton.addEventListener("click", function(e) {
        resetGame();
    });
}); 

    
    
    // What do I need in one turn? 

    // 1. Choose location
    // 2. Hit or miss or sunk
    // 3. If miss then what? Hit then what? Sunk then what? 
    // 4. Next person
// };