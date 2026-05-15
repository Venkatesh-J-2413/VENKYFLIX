function signup(){

    let name = document.getElementById("name").value;

    let email = document.getElementById("email").value;

    let password = document.getElementById("password").value;

    let message = document.getElementById("message");

    if(name === "" || email === "" || password === ""){

        message.innerHTML = "Please fill all fields ❌";

        return;
    }

    // SAVE USER DATA
    localStorage.setItem("email", email);

    localStorage.setItem("password", password);

    message.innerHTML = "Account Created 🎉";

    setTimeout(() => {

        window.location.href = "login.html";

    }, 1000);

}

function togglePassword(){

    let password = document.getElementById("password");

    let eyeIcon = document.getElementById("eyeIcon");

    if(password.type === "password"){

        password.type = "text";

        eyeIcon.innerHTML = "🙈";

    }

    else{

        password.type = "password";

        eyeIcon.innerHTML = "👁️";

    }

}