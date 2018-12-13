function hello(){
  username = $("#username");  
  console.log("hello: "+username.val())
  sendOperation("hello", username.val())
  submit_operation("hello", username.val())
  return true;
}