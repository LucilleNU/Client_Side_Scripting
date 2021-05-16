let moves = 0;
let matchedCard = document.getElementsByClassName("match");
let closeicon = document.querySelector(".close");
let closemenu = document.getElementById("closemenu");
//let modal = document.getElementById("popup1")// declare modal
const board = document.getElementById("boxcard");
let cards = document.querySelectorAll(' .board .card');
let endmenu = document.getElementById("popup1")
let hasFlipedCard = false;
let firstCard, secondCard;
let images = document.getElementsByClassName("front");
let startmenu = document.getElementById("popup0");
let Score = document.getElementsByClassName("score"); 
let playerScore1 = document.getElementById("score1"); 
var turn = 1; 
let names = document.getElementsByClassName("name"); 


let formPlayers = [
	document.getElementById("1player"),
	document.getElementById("2player"),
	document.getElementById("3player"),
	document.getElementById("4player")];

let nameScores = document.getElementsByClassName("name-score"); 


function GetPlayersName() {
	let player1 = document.getElementById("player1").value;
	names[0].innerHTML = player1;
	let player2 = document.getElementById("player2").value;
	names[1].innerHTML = player2;
	let player3 = document.getElementById("player3").value;
	names[2].innerHTML = player3;
	let player4 = document.getElementById("player4").value;
	names[3].innerHTML = player4;
}

var PlayersPoints = [
	{ Player: names[0], Points: Score[0].value },
	{ Player: names[1], Points: Score[1].value },
	{ Player: names[2], Points: Score[2].value },
	{ Player: names[3], Points: Score[3].value }
];
let currentPlayer = PlayersPoints[0].Player;



document.getElementById("content2").style.display = "inline";
let radiobtns = document.getElementsByClassName("radiobutton");
let chosen = 1; //amount of players
radiobtns[0].checked = true;
function Multiplayer() {
	for (var i = 0; i < radiobtns.length; i++) {
		radiobtns[i].checked = false;
	}
	this.checked = true;
	chosen = Number(this.value);
	DisplayPlayers(); //display forms
}

function DisplayPlayers() {
	for (var i = 1; i < 4; i++) {
		formPlayers[i].classList.remove("vis");
		nameScores[i].style.display = "none";
	}
	nameScores[0].style.display = "block";
	let l = chosen;
	for (var j = 0; j < l; j++) {
		formPlayers[j].classList.add("vis");
		nameScores[j].style.display = "block";
	}
}

for (var i = 0; i < radiobtns.length; i++) {
	if (radiobtns[i].disabled === false) {
		radiobtns[i].addEventListener("click", Multiplayer);
	}
}

function CloseMenu() {
	document.getElementById("closemenu").style.display = "block";
	closemenu.addEventListener("click", function (e) {
		GetPlayersName();
		startmenu.classList.remove("show");

		$(board).css({ "visibility": "visible" });
		$(".players").css({ "visibility": "visible" });
		for (var i = 0; i < cards.length; i++) {
			cards[i].style.display = "block";
		}
	});
}


document.body.onload = StartMenu(0);
function StartMenu(index) {
	$(board).css({ "visibility": "hidden" }); 

	$(".players").css({ "visibility": "hidden" });

	startmenu.classList.add("show");

	if (index == 0) {
		for (var i = 0; i < cards.length; i++) {
			cards[i].classList.remove("show", "open", "match", "disabled");
		}
	}
	
	else {
		for (var i = 0; i < cards.length; i++) {
			cards[i].style.display = "none";
		}
		for (var i = 0; i < radiobtns.length; i++) {
			radiobtns[i].disabled = true;
		}
		CloseMenu();
	}
}

var selected = "cats";

let options = document.getElementsByClassName("option");

function ChosenOption() {
	this.classList.add("selected");
	selected = this.id;
	console.log(selected);
	for (var i = 0; i < options.length; i++) {
		option = options[i];
		if (option.id !== selected) {
			option.classList.remove("selected");
		}
	}
}
for (var i = 0; i < options.length; i++) {
	options[i].addEventListener("click", ChosenOption);
}

//change playground images theme, based on user's choice

function Theme() {
	var Theme = [];

	var ThemeAlts = [];
	for (var i = 0; i < 10; i++) {
		Theme[i] = new Image();
		Theme[i].src = "Images/" + selected + "/img" + (i + 1) + ".png";
		Theme[i].alt = "img" + (i + 1);
		ThemeAlts[i] = Theme[i].alt;
	}
	var imgAlts = [];
	for (var j = 0; j < 20; j++) {
		imgAlts[j] = images[j].alt;
		if (ThemeAlts.includes(imgAlts[j])) {
			let index = ThemeAlts.indexOf(imgAlts[j]);
			images[j].src = Theme[index].src;
		}
	}
}

//shuffle cards
function shuffle(cards) {
	cards.forEach(card => {
		let randomPos = Math.floor(Math.random() * 20);
		card.style.order = randomPos;
	});
};

function StartGame() {
	hasFlipedCard = false;
	document.getElementById("namescore1").style.display = "block";
	GetPlayersName();
	startmenu.classList.remove("show");

	playerScore1.value = 0;
	for (var i = 0; i < PlayersPoints.length; i++) {
		PlayersPoints[i].Points = 0;
		Score[i].value = 0;
		PlayersPoints[i].Player.classList.remove("turn");
	}

	PlayersPoints[0].Player.classList.add("turn");
	currentPlayer = PlayersPoints[0].Player;
	turn = 1;

	$(board).css({ "visibility": "visible" }); //display playground

	$(".players").css({ "visibility": "visible" }); //display player forms in gsme

	firstCard = 0;
	secondCard = 0;
	Theme();
	shuffle(cards);

	// remove all exisiting classes from each card

	for (var i = 0; i < cards.length; i++) {
		board.innerHTML = "";
		[].forEach.call(cards, function (item) {
			board.appendChild(item);
		});
		cards[i].style.display = "block";
		cards[i].classList.remove("show", "open", "match", "disabled");

		moves = 0;
	}
}


