let alarmAudio = null;
let alarmRunning = false;
let audioUnlocked = false;

// 🔓 unlock audio
document.body.addEventListener("click", () => {
  if (!audioUnlocked) {
    audioUnlocked = true;
    console.log("Audio unlocked 🔓");
  }
});

// 🔔 Start Alarm
function startAlarm(text) {
  if (alarmRunning) return;

  alarmRunning = true;

  showNotification(text);

  if (audioUnlocked) {
    alarmAudio = new Audio("assets/rrr.mp3");
    alarmAudio.loop = true;
    alarmAudio.volume = 0.9;
    alarmAudio.play();
  } else {
    console.log("Click required ⚠️");
  }

  // 🔴 Show buttons
  document.getElementById("stopAlarm").style.display = "block";
  document.getElementById("snoozeAlarm").style.display = "block";
}

// 🛑 Stop Alarm
function stopAlarm() {
  alarmRunning = false;

  if (alarmAudio) {
    alarmAudio.pause();
    alarmAudio.currentTime = 0;
  }

  // 🔴 Hide buttons
  document.getElementById("stopAlarm").style.display = "none";
  document.getElementById("snoozeAlarm").style.display = "none";
}

// ⏳ Snooze Alarm (5 min later)
function snoozeAlarm() {
  stopAlarm();

  setTimeout(() => {
    startAlarm("⏰ Snoozed Reminder");
  }, 120000); // 2 min
}

// 🔘 connect buttons
document.getElementById("stopAlarm").onclick = stopAlarm;
document.getElementById("snoozeAlarm").onclick = snoozeAlarm;

// 🧼 Initially hidden
document.getElementById("stopAlarm").style.display = "none";
document.getElementById("snoozeAlarm").style.display = "none";