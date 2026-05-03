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
    alarmAudio.volume = 0.5;
    alarmAudio.play();
  } else {
    console.log("Click required ⚠️");
  }

  document.getElementById("stopAlarm").style.display = "block";
}

// 🛑 Stop Alarm
function stopAlarm() {
  alarmRunning = false;

  if (alarmAudio) {
    alarmAudio.pause();
    alarmAudio.currentTime = 0;
  }

  document.getElementById("stopAlarm").style.display = "none";
}

// 🔘 connect button
document.getElementById("stopAlarm").onclick = stopAlarm;
document.getElementById("stopAlarm").style.display = "none";