for (var i = 0; i < cards.length; i++) {
    cards.item(i).addEventListener("click", function () {
		this.classList.toggle("open");
		this.classList.toggle("show");
		this.classList.toggle("disabled");

		if (!hasFlipedCard) {
			hasFlipedCard = true;
			firstCard = this;
		}
		else {
			disablePlayGround();
			hasFlipedCard = false;
			secondCard = this;
			checkForMatch(firstCard);
			moveCounter();
		}
    });
}

function checkForMatch() {
	if (firstCard.dataset.framework === secondCard.dataset.framework) {
		matched();
	}
	else {
		unmatched();
	}
}

function matched() {
	firstCard.classList.add("match", "disabled");
	secondCard.classList.add("match", "disabled");

	if (chosen === 1) {
		playerScore1.value++;
	}
	else {

		for (var i = 0; i < PlayersPoints.length; i++) {

			if (currentPlayer.innerHTML == PlayersPoints[i].Player.innerHTML) {
				PlayersPoints[i].Points++;
				Score[i].value++;
			}
		}
	}
	AblePlayGround();
}

function unmatched() {

	firstCard.classList.add("unmatched");
	secondCard.classList.add("unmatched");
	setTimeout(function () {
		firstCard.classList.remove("open", "unmatched");
		secondCard.classList.remove("open", "unmatched");
		enable();
	}, 850);
	setTimeout(function () {
		firstCard.classList.remove("show");
		secondCard.classList.remove("show");
		AblePlayGround();
	}, 900);

}

//disable all cards
function disablePlayGround() {
	for (var c = 0; c < cards.length; c++) {
		card = cards[c];
		card.classList.add("disableplayground");
	}
}
//unblock playground
function AblePlayGround() {
	for (var c = 0; c < cards.length; c++) {
		card = cards[c];

		card.classList.remove("disableplayground");
	}
}

//enable cards and disable matched cards
function enable() {
	Array.prototype.filter.call(cards, function (card) {
		card.classList.remove('disabled');
		for (var i = 0; i < matchedCard.length; i++) {
			matchedCard[i].classList.add("disabled");
		}
	});
}

//count player's moves
function moveCounter() {
	moves++;
	//after one move ==> next player's turn (until all cards will be opened)
	if (matchedCard.length !== 20) {
		if (chosen == 4 && turn == 4) {
			PlayersPoints[3].Player.classList.remove("turn");
			turn = 5;
		}

		if (turn <= chosen) {
			PlayersPoints[turn - 1].Player.classList.remove("turn");
			PlayersPoints[turn].Player.classList.add("turn");
			currentPlayer = PlayersPoints[turn].Player;
			turn++;
		}
		if (turn > chosen) {
			PlayersPoints[chosen - 1].Player.classList.remove("turn");
			PlayersPoints[0].Player.classList.add("turn")
			currentPlayer = PlayersPoints[0].Player;
			turn = 1;
		}
	}
}

//congratulations when all cards match
function congratulations() {
	if (matchedCard.length == 20) {
		var b = 0;
		while (b < 4) {
			PlayersPoints[b].Player.classList.remove("turn");
			b++
		}

		endmenu.classList.add("show"); // show congratulations popup

		document.getElementById("youwinner").classList.add("show");
		
		//1 player mode
		if (chosen == 1) {
			document.getElementById("finalMove").innerHTML = moves;
			document.getElementById("playername").innerHTML = names[0].innerHTML + "!";

			document.getElementById("winner").style.display = "none";

			document.getElementById("congrats2").style.display = "none";
		}
		//multiplayer mode
		else {
			document.getElementById("youwinner").classList.add("show");
			document.getElementById("loserscore").style.display = "inline-flex";

			document.getElementById("finalMove").style.display = "none";
			document.getElementById("movescount").style.display = "none";

			let SortedPlayersPoints = [];//storage for sorted player-points array in descending order

			for (let i = 0; i < 4; i++) {
				SortedPlayersPoints[i] = { Points: Score[i].value, Name: PlayersPoints[i].Player.innerHTML };
			}
			SortedPlayersPoints = SortedPlayersPoints.sort(function (a, b) { return b.Points - a.Points });

			if (SortedPlayersPoints[0].Points == SortedPlayersPoints[chosen - 1].Points) {  // if all equals
				document.getElementById("congrats2").style.display = "inline-flex"; //if draw game
				document.getElementById("congrats1").style.display = "none";
				document.getElementById("loserscore").style.display = "none";
			}
			else {
				document.getElementById("congrats2").style.display = "none";
				document.getElementById("congrats1").style.display = "inline-flex";
				let Winners = SortedPlayersPoints[0].Name; //player with biggest amount of points (first winner)
				//if not 1 winner
				for (let i = 1; i < chosen; i++) {
					if (SortedPlayersPoints[i].Points == SortedPlayersPoints[0].Points) {
						Winners += ", " + SortedPlayersPoints[i].Name;
						document.getElementById("youwinner").innerHTML = "You're winners! 🎉🎉";
					} else break;
				}
				Winners += "!";
				document.getElementById("playername").innerHTML = Winners;
			}
		}
		close();
	}

}

function close() {
	closeicon.addEventListener("click", function (e) {
		endmenu.classList.remove("show");
		StartMenu(0);
	});
}

function playAgain() {
	endmenu.classList.remove("show");
	StartMenu(0);
}


	for (var i = 0; i < cards.length; i++) {
		card = cards[i];
		card.addEventListener("click", congratulations);
	}
