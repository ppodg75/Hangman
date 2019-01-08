<%@ page language="java" contentType="text/html; UTF-8" pageEncoding="UTF-8"%>
<%@ page import="dto.GameDto, dto.PlayerDto" %>
<%@include file="includes/header.jsp" %>

<script>
<% 
  String username = (request.getAttribute("username")!=null)?(String)request.getAttribute("username"):""; 
  PlayerDto player = (request.getAttribute("player")!=null)?(PlayerDto)request.getAttribute("player"):new PlayerDto();
  GameDto game = (request.getAttribute("game")!=null)?(GameDto)request.getAttribute("game"):new GameDto();
  boolean waitForWord = "WAIT_FOR_WORD".equals(game.getGameStatus());
  out.println("var waitForWord="+waitForWord);
  String lettersUsed = "";
  String theWord = "";
  if (game!=null) {
	  theWord = (game.getTheWord()!=null)?game.getTheWord():"";
	  out.println("var theWord='"+theWord+"'");
	  lettersUsed = (game.getUsedLetters()!=null)?game.getUsedLetters():"";
	  out.println("var lettersUsed='"+lettersUsed+"'");
  }
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

<div id="pict_hangman"><img src="img/funny.jpg" height="300px" /></div>
<br /><br />
<% if (waitForWord) { %>
<div id="enter_word">Enter your word: <input name="word" id="word_input" placeholder="enter a word" value="" />&nbsp;&nbsp;<button id="btnEnterWord" onClick="wordEntered()" type="button" form="main_form" >Send</button></div>
<% } %>


<div id="word">
  <div class="word_label">Your word:</div>
  <div id="word_lettered"> </div>
</div>

<script>
if (waitForWord) {
  $("#word").hide();
}
</script>

<script src="js/word.js"></script>
<%@include file="includes/footer.jsp" %>