/* =========================
   INTRO ANIMATION
========================= */

const intro = document.getElementById("intro");
const discoverBtn = document.getElementById("discoverBtn");
const main = document.getElementById("main");

discoverBtn.addEventListener("click", () => {

    intro.classList.add("hide");

    main.classList.add("active");

    setTimeout(() => {
        intro.style.display = "none";
    }, 1100);

});


/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.12
});

revealElements.forEach((element) => {
    observer.observe(element);
});


/* =========================
   MUSIC PLAYER
========================= */

const audio = document.getElementById("audio");

const playBtn = document.getElementById("playBtn");

const playIcon = playBtn.querySelector("i");

const progressBar = document.getElementById("progressBar");

const progressFill = document.getElementById("progressFill");

const currentTimeText = document.getElementById("currentTime");

const durationText = document.getElementById("duration");


/* Format Time */

function formatTime(time) {

    if (!Number.isFinite(time)) return "0:00";

    const minutes = Math.floor(time / 60);

    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;

}


/* Play / Pause */

playBtn.addEventListener("click", async () => {

    if (audio.paused) {

        try {

            await audio.play();

            playIcon.classList.remove("fa-play");

            playIcon.classList.add("fa-pause");

        } catch (error) {

            console.error("Music could not be played:", error);

        }

    } else {

        audio.pause();

        playIcon.classList.remove("fa-pause");

        playIcon.classList.add("fa-play");

    }

});


/* Update Progress */

audio.addEventListener("timeupdate", () => {

    if (!audio.duration) return;

    const progress = (audio.currentTime / audio.duration) * 100;

    progressFill.style.width = `${progress}%`;

    currentTimeText.textContent = formatTime(audio.currentTime);

});


/* Load Duration */

audio.addEventListener("loadedmetadata", () => {

    durationText.textContent = formatTime(audio.duration);

});


/* Seek Music */

progressBar.addEventListener("click", (event) => {

    if (!audio.duration) return;

    const rect = progressBar.getBoundingClientRect();

    const clickPosition = event.clientX - rect.left;

    const percentage = clickPosition / rect.width;

    audio.currentTime = percentage * audio.duration;

});


/* When Music Ends */

audio.addEventListener("ended", () => {

    playIcon.classList.remove("fa-pause");

    playIcon.classList.add("fa-play");

    progressFill.style.width = "0%";

    currentTimeText.textContent = "0:00";

});