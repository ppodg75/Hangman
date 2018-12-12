<%@include file="includes/header.jsp"%>

<input type="hidden" id="currentPage" name="currentPage" value="list" />
<input type="hidden" id="nextPage" name="nextPage" value="word" />

<div id="userdata">
	<div class="user_name">Ja</div>
	<div class="user_points">
		<span class="label">points:</span> <span class="value">20</span>
	</div>
	<div class="user_wins">
		<span class="label">wins:</span> <span class="value">30</span>
	</div>
	<div class="user_losts">
		<span class="label">losts:</span> <span class="value">10</span>
	</div>
</div>

<script>
function divClassValue(cl, valname, val) {
	return "<div class='"+cl+"'><span class='label'>"+valname+":</span> <span class='value'>"+val+"</span></div>"
}

function addToList(item, u) {
	var t = "<div class='user"+u+"'><div class='user_name'>"+item.name+"</div>";
	t += divClassValue("user_points", "points", item.points)
	t += divClassValue("user_wins", "wins", item.countWins)
	t += divClassValue("user_losts", "losts", item.countLosts)
	t += "<div class='user_buttons'><button type='button'>Invitate</button></div>"
	t += "</div>";
	return t;
}
</script>

<div id="progress">
</div>

<div id="list">	
</div>

<div id="controlsbox">
	<button name="btn_disconnect" id="btn_disconnect"
		onClick="disconnect(); return false">Disconnect</button>
</div>

<div id="dialog-disconnect" title="Disconnect">
	<p>
		<span class="ui-icon ui-icon-alert"
			style="float: left; margin: 12px 12px 20px 0;"></span>Are you sure?
	</p>
</div>

<div id="dialog-invitation" title="Invitation to the game">
	<p>
		<span class="ui-icon ui-icon-alert"
			style="float: left; margin: 12px 12px 20px 0;"></span>User <b><span
			id="inv_uname">Wojtek</span></b> invitated you. Do you accept? <br />
		(the dialog will be closed after 10 seconds)
	</p>
</div>

<script>
	$("#dialog-invitation").hide();
	$("#dialog-disconnect").hide();
</script>


<script>
    var timerCounterFrom = 20;
	var timerCounter = timerCounterFrom;
		
    function initProgress() {    	
    	var t = ""
	  	for(i=1; i<=timerCounterFrom; i++) {
	  		t +=  "<span id='prg"+i+"' class='prg_element'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>";
	  	}
    	$("#progress").html(t);
	}
    
    initProgress() 
	
	function showProgress() {
	  	for(i=1; i<=timerCounterFrom;i++) {
	  		if (i<timerCounterFrom - timerCounter+1) {
	  			$("#prg"+i).show();
	  		} else {
	 			$("#prg"+i).hide();
	  		}
	  	}
	}
	
	function showList(l) {
		$("#list").html(l)
	}
	
	function refreshList() {
		console.log("refreshList");
		$.ajax({			
			type: "GET",
			url : "http://localhost:8080/HangmanServer/players", //getEndpointUrl("players"),
			success : function(data) {
				var list = ""
				var b = 0
				jQuery.each(data, function(index, itemData) {
					if (index>1) {
					   list += addToList(itemData,b)
					}
					b = 1 - b
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
	    setTimeout(function () {
	    	showProgress()
	    	timeToRefresh()
	        timeout();
	    }, 1000);
	}
	
	refreshList() 
	timeout()
</script>

<%@include file="includes/footer.jsp"%>