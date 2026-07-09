const classCards = document.querySelectorAll(".class-card");

function animateCards(){

classCards.forEach(function(card,index){

card.style.opacity="0";

card.style.transform="translateY(30px)";

setTimeout(function(){

card.style.transition=".5s";

card.style.opacity="1";

card.style.transform="translateY(0px)";

},index*180);

});

}

function highlightToday(){

const days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

const today=days[new Date().getDay()];

classCards.forEach(function(card){

const title=card.querySelector("h2").innerHTML;

const badge=card.querySelector(".badge");

if(title===today){

card.classList.add("today");

badge.innerHTML="TODAY";

badge.className="badge live";

}

});

}

function countClasses(){

let total=0;

classCards.forEach(function(card){

total+=card.querySelectorAll(".subject").length;

});

console.log("Total Classes This Week :",total);

}

function nextClass(){

const first=document.querySelector(".today .subject");

if(first){

console.log("Next Class :",first.innerHTML);

}

}

function hoverEffect(){

classCards.forEach(function(card){

card.addEventListener("mouseenter",function(){

card.style.boxShadow="0 18px 35px rgba(37,99,235,.18)";

});

card.addEventListener("mouseleave",function(){

card.style.boxShadow="0 8px 20px rgba(0,0,0,.08)";

});

});

}

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

animateCards();

highlightToday();

countClasses();

nextClass();

hoverEffect();

greeting();

console.log("Timetable Loaded 🚀");

