<%@ page language="java" contentType="text/html; UTF-8" pageEncoding="UTF-8"%>
<%@ page import="dto.GameDto, dto.PlayerDto, utils.WordCodeDecode" %>
<%@include file="includes/header.jsp" %>
<script src="js/utils.js"></script>
<script>
<% 
  String username = (request.getAttribute("username")!=null)?(String)request.getAttribute("username"):""; 
  PlayerDto player = (request.getAttribute("player")!=null)?(PlayerDto)request.getAttribute("player"):null;
  GameDto game = (request.getAttribute("game")!=null)?(GameDto)request.getAttribute("game"):null;
  String lettersUsed = "";
  String imgHangman = "szub0.jpg";
  String gappedWord = "";
  
  boolean waitForWord = "WAIT_FOR_WORD".equals(game.getGameStatus());
  boolean endGame = "END".equals(game.getGameStatus());
  boolean winGame = false;
  if (endGame) {
	  winGame = game.getWinner().equals(username);
  }
  if (game!=null) {
	  imgHangman = "szub"+game.getCountMissed()+".jpg";
	  lettersUsed = (game.getUsedLetters()!=null)?game.getUsedLetters():"";
	  out.println("var lettersUsed='"+lettersUsed+"'");
	  if (!waitForWord) { gappedWord = game.getGappedWord(); }
  }
  
  out.println("var gappedWord='"+gappedWord+"'");
%>
</script>

<input type="hidden" id="username" name="username" value="<%= username %>" />

<div id="userdata">
    <div class="user_name">Ja (<%= username %>)</div>
	<div class="user_points">
		<span class="label">points:</span> <span class="value"><%=  player.getPoints() %></span>
	</div>
	<div class="user_wins">
		<span class="label">wins:</span> <span class="value"><%=  player.getCountWins() %></span>
	</div>
	<div class="user_losts">
		<span class="label">losts:</span> <span class="value"><%=  player.getCountLosts() %></span>
	</div>
</div>
<div id="pict_hangman"><img src="img/<%= imgHangman %>" id="hangman" height="300px" /></div>

<% if (waitForWord) { %>
<div id="word_wait"> Waiting for a word from the opponent ... </div>
<% } %>

<div id="word">
  <div class="word_label">Word to guess:</div>
	    <div id="word_lettered"></div>      
</div>

<%!
 String printLineLetters(String letters, String used) {
	StringBuilder sb = new StringBuilder();
	sb.append("<div class=\"line\">");
	for(int i=0; i<letters.length(); i++) {
		String c =  letters.substring(i,i+1);
		// id=\"letter"+c+"\"
		sb.append("<button type=\"button\" onClick=\"guess_letter('"+WordCodeDecode.codePolishWordToWordWithSpecs(c)+"', this);\"");
		if (used.contains(c)) {
			sb.append(" disabled title=\"a letter has been already used.\" ");
		}
		sb.append(">");		
		sb.append(c);
		sb.append("</button>\n");		
	}
	sb.append("</div>\n");
	return sb.toString();
 }  
%>
<%
String lines[] = { new String("QWERTYUIOP"), new String("ASDFGHJKL"), new String("ZXCVBNM")
 //                 , new String("ĄĆĘŁŃÓŚŻŹ")
					};
%>
<div id="keyboard_head" style="text-align: center; margin-top: 30px;">CLICK ON A LETTER-BUTTON:</div>
<div id="keyboard">   

  <%
    for(int i=0; i < lines.length; i++) { out.print(printLineLetters(lines[i],lettersUsed)); } 
    %>   
</div>
<% 
if (endGame) {
  if (winGame) { %> 
		<div id="winBox"> You won. Congratulations! </div>
	<% } else { %>
		<div id="lostBox"> You lost!</div>		
	<% } 
} else {
%>
<div style="text-align: center; margin-top: 30px;"><button type="button" onClick="guess_end_game()">END GAME</button> </div>
<% } %>

<div id="dialog-confirm" title="End of the game?">
  <p><span class="ui-icon ui-icon-alert" style="float:left; margin:12px 12px 20px 0;"></span>Your opponent will get one point. Are you sure?</p>
</div>
<script>
$( "#dialog-confirm" ).hide();

<% if (waitForWord) { %>
$( "#keyboard_head" ).hide();
$( "#keyboard" ).hide();
$( "#word" ).hide();
<% } %>

<% if (endGame) { %>
$( "#keyboard_head" ).hide();
$( "#keyboard" ).hide();

setTimeout(function() {
	   goto_page("list")
	}, 5000);

<% } %>

</script>

<script src="js/guess.js"></script>
<%@include file="includes/footer.jsp" %>