# Battle of the Ships
## Nathan Chan | June 14, 2019
### General Assembly - Software Engineering Immersive Project 1: HTML, CSS, Javascript
#### A link to the game can be found here


## Introduction 
The classic game of Battleship pitting two opponents against one another which incorporates strategic thinking and crucial decision making. 


Image of the game


## Project Requirements
This is the first project that will be incorporated as part of the portfolio of the General Assembly Software Engineering Immersive. The goal is to combined all that we have learned in Unit 1 (HTML, CSS, and Javascript) into a web game that we can publish. 

### Technical Requirements
The technical requirements for the project are as follows: 

Your app must:
* Display a game in the browser
* Switch turns between two players, or switch turns between a player and the computer (AI)*
* Design logic for winning & visually display which player won
* Include separate HTML / CSS / JavaScript files
* Stick with KISS (Keep It Simple Stupid) and DRY (Don't Repeat Yourself) principles
* Use Javascript or jQuery for DOM manipulation
* Deploy your game online, where the rest of the world can access it**
* Use semantic markup for HTML and CSS (adhere to best practices)

## How to Play
1. Clone this repo or click the link above to launch the game in your browser. 
2. Follow the instructions displayed in the game to play. 

# Building the App
This section presents the thought process that went into the creation of this game. 

## Thought Process
Overall the game uses two grid elements: one for the player's board and the other for the computer's board. The project includes manipulation of arrays and objects as well as an AI which will play against the user. 

### Whiteboarding
Initial design of the project and the necessary components were designed on pen and paper to brainstorm necessary variables, DOM elements, functionality, and logic of the game. 

Insert Image

Insert IMage


After some initial planning, the overall flow of the gameplay is as follows:
1. Upon page load, a Start Screen appears. The player can click Start to play the game when he or she is ready. 
2. User can place ships on his or her board and is not allowed to fire on opponent's board. 
3. Once ships are placed then the user can begin firing on the opponent's board. The opponent will fire back after the user takes a turn. 
4. Once there is a winnner, the game ends and the user can reset the gameboard and start over.


After page load and once the Start button has been clicked, the actual game play was designed by breaking down the game into its simplest component which revolves around one turn of the game. This would is also constitute the game loop. 

## Two Tracks
The project design essentially followed two tracks. 
1. The AI's board and actions
2. The player's board and actions 


## Gameboard Creation



## AI's Board

### Initialization
The AI's board was initialized as a 10x10 array with asssociated variables that could be loaded into the array describing the condition of that particular position:

```
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
```

### Random Placement of Ships

### Checking the Placement of Ships

## Player's Board
This was the most challenging aspect of this project. How can the user place a ship, change the rotation and for that choice to display visually. 

### Placement and Rotation

### Built with
* HTML 
* CSS
* Javascript


### Credit to 
* Bill Mei - https://github.com/billmei/battleboat
* LearnTeachCode - https://github.com/LearnTeachCode/Battleship-JavaScript

### Additional functionality and wish list
* Using ship images for the actual ships
* Refining the AI so that it is not randomly shooting
* Cleaning some of the CSS so that the layout does not need to use a fixed or absolute positioning system. 