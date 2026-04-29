// ================== STATE ==================
let is12Hour = localStorage.getItem("format") === "12h";
let theme = localStorage.getItem("theme") || "auto";

// ================== CLOCK ==================
function updateClock() {
  const now = new Date();

  document.getElementById("time").textContent =
    now.toLocaleTimeString([], { hour12: is12Hour });

  document.getElementById("date").textContent =
    now.toDateString();
}

// ================== SYNC CLOCK ==================
function startClock() {
  const now = new Date();
  const delay = 1000 - now.getMilliseconds();

  setTimeout(() => {
    updateClock();
    setInterval(updateClock, 1000);
  }, delay);
}

// ================== FORMAT TOGGLE ==================
document.getElementById("toggleFormat").addEventListener("click", () => {
  is12Hour = !is12Hour;
  localStorage.setItem("format", is12Hour ? "12h" : "24h");
  updateClock(); // instant update
});

// ================== THEME APPLY ==================
function applyTheme() {
  if (theme === "dark") {
    document.body.style.background = "#000";
    document.body.style.color = "#fff";
  } else if (theme === "light") {
    document.body.style.background = "#fff";
    document.body.style.color = "#000";
  } else {
    // AUTO MODE
    const hour = new Date().getHours();
    if (hour >= 18 || hour < 6) {
      document.body.style.background = "#000";
      document.body.style.color = "#fff";
    } else {
      document.body.style.background = "#fff";
      document.body.style.color = "#000";
    }
  }
}

// ================== THEME TOGGLE ==================
document.getElementById("toggleTheme").addEventListener("click", () => {
  if (theme === "auto") theme = "light";
  else if (theme === "light") theme = "dark";
  else theme = "auto";

  localStorage.setItem("theme", theme);
  applyTheme();
});

// ================== INIT ==================
startClock();
applyTheme();