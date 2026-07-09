const searchInput = document.getElementById("searchAssignment");

const cards = document.querySelectorAll(".assignment-card");

const pendingCount = document.getElementById("pendingCount");

const completedCount = document.getElementById("completedCount");

const highPriorityCount = document.getElementById("highPriorityCount");

let pending = 4;
let completed = 8;

function updateCounts(){

pendingCount.innerHTML = pending;

completedCount.innerHTML = completed;

}

cards.forEach(function(card){

const button = card.querySelector("button");

button.addEventListener("click",function(){

if(button.innerHTML==="Completed") return;

button.innerHTML="Completed";

button.style.background="#22c55e";

button.disabled=true;

card.style.opacity=".75";

pending--;

completed++;

updateCounts();

});

});

searchInput.addEventListener("keyup",function(){

const value=this.value.toLowerCase();

cards.forEach(function(card){

const title=card.querySelector("h2").innerHTML.toLowerCase();

const desc=card.querySelector("p").innerHTML.toLowerCase();

if(title.includes(value)||desc.includes(value)){

card.style.display="block";

}

else{

card.style.display="none";

}

});

});

function animateCards(){

cards.forEach(function(card,index){

card.style.opacity="0";

card.style.transform="translateY(30px)";

setTimeout(function(){

card.style.transition=".5s";

card.style.opacity="1";

card.style.transform="translateY(0px)";

},index*180);

});

}

function countHighPriority(){

let count=0;

cards.forEach(function(card){

if(card.classList.contains("high")){

count++;

}

});

highPriorityCount.innerHTML=count;

}

function sortAssignments(){

const grid=document.querySelector(".assignment-grid");

const list=[...cards];

list.sort(function(a,b){

if(a.classList.contains("high")) return -1;

if(b.classList.contains("high")) return 1;

if(a.classList.contains("medium")) return -1;

if(b.classList.contains("medium")) return 1;

return 0;

});

list.forEach(function(card){

grid.appendChild(card);

});

}

function showGreeting(){

const hour=new Date().getHours();

let message="";

if(hour<12){

message="🌞 Good Morning! Finish your assignments early.";

}

else if(hour<17){

message="☀️ Keep going! You're doing great.";

}

else{

message="🌙 Complete today's tasks before relaxing.";

}

console.log(message);

}

function assignmentStats(){

console.log("Pending :",pending);

console.log("Completed :",completed);

console.log("High Priority :",highPriorityCount.innerHTML);

}

updateCounts();

countHighPriority();

animateCards();

sortAssignments();

showGreeting();

assignmentStats();

console.log("Assignment Manager Loaded 🚀");

