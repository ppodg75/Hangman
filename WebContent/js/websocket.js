var wsUri = "ws://" + document.location.host + "/HangmanServer/play";

console.log(wsUri);

var websocket = new WebSocket(wsUri);

console.log("connected");

websocket.onerror = function(evt) {
	onError(evt)
};

function onError(evt) {
	console.log("ws: err");
}

websocket.onopen = function(evt) {
	onOpen(evt)
};

function onOpen() {
	console.log("ws: open")
}

websocket.onmessage = function(evt) {
	onMessage(evt)
};

//function onMessage(evt) {
//	console.log("ws: on msg")
//}

function wsSendMessage(msg) {
	console.log('sendMessage: '+ msg)
	websocket.send(msg)	
}


