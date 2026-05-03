let is12Hour = localStorage.getItem("format") === "12h";
let currentTheme = localStorage.getItem("theme") || "auto";

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let schedules = JSON.parse(localStorage.getItem("schedules")) || [];

  
  buildScene("Clear");


// ================= DAILY STATS =================
function updateDailyStats() {
  const completed = tasks.filter(t => t.done).length;
  document.getElementById("dailyStats").textContent = `Today: ${completed}/${tasks.length} completed`;
}
// ================= INIT =================
setInterval(updateClock, 1000);
setInterval(checkReminder, 1000);

updateClock();
applyTheme();
updateStatus();
getWeather();
renderTasks();
renderSchedule();
initNotification();