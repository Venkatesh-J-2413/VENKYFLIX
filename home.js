function logout(){
    localStorage.removeItem("loggedIn");
    window.location.href = "index.html";
}

// SLIDER
let slides = document.querySelectorAll(".banner-slide");
let index = 0;

setInterval(() => {
    if(slides.length === 0) return;

    slides[index].classList.remove("active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
}, 3000);

// MENU CLICK
let menuTabs = document.querySelectorAll(".menu span");

menuTabs.forEach(tab => {
    tab.addEventListener("click", function() {
        let active = document.querySelector(".menu .active");
        if(active) active.classList.remove("active");
        this.classList.add("active");
    });
});

/* 🎬 MOVIE IMAGE CLICK (FIXED) */

document.querySelectorAll(".movie-row img").forEach(card => {

    card.addEventListener("click", function() {

        let selectedMovie = this.getAttribute("data-title");

        if(!selectedMovie) return;

        selectedMovie = selectedMovie.trim();

        if(selectedMovie === "Wednesday"){
            openWednesday(this.src);
        }
    });

});

/* 🎬 CURRENT STATE */
/* =========================
   GLOBAL STATE
========================= */

let currentVideo = "";
let currentEpisodeIndex = 0;
let currentAnimeTitle = "";
let currentEpisodeList = [];


/* =========================
   WEDNESDAY DATA (FIXED EP1)
========================= */

let seriesData = {
  "Wednesday": {
    "Season 1": [
      { name: "Episode 1", video: "https://drive.google.com/file/d/1Ujwwo8G21uCkSkQLqEynfRHgsOhb5c9p/preview" },
      { name: "Episode 2 to 8", video: "https://gofile.io/d/M0qiaw" }
    ]
  }
};


/* =========================
   OPEN WEDNESDAY
========================= */

function openWednesday(image){

    document.getElementById("animeModal").style.display = "flex";
    document.getElementById("animeTitle").innerText = "Wednesday";
    document.getElementById("animeImage").src = image;

    currentAnimeTitle = "Wednesday";

    let list = document.getElementById("episodeList");
    list.innerHTML = "";

    let seasons = Object.keys(seriesData["Wednesday"]);

    seasons.forEach(season => {

        let btn = document.createElement("button");
        btn.className = "season-btn";
        btn.innerText = season;

        btn.onclick = function(){

            let existing = document.getElementById("eps_" + season);

            if(existing){
                existing.remove();
                return;
            }

            let div = document.createElement("div");
            div.id = "eps_" + season;

            let episodeList = seriesData["Wednesday"][season];

            episodeList.forEach((ep, index) => {

                let item = document.createElement("div");
                item.className = "ep-card";

                item.innerHTML = `
                    <div class="ep-number">${index + 1}</div>
                    <div class="ep-title">${ep.name}</div>
                    <div class="ep-sub">Tap to watch</div>
                `;

                item.onclick = function(){

                    // 🔥 IMPORTANT FIX (FULL LIST PASS)
                    openPlayPopup(ep.name, ep.video, index, episodeList);

                };

                div.appendChild(item);
            });

            list.appendChild(div);
        };

        list.appendChild(btn);
    });
}

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
  ],
};

// =========================
// 🟣 OPEN ANIME LIST
// =========================
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

// ❌ CLOSE ANIME
function closeAnime(){
    document.getElementById("animeModal").style.display = "none";
}

// =========================
// 🎬 OPEN PLAYER
// =========================
function openPlayPopup(title, video, index, list = []){

    document.getElementById("animeModal").style.display = "none";
    document.getElementById("playModal").style.display = "flex";

    document.getElementById("epTitle").innerText = title;

    currentVideo = video;
    currentEpisodeIndex = index;
    currentEpisodeList = list;

    let frame = document.getElementById("videoFrame");
    frame.src = "";
    frame.style.display = "none";
}

function playVideoNow(){

    if(currentVideo.includes("gofile.io")){

        
        window.location.href = currentVideo;
        return;
    }

    let frame = document.getElementById("videoFrame");

    frame.src = currentVideo;
    frame.style.display = "block";
}

// ▶ PLAY VIDEO

// =========================
// ⏭ PREVIOUS EPISODE FIXED
// =========================

