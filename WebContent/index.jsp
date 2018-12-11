<%@include file="includes/header.jsp" %>

<input type="hidden" id="currentPage" name="currentPage" value="index" />
<input type="hidden" id="nextPage" name="nextPage" value="list" />

<div id="start">
  <div class="label">Enter your name:</div>
  <div class="input_name"><input type="text" id="username" name="username" size=20 placeholder="leave for random name"/></div>
  <div class="button"><button type="submit" form="main_form" onClick="submit();">Press to START</button></div>  
</div>

<%@include file="includes/footer.jsp" %>