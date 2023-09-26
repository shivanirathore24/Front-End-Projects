// Sound clip when the alarm starts
var sound = new Audio("shiv_alarm.mp3");
sound.loop = true;

let arr = [];
let hours = document.getElementById("hour");
let mins = document.getElementById("min");
let secs = document.getElementById("sec");
let AMPM = document.getElementById("ampm");
let colorChange = document.querySelector("time");
let incompleteAlarmsholder = document.getElementById("incomplete-alarms");

let totalHour = 12;
// optino available to select time from 1 to 12 hours
for (let i = 1; i <= totalHour; i++) {
  hours.options[hours.options.length] = new Option(i < 10 ? "0" + i : i);
}

// optino available to select time from 1 to 59 mins

let totalMin = 59;

for (let i = 0; i <= totalMin; i++) {
  mins.options[mins.options.length] = new Option(i < 10 ? "0" + i : i);
}

// optino available to select time from 1 to 59 sec

let totalSec = 59;

for (let i = 0; i <= totalSec; i++) {
  secs.options[secs.options.length] = new Option(i < 10 ? "0" + i : i);
}

// optino available to select AM/PM

let mgOrAfternoon = ["AM", "PM"];

for (let i = 0; i < mgOrAfternoon.length; i++) {
  AMPM.options[AMPM.options.length] = new Option(mgOrAfternoon[i]);
}

// function to display time

function displayTime() {
  const date = new Date();
  let hour = date.getHours();
  let mins = date.getMinutes();
  let secs = date.getSeconds();

  let AMPM = "";
  if (date.getHours == 0) {
    hour = 12;
  }
  if (date.getHours() >= 12) {
    if (date.getHours() == 12) {
      hour = 12;
    } else {
      hour = hour - 12;
    }
    AMPM = "PM";
  } else {
    AMPM = "AM";
  }

  if (hour.toString().length == 1) {
    hour = "0" + hour;
  }
  if (mins < 10) {
    mins = "0" + mins;
  }
  if (secs < 10) {
    secs = "0" + secs;
  }

  document.getElementById("showTime").innerHTML =
    hour + ":" + mins + ":" + secs + ":" + AMPM;
}
setInterval(displayTime, 1000);

// creating Alarm time

var createAlarm = function (alarmString) {
  let label = document.createElement("label");
  let item = document.createElement("li");

  let buttonDelete = document.createElement("button");

  buttonDelete.innerText = "Delete" + alarmString[0];

  buttonDelete.className = "delete";
  label.innerText = alarmString;

  item.appendChild(label);
  item.appendChild(buttonDelete);

  return item;
};

// setting the alarm button which will create time of alarm

document
  .getElementById("setAlarmButton")
  .addEventListener("click", function () {
    let selectHour = hours.options[hours.selectedIndex].value;
    let selectMin = mins.options[mins.selectedIndex].value;

    let selectSec = secs.options[secs.selectedIndex].value;

    let selectAMPM = AMPM.options[AMPM.selectedIndex].value;

    console.log(selectHour, selectMin, selectSec, selectAMPM);

    let length = arr.length + 1;

    var todaysDate = new Date();

    var dd = String(todaysDate.getDate()).padStart(2, "0");
    var mm = String(todaysDate.getMonth() + 1).padStart(2, "0");
    var yyyy = String(todaysDate.getFullYear());

    todaysDate = dd + "/" + mm + "/" + yyyy;

    let alarmHour = parseInt(selectHour);

    if (selectAMPM == "PM") {
      alarmHour = 12 + alarmHour;
    }

    if (selectAMPM == "AM" && alarmHour == 12) {
      alarmHour = 0;
    }

    if (alarmHour.toString.length == 1) {
      alarmHour = "0" + alarmHour;
    }

    let alarmTiming = alarmHour + ":" + selectMin + ":" + selectSec;

    var d = new Date(`${todaysDate} ${alarmTiming}`);

    // time in milisec

    var miliSec = d.getTime();

    // add in array alarm's time

    arr.push([selectHour, selectMin, selectSec, selectAMPM, miliSec, length]);

    arr = arr.sort((a, b) => a[4] - b[4]);

    let data =
      length.toString() +
      ") " +
      selectHour +
      ":" +
      selectMin +
      ":" +
      selectSec +
      ":" +
      selectAMPM;

    // creating alarm list

    var listItem = createAlarm(data);
    incompleteAlarmsholder.appendChild(listItem);
    bindAlarmEvents(listItem);

    // function to check realtime to alarm time

    setInterval(() => {
      const date = new Date();
      let hr = date.getHours();
      let min = date.getMinutes();
      let sec = date.getSeconds();
      let AMPM = "AM";
      if (date.getHours() == 0) {
        hr = 12;
      }

      if (date.getHours() > 12) {
        if (date.getHours() == 12) {
          hr = 12;
        } else {
          hr = hr - 12;
        }
        AMPM = "PM";
      } else {
        AMPM = "AM";
      }

      if (hr.toString().length == 1) {
        hr = "0" + hr;
      }
      if (min < 10) {
        min = "0" + min;
      }
      if (sec < 10) {
        sec = "0" + sec;
      }

      // When real time matches with alarm time, the alarm shows an alert and then starts ringing
      if (
        arr.length != 0 &&
        arr[0][0] == hr &&
        arr[0][1] == min &&
        arr[0][2] == sec &&
        arr[0][3] == selectAMPM
      ) {
        sound.play();
      }
    }, 1000);
  });

// When set clear button is clicked, alarm sound stops
document.getElementById("deleteAlarm").addEventListener("click", function () {
  sound.pause();
});
var indexDel = 0;

// To delete  perticular alarm from the recent listed alarms:
var deleteAlarm = function () {
  let listItem = this.parentNode;
  var ul = listItem.parentNode;
  var deleteButton = listItem.querySelector("button.delete");
  indexDel = parseInt(deleteButton.innerHTML[6]);
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][5] == indexDel) {
      arr.splice(i, 1);
    }
  }
  ul.removeChild(listItem);
};
var bindAlarmEvents = function (alarmListItem) {
  var deleteButton = alarmListItem.querySelector("button.delete");
  deleteButton.onclick = deleteAlarm;
};