function playPreviousEpisode(){

    let allEpisodes = [];

    if(currentAnimeTitle === "Wednesday"){
        allEpisodes = currentEpisodeList;
    }
    else if(currentAnimeTitle === "Solo Leveling"){
        Object.keys(soloLeveling).forEach(season => {
            soloLeveling[season].forEach(ep => {
                allEpisodes.push({
                    name: ep.title,
                    video: ep.link
                });
            });
        });
    }
    else{
        allEpisodes = animeData[currentAnimeTitle];
    }

    let prevIndex = currentEpisodeIndex - 1;

    if(prevIndex < 0){
        alert("🔥 This is first episode pa!");
        return;
    }

    let prev = allEpisodes[prevIndex];

    currentEpisodeIndex = prevIndex;
    currentVideo = prev.video;

    document.getElementById("epTitle").innerText = prev.name;

    let frame = document.getElementById("videoFrame");
    frame.src = prev.video;
    frame.style.display = "block";
}

// =========================
// ⏭ NEXT EPISODE FIXED
// =========================
function playNextEpisode(){

    let allEpisodes = [];

    if(currentAnimeTitle === "Wednesday"){
        allEpisodes = currentEpisodeList;
    }
    else if(currentAnimeTitle === "Solo Leveling"){
        Object.keys(soloLeveling).forEach(season => {
            soloLeveling[season].forEach(ep => {
                allEpisodes.push({
                    name: ep.title,
                    video: ep.link
                });
            });
        });
    }
    else{
        allEpisodes = animeData[currentAnimeTitle];
    }

    let nextIndex = currentEpisodeIndex + 1;

    if(nextIndex >= allEpisodes.length){
        alert("🎉 Season Finished pa!");
        return;
    }

    let next = allEpisodes[nextIndex];

    currentEpisodeIndex = nextIndex;
    currentVideo = next.video;

    document.getElementById("epTitle").innerText = next.name;

    let frame = document.getElementById("videoFrame");
    frame.src = next.video;
    frame.style.display = "block";
}

// ❌ CLOSE PLAYER
function closePlay(){

    document.getElementById("playModal").style.display = "none";

    let frame = document.getElementById("videoFrame");
    frame.src = "";
}

// =========================
// 🎬 MOVIE SYSTEM (WEDNESDAY FIX)
// =========================
function openMovie(title, text, image, video){

    document.getElementById("movieModal").style.display = "flex";

    document.getElementById("movieTitle").innerText = title;
    document.getElementById("movieText").innerText = text;
    document.getElementById("movieImage").src = image;

    currentVideo = video;
}

// ▶ MOVIE PLAY
function playMovieTrailer(){
    let popup = document.getElementById("videoPopup");
    let frame = document.getElementById("mainVideoFrame");

    popup.style.display = "flex";

    // force clean reset
    frame.src = "";

    setTimeout(() => {

        // 🔥 FIX: always use autoplay + mute + embed safe mode
        frame.src = currentVideo.includes("?")
            ? currentVideo + "&autoplay=1&mute=1"
            : currentVideo + "?autoplay=1&mute=1";

    }, 200);
}

function closeMovie(){
    document.getElementById("movieModal").style.display = "none";
}

// =========================
// 🎥 FIXED BANNER VIDEO POPUP
// =========================

function playVideo(url) {
    let popup = document.getElementById("videoPopup");
    let frame = document.getElementById("mainVideoFrame");

    popup.style.display = "flex";

    frame.src = "";

    setTimeout(() => {
        frame.src = url + "&autoplay=1&mute=1";
    }, 150);
}

function closeVideo() {
    let popup = document.getElementById("videoPopup");
    let frame = document.getElementById("mainVideoFrame");

    popup.style.display = "none";

    // stop video properly
    frame.src = "";
}

