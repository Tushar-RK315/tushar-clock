// ================= SCENE =================
function buildScene(weather) {
  const scene = document.getElementById("scene");
  scene.innerHTML = "";

  const hour = new Date().getHours();
  const isDay = hour >= 6 && hour < 18;

  if (
    document.body.classList.contains("light") ||
    (document.body.classList.contains("auto") && isDay)
  ) {
    const sun = document.createElement("div");
    sun.className = "sun";
    scene.appendChild(sun);
  }

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

  if (document.body.classList.contains("auto")) {
    const grid = document.createElement("div");
    grid.style.position = "absolute";
    grid.style.width = "100%";
    grid.style.height = "100%";
    grid.style.background =
      "radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)";
    grid.style.backgroundSize = "40px 40px";
    scene.appendChild(grid);
  }

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