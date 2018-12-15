function hideMessage() {
	$("#message").hide()
}

function showUserCreated() {
	$("#message").removeClass("error").html("User created").show();
	setTimeout(function() {
		hideMessage();
		gotoNextPage();
	}, 1000);
}

function showError() {
	$("#message").addClass("error").html(
			"User creation failed! Try again. Try with another name.").show();
}

function updatePlayer(uid, name) {
	console.log("updatePlayer: " + uid + " > " +name);
	var urlUpdateUser = getEndpointUrl("players") + "/" + uid + "/" + name
	$.ajax({
		type : "PUT",
		url :  urlUpdateUser,// "http://localhost:8080/HangmanServer/players",
											// //getEndpointUrl("players"), //
		success : function(data) {
			showUserCreated()
		}
	}).fail(function() {
		showError()
	})

}

function buttonStartClicked() {
	username = $("#username").val();
	console.log("buttonStartClicked")	
	updatePlayer(getUID(), username)	
	return true;
}

function onMessage(evt) {
   console.log("ws: message: "+evt.data)
   var msg = evt.data
   if (isMessage(msg, "UID")) 
	    {
	      var data = getMsgData(msg)
	      setUID(data)
	    }
}