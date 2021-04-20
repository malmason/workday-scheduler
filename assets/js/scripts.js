var currentDay = document.querySelector("#currentDay");
var saveBtns = document.querySelectorAll(".saveBtn");

var dtToday = moment();
var btnClicked = "";
var calEvents = "";
var calMessage = "#"
var currentHour = ""
var timeSlots = ["Time-7AM","Time-8AM","Time-9AM","Time-10AM","Time-11AM","Time-12PM","Time-1PM","Time-2PM","Time-3PM","Time-4PM","Time-5PM","Time-6PM","Time-7PM","Time-8PM"];

// Timer to show the current time updated each second. 
function showTime() {
  dtToday = moment();
  currentDay.textContent = dtToday.format("dddd" +", " + "MMMM" + " " + "Do" + " " + "YYYY" + " " + "h:mm:ss A")
};

setInterval(showTime, 1000);

// Timer function for coloring the background of the timeslots. 
function updateBackgrounds() {

  currentHour = "Time-" + dtToday.format("h" +"A");

  var hourIndex = timeSlots.findIndex(checkHour);

  for(i=0; i <timeSlots.length; ++i){
    let textHour = document.querySelector("#" + timeSlots[i]);
    console.log(currentHour);
    console.log(hourIndex);
    console.log(i);
 
    // The current timeslot matches the current hour. 
    if(timeSlots[i]==currentHour) {
      if(textHour.classList.contains("past")) {
        textHour.classList.remove("past");
      }
      if(textHour.classList.contains("future")) {
        textHour.classList.remove("future");
      }
      if(!textHour.classList.contains("present")) {
        textHour.classList.add("present");
      }
    } 

    // The current timeslot is past. 
    if(hourIndex > i){
      if(!textHour.classList.contains("past")) {
        textHour.classList.add("past");
      }
      if(textHour.classList.contains("future")) {
        textHour.classList.remove("future");
      }
      if(textHour.classList.contains("present")) {
        textHour.classList.remove("present");
      }
    }

    // Current timeslot is in the future. 
    if(hourIndex < i){
      if(textHour.classList.contains("past")) {
        textHour.classList.remove("past");
      }
      if(!textHour.classList.contains("future")) {
        textHour.classList.add("future");
      }
      if(textHour.classList.contains("present")) {
        textHour.classList.remove("present");
      }
    }

  }

}

function checkHour (hour){
  // Store the current hour and it's index in the array. 
  return hour == currentHour;
}

setInterval(updateBackgrounds, 1000);

function saveAppt(e){
  // Get the id of the clicked button. 
  btnClicked = e.currentTarget.id;

  // Target the text-area with the class that matches the button id. 
  calMessage = document.querySelector(".T-" + btnClicked);
  calEvents =  {
      date: dtToday.format("dddd" + ", " + "MMMM" + " " 
      + "Do" + " " + "YYYY"),
      timeslot: btnClicked, 
      appt: calMessage.value
  };

  var a = []; // Empty array to hold the localstorage objects

  // Parse the data back into an array of objects. 
  a = JSON.parse(localStorage.getItem("calEvents")) || [];
  a.push(calEvents); // Push in the new data. 
 
  // Serialize the data array back to a string and store it in local storage. 
  localStorage.setItem("calEvents", JSON.stringify(a));

  getAppts();
};

 // Pull the prior appointments from local storage and post to calendar. 
function getAppts() {
  var priorAppts = JSON.parse(localStorage.getItem("calEvents")) || [];

  if(priorAppts !== null) {
    for(i=0; i < priorAppts.length; ++i){
      // Make sure this is the correct day. 
      if(priorAppts[i].date == dtToday.format("dddd" + ", " + "MMMM" + " " + "Do" + " " + "YYYY")){
        document.querySelector(".T-" + priorAppts[i].timeslot).value = priorAppts[i].appt;
      }
    }
  }
};

// Add an event listener for all of the save buttons. 
document.querySelectorAll(".saveBtn").forEach(item => {
  item.addEventListener("click", saveAppt);
});

// TODO: Complete the function to toggle the hourly textarea's for the background colors. 
function updateHours() {

};

getAppts();