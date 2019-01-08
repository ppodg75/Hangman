<%@include file="includes/header.jsp" %>
<% String username = (request.getAttribute("username")!=null)?(String)request.getAttribute("username"):""; %>
<div id="start">
  <div class="label">Enter your name:</div>
  <div class="input_name"><input type="text" id="username" name="username" size=20 placeholder="Your name" value="<%=username%>" /></div>
  <div class="button"><button type="button" form="main_form" onClick="buttonStartClicked();" id="btn_start">Press to START</button></div>  
  <div class="message" id="message"></div>  
</div>

<input type="hidden" name="errormsg_jsp" value="<%= request.getAttribute("errormsg") %>">

<script src="js/index.js"></script>
<%@include file="includes/footer.jsp" %>