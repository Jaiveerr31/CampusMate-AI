const searchInput = document.getElementById("searchNotes");

const noteCards = document.querySelectorAll(".note-card");

const totalNotes = document.getElementById("totalNotes");

const favoriteNotes = document.getElementById("favoriteNotes");

const recentNotes = document.getElementById("recentNotes");

function animateCards(){

noteCards.forEach(function(card,index){

card.style.opacity="0";

card.style.transform="translateY(30px)";

setTimeout(function(){

card.style.transition=".5s";

card.style.opacity="1";

card.style.transform="translateY(0px)";

},index*150);

});

}

searchInput.addEventListener("keyup",function(){

const value=this.value.toLowerCase();

noteCards.forEach(function(card){

const title=card.querySelector("h2").innerHTML.toLowerCase();

const text=card.querySelector("p").innerHTML.toLowerCase();

if(title.includes(value)||text.includes(value)){

card.style.display="block";

}

else{

card.style.display="none";

}

});

});

noteCards.forEach(function(card){

const button=card.querySelector("button");

button.addEventListener("click",function(){

button.innerHTML="Opened";

button.style.background="#22c55e";

setTimeout(function(){

button.innerHTML="Open Notes";

button.style.background="#2563eb";

},1200);

});

});

function countNotes(){

totalNotes.innerHTML=noteCards.length;

}

function randomTip(){

const tips=[

"Revise your notes every evening.",

"Highlight important concepts.",

"Practice coding after reading notes.",

"Create short revision notes.",

"Study consistently every day.",

"Keep notes organized subject-wise.",

"Revise before sleeping for better memory.",

"Focus on understanding, not memorizing."

];

return tips[Math.floor(Math.random()*tips.length)];

}

function welcomeMessage(){

const hour=new Date().getHours();

let greet="";

if(hour<12){

greet="🌞 Good Morning";

}

else if(hour<17){

greet="☀️ Good Afternoon";

}

else{

greet="🌙 Good Evening";

}

console.log(greet);

console.log("📚 Tip:",randomTip());

}

function pulseCards(){

setInterval(function(){

noteCards.forEach(function(card){

card.style.transform="scale(1.01)";

setTimeout(function(){

card.style.transform="scale(1)";

},300);

});

},8000);

}

function statistics(){

console.log("Total Notes :",totalNotes.innerHTML);

console.log("Favorites :",favoriteNotes.innerHTML);

console.log("Recent :",recentNotes.innerHTML);

}

countNotes();

animateCards();

welcomeMessage();

statistics();

pulseCards();

console.log("Smart Notes Loaded 🚀"); 
