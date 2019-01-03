updateCurrentPage("list")

$("#messageWait").hide();
$("#dialog-disconnect").hide();

var timerCounterFrom = 20;
var timerCounter = timerCounterFrom;

function onMessage(evt) {
	console.log("ws: message: " + evt.data)
}

function do_disconnect() {
}

function buttonDisconnectClicked() {
	console.log("disconnect: " + name)

	$("#dialog-disconnect").dialog({
		resizable : false,
		height : "auto",
		width : 400,
		modal : true,
		buttons : {
			"YES" : function() {
				$(this).dialog("close");
				do_disconnect();
			},
			No : function() {
				$(this).dialog("close");
			}
		}
	});
}

function showUser(user) {
	console.log("showUser: " + user);
	$("#user").html("Ja ("+user.name+")");
	$("#user_points").html("Ja ("+user.name+")");
	$("#user_wins").html("Ja ("+user.name+")");
	$("#user_losts").html("Ja ("+user.name+")");
}

function refershPlayer(player) {
	console.log("refershPlayer");
	showUser(player)
//	var urlGetPlayer = getEndpointUrl("players") + "/" + getUserName()			
//	$.ajax({
//		type : "GET",
//		url : urlGetPlayer,
//		success : function(data) {
//			showUser(data)
//		}
//	})
}

function initProgress() {
	var t = ""
	for (i = 1; i <= timerCounterFrom; i++) {
		t += "<span id='prg" + i
				+ "' class='prg_element'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>";
	}
	$("#progress").html(t);
}

initProgress()

function showProgress() {
	for (i = 1; i <= timerCounterFrom; i++) {
		if (i < timerCounterFrom - timerCounter + 1) {
			$("#prg" + i).show();
		} else {
			$("#prg" + i).hide();
		}
	}
}

function showList(l) {
	console.log("showList: ");
	$("#list").html(l)
}

function refreshList() {
	console.log("refreshList");
	$.ajax({
		type : "GET",
		url : getEndpointUrl("players"),
		success : function(data) {
			console.log(" data successed: " + data)
			var list = ""
			var b = 0
			var username = getUserName()
			jQuery.each(data, function(index, itemData) {
				if (itemData.name != username) {
					if (index > 0) {
						list += addToList(itemData, b)
					}
					b = 1 - b
				} else {
					refershPlayer(itemData)
				}
			});
			showList(list)
		}
	})
}
function timeToRefresh() {
	console.log("timeToRefresh: " + timerCounter);
	timerCounter--;
	if (timerCounter <= 0) {
		timerCounter = 20;
		refreshList();
	}
}

function timeout() {
	setTimeout(function() {
		showProgress()
		timeToRefresh()
		timeout();
	}, 500);
}

function wsOnOpen() {
	console.log("wsOnOpen")
	sendHello()
	refreshList()
}