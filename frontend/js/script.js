// ================================
// CAMPUSMATE AI
// SMART TIMETABLE ENGINE
// SPRINT 28A
// ================================

let timetable = [];

const DAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

const TIMES = [
    "9-10",
    "10-11",
    "11-12",
    "12-1",
    "1-2",
    "2-3",
    "3-4",
    "4-5"
];

function createDefaultTimetable(){

    timetable = [

        {
            day:"Monday",
            time:"9-10",
            subject:"Java",
            room:"A101",
            teacher:"Mr Sharma",
            color:"#2563eb"
        },

        {
            day:"Monday",
            time:"10-11",
            subject:"DBMS",
            room:"B204",
            teacher:"Mrs Gupta",
            color:"#16a34a"
        },

        {
            day:"Monday",
            time:"11-12",
            subject:"OS",
            room:"Lab 2",
            teacher:"Mr Singh",
            color:"#ef4444"
        },

        {
            day:"Tuesday",
            time:"9-10",
            subject:"CN",
            room:"A302",
            teacher:"Mr Mehta",
            color:"#f97316"
        },

        {
            day:"Tuesday",
            time:"10-11",
            subject:"Java",
            room:"A101",
            teacher:"Mr Sharma",
            color:"#2563eb"
        },

        {
            day:"Wednesday",
            time:"11-12",
            subject:"AI",
            room:"Lab 5",
            teacher:"Dr Verma",
            color:"#9333ea"
        }

    ];

    saveTimetable();

}

function saveTimetable(){

    localStorage.setItem(
        "campusmate_timetable",
        JSON.stringify(timetable)
    );

}

function loadTimetable(){

    const data = localStorage.getItem(
        "campusmate_timetable"
    );

    if(data){

        timetable = JSON.parse(data);

    }

    else{

        createDefaultTimetable();

    }

}

function addLecture(
    day,
    time,
    subject,
    room,
    teacher,
    color
){

    timetable.push({

        day,
        time,
        subject,
        room,
        teacher,
        color

    });

    saveTimetable();

}

function removeLecture(index){

    timetable.splice(index,1);

    saveTimetable();

}

function updateLecture(
    index,
    newLecture
){

    timetable[index] = newLecture;

    saveTimetable();

}

function getLecturesByDay(day){

    return timetable.filter(function(item){

        return item.day===day;

    });

}

function getToday(){

    const days=[

        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"

    ];

    return days[new Date().getDay()];

}

function getTodaySchedule(){

    return getLecturesByDay(
        getToday()
    );

}

function searchSubject(keyword){

    keyword = keyword.toLowerCase();

    return timetable.filter(function(item){

        return item.subject
        .toLowerCase()
        .includes(keyword);

    });

}

function searchTeacher(keyword){

    keyword = keyword.toLowerCase();

    return timetable.filter(function(item){

        return item.teacher
        .toLowerCase()
        .includes(keyword);

    });

}

function getLectureCount(){

    return timetable.length;

}

function printConsole(){

    console.clear();

    console.table(timetable);

}

function sortByDay(){

    timetable.sort(function(a,b){

        return DAYS.indexOf(a.day)
        -
        DAYS.indexOf(b.day);

    });

    saveTimetable();

}

function sortByTime(){

    timetable.sort(function(a,b){

        return TIMES.indexOf(a.time)
        -
        TIMES.indexOf(b.time);

    });

    saveTimetable();

}

function exportJSON(){

    const file = JSON.stringify(
        timetable,
        null,
        2
    );

    console.log(file);

}

function importSample(){

    timetable.push({

        day:"Thursday",
        time:"2-3",
        subject:"Project",
        room:"Innovation Lab",
        teacher:"Faculty Mentor",
        color:"#0891b2"

    });

    timetable.push({

        day:"Friday",
        time:"3-4",
        subject:"Seminar",
        room:"Seminar Hall",
        teacher:"Guest Faculty",
        color:"#ca8a04"

    });

    saveTimetable();

}

function countByDay(day){

    return timetable.filter(function(item){

        return item.day===day;

    }).length;

}

function isFree(day,time){

    const lecture=timetable.find(function(item){

        return item.day===day &&
               item.time===time;

    });

    return lecture===undefined;

}

function getFreeSlots(day){

    let free=[];

    TIMES.forEach(function(slot){

        if(isFree(day,slot)){

            free.push(slot);

        }

    });

    return free;

}

function statistics(){

    console.log("==========");

    console.log(
        "Total Lectures:",
        getLectureCount()
    );

    DAYS.forEach(function(day){

        console.log(
            day,
            countByDay(day)
        );

    });

    console.log("==========");

}

