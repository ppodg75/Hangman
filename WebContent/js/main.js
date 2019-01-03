var baseUrlEndpoint = "http://" + document.location.host + "/HangmanServer/ep";

function getEndpointUrl(epName) {
	return baseUrlEndpoint + "/" + epName;
}

function submit_operation(operation, data) {
	console.log("submit_operation: "+operation+"("+data+")")
	form = $("#main_form");
	$("#operation").val(operation);
	$("#data").val(data);
	form.submit(); 
	return true;	
}

//function gotoNextPage() {
//	console.log("gotoNextPage")
//	submit_operation("goto_page",$("nextPage").val())
//}

function updateCurrentPage(currentPage) {
	console.log("updateCurrentPage")
	$("#currentPage").val(currentPage);	
}

function SendOperationToServer(oper, data) {
	console.log('SendOperationToServer: '+ data)//timeout()per)
	wsSendMessage(oper+"#"+data)
}

function isMessage(msg, oper) {	
	var op = oper + "#"
	return msg.substring(0, 4) == op;
}

function getMsgData(msg) {
	return msg.substring(4)
}

function getUserName() {
	return $("#username").val()
}

function setUserName(un) {
	$("#username").val(un)
}

function sendHello() {
	SendOperationToServer("hello", getUserName())
}


