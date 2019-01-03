updateCurrentPage("index")

function hideMessage() {
	console.log("hideMessage")
	$("#message").hide()
}

function showUserCreated() {
	console.log("showUserCreated")
	$("#message").removeClass("error").html("User created").show();
	setTimeout(function() {
		hideMessage();
		submit_operation("setPlayerName", getUserName())
	}, 2000);
}

function showError() {
	console.log("showError")
	$("#message").addClass("error").html(
			"User creation failed! Try again. Try with another name.").show();
}

function checkPlayerAndGo(name) {
	console.log("checkPlayerAndGo: " + name);
	var urlGetUser = getEndpointUrl("players") + "/" + name
	$.ajax({
		type : "POST",
		url :  urlGetUser,
		success : function(data) {
			if (data!="USER EXIST!") {
			   showUserCreated()
			} else {
				showError()
			}
		}
	}).fail(function() {
		showError()
	})
}

function buttonStartClicked() {
	console.log("buttonStartClicked")
	username = getUserName()
	if (username=="") {
		alert("Enter player name!")
		return false;
	}	
	checkPlayerAndGo(username)	
	return true;
}

function onMessage(evt) {
   console.log("ws: message: "+evt.data)
}


function wsOnOpen() {
	console.log("wsOnOpen")
}
