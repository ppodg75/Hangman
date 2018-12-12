var wsUri = "ws://" + document.location.host + "/HangmanServer/play";

console.log(wsUri);

var websocket = new WebSocket(wsUri);

var msgId = 0
var lastDt = ""

function writeToScreen(message) {
	console.log('writeToScreen')
	innhtml = output.innerHTML
	console.log('innerhtml: '+ innhtml)	
	output.innerHTML = message + innhtml;
}

function writeMineMessage(dt, message) {
	console.log('writeMineMessage: '+message)
	writeToScreen("<div class='datetime'>"+dt+"</div><div class='mineTitle'>Ja</div><div class='mineBox'>" + message + "</div>");
}


websocket.onerror = function(evt) {
	onError(evt)
};

function onError(evt) {
	writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
}

websocket.onopen = function(evt) {
	onOpen(evt)
};

function onOpen() {
	// writeToScreen("Connected to " + wsUri);
}

websocket.onmessage = function(evt) {
	onMessage(evt)
};

function onMessage(evt) {
}

function sendMessage() {
	msgId = Math.floor((Math.random() * 100000) + 1);
	websocket.send(msgId + '$' + username.value + '$' + msg.value)	
}