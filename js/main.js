let is12Hour = localStorage.getItem("format") === "12h";
let currentTheme = localStorage.getItem("theme") || "auto";

// CLOCK
function updateClock() {
  const now = new Date();
  const timeEl = document.getElementById("time");

  timeEl.classList.add("fade");

  setTimeout(() => {
    timeEl.textContent =
      now.toLocaleTimeString([], { hour12: is12Hour });
    timeEl.classList.remove("fade");
  }, 100);

  document.getElementById("date").textContent =
    now.toDateString();
}

// SYNC
function startClock() {
  const delay = 1000 - new Date().getMilliseconds();

  setTimeout(() => {
    updateClock();
    setInterval(updateClock, 1000);
  }, delay);
}

// STATUS
function updateStatus() {
  const themeText =
    currentTheme === "auto"
      ? "Auto"
      : currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1);

  document.getElementById("status").textContent =
    `Mode: ${is12Hour ? "12h" : "24h"} | Theme: ${themeText}`;
}

// THEME
function applyTheme() {
  let savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark" || savedTheme === "light") {
    currentTheme = savedTheme;
  } else {
    const hour = new Date().getHours();
    currentTheme = (hour >= 18 || hour < 6) ? "dark" : "light";
  }

  document.body.classList.remove("dark", "light");
  document.body.classList.add(currentTheme);
}

// TOGGLES
document.getElementById("toggleFormat").onclick = () => {
  is12Hour = !is12Hour;
  localStorage.setItem("format", is12Hour ? "12h" : "24h");
  updateClock();
  updateStatus();
};

document.getElementById("toggleTheme").onclick = () => {
  if (currentTheme === "dark") currentTheme = "light";
  else if (currentTheme === "light") currentTheme = "auto";
  else currentTheme = "dark";

  localStorage.setItem("theme", currentTheme);
  applyTheme();
  updateStatus();
};

// WEATHER
async function getWeather() {
  try {
    const res = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=Kolkata&units=metric&appid=166309d1ff57d97045f4de32c88a991a"
    );

    const data = await res.json();

    const temp = data.main.temp;
    const condition = data.weather[0].main;

    document.getElementById("weatherText").textContent =
      `${temp}°C | ${condition}`;

    document.getElementById("weatherIcon").textContent =
      condition.includes("Clear") ? "☀️" :
      condition.includes("Cloud") ? "☁️" :
      condition.includes("Rain") ? "🌧️" : "🌍";

  } catch {
    document.getElementById("weatherText").textContent =
      "Weather unavailable";
  }
}

// INIT
startClock();
applyTheme();
updateStatus();
getWeather();
setInterval(getWeather, 300000);