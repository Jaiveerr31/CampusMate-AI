const stats={

attendance:87,

assignments:4,

cgpa:7.22,

notes:25,

classes:4,

streak:18

};

function animateValue(id,start,end,duration,suffix=""){

const element=document.getElementById(id);

if(!element) return;

let startTime=null;

function animation(currentTime){

if(!startTime) startTime=currentTime;

const progress=Math.min((currentTime-startTime)/duration,1);

const value=start+(end-start)*progress;

if(Number.isInteger(end)){

element.innerHTML=Math.floor(value)+suffix;

}

else{

element.innerHTML=value.toFixed(2)+suffix;

}

if(progress<1){

requestAnimationFrame(animation);

}

}

requestAnimationFrame(animation);

}

animateValue("attendanceValue",0,stats.attendance,1200,"%");

animateValue("assignmentValue",0,stats.assignments,1000);

animateValue("cgpaValue",0,stats.cgpa,1400);

animateValue("notesValue",0,stats.notes,1200);

animateValue("classesValue",0,stats.classes,1000);

animateValue("streakValue",0,stats.streak,1500);

document.querySelectorAll(".card").forEach(card=>{

card.addEventListener("mouseenter",()=>{

card.style.boxShadow="0 18px 40px rgba(37,99,235,.18)";

});

card.addEventListener("mouseleave",()=>{

card.style.boxShadow="0 10px 25px rgba(0,0,0,.08)";

});

});

console.log("Dashboard Analytics Loaded 🚀");

const addNoteBtn=document.getElementById("addNoteBtn");
const uploadBtn=document.getElementById("uploadBtn");
const cgpaBtn=document.getElementById("cgpaBtn");
const aiBtn=document.getElementById("aiBtn");

if(addNoteBtn){

addNoteBtn.addEventListener("click",function(){

window.location.href="notes.html";

});

}

if(uploadBtn){

uploadBtn.addEventListener("click",function(){

alert("📄 PDF Upload feature coming soon!");

});

}

if(cgpaBtn){

cgpaBtn.addEventListener("click",function(){

window.location.href="cgpa.html";

});

}

if(aiBtn){

aiBtn.addEventListener("click",function(){

window.location.href="ai.html";

});

}

const cards=document.querySelectorAll(".card");

cards.forEach(function(card,index){

card.style.opacity="0";

card.style.transform="translateY(25px)";

setTimeout(function(){

card.style.transition=".5s";

card.style.opacity="1";

card.style.transform="translateY(0)";

},index*150);

});

console.log("Dashboard Loaded 🚀");


