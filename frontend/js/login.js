const email=document.getElementById("email");
const password=document.getElementById("password");

const loginBtn=document.getElementById("loginBtn");
const togglePassword=document.getElementById("togglePassword");

togglePassword.addEventListener("click",function(){

if(password.type==="password"){

password.type="text";
togglePassword.innerHTML="🙈";

}

else{

password.type="password";
togglePassword.innerHTML="👁️";

}

});

loginBtn.addEventListener("click",function(){

const emailValue=email.value.trim();
const passwordValue=password.value.trim();

if(emailValue===""||passwordValue===""){

alert("Please fill in all fields.");

return;

}

if(!emailValue.includes("@")){

alert("Please enter a valid email address.");

return;

}

alert("Login Successful! 🎉");

window.location.href="dashboard.html";

});

email.addEventListener("keypress",function(e){

if(e.key==="Enter"){

loginBtn.click();

}

});

password.addEventListener("keypress",function(e){

if(e.key==="Enter"){

loginBtn.click();

}

});

console.log("Login Page Loaded 🚀");

