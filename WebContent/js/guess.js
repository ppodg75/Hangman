updateCurrentPage("guess")

function do_guess_end_game() {
	console.log("end_game");
}

function guess_end_game() {
$( "#dialog-confirm" ).dialog({
      resizable: false,
      height: "auto",
      width: 400,
      modal: true,
      buttons: {
        "YES": function() {
          $( this ).dialog( "close" );
          do_guess_end_game();
        },
        No: function() {
          $( this ).dialog("close");
        }
      }
    });
}

function guess_letter(letter) {
	console.log("letter pressed: "+letter)
	$('#letter'+letter).attr("disabled", true);
	submit_operation("letter", letter);
}

function wsOnOpen() {
	console.log("wsOnOpen")
	sendHello()
}

function wsOnMessage(data) {
	
	if (data == "word_updated") {
		submit_operation("word_updated","")
	}
	
}