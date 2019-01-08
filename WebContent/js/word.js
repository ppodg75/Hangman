updateCurrentPage("word")

function wsOnOpen() {
	console.log("wsOnOpen")
	sendHello()
}

function updateGame(game) {
	console.log("updateGame")
}

function updateWordAndGameState() {
	console.log("updateWordAndGameState")
	var username = getUserName()
	ep = getEndpointUrl("game") + "/" + username, $.ajax({
		type : "GET",
		url : ep,
		success : function(data) {
			console.log("data successed: " + data)
			updateGame(data[0])
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
		return;
	}
	submit_operation("update_word", word)
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