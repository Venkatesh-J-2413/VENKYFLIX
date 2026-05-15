function login(){

    let email = document.getElementById("email").value;

    let password = document.getElementById("password").value;

    let savedEmail = localStorage.getItem("email");

    let savedPassword = localStorage.getItem("password");

    let message = document.getElementById("message");

    if(email === "" || password === ""){

        message.innerHTML = "Please fill all fields ❌";

        return;
    }

    if(email === savedEmail && password === savedPassword){

        localStorage.setItem("loggedIn", "true");

        message.innerHTML = "Login Successful ✅";

        window.location.href = "home.html";

    }

    else{

        message.innerHTML = "Wrong Email or Password ❌";

    }

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