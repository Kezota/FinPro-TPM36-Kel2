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

document.getElementById("infoIcon").addEventListener("click", function () {
  let passwordReq = document.getElementById("password-requirements");
  passwordReq.classList.toggle("hidden");
});

document
  .getElementById("RegisterForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let teamName = document.getElementById("teamName").value;
    let password = document.getElementById("password").value;

    // Validation
    if (teamName === "" || password === "") {
      alert("Please fill in all fields.");
      return;
    }
    if (password.length < 8) {
      alert("Password harus minimal 8 karakter.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      alert("Password harus mengandung huruf besar.");
      return;
    }
    if (!/[a-z]/.test(password)) {
      alert("Password harus mengandung huruf kecil.");
      return;
    }
    if (!/\d/.test(password)) {
      alert("Password harus mengandung angka.");
      return;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      alert("Password harus mengandung setidaknya satu simbol (!@#$%^&*).");
      return;
    }

    // Store data in local storage
    localStorage.setItem("teamName", teamName);
    localStorage.setItem("password", password);

    // Redirect to the next page
    window.location.href = "helpful-information.html";
  });

document.querySelectorAll(".checkbox-group input").forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    document.querySelectorAll(".checkbox-group input").forEach((other) => {
      if (other !== this) other.checked = false;
    });
  });
});
