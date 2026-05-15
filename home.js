function logout(){
    localStorage.removeItem("loggedIn");
    window.location.href = "index.html";
}

function playVideo(url){
    document.getElementById("videoPopup").style.display = "flex";
    document.getElementById("videoFrame").src = url;
}

function closeVideo(){
    document.getElementById("videoPopup").style.display = "none";
    document.getElementById("videoFrame").src = "";
}

// SLIDER
let slides = document.querySelectorAll(".banner-slide");
let index = 0;

setInterval(() => {
    slides[index].classList.remove("active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
}, 3000);

// MENU CLICK
let menuTabs = document.querySelectorAll(".menu span");

menuTabs.forEach(tab => {
    tab.addEventListener("click", function() {
        document.querySelector(".menu .active").classList.remove("active");
        this.classList.add("active");
    });
});

// MOVIE CLICK
document.querySelectorAll(".movie-row img").forEach(card => {
    card.addEventListener("click", function() {
        let selectedMovie = this.getAttribute("alt");
        alert("Opening: " + selectedMovie);
    });
});