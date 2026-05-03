// ================= TASK =================

// Update stats whenever tasks change
function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  let completed = 0;

  tasks.forEach((t, i) => {
    const li = document.createElement("li");

    if (t.done) completed++;

    li.innerHTML = `
      <input type="checkbox" ${t.done ? "checked" : ""} onchange="toggleTask(${i})">
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
  updateDailyStats();

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