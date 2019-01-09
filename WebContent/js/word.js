updateCurrentPage("word")

function wsOnOpen() {
	console.log("wsOnOpen")
	sendHello()
}

function updateGame(game) {
	console.log("updateGame")	
	printTheWord(game.theWord,game.usedLetters)
	printUsedLetters(game.usedLetters)
	if (game.gameStatus=="END") {
		if (game.winner== getUserName()) {
			$("#winBox").show();			
		} else {
			
			$("#lostBox").show();
		}
		setTimeout(function() {
			   goto_page("list")
			}, 5000);
	}
}

function updateWordAndGameState() {
	console.log("updateWordAndGameState")
	var username = getUserName()
	ep = getEndpointUrl("game") + "/gameByPlayerName/" + username, $.ajax({
		type : "GET",
		url : ep,
		success : function(data) {
			console.log("data successed: " + data)
			obj = jQuery.parseJSON( data );			
			updateGame(obj)
		}
	})
}

function wsOnMessage(msg) {
	console.log("wsOnMessage: " + msg)
	if (msg == "letter") {
		updateWordAndGameState()
	}
}

function wordEntered() {
	var word = $("#word_input").val()
	if (word == "" || word.length < 4) {
		alert("A word cann`t be empty and has to have minimum 4 letters!")
		return false;
	}
	//var letters = /^[A-Za-zĄĆĘŁŃÓŚŻŹ]+$/;
	var letters = /^[A-Za-z]+$/;
	if (!word.match(letters)) {
		alert("You can use only letters A-Z!")
		return false;
	}
	var conv = codePolishWordToWordWithSpecs(word)
	console.log("encWord: "+word + " > "+conv);
	submit_operation("update_word", conv)
	return true;
}

function getTheWord(theWord, used) {
	console.log("getTheWod: "+theWord+" < "+used)
	var t = ""
	var c = ""
	for (i = 0; i < theWord.length; i++) {
		var c = theWord.charAt(i)
		var cl = ""
		if (used.indexOf(c) !== -1) {
			cl = "_hit"
		} 
		t += "<span class='letter" + cl + "'>" + c + "</span>"
	}
	console.log("getTheWod="+t)
	return t;
}

function printTheWord(theWord, used) {	 
	$("#word_lettered").html(getTheWord(theWord, used))
}

function printUsedLetters(letters) {
	var t = ""
	for (i = 0; i < letters.length; i++) {
	  var c = letters.charAt(i)
	  t += "<span class='letter'>" + c + "</span>"
	}
	console.log("printUsedLetters="+t)
	$("#letters").html(t)
}


$("#word").focus()

printTheWord(theWord, lettersUsed)

var input = document.getElementById("word_input");
// Execute a function when the user releases a key on the keyboard
if (input != null) {
	input.addEventListener("keyup", function(event) {
		// Cancel the default action, if needed
		event.preventDefault();
		// Number 13 is the "Enter" key on the keyboard
		if (event.keyCode === 13) {
			wordEntered()
		}
	});
}

$(document).ready(function() {
	$(window).keydown(function(event) {
		if (event.keyCode == 13) {
			event.preventDefault();
			return false;
		}
	});
});