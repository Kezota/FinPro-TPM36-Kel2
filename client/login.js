document.getElementById("teamName").addEventListener("input", function() {this.style.color = 'white';});
document.getElementById("password").addEventListener("input", function() {this.style.color = 'white';});

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let teamName = document.getElementById("teamName").value;
    let password = document.getElementById("password").value;
    

    if (teamName === "" || password === "") {
        alert("Please fill in all fields.");
        return;
    }

    let loadingOverlay = document.getElementById("loadingOverlay");
    loadingOverlay.style.visibility = "visible";
    loadingOverlay.style.opacity = "1";

    setTimeout(function() {
        window.location.href = "UserDashboard.html";
    }, 2000);
});
document.getElementById("togglePassword").addEventListener("click", function() {
    let passwordField = document.getElementById("password");
    
    if (passwordField.type === "password") {
        passwordField.type = "text";
        this.src = "login elements/eye.png";
    } else {
        passwordField.type = "password";
        this.src = "login elements/eye close.png";
    }
});
