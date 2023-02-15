$(document).ready(function() {         
    $('#alarmaVista').hide();
    $('#cronometroVista').hide();
    
});
const date = document.getElementById("date"),
time = document.getElementById("time")

function getCurrentDate () {
  const currentDate = new Date(),
  options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
  date.innerHTML = currentDate.toLocaleDateString('es', options)
}

function getCurrentTime () {
  const currentDate = new Date(),
  hours = currentDate.getHours(),
  minutes = formatTime(currentDate.getMinutes()),
  seconds = formatTime(currentDate.getSeconds()),
  formatHours = formatTime(((hours + 11) % 12 + 1)),
  format = (hours < 12) || (hours == 24)  ? 'AM' : 'PM'
  time.innerHTML = `${formatHours}:${minutes}:${seconds} <small>${format}</small>`
}

function formatTime (value)  {
  return value < 10 ? `0${value}` : value
}

setInterval(getCurrentTime, 1000)

getCurrentDate()

  function MostrarAlarma(){
    $('#relojPrincipal').hide();
    $('#alarmaVista').show();
    
}

function volverInicioCronometro(){
    $('#cronometroVista').hide();
    $('#relojPrincipal').show();
    
}
function volverInicioAlarma(){
    $('#alarmaVista').hide();
    $('#relojPrincipal').show();
    
}


function MostrarCrono(){
    $('#relojPrincipal').hide();
    $('#cronometroVista').show();
    
}


function MostrarRegistrarse(){
    $('#logInVista').hide();
    $('#singUpVista').show();
    // alert("SE HA MOSTRADO");
}

const display = document.getElementById('clock');


// set audio for alarm
const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
audio.loop = true;


let alarmTime = null;
let alarmTimeout = null;


const myList = document.querySelector('#myList');
const addAlarm = document.querySelector('.setAlarm')


const alarmList = [];  // Stores all the alarms being set 
// let count =1;


// Plays the alarm audio at correct time
function ringing(now){
    audio.play();
    alert(`Hey! it is ${now}`)
}


// updates time every second 
function updateTime() {
    var today = new Date();
    const hour = formatTime(today.getHours());
    const minutes = formatTime(today.getMinutes());
    const seconds = formatTime(today.getSeconds());
    const now = `${hour}:${minutes}:${seconds}`;

    display.innerText=`${hour}:${minutes}:${seconds}`;
    
//     check if the alarmList includes the current time , "now"
//     if yes, ringing() is called
    if(alarmList.includes(now) ){
        ringing(now);
    } 
}


// set the correct format of time
// converts "1:2:3" to "01:02:03"
function formatTime(time) {
    if ( time < 10 && time.length != 2) {
        return '0' + time;
    }
    return time;
}


// function to clear/stop the currently playing alarm
function clearAlarm() {
    audio.pause();
    if (alarmTimeout) {
        clearTimeout(alarmTimeout);
        alert('Alarm cleared');
    }
}      


// removes an alarm from the unordered list and the webpage when "Delete Alarm" is clicked
myList.addEventListener('click', e=> {
    console.log("removing element")
    if(e.target.classList.contains("deleteAlarm")){
        e.target.parentElement.remove();
    }    
})


// removes an alarm from the array when "Delete Alarm" is clicked
remove = (value) => {
    let newList = alarmList.filter((time) => time != value);
    alarmList.length = 0;                  // Clear contents
    alarmList.push.apply(alarmList, newList);
    
    console.log("newList", newList);
    console.log("alarmList", alarmList);
}


// Adds newAlarm to the unordered list as a new list item on webpage
function showNewAlarm(newAlarm){
    const html =`
    <li class = "time-list" >        
        <span class="time">${newAlarm}</span>
        <button class="deleteAlarm time-control" id="delete-button" onclick = "remove(this.value)" value=${newAlarm}>Delete Alarm</button>       
    </li>`
    myList.innerHTML += html
};


