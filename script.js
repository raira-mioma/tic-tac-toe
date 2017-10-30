/*$(document).ready(function(){
	$("#side-choice-modal").modal("show");
});*/

//GAME LOGIC
var myGame = {
	playerSide : "",
	computerSide : "",
	gameInPlay : false,
	initialize: function() {
		this.gameInPlay = true;
		//clear the playboard here;
		//clear all arrays with numbers
		//and also the playboard div itself
		//clear all <p> from there
	}
	
}
//GAME LOGIC

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

    }
  });
});


//Choose side O
$(function() {
	$("#o-button").on({
    click: function(e){
    
		myGame.playerSide = "O"
        myGame.computerSide = "X";

    }
  });
});

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
			  
			//check for last or no cells - AI can't make a turn
			//if there's no free cell
            let freeCells = getFreeCells();			
			if (freeCells.length === 0)
				$("#game-over-modal").modal("show");
			}
			
			//checkWinCOmbo todo
            checkWinCombo();			
						
			//make AI turn 
			makeAIturn();
		
		}
	})
});


function makeAIturn() {
	
	playboard.sort();
	
	let freeCells = getFreeCells();
	
	//check for last cell!!! todo - 
	
	//make a turn
	var nextCell = getAITurnCell();
	var AITurn = freeCells[nextCell];//make this random
    var $newCell = "#cell-" + AITurn;
	$($newCell).append("<p class='x'>" + myGame.computerSide + "</p>");	
	playboard.push(AITurn);
	AITurns.push(AITurn);
	
	//checkWinCOmbo todo
	checkWinCombo();			
}

function getFreeCells() {
	return allCells.filter(function(x) {
		return !playboard.includes(x);
	});
}

function getAITurnCell() {
	return 1;
}

function checkWinCombo() {
	
	//update score todo
	
}

//Play again - reset playboard
$(function() {
	$("#play-again-button").on({
    click: function(e){
	  
	  //initialize game
	  myGame.initialize();

    }
  });
});
