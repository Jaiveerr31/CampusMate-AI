const sem1=document.getElementById("sem1");
const sem2=document.getElementById("sem2");
const sem3=document.getElementById("sem3");
const sem4=document.getElementById("sem4");

const calculateBtn=document.getElementById("calculateBtn");
const resetBtn=document.getElementById("resetBtn");

const cgpaResult=document.getElementById("cgpaResult");

const currentCgpa=document.getElementById("currentCgpa");
const targetCgpa=document.getElementById("targetCgpa");
const semesterCount=document.getElementById("semesterCount");

function calculateCGPA(){

const values=[
parseFloat(sem1.value)||0,
parseFloat(sem2.value)||0,
parseFloat(sem3.value)||0,
parseFloat(sem4.value)||0
];

let total=0;

values.forEach(function(value){

total+=value;

});

const cgpa=(total/values.length).toFixed(2);

cgpaResult.innerHTML=cgpa;

currentCgpa.innerHTML=cgpa;

if(cgpa>=8){

cgpaResult.style.color="#22c55e";

}

else if(cgpa>=7){

cgpaResult.style.color="#f59e0b";

}

else{

cgpaResult.style.color="#ef4444";

}

console.log("Current CGPA :",cgpa);

}

calculateBtn.addEventListener("click",calculateCGPA);

resetBtn.addEventListener("click",function(){

sem1.value="";
sem2.value="";
sem3.value="";
sem4.value="";

cgpaResult.innerHTML="0.00";

currentCgpa.innerHTML="0.00";

});

function animateCards(){

document.querySelectorAll(".summary-card").forEach(function(card,index){

card.style.opacity="0";

card.style.transform="translateY(30px)";

setTimeout(function(){

card.style.transition=".5s";

card.style.opacity="1";

card.style.transform="translateY(0px)";

},index*180);

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

greeting();

semesterCount.innerHTML="4";

targetCgpa.innerHTML="8.00";

calculateCGPA();

console.log("CGPA Calculator Loaded 🚀");

