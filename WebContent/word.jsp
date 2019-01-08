<%@ page language="java" contentType="text/html; UTF-8" pageEncoding="UTF-8"%>
<%@ page import="dto.GameDto, dto.PlayerDto" %>
<%@include file="includes/header.jsp" %>

<% 
  String username = (request.getAttribute("username")!=null)?(String)request.getAttribute("username"):""; 
  PlayerDto player = (request.getAttribute("player")!=null)?(PlayerDto)request.getAttribute("username"):new PlayerDto();
  GameDto game = (request.getAttribute("game")!=null)?(GameDto)request.getAttribute("game"):new GameDto();
%>
<input type="hidden" id="username" name="username" value="<%= username %>" />

<input type="hidden" id="currentPage" name="currentPage" value="word" />
<input type="hidden" id="nextPage" name="nextPage" value="guess" />

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

<div id="word">
  <div class="word_label">Your word:</div>
  <div id="word_lettered">
  <span class="letter">A</span>
     <span class="letter">G</span>
     <span class="letter">R</span>
     <span class="letter">E</span>
     <span class="letter">E</span>
     <span class="letter">M</span>
     <span class="letter">E</span>
     <span class="letter">N</span>
     <span class="letter_hit">T</span>
  </div>
</div>

<script src="js/word.js"></script>
<%@include file="includes/footer.jsp" %>