// ================= THEME =================
function applyTheme() {
  document.body.classList.remove("light", "dark", "auto");

  const hour = new Date().getHours();
  const isDay = hour >= 6 && hour < 18;

  // 🔥 AUTO = always unique
  if (currentTheme === "auto") {
    document.body.classList.add("auto");
    return;
  }

  // 🔥 FORCE RULE (important)
  if (isDay && currentTheme === "dark") {
    currentTheme = "light";
  }

  if (!isDay && currentTheme === "light") {
    currentTheme = "dark";
  }

  document.body.classList.add(currentTheme);
}


// ================= STATUS =================
function updateStatus() {
  document.getElementById("status").textContent =
    `Mode: ${is12Hour ? "12h" : "24h"} | Theme: ${currentTheme}`;
}

// ================= FORMAT =================
function formatTime(time24) {
  let [hour, minute] = time24.split(":");

  if (!is12Hour) return time24;

  let h = parseInt(hour);
  let ampm = h >= 12 ? "PM" : "AM";

  h = h % 12;
  if (h === 0) h = 12;

  return `${h}:${minute} ${ampm}`;
}


document.getElementById("toggleFormat").onclick = () => {
  is12Hour = !is12Hour;
  localStorage.setItem("format", is12Hour ? "12h" : "24h");
  updateStatus();
};
document.getElementById("toggleTheme").onclick = () => {

  const hour = new Date().getHours();
  const isDay = hour >= 6 && hour < 18;

  if (isDay) {
    // 🌞 DAY → light ↔ auto
    currentTheme = currentTheme === "light" ? "auto" : "light";

  } else {
    // 🌙 NIGHT → dark ↔ auto
    currentTheme = currentTheme === "dark" ? "auto" : "dark";
  }

  localStorage.setItem("theme", currentTheme);
  
  applyTheme();       // UI change
  updateStatus();     // text update
  getWeather();       // scene update
};