const soloLeveling = {

    "Season 1": [

        {
            title:"Episode 1",
            link:"https://drive.google.com/file/d/10zZWh9rQAO9IHCcuDGPKu1TqDlxAoPhF/preview"
        },

        {
            title:"Episode 2",
            link:"https://drive.google.com/file/d/1gM4B-VHkDVun8q-Ja21Ap5Jxd_ik8_hj/preview"
        },

        {
            title:"Episode 3",
            link:"https://drive.google.com/file/d/1bS4qLbT3hWTORG2Go_UnXVgVVDs-naoB/preview"
        },

        {
            title:"Episode 4",
            link:"https://drive.google.com/file/d/1cF9nwlTPVVGmMhNoQbGWq6BZXBrSAI-0/preview"
        },

        {
            title:"Episode 5",
            link:"https://drive.google.com/file/d/1fPmFD9onH4hVmcUGYkrrRa9HNQIY1JH1/preview"
        },

        {
            title:"Episode 6",
            link:"https://drive.google.com/file/d/18zdc1bv0doGxQxWG8FxcYfraKABT3BQC/preview"
        },

        {
            title:"Episode 7",
            link:"https://drive.google.com/file/d/1sXpFGJiK9qV7CsZEOUYDVl9OBuWz1drA/preview"
        },

        {
            title:"Episode 8",
            link:"https://drive.google.com/file/d/1sZer-Wc6WZGDVVBb82KNytOj1d7ig66W/preview"
        },

        {
            title:"Episode 9",
            link:"https://drive.google.com/file/d/1zzyuBjujnOTWA2swxofMVxmnDrLaFYfc/preview"
        },

        {
            title:"Episode 10",
            link:"https://drive.google.com/file/d/1TZMNHnadw0wn_50hZ0hvMV4K7gsX3C74/preview"
        },

        {
            title:"Episode 11",
            link:"https://drive.google.com/file/d/1Xd-aKVtpBC8S651rvKX4Mt-zfCq6A1zR/preview"
        },

        {
            title:"Episode 12",
            link:"https://drive.google.com/file/d/1JEKikBH7HHTjqbMvV6hY5EL55JKGiIVN/preview"
        }

    ],

    "Season 2": [

        {
            title:"Episode 1",
            link:"https://drive.google.com/file/d/13Xvpm1VRG6T_W6-m0AIc9ds7tg70jCMU/preview"
        },

        {
            title:"Episode 2",
            link:"https://drive.google.com/file/d/1fTfKoLf4kfI4vJ6xHZ0jupXWlXJNrK2m/preview"
        },

        {
            title:"Episode 3",
            link:"https://drive.google.com/file/d/1OXaocT9-ngKOB643QWOCWUAxGIfVH-ic/preview"
        },

        {
            title:"Episode 4",
            link:"https://drive.google.com/file/d/1eKawYy9c20aASMuHIrTFTm8ZX4IY4yH3/preview"
        },

        {
            title:"Episode 5",
            link:"https://drive.google.com/file/d/11B56AmtC8tffO6WuSZKjOzRAD6OSmdjG/preview"
        },

        {
            title:"Episode 6",
            link:"https://drive.google.com/file/d/11B56AmtC8tffO6WuSZKjOzRAD6OSmdjG/preview"
        },

        {
            title:"Episode 7",
            link:"https://drive.google.com/file/d/1-WKxVIwcpgX0oyx-EpyUJXy5SOKZxj_Y/preview"
        },

        {
            title:"Episode 8",
            link:"https://drive.google.com/file/d/1XoDIy1WB2dJHgbUC_qPpy2dkSLpYSi30/preview"
        },

        {
            title:"Episode 9",
            link:"https://drive.google.com/file/d/1o_aJus_JVexq2jiI6m3TZuk4Lqvf7ok-/preview"
        },

        {
            title:"Episode 10",
            link:"https://drive.google.com/file/d/1uOog1B-KG4IEyncxAz-h5Q_-wrYTFbQt/preview"
        }

    ]
};

/* 🔥 OPEN SOLO LEVELING */

function openSoloLeveling(){

    currentAnimeTitle = "Solo Leveling";

    document.getElementById("soloModal").style.display = "flex";

    let content = "";

    Object.keys(soloLeveling).forEach(season => {

        content += `

        <button class="season-btn"
        onclick="toggleSeason('${season}')">

            ${season}

        </button>

        <div id="${season}" style="display:none;">
        `;

        soloLeveling[season].forEach((ep,index)=>{

    content += `

    <div class="ep-card"
    onclick="openPlayPopup(
    '${ep.title}',
    '${ep.link}',
    ${index}
    )">

        <div class="ep-left">

            <div class="ep-number">
                ${index + 1}
            </div>

        </div>

        <div class="ep-right">

            <div class="ep-title">
                ${ep.title}
            </div>

            <div class="ep-sub">
                Tap to watch
            </div>

        </div>

        <div class="ep-play">
            ▶
        </div>

    </div>
    `;
});

        content += `</div>`;
    });

    document.getElementById("soloContent").innerHTML = content;

    currentAnimeTitle = "Solo Leveling";
}


/* 🔥 CLOSE */

function closeSoloLeveling(){

    document.getElementById("soloModal").style.display = "none";
}


/* 🔥 TOGGLE */

function toggleSeason(id){

    let season = document.getElementById(id);

    if(season.style.display === "none"){

        season.style.display = "block";
    }

    else{

        season.style.display = "none";
    }
}
