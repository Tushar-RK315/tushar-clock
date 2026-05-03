function checkReminder() {
  const now = new Date();

  const currentTime =
    now.getHours().toString().padStart(2, "0") + ":" +
    now.getMinutes().toString().padStart(2, "0");

  schedules.forEach((item) => {

    // 🔥 guard: triggered field না থাকলে add কর
    if (item.triggered === undefined) item.triggered = false;

    if (item.time === currentTime && !item.triggered) {
      startAlarm(item.text);

      item.triggered = true;
    }
  });

  localStorage.setItem("schedules", JSON.stringify(schedules));
}

// ================= SCHEDULE =================
function renderSchedule() {
  const list = document.getElementById("scheduleList");
  list.innerHTML = "";

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

  schedules.push({
  time,
  text,
  triggered: false
  });
  document.getElementById("scheduleInput").value = "";

  renderSchedule();

  
};

