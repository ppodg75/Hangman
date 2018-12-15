var baseUrlEndpoint = "http://" + document.location.host + "/HangmanServer/ep";

function getEndpointUrl(epName) {
	return baseUrlEndpoint + "/" + epName;
}

function submit_operation(operation, data) {
	console.log("submit_operation: "+operation+"("+data+")")
	form = $("#main_form");
	$("operation").val(operation);
	$("data").val(data);
	form.submit(); 
	return true;	
}

function gotoNextPage() {
	submit_operation("","")
}

function SendOperationToServer(oper, data) {
	console.log('sendOperation: '+ oper)
	wsSendMessage(oper+"#"+data)
}

function isMessage(msg, oper) {
	var op = oper + "#"
	return msg.substring(0, 4) == op;
}

function getMsgData(msg) {
	return msg.substring(4)
}

function setUID(uid) {
	 $("#UID").val(uid)
}

function getUID() {
	return $("#UID").val(); 
}





