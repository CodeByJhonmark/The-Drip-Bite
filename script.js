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

document.querySelector(".sign-in form").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.querySelector(".sign-in input[type='text']").value;
    const password = document.querySelector(".sign-in input[type='password']").value;

    if (username === "example123" && password === "example123") {
        window.location.href = "mainpage.html";
    } else {
        alert("Invalid username or password. Try again!");
    }
});