loadTimetable();

printConsole();

statistics();

// =========================================
// CAMPUSMATE AI
// SMART TIMETABLE ENGINE
// SPRINT 28B
// APPEND BELOW 28A
// =========================================

function generateTable() {

    const oldTable = document.querySelector("table");

    if (!oldTable) return;

    let html = "";

    html += "<table>";

    html += "<tr>";

    html += "<th>Day</th>";

    TIMES.forEach(function (slot) {

        html += "<th>" + slot + "</th>";

    });

    html += "</tr>";

    DAYS.forEach(function (day) {

        html += "<tr>";

        html += "<td><strong>" + day + "</strong></td>";

        TIMES.forEach(function (slot) {

            const lecture = timetable.find(function (item) {

                return item.day === day &&
                       item.time === slot;

            });

            if (lecture) {

                html +=
                "<td style='background:" +
                lecture.color +
                ";color:white;border-radius:10px;'>"
                +
                "<b>" + lecture.subject + "</b><br>"
                +
                lecture.teacher + "<br>"
                +
                lecture.room
                +
                "</td>";

            }

            else {

                html += "<td>Free</td>";

            }

        });

        html += "</tr>";

    });

    html += "</table>";

    oldTable.outerHTML = html;

}

function createRandomLecture() {

    const subjects = [

        "Java",
        "DBMS",
        "Python",
        "AI",
        "OS",
        "CN",
        "DSA",
        "ML",
        "Cloud",
        "Cyber Security"

    ];

    const rooms = [

        "A101",
        "A203",
        "Lab 1",
        "Lab 2",
        "Lab 5",
        "Seminar Hall"

    ];

    const teachers = [

        "Mr Sharma",
        "Mrs Gupta",
        "Dr Verma",
        "Mr Singh",
        "Mr Mehta",
        "Prof Kapoor"

    ];

    const colors = [

        "#2563eb",
        "#16a34a",
        "#dc2626",
        "#9333ea",
        "#0891b2",
        "#ca8a04"

    ];

    const lecture = {

        day: DAYS[Math.floor(Math.random() * DAYS.length)],

        time: TIMES[Math.floor(Math.random() * TIMES.length)],

        subject: subjects[Math.floor(Math.random() * subjects.length)],

        room: rooms[Math.floor(Math.random() * rooms.length)],

        teacher: teachers[Math.floor(Math.random() * teachers.length)],

        color: colors[Math.floor(Math.random() * colors.length)]

    };

    timetable.push(lecture);

    saveTimetable();

    generateTable();

}

function clearTimetable() {

    timetable = [];

    saveTimetable();

    generateTable();

}

function resetTimetable() {

    localStorage.removeItem("campusmate_timetable");

    createDefaultTimetable();

    generateTable();

}

function showTodaySchedule() {

    const today = getToday();

    console.log("");

    console.log("Today's Classes");

    console.log("----------------");

    const list = getTodaySchedule();

    if (list.length === 0) {

        console.log("No Classes Today");

        return;

    }

    list.forEach(function (item) {

        console.log(

            item.time,

            item.subject,

            item.room

        );

    });

}

function showFreePeriods(day) {

    console.log(

        "Free Periods for",

        day

    );

    console.log(

        getFreeSlots(day)

    );

}

function lectureExists(day, time) {

    return timetable.some(function (item) {

        return item.day === day &&
               item.time === time;

    });

}

function replaceLecture(day, time, lecture) {

    timetable = timetable.map(function (item) {

        if (item.day === day &&
            item.time === time) {

            return lecture;

        }

        return item;

    });

    saveTimetable();

    generateTable();

}

function deleteLecture(day, time) {

    timetable = timetable.filter(function (item) {

        return !(

            item.day === day &&

            item.time === time

        );

    });

    saveTimetable();

    generateTable();

}

function totalHours() {

    return timetable.length;

}

function subjectFrequency() {

    const map = {};

    timetable.forEach(function (item) {

        if (!map[item.subject]) {

            map[item.subject] = 0;

        }

        map[item.subject]++;

    });

    console.table(map);

}

function teacherFrequency() {

    const map = {};

    timetable.forEach(function (item) {

        if (!map[item.teacher]) {

            map[item.teacher] = 0;

        }

        map[item.teacher]++;

    });

    console.table(map);

}

function roomFrequency() {

    const map = {};

    timetable.forEach(function (item) {

        if (!map[item.room]) {

            map[item.room] = 0;

        }

        map[item.room]++;

    });

    console.table(map);

}

generateTable();

