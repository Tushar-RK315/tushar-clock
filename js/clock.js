// ================= CLOCK =================
function updateClock() {
  const now = new Date();

  document.getElementById("time").textContent =
    now.toLocaleTimeString([], { hour12: is12Hour });

  document.getElementById("date").textContent =
    now.toDateString();
}