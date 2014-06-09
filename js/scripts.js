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

	// event handler w/ "ordered callback function design" within the scope of pvpGameStart();
	if(gameState.gameOver === false) {
		$('.box').on('click', function() {
			// gameState.move = this;
			var converter = ('#' + this.id);
			gameState.move = $(converter);
			move(gameState.move);
		});
	}

	// NOTE TO SELF - TRY USING SIMILAR MOVE MECHANIC AS PREVIOUS GAME EXCEPT REFER TO GAMESTATE.MOVE

// Design Plan: Emphasize uniformity + separation of game mechanics
// Call each function following the on click event handler
// Avoid daisy chaining call back functions on each game mechanic function. 
// 
	function move(square) {
		// Condition check for a closed square
		if(square.hasClass('closed')) {
			alert('Invalid choice!\nPlease choose a free box');
			return false;
		// Condition check for open square
		} else if (square.hasClass('open')) {
			// Switch the square's classes
			square.removeClass('open');
			square.addClass('closed');
			// Add the player's token to the square
			square.text(gameState.turn.token);
			// Capture and use the square's id to capture the value onto the appropriate game board 
			var index = square.attr('id');
			gameState.board[index] = gameState.turn.token;
		}
	}

	// function to handle game checks

	// function to handle turn switch

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
});