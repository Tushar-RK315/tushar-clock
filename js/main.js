let is12Hour = localStorage.getItem("format") === "12h";
let currentTheme = localStorage.getItem("theme") || "auto";

// CLOCK
function updateClock() {
  const now = new Date();

  document.getElementById("time").textContent =
    now.toLocaleTimeString([], { hour12: is12Hour });

  document.getElementById("date").textContent =
    now.toDateString();
}

setInterval(updateClock, 1000);

// STATUS
function updateStatus() {
  document.getElementById("status").textContent =
    `Mode: ${is12Hour ? "12h" : "24h"} | Theme: ${currentTheme}`;
}

// THEME
function applyTheme() {
  document.body.classList.remove("light", "dark", "auto");

  const hour = new Date().getHours();

  // 🌞 DAY (6 AM - 6 PM)
  if (hour >= 6 && hour < 18) {

    if (currentTheme === "dark") {
      // ❌ day-তে dark allow না → force auto
      document.body.classList.add("auto");
    } 
    else if (currentTheme === "auto") {
      document.body.classList.add("auto");
    } 
    else {
      document.body.classList.add("light");
    }

  } 
  
  // 🌙 NIGHT
  else {

    if (currentTheme === "light") {
      // ❌ night-এ light allow না → force auto
      document.body.classList.add("auto");
    } 
    else if (currentTheme === "auto") {
      document.body.classList.add("auto");
    } 
    else {
      document.body.classList.add("dark");
    }

  }
}

// BACKGROUND BUILDER
function buildScene(weather) {

  const scene = document.getElementById("scene");
  scene.innerHTML = "";

  const hour = new Date().getHours();

  // 🌞 / 🌙
  if (hour >= 6 && hour < 18) {
    const sun = document.createElement("div");
    sun.className = "sun";
    scene.appendChild(sun);
  } else {
    const moon = document.createElement("div");
    moon.className = "moon";
    scene.appendChild(moon);

    const stars = document.createElement("div");
    stars.className = "stars";
    scene.appendChild(stars);
  }

  // 🌿 SEASON (FIXED 🔥)
  const month = new Date().getMonth();

  if (month >= 5 && month <= 7) {
    // ☀️ SUMMER
    const heat = document.createElement("div");
    heat.className = "summer-effect";
    scene.appendChild(heat);

  } else if (month >= 2 && month <= 4) {
    // 🌸 SPRING
    const spring = document.createElement("div");
    spring.className = "spring-effect";
    scene.appendChild(spring);

  } else if (month >= 8 && month <= 10) {
    // 🍂 AUTUMN
    const autumn = document.createElement("div");
    autumn.className = "autumn-effect";
    scene.appendChild(autumn);

  } else {
    // ❄️ WINTER
    const winter = document.createElement("div");
    winter.className = "winter-effect";
    scene.appendChild(winter);
  }

  // WEATHER
  if (weather.includes("Cloud")) {
    const c = document.createElement("div");
    c.className = "cloud";
    scene.appendChild(c);
  }

  if (weather.includes("Rain")) {
    const rain = document.createElement("div");
    rain.className = "rain";
    scene.appendChild(rain);
  }

  if (weather.includes("Thunderstorm")) {
    const flash = document.createElement("div");
    flash.className = "flash";
    scene.appendChild(flash);
  }

  if (weather.includes("Snow")) {
    const snow = document.createElement("div");
    snow.className = "snow";
    scene.appendChild(snow);
  }

  if (weather.includes("Haze") || weather.includes("Mist")) {
    const fog = document.createElement("div");
    fog.className = "fog";
    scene.appendChild(fog);
  }
}

// TOGGLE
document.getElementById("toggleFormat").onclick = () => {
  is12Hour = !is12Hour;
  localStorage.setItem("format", is12Hour ? "12h" : "24h");
};

document.getElementById("toggleTheme").onclick = () => {

  const hour = new Date().getHours();

  // 🌞 DAY → only light ↔ auto
  if (hour >= 6 && hour < 18) {

    if (currentTheme === "light") {
      currentTheme = "auto";
    } else {
      currentTheme = "light";
    }

  } 
  
  // 🌙 NIGHT → only dark ↔ auto
  else {

    if (currentTheme === "dark") {
      currentTheme = "auto";
    } else {
      currentTheme = "dark";
    }

  }

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

    const condition = data.weather[0].main;

    document.getElementById("weatherText").textContent =
      `${data.main.temp}°C | ${condition}`;

    buildScene(condition);

  } catch {
    document.getElementById("weatherText").textContent =
      "Weather unavailable";
  }
}

// Season:-

function setSeason() {
  const month = new Date().getMonth();

  document.body.classList.remove("summer","winter","autumn","spring");

  if (month >= 2 && month <= 4) {
    document.body.classList.add("spring");

  } else if (month >= 5 && month <= 7) {
    document.body.classList.add("summer");

  } else if (month >= 8 && month <= 10) {
    document.body.classList.add("autumn");

  } else {
    document.body.classList.add("winter");
  }
}



// INIT
setSeason();
updateClock();
applyTheme();
updateStatus();
getWeather();