var baseUrlEndpoint = "http://" + document.location.host + "/HangmanServer";

var list_busy = false;

function getEndpointUrl(epName) {
	return baseUrlEndpoint + "/" + epName;
}

function do_accept_inv() {
	
}

function invitation(name) {
	if (list_busy) return;
	list_busy = true;
	
	$("#inv_uname").replaceWith(name);
	
	setTimeout(function(){ $( "#dialog-invitation" ).dialog("close"); }, 10000);
	
	$( "#dialog-invitation" ).dialog({
	      resizable: false,
	      height: "auto",
	      width: 400,
	      modal: true,
	      buttons: {
	        "YES": function() {
	          $( this ).dialog( "close" );
	          list_busy = false;
	          do_accept_inv();
	        },
	        No: function() {
	          $( this ).dialog("close");
	          list_busy = false;
	        }
	      }
	    });
}

function do_disconnect() {
	
}

function disconnect(name) {	
	list_busy = true;
		
	$( "#dialog-disconnect" ).dialog({
	      resizable: false,
	      height: "auto",
	      width: 400,
	      modal: true,
	      buttons: {
	        "YES": function() {
	          $( this ).dialog( "close" );
	          list_busy = false;
	          do_disconnect();
	        },
	        No: function() {
	          $( this ).dialog("close");
	          list_busy = false;
	        }
	      }
	    });
}

function submit_operation(operation, data) {
	console.log("operation: "+operation+"("+data+")")
	form = $("#main_form");
	$("operation").val(operation);
	$("data").val(data);
	form.submit(); 
	return true;	
}






