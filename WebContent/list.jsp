<%@include file="includes/header.jsp"%>

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
<div id="list">
	<div class="user0">
		<div class="user_name">Piotr</div>
		<div class="user_points">
			<span class="label">points:</span> <span class="value">20</span>
		</div>
		<div class="user_wins">
			<span class="label">wins:</span> <span class="value">30</span>
		</div>
		<div class="user_losts">
			<span class="label">losts:</span> <span class="value">10</span>
		</div>
		<div class="user_buttons">
		  <button type="button">Invitate</button> 
		</div>		
	</div>
	<div class="user1">
		<div class="user_name">Wojtek</div>
		<div class="user_points">
			<span class="label">points:</span> <span class="value">20</span>
		</div>
		<div class="user_wins">
			<span class="label">wins:</span> <span class="value">30</span>
		</div>
		<div class="user_losts">
			<span class="label">losts:</span> <span class="value">10</span>
		</div>
		<div class="user_buttons">
		  <button type="button">Invitate</button> 
		</div>
	</div>
</div>

<div id="controlsbox">
	<button name="btn_disconnect" id="btn_disconnect" onClick="disconnect(); return false">Disconnect</button>
</div>

<div id="dialog-disconnect" title="Disconnect">
  <p><span class="ui-icon ui-icon-alert" style="float:left; margin:12px 12px 20px 0;"></span>Are you sure? </p>
</div>

<div id="dialog-invitation" title="Invitation to the game">
  <p><span class="ui-icon ui-icon-alert" style="float:left; margin:12px 12px 20px 0;"></span>User <b><span id="inv_uname">Wojtek</span></b> invitated you. Do you accept? <br/>
  (the dialog will be closed after 10 seconds)</p>
</div>

<script>
$( "#dialog-invitation" ).hide();
$( "#dialog-disconnect" ).hide();
</script>

<script>
setTimeout(function(){ invitation("Andrzej"); }, 3000);
</script>

<%@include file="includes/footer.jsp"%>