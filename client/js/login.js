document.getElementById("teamName").addEventListener("input", function () {
  this.style.color = "white";
});

document.getElementById("password").addEventListener("input", function () {
  this.style.color = "white";
});

document
  .getElementById("togglePassword")
  .addEventListener("click", function () {
    let passwordField = document.getElementById("password");

    if (passwordField.type === "password") {
      passwordField.type = "text";
      this.src = "login elements/eye.png";
    } else {
      passwordField.type = "password";
      this.src = "login elements/eye close.png";
    }
  });

document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
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

    const formData = new FormData(this);
    const data = {
      teamName: formData.get("teamName"),
      password: formData.get("password"),
    };

    // POST request
    fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert("Login successful!");
        // Clear the input fields
        document.getElementById("loginForm").reset();

        // GET request after successful POST
        fetch("http://127.0.0.1:8000/login")
          .then((response) => response.json())
          .then((data) => {
            console.log("GET Success:", data);
            // Handle the GET response data here
          })
          .catch((error) => {
            console.error("GET Error:", error);
          });

        // Redirect to UserDashboard.html after a delay
        setTimeout(function () {
          window.location.href = "UserDashboard.html";
        }, 2000);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("There was an error logging in.");
      });
  });
