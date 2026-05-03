// ================= ALARM =================
function showNotification(text) {
  if (Notification.permission === "granted") {
    new Notification("⏰ Reminder", {
      body: text
    });
  }
}

if (Notification.permission !== "granted") {
  Notification.requestPermission();
}

// Permission একবারই চাইবে
function initNotification() {
  if ("Notification" in window && Notification.permission !== "granted") {
    Notification.requestPermission();
  }
}

function showNotification(text) {
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification("⏰ Reminder", {
      body: text,
      icon: "https://cdn-icons-png.flaticon.com/512/1827/1827392.png"
    });
  }
}