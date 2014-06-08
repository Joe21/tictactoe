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
	gameOver : false,
	turn : null,
	turnCounter : 0,
	players : [player1, player2],
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
	status('<em>Current Move: </em>' + gameState.turn.name + ' is ' + gameState.turn.token);

	// function to handle move

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
});