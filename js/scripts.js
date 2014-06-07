// =================================
// Global Variables
// =================================

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

var playerX, playerO;

var scoreboard = $('#scoreboard');
var statusbar = $('#status-bar');

// =================================
// Global Functions
// =================================

function status(msg) {
	statusbar.empty();
	statusbar.append(msg);
}

function refreshScoreboard() {
	scoreboard.empty();
	scoreboard.append('<strong>'+ player1.name + '</strong>:  ' + player1.wins + ' wins' + '<br/>');
	scoreboard.append('<strong>'+ player2.name + '</strong>:  ' + player2.wins + ' wins' + '<br/>');
}

function resetScore(){
	player1.wins = 0;
	player2.wins = 0;
	refreshScoreboard();
	status('Scoreboard reset');
}

// =================================
// PVP Game
// =================================




// =================================
// On document ready
// =================================
$(document).ready(function() {
	var gameHeader = $('#header');
	var gameContainer = $('#main-container');

	$('#pve-button').on('click', function() {
		gameHeader.hide();
		gameContainer.show();
	});

	$('#pvp-button').on('click', function() {
		gameHeader.hide();
		gameContainer.show();
	});
});