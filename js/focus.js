let focusInterval = null;
let focusTime = 1500; // 25 min (in seconds) = 1500 

function updateFocusDisplay() {
  let min = Math.floor(focusTime / 60);
  let sec = focusTime % 60;

  document.getElementById("focusTimer").textContent =
    `${min}:${sec.toString().padStart(2, "0")}`;

  // ✅ (A) বড় টাইমার আপডেট — এই লাইন নতুন add হয়েছে
  document.getElementById("focusBigTimer").textContent =
    `${min}:${sec.toString().padStart(2, "0")}`;
}

// ▶️ Start Focus
function startFocus() {
  if (focusInterval) return;

  // ✅ (B) overlay show + fullscreen — এই ব্লক নতুন add হয়েছে
  document.getElementById("focusOverlay").style.display = "flex";
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  }

  document.body.style.filter = "brightness(0.5)";

  focusInterval = setInterval(() => {
    focusTime--;

    updateFocusDisplay();

    if (focusTime <= 0) {
      clearInterval(focusInterval);
      focusInterval = null;

      document.body.style.filter = "";

      startAlarm("⏰ Focus session complete!");

      focusTime = 1500;
      updateFocusDisplay();
    }
  }, 1000);
}

// ⏹ Stop Focus
function stopFocus() {
  clearInterval(focusInterval);
  focusInterval = null;

  document.body.style.filter = "";

  // ✅ (C) overlay hide + exit fullscreen — এই ব্লক নতুন add হয়েছে
  document.getElementById("focusOverlay").style.display = "none";
  if (document.fullscreenElement) {
    document.exitFullscreen();
  }

  focusTime = 1500;
  updateFocusDisplay();

  console.log("Stop clicked");
}

// 🔘 connect buttons
document.getElementById("startFocus").onclick = startFocus;
document.getElementById("stopFocus").onclick = stopFocus;

// ✅ (D) Emergency button — এই লাইন নতুন add হয়েছে
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("focusEmergency").addEventListener("click", stopFocus);
});

// INIT
updateFocusDisplay();