<%@ page language="java" contentType="text/html; UTF-8" pageEncoding="UTF-8"%>
<%@include file="includes/header.jsp" %>

<input type="hidden" id="currentPage" name="currentPage" value="word" />
<input type="hidden" id="nextPage" name="nextPage" value="guess" />

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

<div id="pict_hangman"><img src="img/funny.jpag" height="300px" /></div>

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

<%@include file="includes/footer.jsp" %>