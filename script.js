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

document.getElementById("signup-form").addEventListener("submit", function(event) {
    event.preventDefault();
    let username = document.getElementById("signup-username").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("signup-password").value;

    if (password.length < 6) {
        alert("Password must be at least 6 characters.");
        return;
    }

    // Check if username is already taken
    if (localStorage.getItem(username)) {
        alert("Username already exists. Please choose a different one.");
        return;
    }

    let user = { username: username, email: email, password: password };
    localStorage.setItem(username, JSON.stringify(user));

    alert("Registration successful! You can now log in.");
    window.location.href = "index.html";
});

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
            alert("Incorrect password. Please try again.");
        }
    } else {
        alert("Username not found. Please register first.");
    }
});
