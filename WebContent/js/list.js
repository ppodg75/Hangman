updateCurrentPage("list")

$("#messageWait").hide();
$("#dialog-disconnect").hide();

var timerCounterFrom = 20;
var timerCounter = timerCounterFrom;

function onMessage(evt) {
	console.log("ws: message: " + evt.data)
}

function do_disconnect() {
	sendByeBye()
	submit_operation("disconnect", getUserName())
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
	$("#user").html("Me ("+user.name+")");
	$("#user_points").html(+user.points);
	$("#user_wins").html(user.countWins);
	$("#user_losts").html(user.countLosts);
}



function refershPlayer(player) {
	console.log("refershPlayer");
	showUser(player)
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

function isInvisible(user) {
	return user.status == 'INVISIBLE' 
}

function refreshList() {
	console.log("refreshList");
	$.ajax({
		type : "GET",
		url : getEndpointUrl("players"),
		success : function(data) {
			console.log("data successed: ") // + data)
			var list = ""
			var b = 0
			var username = getUserName()
			console.log("current user name: "+username) // + data)
			
			addComputerToList(b)
			b = 1
			
			jQuery.each(data, function(index, itemData) {
				if ((itemData.name != username) && !isInvisible(itemData)) {
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

timeout()

function wsOnOpen() {
	console.log("wsOnOpen")
	sendHello()
	refreshList()
}

function wsOnMessage(msg) {
	console.log("wsOnMessage: "+msg)
	if (msg == 'goto_guess') {
		submit_operation("guess", "start")
		return;
	}
	if (msg == 'goto_word') {
		submit_operation("word", "start")
		return;
	}
	if (msg == 'refresh_player_list') {
		refreshList()
		return;
	}
	
}

function playerAliveCanPlay(opponentName) {
	var urlGetPlayer = getEndpointUrl("players") + "/" + opponentName //getUserName()			
	$.ajax({
			type : "GET",
			url : urlGetPlayer,
			success : function(data) {
			    console.log("data = "+data)	
			    var json = $.parseJSON(data);
			    console.log("data.status = "+json.status)
				if (json.status == 'CREATED') {
					submit_operation("playGame", opponentName)
				} else {
					alert('User "'+opponentName+'" is busy or unaviable!')
				}
			},
		    error: function (request, status, error) {
		        alert(request.responseText);
		      }
		})
}

function playWith(opponentName) {	
	if (confirm("You will be play with "+opponentName+"?")) {
			playerAliveCanPlay(opponentName)
	}
}
 

