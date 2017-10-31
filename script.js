/*$(document).ready(function(){
	$("#side-choice-modal").modal("show");
});*/

var winCombo = [
[1, 2, 3], 
[4, 5, 6],
[7, 8, 9],
[1, 4, 7], 
[2, 5, 8], 
[3, 6, 9], 
[1, 5, 9], 
[3, 5, 7]
]


//GAME
var myGame = {
	playerSide : "",
	computerSide : "",
	gameInPlay : false,
	initialize: function() {
		this.gameInPlay = true;
		//clean the playboard here;
		cleanPlayboard();
		//clear all arrays with numbers
		playboard = [];
		playerTurns = [];
		AITurns = [];
	}
	
}
//GAME

//Clean the playboard
function cleanPlayboard() {
	$(".x").remove();
}

//playboard 
var playboard = [];
var playerTurns = [];
var AITurns = [];
var allCells = [1, 2, 3, 4, 5, 6, 7, 8, 9];

//Game start button
$(function() {
	$("#start-button").on({
    click: function(e){
    
		$("#side-choice-modal").modal("show");
    
	//initialize game
	myGame.initialize();
	
    }
  });
});


//Choose side X
$(function() {
	$("#x-button").on({
    click: function(e){
    
		myGame.playerSide = "X"
        myGame.computerSide = "O";

		startGame();
    }
  });
});


//Choose side O
$(function() {
	$("#o-button").on({
    click: function(e){
    
		myGame.playerSide = "O"
        myGame.computerSide = "X";

		startGame();
    }
  });
});

//start game
function startGame() {
	var turn = Math.random()*2;
	var $turnP = $("#first-turn-modal p");
	
	if (turn <= 1 )
	{ 
       $($turnP).text("AI makes first turn!");
	   showTurnModal();
       makeAIturn();
	}
	else
	{
      $($turnP).text("You make first turn!");
	  showTurnModal();
	}
}

function showTurnModal() {
	var $turn = $("#first-turn-modal");
	$($turn).modal("show");
}

//making a turn
$(function() {
	$(".cell").on({
		click: function(e) {
			
			if (!myGame.gameInPlay)
				return;
			
			//draw player's X or O
			if (!$(this).children(".x").length)
			{
			  $(this).append("<p class='x'>" + myGame.playerSide + "</p>");	
			  var turn = parseInt($(this).attr("value"));
              playboard.push(turn);
			  playerTurns.push(turn);
			}
			
			//push 2 commands below in upper if?? todo
			
			//checkWinCOmbo todo
            if (checkWinCombo())
				return;
						
			//make AI turn 
			makeAIturn();
		}
	})
});


function makeAIturn() {
	
	playboard.sort();
	
	let freeCells = getFreeCells();
	
	//make a turn
	var nextCell = getAITurnCell();
	var AITurn = freeCells[nextCell];
    var $newCell = "#cell-" + AITurn;
	$($newCell).append("<p class='x'>" + myGame.computerSide + "</p>");	
	playboard.push(AITurn);
	AITurns.push(AITurn);
	
	checkWinCombo();			
}

function getFreeCells() {
	return allCells.filter(function(x) {
		return !playboard.includes(x);
	});
}

function gameOver() {
	$("#game-over-modal").modal("show");
}

//AI decisions
function getAITurnCell() {
	//check if your oppponent is close to a win combo
	var closeCell = checkPlayerCloseToCombo();
	
	var possibleCombo = [];
	
	if (closeCell === 0){
		//find possible combo's for you
		possibleCombo = findPossibleCombo;
	}
	
	
	
	return 1;
}

function checkWinCombo() {
	
	var playerWon = checkEachPlayerWin(playerTurns);
	var AIWon = checkEachPlayerWin(AITurns);
	var freeCells = getFreeCells();
	
	if (playerWon)
	{
		updateScore("player");
		updateGameOverModal("win");
		gameOver();
		return true;
	}
	if (AIWon)
	{
		updateScore("ai") ;
		updateGameOverModal("lose");
		gameOver();
		return true;
	}
	else if (freeCells.length === 0) {
		updateGameOverModal("tie");
		gameOver();
		return true;
	}
	
	return false;
}

function findPossibleCombo() {
	
}

//check if player's array has a winCombo
function checkEachPlayerWin(playerArr){
	
	var combo = [];
	var result = false;
		
	for (var i=0; i< winCombo.length; i++){
		
		combo = playerArr.filter(function(elem){
			return winCombo[i].includes(elem);
		})
		
		if (combo.length === 3)
		{
			result = true;
			break;
		}
	}
	
	return result;
}

//check if a player is close to a combo
function checkPlayerCloseToCombo(){
	
	var combo = [];
	var result = false;
		
	for (var i=0; i< winCombo.length; i++){
		
		combo = playerTurns.filter(function(elem){
			return winCombo[i].includes(elem);
		})
		
		if (combo.length === 2)
		{
			//return a cell which is not filled yet - todo
			result = true;
			break;
		}
	}
	//return 0 if player is not close to any combo yet
	return result;
}

function updateScore(winner) {
	var score = parseInt($("#" + winner+"-score").text());
	score++;
	$("#" + winner+"-score").text(score);
}

function updateGameOverModal(result) {
	if (result === "win" || result === "lose") {
		$("#result").text("You " + result + "!");
	}
	else {
		$("#result").text("Tied!");
	}
}

//Play again - reset playboard
$(function() {
	$("#play-again-button").on({
    click: function(e){
	  //initialize game
	  myGame.initialize();
	  startGame();
    }
  });
});
