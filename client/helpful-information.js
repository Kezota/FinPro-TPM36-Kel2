document.getElementById("RegisterForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let isValid = true;

    const email = document.getElementById("Email-box").value;
    const whatsapp = document.getElementById("WhatsApp-box").value;
    const birthdate = document.getElementById("Birthdate").value;
    const cvFile = document.getElementById("cv-upload").files[0];
    const flazzFile = document.getElementById("flazz-upload").files[0];
    const idFile = document.getElementById("id-upload").files[0];

    if (!email.includes("@")) {
        alert("Email harus mengandung '@'.");
        isValid = false;
    }

    if (whatsapp.length < 9 || isNaN(whatsapp)) {
        alert("Nomor WhatsApp harus minimal 9 digit dan hanya berisi angka.");
        isValid = false;
    }

    const birthYear = new Date(birthdate).getFullYear();
    const currentYear = new Date().getFullYear();
    if ((currentYear - birthYear) < 17) {
        alert("Anda harus berusia minimal 17 tahun.");
        isValid = false;
    }

    const allowedExtensions = ["pdf", "jpg", "jpeg", "png"];
    function validateFile(file, fieldName) {
        if (file) {
            const fileExtension = file.name.split(".").pop().toLowerCase();
            if (!allowedExtensions.includes(fileExtension)) {
                alert(`${fieldName} harus dalam format pdf, jpg, jpeg, atau png.`);
                return false;
            }
        } else {
            alert(`${fieldName} harus diunggah.`);
            return false;
        }
        return true;
    }

    if (!validateFile(cvFile, "CV")) isValid = false;
    if (!validateFile(flazzFile, "Flazz Card")) isValid = false;
    if (!validateFile(idFile, "ID Card")) isValid = false;

    if (!isValid) {
        event.preventDefault();
    }
    if (errorMessage) {
        alert(errorMessage);
        return;
    }


    window.location.href = "UserDashboard.html";
});

document.getElementById("i-Email").addEventListener("click", function() {
    let passwordReq = document.getElementById("Email-requirements");
    passwordReq.classList.toggle("hidden");
});

document.getElementById("i-CV").addEventListener("click", function() {
    let passwordReq = document.getElementById("CV-requirements");
    passwordReq.classList.toggle("hidden");
});

document.getElementById("i-FlazzCard").addEventListener("click", function() {
    let passwordReq = document.getElementById("FlazzCard-requirements");
    passwordReq.classList.toggle("hidden");
});

document.getElementById("i-ID").addEventListener("click", function() {
    let passwordReq = document.getElementById("ID-requirements");
    passwordReq.classList.toggle("hidden");
});

document.getElementById("i-Number").addEventListener("click", function() {
    let passwordReq = document.getElementById("WhatsApp-requirements");
    passwordReq.classList.toggle("hidden");
});

document.getElementById("i-Line").addEventListener("click", function() {
    let passwordReq = document.getElementById("Line-requirements");
    passwordReq.classList.toggle("hidden");
});

document.getElementById("i-birthdate").addEventListener("click", function() {
    let passwordReq = document.getElementById("Birthdate-requirements");
    passwordReq.classList.toggle("hidden");
});

