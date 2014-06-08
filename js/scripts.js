// =================================
// Global Variables
// =================================

// Player attributes for Global scoring purposes
// * Only player1 needs to have losses recorded to substract for ai score
var player1 = {
	name: null,
	wins: 0,
	losses: 0,
	ai: false
};

var player2 = {
	name: null,
	wins: 0,
	ai: false
};

// gameState attributes
var gameState = {
	board : [null, null, null, null, null, null, null, null, null],
	gameOver : false,
	move : null,
	players : [player1, player2],
	turn : null,
	turnCounter : 0,
	winner : null
};

// =================================
// Global Functions
// =================================

// Updates status bar
function status(msg) {
	$('#status-bar').empty();
	$('#status-bar').append(msg);
}

// Refreshes scoreboard
function refreshScoreboard() {
	$('#scoreboard').empty();
	$('#scoreboard').append('<strong><em>'+ player1.name + '</em></strong> : ' + player1.wins + ' wins' + '<br/>');
	$('#scoreboard').append('<strong><em>'+ player2.name + '</em></strong> : ' + player2.wins + ' wins' + '<br/>');
}

// Resets score & calls refreshScoreboard
function resetScore(){
	player1.wins = 0;
	player2.wins = 0;
	refreshScoreboard();
	status('Scoreboard reset');
}

// =================================
// PVP Game
// =================================
function pvpGameStart() {

	// Randomize X & O assignment
	playerX = gameState.players[Math.floor(Math.random()*2)];
	playerO = _.without(gameState.players, playerX)[0];

	// Assign token values
	playerX.token = 'X';
	playerO.token = 'O';

	// Link up gameState + player associations
	gameState.turn = playerX;
	gameState.turnCounter = 1;
	status('<em>Current Move: </em>' + gameState.turn.name + ' is ' + gameState.turn.token);

	if(gameState.gameOver === false) {
		$('.box').on('click', function() {
			gameState.move = this;
			console.log('gameState.move is ' + gameState.move);
		});
	}

	// NOTE TO SELF - TRY USING SIMILAR MOVE MECHANIC AS PREVIOUS GAME EXCEPT REFER TO GAMESTATE.MOVE


	// choose move



	// function to handle move
	// function registerMove() {
	// 	$('.box').on('click', function() {
	// 		var box = this;
	// 		if(box.hasClass('open')) {
	// 			box.removeClass('open');
	// 			box.addClass('closed');
	// 			box.text(gameState.turn.token);
	// 			var index = box.attr('id');
	// 			gameState.board[index] = gameState.turn.token;
	// 		}
	// 	});
	// }

	// function to handle move switch

	// function to check for win, draw, etc.

	// function to handle gameover

}

// =================================
// On document ready
// =================================
$(document).ready(function() {
	var gameHeader = $('#header');
	var gameContainer = $('#main-container');

	$('#pve-button').on('click', function() {
		player1.name = window.prompt('Enter name for Player 1');
		player2.name = 'Skynet';
		gameHeader.hide();
		gameContainer.show();
		refreshScoreboard();
	});

	$('#pvp-button').on('click', function() {
		player1.name = window.prompt('Enter name for Player 1');
		player2.name = window.prompt('Enter name for Player 2');
		gameHeader.hide();
		gameContainer.show();
		refreshScoreboard();
		pvpGameStart();
	});

	$('.box').on('click', function() {
		var square = this;
		console.log(square);
	});


});