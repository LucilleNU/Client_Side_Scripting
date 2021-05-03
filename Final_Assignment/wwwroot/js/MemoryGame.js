var theme;
var size;
var players;
var BoxOpened = "";
var ImgOpened = "";
var Counter = 0;
var ImgFound = 0;
let Score = document.getElementsByClassName("score"); /*players' points*/
const board = document.getElementById("boxcard");// deck of all cards in game
let startmenu = document.getElementById("popup0");
let cards = document.querySelectorAll(' .board .card');
let closemenu = document.getElementById("closemenu");
let closeicon = document.querySelector(".close");// close icon in modal
let playerScore1 = document.getElementById("score1");  //1 player points 

var Source = "#boxcard";

var ImgSource = [];

var turn = 1; //index of curent player

let names = document.getElementsByClassName("name"); //player names

//player forms

let formPlayers = [
	document.getElementById("1player"),
	document.getElementById("2player"),
	document.getElementById("3player"),
	document.getElementById("4player")];

let nameScores = document.getElementsByClassName("name-score"); //display player form


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

//player-points storage
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
//display form when button clicked
for (var i = 0; i < radiobtns.length; i++) {
	if (radiobtns[i].disabled === false) {
		radiobtns[i].addEventListener("click", Multiplayer);
	}
}

document.body.onload = StartMenu(0);
function StartMenu(index) {
	$(board).css({ "visibility": "hidden" }); //hide playground
	$(".players").css({ "visibility": "hidden" }); //hide players' forms
	startmenu.classList.add("show"); //display start menu

	//remove all markers to restart game
	if (index == 0) {
		for (var i = 0; i < cards.length; i++) {
			cards[i].classList.remove("show", "open", "match", "disabled");
		}
	}
	//hide all cards NOT to restart game
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

//closes menu, but DOSEN'T restart the game, ignoring new parameters (except names)
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


function Theme() {
	theme = prompt("Enter a card theme", "Cats, Dogs or Dinosaurs");
	if (theme != null) {
		document.getElementById("themeselect").innerHTML = theme;

	}
	if (theme == "Cats") {
		ImgSource = [
			"Images/cats/cat1.svg",
			"Images/cats/cat2.svg",
			"Images/cats/cat3.svg",
			"Images/cats/cat4.svg",
			"Images/cats/cat5.svg",
			"Images/cats/cat6.svg",
			"Images/cats/cat7.svg",
			"Images/cats/cat8.svg",
			"Images/cats/cat9.svg",
			"Images/cats/cat10.svg",
		];
	}
	if (theme == "Dogs") {
		ImgSource = [
			"Images/dogs/dog1.png",
			"Images/dogs/dog2.jpeg",
			"Images/dogs/dog3.jpeg",
			"Images/dogs/dog4.png",
			"Images/dogs/dog5.jpeg",
			"Images/dogs/dog6.jpeg",
			"Images/dogs/dog7.jpeg",
			"Images/dogs/dog8.png",
			"Images/dogs/dog9.jpeg",
			"Images/dogs/dog10.jpeg",
		];
	}
	if (theme == "Dinosaurs") {
		ImgSource = [
			"Images/dinosaurs/dinosaur1.jpeg",
			"Images/dinosaurs/dinosaur2.png",
			"Images/dinosaurs/dinosaur3.png",
			"Images/dinosaurs/dinosaur4.png",
			"Images/dinosaurs/dinosaur5.png",
			"Images/dinosaurs/dinosaur6.png",
			"Images/dinosaurs/dinosaur7.jpeg",
			"Images/dinosaurs/dinosaur8.jpeg",
			"Images/dinosaurs/dinosaur9.jpeg",
			"Images/dinosaurs/dinosaur10.jpeg",
		];
    }
}

function size()
{
	size = prompt("Enter field size. The bigger the board - the more cards will there be to remember", "3x4, 4x4 or 5x4");
	if (size != null) {
		document.getElementById("size").innerHTML = size;

	}
}

function StartGame() {
	document.getElementById("namescore1").style.display = "block";
	GetPlayersName();
	startmenu.classList.remove("show");


	playerScore1.value = 0; //refresh points counter for 1 player mod 
	//refresh points counter for multiplayer mode 
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

	ShuffleImages();
}

function RandomFunction(MaxValue, MinValue) {
	return Math.round(Math.random() * (MaxValue - MinValue) + MinValue);
}
	function ShuffleImages() {
		var ImgAll = $(Source).children();
		var ImgThis = $(Source + " div:first-child");
		var ImgArr = new Array();

		for (var i = 0; i < ImgAll.length; i++) {
			ImgArr[i] = $("#" + ImgThis.attr("id") + " img").attr("src");
			ImgThis = ImgThis.next();
		}

		ImgThis = $(Source + " div:first-child");

		for (var z = 0; z < ImgAll.length; z++) {
			var RandomNumber = RandomFunction(0, ImgArr.length - 1);

			$("#" + ImgThis.attr("id") + " img").attr("src", ImgArr[RandomNumber]);
			ImgArr.splice(RandomNumber, 1);
			ImgThis = ImgThis.next();
		}
	}

	function ResetGame() {
		ShuffleImages();
		$(Source + " div img").hide();
		$(Source + " div").css("visibility", "visible");
		Counter = 0;
		$("#success").remove();
		$("#counter").html("" + Counter);
		BoxOpened = "";
		ImgOpened = "";
		ImgFound = 0;
		return false;
	}

	function OpenCard() {
		var id = $(this).attr("id");

		if ($("#" + id + " img").is(":hidden")) {
			$(Source + " div").unbind("click", OpenCard);

			$("#" + id + " img").slideDown('fast');

			if (ImgOpened == "") {
				BoxOpened = id;
				ImgOpened = $("#" + id + " img").attr("src");
				setTimeout(function () {
					$(Source + " div").bind("click", OpenCard)
				}, 300);
			}

			else {
				CurrentOpened = $("#" + id + " img").attr("src");
				if (ImgOpened != CurrentOpened) {
					setTimeout(function () {
						$("#" + id + " img").slideUp('fast');
						$("#" + BoxOpened + " img").slideUp('fast');
						BoxOpened = "";
						ImgOpened = "";
					}, 400);
				}

				else {
					$("#" + id + " img").parent().css("visibility", "hidden");
					$("#" + BoxOpened + " img").parent().css("visibility", "hidden");
					ImgFound++;
					BoxOpened = "";
					ImgOpened = "";
				}
				setTimeout(function () {
					$(Source + " div").bind("click", OpenCard)
				}, 400);
			}
			Counter++;
			$("#counter").html("" + Counter);

			if (ImgFound == ImgSource.length) {
				$("#counter").prepend('<span id="success">You Found All Pictues With </span>');
			}
		}
	}

	$(document).ready(function () {

		for (var y = 1; y < 3; y++) {
			$.each(ImgSource, function (i, val) {
				$(Source).append("<div id=card" + y + i + "><img src=" + val + " />");
			});
		}
		$(Source + " div").click(OpenCard);
		ShuffleImages();
	}
	);


function close() {
	closeicon.addEventListener("click", function (e) {
		startmenu.classList.remove("show");
		StartGame();
	});
}
