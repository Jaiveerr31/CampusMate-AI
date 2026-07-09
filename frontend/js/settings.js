const darkMode = document.getElementById("darkMode");

const notifications = document.getElementById("notifications");

const emailAlerts = document.getElementById("emailAlerts");

const autosave = document.getElementById("autosave");

const language = document.getElementById("language");

const themeColor = document.getElementById("themeColor");

const saveButton = document.getElementById("saveSettings");

function loadSettings(){

if(localStorage.getItem("darkMode")==="true"){

darkMode.checked=true;

document.body.classList.add("dark-mode");

}

notifications.checked=localStorage.getItem("notifications")!=="false";

emailAlerts.checked=localStorage.getItem("emailAlerts")==="true";

autosave.checked=localStorage.getItem("autosave")!=="false";

language.value=localStorage.getItem("language")||"English";

themeColor.value=localStorage.getItem("themeColor")||"Blue";

}

darkMode.addEventListener("change",function(){

document.body.classList.toggle("dark-mode");

});

saveButton.addEventListener("click",function(){

localStorage.setItem("darkMode",darkMode.checked);

localStorage.setItem("notifications",notifications.checked);

localStorage.setItem("emailAlerts",emailAlerts.checked);

localStorage.setItem("autosave",autosave.checked);

localStorage.setItem("language",language.value);

localStorage.setItem("themeColor",themeColor.value);

saveButton.innerHTML="Settings Saved ✓";

saveButton.style.background="#22c55e";

setTimeout(function(){

saveButton.innerHTML="Save Settings";

saveButton.style.background="#2563eb";

},1800);

});

function greeting(){

const hour=new Date().getHours();

if(hour<12){

console.log("🌞 Good Morning");

}

else if(hour<17){

console.log("☀️ Good Afternoon");

}

else{

console.log("🌙 Good Evening");

}

}

function showSummary(){

console.log("Dark Mode:",darkMode.checked);

console.log("Notifications:",notifications.checked);

console.log("Email Alerts:",emailAlerts.checked);

console.log("Auto Save:",autosave.checked);

console.log("Language:",language.value);

console.log("Accent Color:",themeColor.value);

}

loadSettings();

greeting();

showSummary();

console.log("Settings Loaded 🚀");

