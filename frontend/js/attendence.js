const cards = document.querySelectorAll(".attendance-card");

const overallAttendance = document.getElementById("overallAttendance");

const totalSubjects = document.getElementById("totalSubjects");

const safeSubjects = document.getElementById("safeSubjects");

function animateNumber(id,start,end,suffix=""){

const element=document.getElementById(id);

let current=start;

const timer=setInterval(function(){

current++;

element.innerHTML=current+suffix;

if(current>=end){

clearInterval(timer);

}

},20);

}

animateNumber("overallAttendance",0,87,"%");

animateNumber("totalSubjects",0,6);

animateNumber("safeSubjects",0,5);

cards.forEach(function(card,index){

card.style.opacity="0";

card.style.transform="translateY(30px)";

setTimeout(function(){

card.style.transition=".5s";

card.style.opacity="1";

card.style.transform="translateY(0px)";

},index*180);

});

cards.forEach(function(card){

card.addEventListener("mouseenter",function(){

card.style.boxShadow="0 18px 35px rgba(37,99,235,.15)";

});

card.addEventListener("mouseleave",function(){

card.style.boxShadow="0 8px 20px rgba(0,0,0,.08)";

});

});

function attendanceStatus(){

cards.forEach(function(card){

const value=parseInt(

card.querySelector(".percentage").innerHTML

);

if(value>=85){

console.log("Excellent");

}

else if(value>=75){

console.log("Safe");

}

else{

console.log("Attendance Warning");

}

});

}

function averageAttendance(){

let total=0;

cards.forEach(function(card){

total+=parseInt(

card.querySelector(".percentage").innerHTML

);

});

console.log(

"Average Attendance :",

Math.round(total/cards.length)+"%"

);

}

function subjectAlert(){

cards.forEach(function(card){

const subject=card.querySelector("h2").innerHTML;

const percent=parseInt(

card.querySelector(".percentage").innerHTML

);

if(percent<75){

console.log(

"⚠️ Improve Attendance in",

subject

);

}

});

}

function progressAnimation(){

const bars=document.querySelectorAll(".progress-fill");

bars.forEach(function(bar){

const width=bar.style.width;

bar.style.width="0";

setTimeout(function(){

bar.style.transition="1.2s";

bar.style.width=width;

},300);

});

}

attendanceStatus();

averageAttendance();

subjectAlert();

progressAnimation();

console.log("Attendance Tracker Loaded 🚀");

