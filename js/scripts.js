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

// Starts a new PVP game
function newPVPGame() {
	gameState = {
		board : [null, null, null, null, null, null, null, null, null],
		gameOver : false,
		move : null,
		players : [player1, player2],
		turn : null,
		turnCounter : 0,
	};
	$('.box').removeClass('closed');
	$('.box').addClass('open');
	$('.box').empty();
	pvpGameStart();
}

// =================================
// PVP Game
// =================================
// Design Plan: Emphasize uniformity & separation of game mechanics via...
//	CENTRAL HUB SECTION:
//		- Will manage game flow and call each specific game function
//		- Avoid nested conditions in CENTRAL HUB for brevity and readability.
//		- Avoid daisy chaining call back functions in each specific game mechanic function. 

// Initialize pvp game
function pvpGameStart() {

	// Randomize X & O assignment
	playerX = gameState.players[Math.floor(Math.random()*2)];
	playerO = _.without(gameState.players, playerX)[0];

	// Assign token values
	playerX.token = 'X';
	playerO.token = 'O';

	// Assign addToWinner attribute
	playerX.addToWinner = 0;
	playerO.addToWinner = 0;

	// Link up gameState + player associations
	gameState.turn = playerX;
	gameState.turnCounter = 1;
	status('<em>Current Move: </em>' + gameState.turn.name + ' is ' + gameState.turn.token);

	// ===============================================================================================
	// CENTRAL HUB SECTION - This section will house all gameplay condition checks except...
	//		[Ref1] For brevity, the gameState.gameOver check for move() occurs within move()
	//		[Ref2] For brevity, the gameState.gameOver check for switchTurn() occurs within switchturn()
	// ===============================================================================================
	$('.box').on('click', function() {
		var converter = ('#' + this.id);
		gameState.move = $(converter);
		// [Ref1]
		move(gameState.move);

		// Upon move completion, check for win. Check for gameover to prevent players from adding wins after the game is over.
		if (checkWin(gameState.turn.token) && gameState.gameOver === false) {
			gameState.gameOver = true;
			status(gameState.turn.name + ' wins!');
			// Update win to the global player object
			gameState.turn.addToWinner ++;
			player1.wins = player1.wins + player1.addToWinner;
			player2.wins = player2.wins + player2.addToWinner;
			refreshScoreboard();
			$('#new-pvp-game-button').show();
			return false;
		// If no winner; check for draw.
		} else if (checkDraw()) {
			gameState.gameOver = true;
			status('Draw!');
			$('#new-pvp-game-button').show();
			return false;
		// If no draw, switch turn
		} else {
			// [Ref2]
			switchTurn();
		}
	});
	// End of CENTRAL HUB SECTION

	// =========================
	// Individual Game Functions
	// =========================

	// For sake of brevity, the move function will house the gameState.gameOver checks rather the CENTRAL HUB SECTION.
	function move(square) {
		// Condition check for a closed square
		if(square.hasClass('closed') && gameState.gameOver === false) {
			alert('Invalid choice!\nPlease choose an open box');
			return false;
		// Condition check for open square
		} else if (square.hasClass('open') && gameState.gameOver === false) {
			// Switch the square's class
			square.removeClass('open');
			square.addClass('closed');
			// Add the player's token to the square
			square.text(gameState.turn.token);
			// Capture and use the square's id to capture the value onto the appropriate game board 
			var index = square.attr('id');
			gameState.board[index] = gameState.turn.token;
		}
	}

	// function to check for win
	function checkWin(token) {
		if(gameState.board[0] == token && gameState.board[1] == token && gameState.board[2] == token) {
			return true;
		} else if (gameState.board[3] == token && gameState.board[4] == token && gameState.board[5] == token) {
			return true;
		} else if (gameState.board[6] == token && gameState.board[7] == token && gameState.board[8] == token) {
			return true;
		} else if (gameState.board[0] == token && gameState.board[3] == token && gameState.board[6] == token) {
			return true;
		} else if (gameState.board[1] == token && gameState.board[4] == token && gameState.board[7] == token) {
			return true;
		} else if (gameState.board[2] == token && gameState.board[5] == token && gameState.board[8] == token) {
			return true;
		} else if (gameState.board[0] == token && gameState.board[4] == token && gameState.board[8] == token) {
			return true;
		} else if (gameState.board[2] == token && gameState.board[4] == token && gameState.board[6] == token) {
			return true;
		} else {
			return false;
		}
	}

	// function to check for draw
	function checkDraw(){
		if (gameState.gameOver === false && gameState.turnCounter == 10) {
			return true;
		} else {
			return false;
		}
	}

	// function to switchturn
	function switchTurn() {
		if (gameState.turn == playerX && gameState.gameOver === false) {
			gameState.turn = playerO;
			gameState.turnCounter ++;
			status('<em>Current Move: </em>' + gameState.turn.name + ' is ' + gameState.turn.token);
			return false;
		} else if (gameState.turn == playerO && gameState.gameOver === false) {
			gameState.turn = playerX;
			gameState.turnCounter ++;
			status('<em>Current Move: </em>' + gameState.turn.name + ' is ' + gameState.turn.token);
			return false;
		}
	}
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

	$('#new-pvp-game-button').on('click', function () {
		newPVPGame();
	});

	$('#new-pvp-game-button').on('click', function () {
		// newPVEGame();
	});
});