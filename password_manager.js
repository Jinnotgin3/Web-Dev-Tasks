document.addEventListener('DOMContentLoaded', displayEntries);

document.getElementById('password-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const website = document.getElementById('website').value.trim();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    if (!website || !username || !password) {
        document.getElementById('msg').textContent = 'Please fill all fields.';
        return;
    }
    document.getElementById('msg').textContent = '';
    addEntry(website, username, password);
    this.reset();
    document.querySelector('.show-btn').textContent = 'Show';
    document.getElementById('password').type = 'password';
});

function displayEntries() {
    const tbody = document.querySelector('#entries-table tbody');
    tbody.innerHTML = '';
    const entries = JSON.parse(localStorage.getItem('pm-entries') || '[]');
    entries.forEach((entry, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
        <td>${entry.website}</td>
        <td>${entry.username}</td>
        <td><input type="password" value="${entry.password}" readonly id="pw-${idx}">
            <button class="show-btn" onclick="showHideSingle(${idx})">Show</button></td>
        <td><button class="action-btn" onclick="deleteEntry(${idx})">Delete</button></td>
      `;
        tbody.appendChild(tr);
    });
}

function addEntry(website, username, password) {
    const entries = JSON.parse(localStorage.getItem('pm-entries') || '[]');
    entries.push({ website, username, password });
    localStorage.setItem('pm-entries', JSON.stringify(entries));
    displayEntries();
}

function deleteEntry(idx) {
    const entries = JSON.parse(localStorage.getItem('pm-entries') || '[]');
    entries.splice(idx, 1);
    localStorage.setItem('pm-entries', JSON.stringify(entries));
    displayEntries();
}

function showHideSingle(idx) {
    const input = document.getElementById(`pw-${idx}`);
    const btn = input.nextElementSibling;
    if (input.type === 'password') {
        input.type = 'text'; btn.textContent = 'Hide';
    } else {
        input.type = 'password'; btn.textContent = 'Show';
    }
}

function togglePassword() {
    const input = document.getElementById('password');
    const btn = document.querySelector('.show-btn');
    if (input.type === 'password') {
        input.type = 'text'; btn.textContent = 'Hide';
    } else {
        input.type = 'password'; btn.textContent = 'Show';
    }
}

function generatePassword() {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let pw = "";
    for (let i = 0; i < 12; i++)
        pw += charset[Math.floor(Math.random() * charset.length)];
    document.getElementById('password').value = pw;
}