showTodaySchedule();

subjectFrequency();

teacherFrequency();

roomFrequency();

console.log("Total Classes :", totalHours());

console.log("Sprint 28B Loaded Successfully"); 

// ==========================================
// CAMPUSMATE AI
// SPRINT 29A
// APPEND BELOW SPRINT 28B
// ==========================================

// ---------- Dashboard Statistics ----------

function updateStatistics() {

    const total = timetable.length;

    const today = getTodaySchedule().length;

    let free = 0;

    DAYS.forEach(function(day){

        free += getFreeSlots(day).length;

    });

    console.log("========== DASHBOARD ==========");

    console.log("Total Lectures :", total);

    console.log("Today's Classes :", today);

    console.log("Total Free Slots :", free);

    console.log("===============================");

}

// ---------- Next Lecture ----------

function getNextLecture() {

    const today = getToday();

    const currentHour = new Date().getHours();

    let currentSlot = "";

    if(currentHour < 10) currentSlot="9-10";
    else if(currentHour <11) currentSlot="10-11";
    else if(currentHour <12) currentSlot="11-12";
    else if(currentHour <13) currentSlot="12-1";
    else if(currentHour <14) currentSlot="1-2";
    else if(currentHour <15) currentSlot="2-3";
    else if(currentHour <16) currentSlot="3-4";
    else currentSlot="4-5";

    const todayLectures = timetable
    .filter(item=>item.day===today)
    .sort((a,b)=>TIMES.indexOf(a.time)-TIMES.indexOf(b.time));

    for(let lecture of todayLectures){

        if(TIMES.indexOf(lecture.time)>=TIMES.indexOf(currentSlot)){

            return lecture;

        }

    }

    return null;

}

function showNextLecture(){

    const lecture = getNextLecture();

    if(!lecture){

        console.log("No More Classes Today");

        return;

    }

    console.log("Next Lecture");

    console.log("----------------");

    console.log("Subject :",lecture.subject);

    console.log("Teacher :",lecture.teacher);

    console.log("Room :",lecture.room);

    console.log("Time :",lecture.time);

}

// ---------- Subject Counter ----------

function getSubjectWiseCount(){

    const data={};

    timetable.forEach(function(item){

        if(!data[item.subject]){

            data[item.subject]=1;

        }

        else{

            data[item.subject]++;

        }

    });

    return data;

}

function printSubjectWiseCount(){

    console.log("Subjects");

    console.table(getSubjectWiseCount());

}

// ---------- Teacher Counter ----------

function getTeacherWiseCount(){

    const data={};

    timetable.forEach(function(item){

        if(!data[item.teacher]){

            data[item.teacher]=1;

        }

        else{

            data[item.teacher]++;

        }

    });

    return data;

}

function printTeacherWiseCount(){

    console.log("Teachers");

    console.table(getTeacherWiseCount());

}

// ---------- Room Counter ----------

function getRoomWiseCount(){

    const data={};

    timetable.forEach(function(item){

        if(!data[item.room]){

            data[item.room]=1;

        }

        else{

            data[item.room]++;

        }

    });

    return data;

}

function printRoomWiseCount(){

    console.table(getRoomWiseCount());

}

// ---------- Busy Day ----------

function busiestDay(){

    let best="";

    let max=0;

    DAYS.forEach(function(day){

        const count=countByDay(day);

        if(count>max){

            max=count;

            best=day;

        }

    });

    console.log("Busiest Day :",best);

}

// ---------- Free Day ----------

function lightestDay(){

    let best="";

    let min=100;

    DAYS.forEach(function(day){

        const count=countByDay(day);

        if(count<min){

            min=count;

            best=day;

        }

    });

    console.log("Lightest Day :",best);

}

// ---------- Lecture Search ----------

function searchLecture(text){

    text=text.toLowerCase();

    const result=timetable.filter(function(item){

        return(

            item.subject.toLowerCase().includes(text)

            ||

            item.teacher.toLowerCase().includes(text)

            ||

            item.room.toLowerCase().includes(text)

        );

    });

    console.table(result);

}

// ---------- Auto Backup ----------

function backupTimetable(){

    const backup={

        created:new Date(),

        lectures:timetable

    };

    console.log("Backup Created");

    console.log(backup);

}

// ---------- Duplicate Checker ----------

function duplicateLecture(day,time){

    return timetable.filter(function(item){

        return item.day===day &&

               item.time===time;

    }).length>1;

}

// ---------- Conflict Scanner ----------

