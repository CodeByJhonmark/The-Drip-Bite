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
    let username = document.getElementById("sign-up username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("sign-up password").value;
    
    let user = { username: username, email: email, password: password };
    localStorage.setItem(username, JSON.stringify(user));

    alert("Registration successful! You can now log in.");
    window.location.href = "index.html";
});

document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    
    var user = localStorage.getItem(username);

    if(user){
        var parsedUser = JSON.parse(user);
        if (parsedUser.password === password) {
            localStorage.setItem("user", JSON.stringify(parsedUser));
            window.location.href = "mainpage.html";
        } else {
            alert("Invalid username or password.");
        }
    }
    
});

document.addEventListener("DOMContentLoaded", function () {
    const card = document.getElementById('buy_or_cart');
    const button = document.getElementById('showCardBtn');

    button.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default <a> behavior
        event.stopPropagation();

        // Set card position based on cursor click
        card.style.left = event.pageX + 'px';
        card.style.top = event.pageY + 'px';
        card.style.display = 'block';
    });

    // Hide the card when clicking outside
    document.addEventListener("click", function(e) {
        if (!card.contains(e.target) && e.target !== button) {
            card.style.display = 'none';
        }
    });
});
