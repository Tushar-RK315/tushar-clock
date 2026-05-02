let is12Hour = localStorage.getItem("format") === "12h";
let currentTheme = localStorage.getItem("theme") || "auto";

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let schedules = JSON.parse(localStorage.getItem("schedules")) || [];

// ================= CLOCK =================
function updateClock() {
  const now = new Date();

  document.getElementById("time").textContent =
    now.toLocaleTimeString([], { hour12: is12Hour });

  document.getElementById("date").textContent =
    now.toDateString();
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

// ================= THEME =================
function applyTheme() {
  document.body.classList.remove("light", "dark", "auto");

  const hour = new Date().getHours();
  const isDay = hour >= 6 && hour < 18;

  if (currentTheme === "auto") {
    // 👉 Auto সবসময় আলাদা থাকবে
    document.body.classList.add("auto");

  } else if (isDay) {
    // 👉 Day: only light allowed
    document.body.classList.add("light");

  } else {
    // 👉 Night: only dark allowed
    document.body.classList.add("dark");
  }
}
// ================= STATUS =================
function updateStatus() {
  document.getElementById("status").textContent =
    `Mode: ${is12Hour ? "12h" : "24h"} | Theme: ${currentTheme}`;
}

// ================= SCENE =================
function buildScene(weather) {
  const scene = document.getElementById("scene");
  scene.innerHTML = "";

  const hour = new Date().getHours();

  const isDay = hour >= 6 && hour < 18;

// 🌞 DAY (Light + Auto)
if (
  document.body.classList.contains("light") ||
  (document.body.classList.contains("auto") && isDay)
) {
  const sun = document.createElement("div");
  sun.className = "sun";
  scene.appendChild(sun);
}

// 🌙 NIGHT (Dark + Auto)
if (
  document.body.classList.contains("dark") ||
  (document.body.classList.contains("auto") && !isDay)
) {
  const moon = document.createElement("div");
  moon.className = "moon";
  scene.appendChild(moon);

  const stars = document.createElement("div");
  stars.className = "stars";
  scene.appendChild(stars);
}

  // ⚡ AUTO MODE (special scene)
  if (document.body.classList.contains("auto")) {
    const grid = document.createElement("div");
    grid.style.position = "absolute";
    grid.style.width = "100%";
    grid.style.height = "100%";
    grid.style.background = "radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)";
    grid.style.backgroundSize = "40px 40px";
    scene.appendChild(grid);
  }

  // WEATHER
  if (weather.includes("Cloud")) {
    const c = document.createElement("div");
    c.className = "cloud";
    scene.appendChild(c);
  }

  if (weather.includes("Rain")) {
    const r = document.createElement("div");
    r.className = "rain";
    scene.appendChild(r);
  }

  if (weather.includes("Thunderstorm")) {
    const f = document.createElement("div");
    f.className = "flash";
    scene.appendChild(f);
  }

  if (weather.includes("Snow")) {
    const s = document.createElement("div");
    s.className = "snow";
    scene.appendChild(s);
  }

  if (weather.includes("Haze") || weather.includes("Mist")) {
    const f = document.createElement("div");
    f.className = "fog";
    scene.appendChild(f);
  }
}

// ================= WEATHER =================
async function getWeather() {
  try {
    const res = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=Kolkata&units=metric&appid=166309d1ff57d97045f4de32c88a991a"
    );

    const data = await res.json();
    const condition = data.weather[0].main;

    document.getElementById("weatherText").textContent =
      `${data.main.temp}°C | ${condition}`;

    buildScene(condition);

  } catch {
    document.getElementById("weatherText").textContent =
      "Weather unavailable";
  }
}

// ================= TASK =================
function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  if (tasks.length === 0) {
    list.innerHTML = `<li class="list-group-item text-center text-muted">
      No tasks yet 🚀
    </li>`;
  }

  let completed = 0;

  tasks.forEach((t, i) => {
    const li = document.createElement("li");

    if (t.done) completed++;

    li.innerHTML = `
      <input type="checkbox" ${t.done ? "checked":""} onchange="toggleTask(${i})">
      ${t.text}
      <button onclick="deleteTask(${i})">X</button>
    `;

    list.appendChild(li);
  });

  const percent = tasks.length
    ? Math.round((completed / tasks.length) * 100)
    : 0;

  document.getElementById("progressBar").style.width = percent + "%";
  document.getElementById("progressText").textContent = percent + "%";

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function toggleTask(i) {
  tasks[i].done = !tasks[i].done;
  renderTasks();
}

function deleteTask(i) {
  tasks.splice(i, 1);
  renderTasks();
}

document.getElementById("addTask").onclick = () => {
  const input = document.getElementById("taskInput");

  if (!input.value.trim()) return;

  tasks.push({ text: input.value, done: false });
  input.value = "";

  renderTasks();
};

// ================= SCHEDULE =================
function renderSchedule() {
  const list = document.getElementById("scheduleList");
  list.innerHTML = "";

  if (schedules.length === 0) {
    list.innerHTML = `<li>No schedule yet</li>`;
    return;
  }

  schedules.forEach((item, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span><b>${formatTime(item.time)}</b> - ${item.text}</span>
      <button onclick="deleteSchedule(${index})">X</button>
    `;

    list.appendChild(li);
  });

  localStorage.setItem("schedules", JSON.stringify(schedules));
}

function deleteSchedule(index) {
  schedules.splice(index, 1);
  renderSchedule();
}

document.getElementById("addSchedule").onclick = () => {
  const time = document.getElementById("timeInput").value;
  const text = document.getElementById("scheduleInput").value;

  if (!time || !text.trim()) return;

  schedules.push({ time, text });
  document.getElementById("scheduleInput").value = "";

  renderSchedule();
};

// ================= TOGGLES =================
document.getElementById("toggleFormat").onclick = () => {
  is12Hour = !is12Hour;

  localStorage.setItem("format", is12Hour ? "12h" : "24h");

  updateClock();
  renderSchedule();
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

  applyTheme();
  updateStatus();
  getWeather(); // 🔥 scene refresh
};

// ================= INIT =================
setInterval(updateClock, 1000);




function checkReminder() {
  const now = new Date();

  const currentTime =
    now.getHours().toString().padStart(2, "0") + ":" +
    now.getMinutes().toString().padStart(2, "0");

  schedules.forEach((item) => {
    if (item.time === currentTime && !item.triggered) {

      alert("⏰ " + item.text);

      const audio = new Audio("https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg");
      audio.play();

      item.triggered = true;

      // 🔥 auto task add
      tasks.push({
        text: item.text,
        done: false
      });
    }
  });

  localStorage.setItem("schedules", JSON.stringify(schedules));
  localStorage.setItem("tasks", JSON.stringify(tasks));

  renderTasks();
}

setInterval(checkReminder, 60000);
checkReminder(); // 🔥 check immediately on load

function updateStats() {
  let total = tasks.length;
  let done = tasks.filter(t => t.done).length;

  document.getElementById("dailyStats").textContent =
    `Today: ${done}/${total} completed`;
}


function resetDaily() {
  const today = new Date().toDateString();
  const last = localStorage.getItem("lastDate");

  if (last !== today) {
    schedules.forEach(s => s.triggered = false);
    localStorage.setItem("lastDate", today);
    localStorage.setItem("schedules", JSON.stringify(schedules));
  }
}

resetDaily();

updateClock();
applyTheme();
updateStatus();
getWeather();
renderTasks();
renderSchedule();
updateStats();