function scanConflicts(){

    console.log("Checking Timetable...");

    DAYS.forEach(function(day){

        TIMES.forEach(function(time){

            if(duplicateLecture(day,time)){

                console.log(

                    "Conflict",

                    day,

                    time

                );

            }

        });

    });

}

// ---------- Run Everything ----------

updateStatistics();

showNextLecture();

printSubjectWiseCount();

printTeacherWiseCount();

printRoomWiseCount();

busiestDay();

lightestDay();

backupTimetable();

scanConflicts();

console.log("Sprint 29A Loaded"); 

/* ==========================================
   Sprint 42 - Global Animations
========================================== */

window.addEventListener("load",()=>{

    document.body.classList.add("loaded");

});

const revealElements=document.querySelectorAll(
".card,.dashboard-card,.stat-card,.feature,.hero"
);

const observer=new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.style.opacity="1";
            entry.target.style.transform="translateY(0)";

        }

    });

},{
    threshold:.15
});

revealElements.forEach(el=>{

    el.style.opacity="0";
    el.style.transform="translateY(25px)";
    el.style.transition=".6s ease";

    observer.observe(el);

});

/* ==========================================
   Sprint 42B - Loader Animation
========================================== */

window.addEventListener("load",()=>{

    const loader=document.getElementById("pageLoader");

    if(loader){

        setTimeout(()=>{

            loader.classList.add("hide");

        },500);

    }

});

/* ==========================================
   Sprint 42C - Ripple Effect
========================================== */

document.querySelectorAll("button").forEach(button=>{

    button.addEventListener("click",function(e){

        const ripple=document.createElement("span");

        const size=Math.max(this.clientWidth,this.clientHeight);

        ripple.style.width=size+"px";
        ripple.style.height=size+"px";
        ripple.style.left=e.offsetX-size/2+"px";
        ripple.style.top=e.offsetY-size/2+"px";

        ripple.classList.add("ripple");

        this.appendChild(ripple);

        setTimeout(()=>{

            ripple.remove();

        },600);

    });

});

/* ==========================================
   Sprint 43A - Safe Event Binding
========================================== */

function safeAddEventListener(selector,eventName,callback){

    const element=document.querySelector(selector);

    if(element){

        element.addEventListener(eventName,callback);

    }

}

/* ==========================================
   Sprint 43A - Safe Local Storage
========================================== */

function saveData(key,value){

    try{

        localStorage.setItem(
            key,
            JSON.stringify(value)
        );

    }catch(error){

        console.error(
            "Storage Error:",
            error
        );

    }

}

function loadData(key){

    try{

        const data=localStorage.getItem(key);

        return data
            ? JSON.parse(data)
            : null;

    }catch(error){

        console.error(
            "Loading Error:",
            error
        );

        return null;

    }

}

/* ==========================================
   Sprint 43A - Global Error Handler
========================================== */

window.addEventListener("error",function(event){

    console.error(
        "CampusMate Error:",
        event.message
    );

});

window.addEventListener("unhandledrejection",function(event){

    console.error(
        "Unhandled Promise:",
        event.reason
    );

});

/* ==========================================
   Sprint 43B - Email Validation
========================================== */

function isValidEmail(email){

    const pattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(email);

}

/* ==========================================
   Sprint 43B - Empty Input Checker
========================================== */

function isEmpty(value){

    return value===null ||
           value===undefined ||
           value.toString().trim()==="";

}

function showConsoleWarning(message){

    console.warn("[CampusMate AI]",message);

}

/* ==========================================
   Sprint 43B - Debounce Utility
========================================== */

function debounce(callback,delay=300){

    let timer;

    return function(){

        clearTimeout(timer);

        const args=arguments;

        timer=setTimeout(()=>{

            callback.apply(this,args);

        },delay);

    };

}

/* ==========================================
   Sprint 43C - Safe Query Helpers
========================================== */

function $(selector){

    return document.querySelector(selector);

}

function $$(selector){

    return document.querySelectorAll(selector);

}

/* ==========================================
   Sprint 43C - Smooth Scroll Helper
========================================== */

function scrollToTop(){

    window.scrollTo({

        top:0,
        behavior:"smooth"

    });

}

const backToTop=document.getElementById("backToTop");

if(backToTop){

    backToTop.addEventListener("click",scrollToTop);

}

/* ==========================================
   Sprint 43C - Performance Logger
========================================== */

window.addEventListener("load",()=>{

    if(window.performance){

        const navigation=performance.getEntriesByType("navigation")[0];

        if(navigation){

            console.log(

                "CampusMate AI Loaded in",

                Math.round(navigation.loadEventEnd),

                "ms"

            );

        }

    }

});

