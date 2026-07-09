const chatBox = document.getElementById("chatBox");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

const replies = {

hello:"Hello 👋 How can I help you today?",

hi:"Hi! Ready to study? 📚",

java:"Java is an object-oriented programming language used for building cross-platform applications.",

python:"Python is a simple and powerful programming language widely used in AI, ML and Web Development.",

dbms:"DBMS is software used to store, retrieve and manage data efficiently.",

cn:"Computer Networks deals with communication between computers using networking protocols.",

os:"Operating System manages hardware resources and software processes.",

ai:"Artificial Intelligence enables machines to simulate human intelligence.",

ml:"Machine Learning is a subset of AI where computers learn from data.",

attendance:"Maintain above 75% attendance to stay eligible for exams.",

assignment:"Finish assignments before the deadline to avoid penalties.",

notes:"Organize your notes subject-wise for quick revision.",

project:"Break your project into small milestones and complete one at a time.",

interview:"Practice DSA, OOP, DBMS, OS and CN for placements.",

resume:"Keep your resume one page long with projects and skills.",

cgpa:"Study consistently every week to improve your CGPA.",

thankyou:"You're welcome 😄",

thanks:"Happy to help ❤️"

};

function appendMessage(type,text){

const message=document.createElement("div");

message.className="message "+type;

const icon=document.createElement("div");

icon.className="icon";

icon.innerHTML=type==="user"?"🧑":"🤖";

const bubble=document.createElement("div");

bubble.className="text";

bubble.innerHTML=text;

message.appendChild(icon);

message.appendChild(bubble);

chatBox.appendChild(message);

chatBox.scrollTop=chatBox.scrollHeight;

}

function aiReply(question){

question=question.toLowerCase();

for(let key in replies){

if(question.includes(key)){

return replies[key];

}

}

return "I'm still learning 🚀 This feature will soon connect to an AI model.";

}

function sendMessage(){

const text=input.value.trim();

if(text==="") return;

appendMessage("user",text);

input.value="";

setTimeout(function(){

appendMessage("ai",aiReply(text));

},600);

}

sendBtn.addEventListener("click",sendMessage);

input.addEventListener("keypress",function(e){

if(e.key==="Enter"){

sendMessage();

}

});

document.querySelectorAll(".prompt-btn").forEach(function(btn){

btn.addEventListener("click",function(){

input.value=this.innerText;

sendMessage();

});

});

function loadGreeting(){

const hour=new Date().getHours();

let greeting="";

if(hour<12){

greeting="Good Morning ☀️";

}

else if(hour<17){

greeting="Good Afternoon 🌤️";

}

else{

greeting="Good Evening 🌙";

}

setTimeout(function(){

appendMessage("ai",greeting+"! Hope you're having a productive day.");

},1000);

}

function randomTip(){

const tips=[

"Revise for 30 minutes every day.",

"Practice coding regularly.",

"Take short breaks while studying.",

"Complete assignments early.",

"Keep your GitHub updated.",

"Read one technical article daily.",

"Practice aptitude questions.",

"Build projects consistently.",

"Learn one new concept every day.",

"Don't ignore fundamentals."

];

return tips[Math.floor(Math.random()*tips.length)];

}

setTimeout(function(){

appendMessage("ai","💡 Study Tip: "+randomTip());

},2500);

function updateStats(){

document.getElementById("notesCount").innerHTML=12;

document.getElementById("assignmentCount").innerHTML=5;

document.getElementById("classCount").innerHTML=4;

document.getElementById("attendancePercent").innerHTML="92%";

}

function saveChat(){

localStorage.setItem(

"campusmate_chat",

chatBox.innerHTML

);

}

function loadChat(){

const data=localStorage.getItem(

"campusmate_chat"

);

if(data){

chatBox.innerHTML=data;

}

}

const observer=new MutationObserver(function(){

saveChat();

});

observer.observe(chatBox,{

childList:true,

subtree:true

});

loadGreeting();

updateStats();

loadChat();

console.log("CampusMate AI Ready 🚀");