// event to set a new alarm whenever the form is submitted 
addAlarm.addEventListener('submit', e=> {
    e.preventDefault();
    // const newAlarm = addAlarm.alarmTime.value;
    let new_h=formatTime(addAlarm.a_hour.value);
    if(new_h === '0'){
        new_h = '00'
    }
    let new_m=formatTime(addAlarm.a_min.value);
    if(new_m === '0'){
        new_m = '00'
    }
    let new_s=formatTime(addAlarm.a_sec.value);
    if(new_s === '0'){
        new_s = '00'
    }
    
    const newAlarm = `${new_h}:${new_m}:${new_s}`

//     add newAlarm to alarmList
    if(isNaN(newAlarm)){
        if(!alarmList.includes(newAlarm)){
            alarmList.push(newAlarm);
            console.log(alarmList);
            console.log(alarmList.length);
            showNewAlarm(newAlarm);
            addAlarm.reset();
        } else{
            alert(`Alarm for ${newAlarm} already set.`);
        }
    } else{
        alert("Invalid Time Entered")
    }        
})


// calls updateTime() every second
setInterval(updateTime, 1000);


const color = document.querySelector('#color');
const body = document.querySelector('body');
color.addEventListener('click', e=>{body.classList.toggle('darkmode')});


//____________________Chronometer______________________
var hundredths = 0;
var seconds = 0;
var minutes = 0;
var hours = 0;

var start = document.getElementById('start');
var btnReset = document.getElementById('btnReset');
var btnHistory = document.getElementById('btnHistory');

var hundredthsHTML = document.getElementById('centesimas');
var secondsHTML = document.getElementById('segundos');
var minutesHTML = document.getElementById('minutos');
var hoursHTML = document.getElementById('horas');
var exe = setInterval("");
var power = false;

function cronometro() {
	if(hundredths < 99) {
	   hundredths++;
		hundredths = ((hundredths < 10) ? "0" : "") + hundredths;
		hundredthsHTML.innerHTML = ":" + hundredths;
	}
	
	if (hundredths == 99) { hundredths = -1; }
	
	if (hundredths == 0) {
		seconds++;
		seconds = ((seconds < 10) ? "0" : "") + seconds;
		secondsHTML.innerHTML = ":" + seconds;
	}
	
	if (seconds == 59) { seconds = -1; }
	
	if (seconds == 0 && hundredths == 0) {
		minutes++;
		minutes = ((minutes < 10) ? "0" : "" ) + minutes;
		minutesHTML.innerHTML = ":" + minutes;
	}
	
	if ( minutes == 59) { minutes = -1; }
	
	if ( minutes == 0 && seconds == 0 && hundredths == 0 ) { 
		hours++;
		hours = ((hours < 10) ? "0" : "") + hours;
		hoursHTML.innerHTML = hours;
	}
}

function reset() {
	clearInterval(exe);
	hundredths = 0;
	seconds = 0;
	minutes = 0;
	hours = 0;
	
	hundredthsHTML.innerHTML = ":00";
	secondsHTML.innerHTML = ":00";
	minutesHTML.innerHTML = ":00";
	hoursHTML.innerHTML = "00";
	
	document.getElementById('history').innerHTML = " ";
}

document.getElementById('start').addEventListener("click", function() {
		
	if( power == false ){
		exe = setInterval(cronometro, 10);
		start.style.backgroundColor = "red";
		document.getElementById('start').innerHTML = "Parar";
		power = true;
	}
	else {
		clearInterval(exe);
		start.style.backgroundColor = "green";
		document.getElementById('start').innerHTML = "Inicio";
		power = false;
	}
});

function history() {
	document.getElementById('history').innerHTML += "0" + hours + ":0" + minutes + ":" + seconds + ":" + hundredths + '<br>';
}

document.getElementById('btnHistory').addEventListener('click', history);
document.getElementById('btnReset').addEventListener('click', reset);