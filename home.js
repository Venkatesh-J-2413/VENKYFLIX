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

/* 🎬 MOVIE IMAGE CLICK */

document.querySelectorAll(".movie-row img").forEach(card => {

    card.addEventListener("click", function() {

        let selectedMovie = this.getAttribute("alt");

        /* 🎥 WEDNESDAY */

        if(selectedMovie === "Wednesday"){

            openMovie(

                "WEDNESDAY",

                "Smart, sarcastic and a little dead inside, Wednesday Addams investigates a murder mystery.",

                "https://image.tmdb.org/t/p/original/iHSwvRVsRyxpX7FE7GbviaDvgGZ.jpg",

                "https://www.youtube-nocookie.com/embed/Di310WS8zLk?autoplay=1"

            );
        }

    });

});

/* 🎬 CURRENT TRAILER */

let currentTrailer = "";

/* 🎬 OPEN MOVIE POPUP */

function openMovie(title,text,image,trailer){

    document.getElementById("movieModal").style.display = "flex";

    document.getElementById("movieTitle").innerHTML = title;

    document.getElementById("movieText").innerHTML = text;

    document.getElementById("movieImage").src = image;

    currentTrailer = trailer;
}

/* ❌ CLOSE POPUP */

function closeMovie(){

    document.getElementById("movieModal").style.display = "none";
}

/* ▶ PLAY TRAILER */

function playMovieTrailer(){

    closeMovie();

    playVideo(currentTrailer);
}
