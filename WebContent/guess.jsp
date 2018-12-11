<%@ page language="java" contentType="text/html; UTF-8" pageEncoding="UTF-8"%>
<%@include file="includes/header.jsp" %>

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
<div id="pict_hangman"><img src="img/szub0.jpg" height="300px" /></div>

<div id="word">
  <div class="word_label">Word to guess:</div>
  <div id="word_lettered">
     <span class="letter_blank">?</span>
     <span class="letter_blank">?</span>
     <span class="letter_blank">?</span>
     <span class="letter_blank">?</span>
     <span class="letter_blank">?</span>
     <span class="letter_blank">?</span>
     <span class="letter_blank">?</span>
     <span class="letter_blank">?</span>
     <span class="letter_hit">T</span>
  </div>
</div>

<%!
 String lineLetters(String letters, String used) {
	StringBuilder sb = new StringBuilder();
	sb.append("<div class=\"line\">");
	for(int i=0; i<letters.length(); i++) {
		String c =  letters.substring(i,i+1);
		sb.append("<button type=\"button\" onClick=\"guess_letter('"+c+"')\"");
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
String line1 = new String("QWERTYUIOP");
String line2 = new String("ASDFGHJKL");
String line3 = new String("ZXCVBNM");
String line4 = new String("ĄĆĘŁŃÓŚŻ");
String lettersUsed = new String("UTDMĄ");
%>
<div style="text-align: center; margin-top: 30px;">CLICK ON A LETTER-BUTTON:</div>
<div id="keyboard">
   <% out.print(lineLetters(line1,lettersUsed));  %>
   <% out.print(lineLetters(line2,lettersUsed));  %>
   <% out.print(lineLetters(line3,lettersUsed));  %>
   <% out.print(lineLetters(line4,lettersUsed));  %>
</div>
<div style="text-align: center; margin-top: 30px;"><button type="button" onClick="guess_end_game()">END GAME</button> </div>

<div id="dialog-confirm" title="End of the game?">
  <p><span class="ui-icon ui-icon-alert" style="float:left; margin:12px 12px 20px 0;"></span>Your opponent will get one point. Are you sure?</p>
</div>
<script>$( "#dialog-confirm" ).hide();</script>
<%@include file="includes/footer.jsp" %>