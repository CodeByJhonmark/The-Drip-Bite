const registerBtn = document.getElementById("register");
const loginBtn = document.createElement("button");
loginBtn.className = "toggle-button";
loginBtn.innerText = "Login";
const container = document.getElementById("container");
const toggleContainer = document.getElementById("toggle-container");
const toggleTitle = document.getElementById("toggle-title");
const toggleText = document.getElementById("toggle-text");

registerBtn.addEventListener("click", () => {
    container.classList.add("active");
    toggleTitle.innerText = "Hello, Welcome To The Drip Bite!";
    toggleText.innerText = "Already have an account?";
    toggleContainer.replaceChild(loginBtn, registerBtn);
});

loginBtn.addEventListener("click", () => {
    container.classList.remove("active");
    toggleTitle.innerText = "Hello, Welcome To The Drip Bite!";
    toggleText.innerText = "Don't have an account?";
    toggleContainer.replaceChild(registerBtn, loginBtn);
});

// ── REGISTRATION ─────────────────────────────────────────────────
document.getElementById("signup-form").addEventListener("submit", function(event) {
    event.preventDefault();
    let username = document.getElementById("signup-username").value.trim();
    let email    = document.getElementById("email").value.trim();
    let phone    = document.getElementById("phone").value.trim();   // #1 FIX: phone number
    let password = document.getElementById("signup-password").value;

    if (password.length < 6) {
        showAuthToast("Password must be at least 6 characters.", "error"); return;
    }
    if (phone && !/^[0-9]{10,11}$/.test(phone)) {
        showAuthToast("Please enter a valid phone number (10–11 digits).", "error"); return;
    }
    if (localStorage.getItem(username)) {
        showAuthToast("Username already exists. Please choose a different one.", "error"); return;
    }

    let user = { username, email, phone, password };
    localStorage.setItem(username, JSON.stringify(user));

    showAuthToast("Registration successful! You can now log in.", "success");
    setTimeout(() => { window.location.href = "index.html"; }, 1400);
});

// ── LOGIN ─────────────────────────────────────────────────────────
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value;

    var stored = localStorage.getItem(username);
    if (stored) {
        var parsedUser = JSON.parse(stored);
        if (parsedUser.password === password) {
            localStorage.setItem("user", JSON.stringify(parsedUser));
            window.location.href = "mainpage.html";
        } else {
            showAuthToast("Incorrect password. Please try again.", "error");
        }
    } else {
        showAuthToast("Username not found. Please register first.", "error");
    }
});
