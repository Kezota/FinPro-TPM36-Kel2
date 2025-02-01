document.querySelector(".logout-btn").addEventListener("click", function () {
  document.getElementById("logoutPopup").style.display = "block";
});

function closePopup() {
  document.getElementById("logoutPopup").style.display = "none";
}

function confirmLogout() {
  fetch("http://127.0.0.1:8000/logout", {
    method: "POST",
  })
    .then((response) => {
      if (response.ok) {
        window.location.href = "login.html";
      } else {
        alert("Logout failed.");
      }
    })
    .catch((error) => {
      window.location.href = "login.html";
    });
}

function viewDocument(type) {
  let documentUrl;

  if (type === "cv") {
    documentUrl = "path/to/cv.pdf";
  } else if (type === "id") {
    documentUrl = "path/to/id.pdf";
  }

  window.open(documentUrl, "_blank");
}
