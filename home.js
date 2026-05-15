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

let currentVideo = "";
let currentEpisodeIndex = 0;
let currentAnimeTitle = "";
let watchTimer = null;
let autoNextEnabled = true;

// 🎬 DATA
let animeData = {
  "I'm Getting Married Season 1": [
    { name: "Episode 1", video: "https://drive.google.com/file/d/1QfSPioyG5wOPPtgzG08pkyXiZUi4SvaI/preview" },
    { name: "Episode 2", video: "https://drive.google.com/file/d/1rpHAkzaRR40PPWodmmO56sFqstC2BWTw/preview" },
    { name: "Episode 3", video: "https://drive.google.com/file/d/188-OykPHQXV8Nl9OEy-KFQzlXK1GfS6C/preview" },
    { name: "Episode 4", video: "https://drive.google.com/file/d/1RxfAEBjsmD4KCqqtCSCU6K3dtpRskHuD/preview" },
    { name: "Episode 5", video: "https://drive.google.com/file/d/17GwjyL06KZT05utUM3EOOCdpX39s4yDW/preview" },
    { name: "Episode 6", video: "https://drive.google.com/file/d/1ih8l4lPS9476soLnptBCVRBKY1L5yXsP/preview" },
    { name: "Episode 7", video: "https://drive.google.com/file/d/1gePEIBqAvEVi3WwdWqnAn-YRRHNlzB5-/preview" },
    { name: "Episode 8", video: "https://drive.google.com/file/d/1luduHbXHhbesAlZHcgSyNJiSHppAe83I/preview" },
    { name: "Episode 9", video: "https://drive.google.com/file/d/1yiR_8z4iVY6cD0B-WqvKcNZrkGMZRQUJ/preview" },
    { name: "Episode 10", video: "https://drive.google.com/file/d/1P2usgwr0dqUfhrbJld1Ar2uwHXrh5Okj/preview" },
    { name: "Episode 11", video: "https://drive.google.com/file/d/1BV2m_mP0TNQKDhWBhWCL2niVriMXLX1m/preview" },
    { name: "Episode 12", video: "https://drive.google.com/file/d/1Javzfa6oDP_mOcCVPYc0dUK9h6KG4RMR/preview" }
  ]
};

function openAnime(title, image){

    document.getElementById("animeModal").style.display = "flex";
    document.getElementById("animeTitle").innerText = title;
    document.getElementById("animeImage").src = image;

    currentAnimeTitle = title;

    let list = document.getElementById("episodeList");
    list.innerHTML = "";

    animeData[title].forEach((ep, index) => {

        let btn = document.createElement("div");

        btn.innerHTML = `
        <div class="ep-card">
            <div class="ep-left">
                <div class="ep-number">${index + 1}</div>
            </div>

            <div class="ep-right">
                <div class="ep-title">${ep.name}</div>
                <div class="ep-sub">Tap to watch</div>
            </div>

            <div class="ep-play">▶</div>
        </div>
        `;

        btn.onclick = function(){
            openPlayPopup(ep.name, ep.video, index);
        };

        list.appendChild(btn);
    });
}

function closeAnime(){
    document.getElementById("animeModal").style.display = "none";
}

function openPlayPopup(title, video, index){

    document.getElementById("animeModal").style.display = "none";
    document.getElementById("playModal").style.display = "flex";

    document.getElementById("epTitle").innerText = title;

    currentVideo = video;
    currentEpisodeIndex = index;

    let frame = document.getElementById("videoFrame");
    frame.src = "";
    frame.style.display = "none";

    clearInterval(watchTimer);
}

function playVideoNow(){

    let frame = document.getElementById("videoFrame");

    frame.src = currentVideo;
    frame.style.display = "block";

    startAutoNext();
}

function startAutoNext(){

    clearInterval(watchTimer);

    let time = 0;

    watchTimer = setInterval(() => {

        time++;

        // ⏳ demo timing (20 sec)
        if(autoNextEnabled && time >= 20){

            playNextEpisode();
            time = 0;
        }

    }, 1000);
}

function playNextEpisode(){

    let list = animeData[currentAnimeTitle];
    if(!list) return;

    let nextIndex = currentEpisodeIndex + 1;

    if(nextIndex >= list.length){

        clearInterval(watchTimer);
        alert("🎉 Season Finished pa!");
        return;
    }

    let next = list[nextIndex];

    currentEpisodeIndex = nextIndex;
    currentVideo = next.video;

    document.getElementById("epTitle").innerText = next.name;

    let frame = document.getElementById("videoFrame");

    frame.src = next.video;
    frame.style.display = "block";
}

function closePlay(){

    document.getElementById("playModal").style.display = "none";

    let frame = document.getElementById("videoFrame");
    frame.src = "";

    clearInterval(watchTimer);
}
