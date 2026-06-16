const pages = document.querySelectorAll('.page');
const reminderList = document.getElementById('reminderList');

function showPage(id) {
  pages.forEach(page => page.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function loadReminders() {
  const saved = JSON.parse(localStorage.getItem('hubReminders') || '[]');
  reminderList.innerHTML = '';
  saved.forEach((item, index) => {
    const li = document.createElement('li');
    li.className = 'reminder-item' + (item.done ? ' done' : '');
    li.innerHTML = `
      <div>
        <strong>${item.done ? '✔️ ' : '🔔 '}${item.text}</strong>
        <small>${item.done ? 'Sudah selesai' : 'Belum selesai'}</small>
      </div>
      <div style="display:flex; gap: 8px; align-items:center;">
        <button onclick="deleteReminder(${index})">Hapus</button>
        <button class="button" style="padding: 8px 12px; background: #10b981;" onclick="toggleReminder(${index})">${item.done ? 'Buka' : 'Selesai'}</button>
      </div>
    `;
    reminderList.appendChild(li);
  });
}

function saveReminders(reminders) {
  localStorage.setItem('hubReminders', JSON.stringify(reminders));
  loadReminders();
}

function addReminder() {
  const text = document.getElementById('reminderText').value.trim();
  if (!text) return alert('Silakan isi deskripsi reminder.');
  const reminders = JSON.parse(localStorage.getItem('hubReminders') || '[]');
  reminders.push({ text, done: false });
  saveReminders(reminders);
  document.getElementById('reminderText').value = '';
}

function deleteReminder(index) {
  const reminders = JSON.parse(localStorage.getItem('hubReminders') || '[]');
  reminders.splice(index, 1);
  saveReminders(reminders);
}

function toggleReminder(index) {
  const reminders = JSON.parse(localStorage.getItem('hubReminders') || '[]');
  reminders[index].done = !reminders[index].done;
  saveReminders(reminders);
}

window.addEventListener('DOMContentLoaded', () => {
  loadReminders();
});
