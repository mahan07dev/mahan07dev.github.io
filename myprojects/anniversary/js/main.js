// main.js – Full interactive logic (no localStorage, confetti, exclusive shuffle/repeat, turbo double XP)

// ==================== GLOBAL VARIABLES ====================
let isMusicPlaying = false;
let xpBoostCount = 0;
let totalXP = 875067;
const maxXP = 1000000;
let currentTheme = 0;
let currentSlide = 1;
const totalSlides = 10;

// In‑memory state (replaces localStorage)
let fadedBadgesCount = 0; // number of badges that have been cleared (unblurred)
let vaultUnlocked = false; // vault combination solved?
let futureUnlocked = false; // future message unlocked?
let miniGameFound = false; // used for love badge visibility

const themes = [
    {
        name: "Purple",
        primary: "#8a2be2",
        primaryLight: "#9d4edd",
        secondary: "#ff6b9d",
        accent: "#ffd166",
        dark: "#0f0a1e",
        darkLight: "#1a142d",
        gray: "#2d2442",
        light: "#f5f0ff",
        shadow: "rgba(138,43,226,0.2)",
    },
    {
        name: "Blue",
        primary: "#2b6be2",
        primaryLight: "#4d8eed",
        secondary: "#6bc5ff",
        accent: "#66fffa",
        dark: "#0a0f1e",
        darkLight: "#14203d",
        gray: "#243250",
        light: "#f0f5ff",
        shadow: "rgba(43,107,226,0.2)",
    },
    {
        name: "Green",
        primary: "#2be26b",
        primaryLight: "#4ded8a",
        secondary: "#6bff9d",
        accent: "#d1ff66",
        dark: "#0a1e0f",
        darkLight: "#143d20",
        gray: "#245032",
        light: "#f0fff5",
        shadow: "rgba(43,226,107,0.2)",
    },
    {
        name: "Black",
        primary: "#333333",
        primaryLight: "#555555",
        secondary: "#888888",
        accent: "#cccccc",
        dark: "#000000",
        darkLight: "#111111",
        gray: "#222222",
        light: "#eeeeee",
        shadow: "rgba(51,51,51,0.2)",
    },
    {
        name: "Red",
        primary: "#e22b2b",
        primaryLight: "#ed4d4d",
        secondary: "#ff6b6b",
        accent: "#ff6666",
        dark: "#1e0a0a",
        darkLight: "#3d1414",
        gray: "#502424",
        light: "#fff0f1",
        shadow: "rgba(226,43,43,0.2)",
    },
];

const playlist = [
    {
        title: "Angel",
        artist: "Massive Attack",
        file: "./music/Angel.opus",
        cover: "./music/poster/1.webp",
    },
    {
        title: "Salvatore",
        artist: "Lana Del Rey",
        file: "./music/Salvatore.opus",
        cover: "./music/poster/2.webp",
    },
    {
        title: "Brooklyn Baby",
        artist: "Lana Del Rey",
        file: "./music/Brooklyn Baby.opus",
        cover: "./music/poster/3.webp",
    },
    {
        title: "Ultraviolence",
        artist: "Lana Del Rey",
        file: "./music/Ultraviolence.opus",
        cover: "./music/poster/4.webp",
    },
    {
        title: "I'm A Creep",
        artist: "Radiohead",
        file: "./music/I'm A Creep.opus",
        cover: "./music/poster/5.webp",
    },
    {
        title: "Let The World Burn",
        artist: "Chris Grey",
        file: "./music/Let The World Burn.opus",
        cover: "./music/poster/6.webp",
    },
    {
        title: "Always Been You",
        artist: "Chris Grey",
        file: "./music/Always Been You.opus",
        cover: "./music/poster/7.webp",
    },
    {
        title: "Cold Blooded",
        artist: "Chris Grey",
        file: "./music/Cold Blooded.opus",
        cover: "./music/poster/8.webp",
    },
    {
        title: "Older (sped up)",
        artist: "Isabel Larosa",
        file: "./music/Older (sped up).opus",
        cover: "./music/poster/9.webp",
    },
    {
        title: "American Wedding",
        artist: "Frank Ocean",
        file: "./music/American Wedding.opus",
        cover: "./music/poster/10.webp",
    },
    {
        title: "Love Is A Bitch",
        artist: "Two Feet",
        file: "./music/Love Is A Bitch.opus",
        cover: "./music/poster/11.webp",
    },
    {
        title: "No Pole",
        artist: "Don Toliver",
        file: "./music/No Pole.opus",
        cover: "./music/poster/12.webp",
    },
    {
        title: "Bezanam Naft Dar Biad",
        artist: "Amir Tataloo",
        file: "./music/Beezanam Naft Dar Biad.opus",
        cover: "./music/poster/13.webp",
    },
];
let currentPlaylistIndex = 0;
let playlistAudio = new Audio();
let playlistActive = false;
let playlistPlaying = false;
let shuffleMode = false;
let repeatMode = false;

// SFX
function playSoundEffect(url, loop = false) {
    if (playlistActive && playlistPlaying) return;
    const sfx = new Audio(url);
    sfx.loop = loop;
    sfx.volume = 0.8;
    sfx.play().catch(() => {});
    return sfx;
}

// ==================== INITIALIZATION ====================
document.addEventListener("DOMContentLoaded", function () {
    // No localStorage loading – use global defaults set above
    currentTheme = 0;
    totalXP = 875067;
    xpBoostCount = 0;
    fadedBadgesCount = 0;
    vaultUnlocked = false;
    futureUnlocked = false;
    miniGameFound = false;

    applyTheme(themes[currentTheme]);
    document.getElementById("themeToggle").innerHTML =
        `<i class="fas fa-palette"></i>`;

    initSlideSystem();
    initPlaylist();
    initMobileWarning();
    initAchievements();
    initThemeToggle();
    initFutureMessageCountdown();
    initSurpriseButton();
    initXPBoost();
    initCopyrightAdventure();
    initDraggableElements();
    updateRemainingXP();
    initQuiz();
    initVault();
    initHackSystem();
    initHugButton();
    initTimelineSecret();
    initFullscreenImages();
    initResetStorage();
    initResetBoosts();
    initIconSecret();

    showSlide(1);
});

// ==================== SLIDE SYSTEM ====================
function initSlideSystem() {
    const navDots = document.querySelectorAll(".nav-dot");
    const nextBtn = document.getElementById("nextBtn");

    nextBtn.addEventListener("click", () => {
        if (currentSlide < totalSlides) {
            playSoundEffect("./audio/next.opus");
            showSlide(currentSlide + 1);
        }
    });

    navDots.forEach((dot) => {
        dot.addEventListener("click", function () {
            const num = parseInt(this.getAttribute("data-slide"));
            if (num !== currentSlide) {
                playSoundEffect("./audio/click.opus");
                showSlide(num);
            }
        });
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight" || e.key === " ") {
            if (currentSlide < totalSlides) {
                playSoundEffect("./audio/next.opus");
                showSlide(currentSlide + 1);
                e.preventDefault();
            }
        } else if (e.key === "ArrowLeft") {
            if (currentSlide > 1) {
                playSoundEffect("./audio/click.opus");
                showSlide(currentSlide - 1);
                e.preventDefault();
            }
        }
    });
}

function showSlide(slideNumber) {
    if (
        slideNumber < 1 ||
        slideNumber > totalSlides ||
        slideNumber === currentSlide
    )
        return;
    const currentActive = document.querySelector(".slide.active");
    if (currentActive) {
        currentActive.classList.remove("active");
        currentActive.classList.add("exit");
        setTimeout(() => currentActive.classList.remove("exit"), 500);
    }
    currentSlide = slideNumber;
    setTimeout(() => {
        const activeSlide = document.getElementById(`slide${slideNumber}`);
        if (activeSlide) activeSlide.classList.add("active");
        if (slideNumber === 2 && !window._playlistLoaded) loadPlaylistCovers();
        if (slideNumber === 6) startQuizIfNeeded();
        if (slideNumber === 10) typeSoulmates();
        if (activeSlide) activeSlide.focus();
    }, 50);

    document.querySelectorAll(".nav-dot").forEach((dot) => {
        dot.classList.remove("active");
        dot.removeAttribute("aria-current");
        if (parseInt(dot.getAttribute("data-slide")) === slideNumber) {
            dot.classList.add("active");
            dot.setAttribute("aria-current", "step");
        }
    });

    const nextBtn = document.getElementById("nextBtn");
    if (slideNumber === totalSlides) {
        nextBtn.disabled = true;
        nextBtn.innerHTML = 'The End <i class="fas fa-heart"></i>';
    } else {
        nextBtn.disabled = false;
        nextBtn.innerHTML = 'Next <i class="fas fa-arrow-right"></i>';
    }

    if (slideNumber === 4) setTimeout(animateXPProgress, 300);
    setTimeout(() => {
        const activeSlide = document.getElementById(`slide${slideNumber}`);
        if (activeSlide) activeSlide.scrollTop = 0;
    }, 100);

    const bar = document.getElementById("nowPlayingBar");
    bar.style.display = slideNumber === 2 ? "flex" : "none";
    const topProgress = document.getElementById("playlistTopProgress");
    if (topProgress)
        topProgress.style.display = slideNumber === 2 ? "block" : "none";
}

function loadPlaylistCovers() {
    window._playlistLoaded = true;
    const cards = document.querySelectorAll(".playlist-card-img");
    cards.forEach((div, index) => {
        const song = playlist[index];
        if (song.cover) {
            const img = new Image();
            img.src = song.cover;
            img.onload = () => {
                div.style.backgroundImage = `url(${song.cover})`;
                div.innerHTML = "";
            };
            img.onerror = () => {};
        }
    });
}

// ==================== PLAYLIST SYSTEM ====================
function initPlaylist() {
    const grid = document.getElementById("playlistGrid");
    const nowPlayingImage = document.getElementById("nowPlayingImage");
    const nowPlayingTitle = document.getElementById("nowPlayingTitle");
    const nowPlayingArtist = document.getElementById("nowPlayingArtist");
    const npPlayBtn = document.getElementById("npPlayBtn");
    const npPrevBtn = document.getElementById("npPrevBtn");
    const npNextBtn = document.getElementById("npNextBtn");
    const npProgressBar = document.getElementById("npProgressBar");
    const npProgressFill = document.getElementById("npProgressFill");
    const musicToggleBtn = document.getElementById("musicToggleBtn");
    const musicBtnOverlay = document.getElementById("musicBtnOverlay");
    const shuffleBtn = document.getElementById("npShuffleBtn");
    const repeatBtn = document.getElementById("npRepeatBtn");
    const topProgressFill = document.getElementById("playlistTopProgressFill");

    let isSeeking = false;

    playlist.forEach((song, index) => {
        const card = document.createElement("div");
        card.className = "playlist-card";
        card.dataset.index = index;
        card.innerHTML = `
            <div class="playlist-card-img"><i class="fas fa-music"></i></div>
            <div class="playlist-card-body">
                <div class="playlist-card-title">${song.title}</div>
                <div class="playlist-card-artist">${song.artist}</div>
            </div>
        `;
        card.addEventListener("click", () => selectAndPlaySong(index));
        grid.appendChild(card);
    });

    function updateNowPlayingUI() {
        const song = playlist[currentPlaylistIndex];
        nowPlayingTitle.textContent = song.title;
        nowPlayingArtist.textContent = song.artist;
        if (song.cover) {
            nowPlayingImage.innerHTML = `<img src="${song.cover}" alt="${song.title}" />`;
            musicBtnOverlay.style.backgroundImage = `url(${song.cover})`;
        } else {
            nowPlayingImage.innerHTML = '<i class="fas fa-music"></i>';
            musicBtnOverlay.style.backgroundImage = "";
        }
        document
            .querySelectorAll(".playlist-card")
            .forEach((c) => c.classList.remove("active-song"));
        const activeCard = document.querySelector(
            `.playlist-card[data-index="${currentPlaylistIndex}"]`,
        );
        if (activeCard) activeCard.classList.add("active-song");
        updatePlayPauseIcon();
    }

    function updatePlayPauseIcon() {
        npPlayBtn.innerHTML = playlistPlaying
            ? '<i class="fas fa-pause"></i>'
            : '<i class="fas fa-play"></i>';
        updateMusicButtonState();
    }

    function updateMusicButtonState() {
        if (playlistActive && playlistPlaying) {
            musicToggleBtn.classList.add("playing");
            musicToggleBtn.classList.remove("muted");
        } else if (playlistActive && !playlistPlaying) {
            musicToggleBtn.classList.remove("playing");
            musicToggleBtn.classList.add("muted");
        } else {
            musicToggleBtn.classList.remove("playing");
            musicToggleBtn.classList.add("muted");
        }
        playSoundEffect("./audio/DJ.opus");
    }

    function selectAndPlaySong(index) {
        currentPlaylistIndex = index;
        playlistActive = true;
        playlistPlaying = true;
        playlistAudio.src = playlist[index].file;
        playlistAudio
            .play()
            .then(() => updateNowPlayingUI())
            .catch(() => {});
        updateNowPlayingUI();
    }

    function playNext() {
        if (shuffleMode) {
            let nextIndex = Math.floor(Math.random() * playlist.length);
            currentPlaylistIndex = nextIndex;
        } else if (repeatMode) {
            // repeat the same
        } else {
            currentPlaylistIndex = (currentPlaylistIndex + 1) % playlist.length;
        }
        playlistAudio.src = playlist[currentPlaylistIndex].file;
        playlistAudio.play();
        playlistPlaying = true;
        updateNowPlayingUI();
    }

    function playPrev() {
        if (shuffleMode) {
            let prevIndex = Math.floor(Math.random() * playlist.length);
            currentPlaylistIndex = prevIndex;
        } else {
            currentPlaylistIndex =
                (currentPlaylistIndex - 1 + playlist.length) % playlist.length;
        }
        playlistAudio.src = playlist[currentPlaylistIndex].file;
        playlistAudio.play();
        playlistPlaying = true;
        updateNowPlayingUI();
    }

    npPlayBtn.addEventListener("click", () => {
        if (!playlistActive) return;
        if (playlistPlaying) {
            playlistAudio.pause();
        } else {
            playlistAudio.play().catch(() => {});
        }
    });

    npPrevBtn.addEventListener("click", playPrev);
    npNextBtn.addEventListener("click", playNext);

    playlistAudio.addEventListener("play", () => {
        playlistPlaying = true;
        updatePlayPauseIcon();
    });
    playlistAudio.addEventListener("pause", () => {
        playlistPlaying = false;
        updatePlayPauseIcon();
    });
    playlistAudio.addEventListener("ended", () => {
        if (repeatMode) {
            playlistAudio.currentTime = 0;
            playlistAudio.play();
        } else {
            playNext();
        }
    });

    playlistAudio.addEventListener("timeupdate", () => {
        if (!isSeeking && playlistAudio.duration) {
            const progress =
                (playlistAudio.currentTime / playlistAudio.duration) * 100;
            npProgressFill.style.width = `${progress}%`;
            if (topProgressFill) topProgressFill.style.width = `${progress}%`;
        }
    });

    function seekTo(e) {
        const rect = npProgressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const percent = Math.min(Math.max(clickX / width, 0), 1);
        if (playlistAudio.duration) {
            playlistAudio.currentTime = percent * playlistAudio.duration;
            npProgressFill.style.width = `${percent * 100}%`;
        }
    }

    npProgressBar.addEventListener("mousedown", (e) => {
        isSeeking = true;
        seekTo(e);
        document.addEventListener("mousemove", onSeekMove);
        document.addEventListener("mouseup", onSeekEnd);
    });

    function onSeekMove(e) {
        if (isSeeking) seekTo(e);
    }
    function onSeekEnd() {
        isSeeking = false;
        document.removeEventListener("mousemove", onSeekMove);
        document.removeEventListener("mouseup", onSeekEnd);
    }

    // Shuffle & Repeat – mutually exclusive
    shuffleBtn.addEventListener("click", () => {
        shuffleMode = !shuffleMode;
        if (shuffleMode && repeatMode) {
            repeatMode = false;
            repeatBtn.classList.remove("repeat-active");
        }
        shuffleBtn.classList.toggle("shuffle-active", shuffleMode);
    });
    repeatBtn.addEventListener("click", () => {
        repeatMode = !repeatMode;
        if (repeatMode && shuffleMode) {
            shuffleMode = false;
            shuffleBtn.classList.remove("shuffle-active");
        }
        repeatBtn.classList.toggle("repeat-active", repeatMode);
    });

    musicToggleBtn.addEventListener("click", () => {
        if (!playlistActive) return;
        if (playlistPlaying) playlistAudio.pause();
        else playlistAudio.play();
    });

    makeNowPlayingDraggable();
    updateMusicButtonState();
}

function makeNowPlayingDraggable() {
    const bar = document.getElementById("nowPlayingBar");
    const handle = document.getElementById("nowPlayingImage");
    let isDragging = false,
        startX,
        startY,
        initialLeft,
        initialTop;

    handle.addEventListener("mousedown", (e) => {
        e.preventDefault();
        isDragging = true;
        const rect = bar.getBoundingClientRect();
        initialLeft = rect.left;
        initialTop = rect.top;
        startX = e.clientX;
        startY = e.clientY;
        bar.style.transition = "none";
        bar.style.cursor = "grabbing";
    });

    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        let newLeft = initialLeft + dx;
        let newTop = initialTop + dy;
        const barWidth = bar.offsetWidth;
        const barHeight = bar.offsetHeight;
        newLeft = Math.max(0, Math.min(newLeft, window.innerWidth - barWidth));
        newTop = Math.max(0, Math.min(newTop, window.innerHeight - barHeight));
        bar.style.left = newLeft + "px";
        bar.style.top = newTop + "px";
        bar.style.bottom = "unset";
        bar.style.transform = "none";
    });

    document.addEventListener("mouseup", () => {
        if (isDragging) {
            isDragging = false;
            bar.style.cursor = "";
        }
    });
}

// ==================== MOBILE WARNING ====================
function initMobileWarning() {
    const modal = document.getElementById("mobileWarningModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalMessage = document.getElementById("modalMessage");
    const idgafBtn = document.getElementById("idgafBtn");
    const okBtn = document.getElementById("okBtn");
    const buttonsDiv = document.getElementById("modalButtons");
    const buttonsExtra = document.getElementById("modalButtonsExtra");
    const buttonsFinal = document.getElementById("modalButtonsFinal");
    const idgafBtn2 = document.getElementById("idgafBtn2");
    const foffBtn = document.getElementById("foffBtn");
    const finalPassBtn = document.getElementById("finalPassBtn");
    const finalFoffBtn = document.getElementById("finalFoffBtn");

    if (window.innerWidth <= 768) modal.classList.add("active");

    let step = 0;
    idgafBtn.addEventListener("click", () => {
        step++;
        if (step === 1) {
            modalMessage.textContent =
                "Really? You sure? This experience is optimized for larger screens...";
            idgafBtn.style.display = "none";
            buttonsExtra.style.display = "flex";
        }
    });

    idgafBtn2.addEventListener("click", () => {
        step++;
        modalMessage.textContent =
            "Last chance... The animations won't look as cool!";
        buttonsExtra.style.display = "none";
        buttonsFinal.style.display = "flex";
    });

    foffBtn.addEventListener("click", () => {
        modalMessage.textContent =
            "Okay, fine. You are stubborn. Proceed at your own risk.";
        buttonsExtra.style.display = "none";
        buttonsFinal.style.display = "flex";
    });

    finalPassBtn.addEventListener("click", () =>
        modal.classList.remove("active"),
    );
    finalFoffBtn.addEventListener("click", () =>
        window.open("", "_self").close(),
    );
    okBtn.addEventListener("click", () => window.open("", "_self").close());
}

// ==================== ACHIEVEMENTS ====================
const achievements = [
    { id: 1, title: "First Message", icon: "fa-comment", achieved: true },
    { id: 2, title: "First Heart Emoji", icon: "fa-heart", achieved: true },
    { id: 3, title: "NUM", icon: "fa-square-phone", achieved: true },
    { id: 4, title: "Shared Faces", icon: "fa-images", achieved: true },
    { id: 5, title: "Voice Call", icon: "fa-phone", achieved: true },
    { id: 6, title: "Video Call", icon: "fa-video", achieved: true },
    { id: 7, title: "Freaky", icon: "fa-grin-tongue-wink", achieved: true },
    { id: 8, title: "Strong Bond", icon: "fa-link", achieved: true },
    { id: 9, title: "Interlink", icon: "fa-infinity", achieved: true },
    { id: 10, title: "+1 Hour Texting", icon: "fa-clock", achieved: true },
    {
        id: 11,
        title: "Thighs Pic",
        icon: "fa-face-sad-cry",
        achieved: true,
    },
    {
        id: 12,
        title: "Anniversary",
        icon: "fa-calendar-alt",
        achieved: true,
    },
    { id: 13, title: "Birthday", icon: "fa-birthday-cake", achieved: true },
    {
        id: 14,
        title: "Shared Secrets",
        icon: "fa-user-secret",
        achieved: true,
    },
    { id: 15, title: "Mummy", icon: "fa-face-grin-tongue", achieved: true },
    { id: 16, title: "+1 Year", icon: "fa-calendar-days", achieved: true },
    {
        id: 17,
        title: "💖love💖",
        icon: "fa-heartbeat",
        achieved: false,
        lockedByDefault: true,
        secretDescription:
            "first find our mini-game story n then u can see this badge",
    },
    {
        id: 18,
        title: "+50 Years",
        icon: "fa-calendar-days",
        achieved: false,
    },
    { id: 19, title: "Kidnap", icon: "fa-face-meh", achieved: false },
    {
        id: 20,
        title: "***ing ***",
        icon: "fa-face-grin-tongue-squint",
        achieved: false,
    },
    {
        id: 21,
        title: "****ing",
        icon: "fa-kiss-wink-heart",
        achieved: false,
    },
    { id: 22, title: "Hidden Badge #1", icon: "fa-eye", achieved: false },
    {
        id: 23,
        title: "Hidden Badge #2",
        icon: "fa-utensils",
        achieved: false,
    },
    { id: 24, title: "Hidden Badge #4", icon: "fa-baby", achieved: false },
    { id: 25, title: "Hidden Badge #5", icon: "fa-baby", achieved: false },
];
function initAchievements() {
    const grid = document.getElementById("achievements-grid");
    grid.innerHTML = "";
    achievements.forEach((a, i) => {
        const badge = document.createElement("div");
        badge.className = `badge ${a.achieved ? "achieved" : "locked"}`;
        badge.dataset.id = a.id;
        if (a.achieved && i < fadedBadgesCount) badge.classList.add("faded");
        badge.innerHTML = `
            <div class="badge-icon"><i class="fas ${a.icon}"></i></div>
            <div class="badge-title">${a.title}</div>
            <div class="badge-status">${a.achieved ? "ACHIEVED" : "LOCKED"}</div>
            ${!a.achieved ? '<div class="lock-overlay"><i class="fas fa-lock"></i></div>' : ""}
        `;
        if (a.id === 17) {
            badge.id = "lovebadge";
            badge.querySelector(".badge-title").textContent =
                a.secretDescription;
        }
        grid.appendChild(badge);
    });
    initDraggableElements();
}

// ==================== THEME TOGGLE ====================
function initThemeToggle() {
    const btn = document.getElementById("themeToggle");
    const iconClasses = [
        "fa-palette",
        "fa-droplet",
        "fa-leaf",
        "fa-moon",
        "fa-fire",
    ];
    let rotationAngle = 0;

    // ensure the button has an <i> element (it already has one from HTML, but just in case)
    let icon = btn.querySelector("i");
    if (!icon) {
        icon = document.createElement("i");
        btn.appendChild(icon);
    }
    icon.className = "fas " + iconClasses[currentTheme];
    icon.style.transition = "transform 0.4s ease";

    btn.addEventListener("click", () => {
        playSoundEffect("./audio/space3.opus");
        currentTheme = (currentTheme + 1) % themes.length;
        applyTheme(themes[currentTheme]);

        // update icon class only
        icon.className = "fas " + iconClasses[currentTheme];

        rotationAngle += 90;
        icon.style.transform = `rotate(${rotationAngle}deg)`;
    });
}

function applyTheme(theme) {
    const root = document.documentElement.style;
    root.setProperty("--theme-primary", theme.primary);
    root.setProperty("--theme-primary-light", theme.primaryLight);
    root.setProperty("--theme-secondary", theme.secondary);
    root.setProperty("--theme-accent", theme.accent);
    root.setProperty("--theme-dark", theme.dark);
    root.setProperty("--theme-dark-light", theme.darkLight);
    root.setProperty("--theme-gray", theme.gray);
    root.setProperty("--theme-light", theme.light);
    root.setProperty("--theme-shadow", theme.shadow);
    root.setProperty("--scrollbar-track", theme.darkLight);
    root.setProperty("--scrollbar-thumb", theme.primary);
    root.setProperty("--scrollbar-thumb-hover", theme.primaryLight);
}

// ==================== FUTURE MESSAGE ====================
const unlockDate = new Date("2032-05-14");
function initFutureMessageCountdown() {
    function update() {
        const msg = document.getElementById("futureMessage");
        const now = new Date();
        if (now >= unlockDate || futureUnlocked) {
            msg.classList.remove("locked");
            msg.classList.add("unlocked");
            msg.innerHTML = `<h3>Future Message Unlocked!</h3><p>🤏🏼🥹U r the sweetest bbg, even in 2032🥹🤏🏼</p><div class="unlock-date">Unlocked on ${unlockDate.toDateString()}</div>`;
            return;
        }
        const diff = unlockDate - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
            (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        document.getElementById("unlockCountdown").textContent =
            `${days} days, ${hours} hours, ${minutes} minutes`;
        document.getElementById("futureT").textContent =
            `This message will unlock on ${unlockDate.toDateString()}`;
    }
    update();
    setInterval(update, 60000);
}

// ==================== SURPRISE BUTTON (with confetti) ====================
let rubClickCount = 0;
let rubTimer = null;

function initSurpriseButton() {
    document.getElementById("surprise-btn").addEventListener("click", () => {
        playSoundEffect("./audio/surprise.opus");
        createConfetti(); // confetti burst on every click
        rubClickCount++;
        if (rubClickCount >= 5) {
            createHeartRain();
            rubClickCount = 0;
        }
        clearTimeout(rubTimer);
        rubTimer = setTimeout(() => {
            rubClickCount = 0;
        }, 1000);

        const messages = [
            "My good girlllll🥹🥹😝",
            "🤏🏼🤏🏼🤏🏼",
            "2win forever!🥹",
            "Mommy😝",
            "😝😝Senorita😝😝",
            "😭😭🫵🏼🫵🏼🤏🏼🤏🏼",
            "Who's my Mamacita😝",
            "🥹🥹Liloest🥹🥹",
            "Woof on ur fatty cheek🥹",
            "Woof on ur ahh😝",
            "One n only twin🥹",
            "bbgchika",
            "Slurp",
            "Slurpppppppp",
            "🥹Tiny🥹",
            "Good Girlllllll",
        ];
        const msg = messages[Math.floor(Math.random() * messages.length)];
        const el = document.createElement("div");
        el.textContent = msg;
        Object.assign(el.style, {
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            backgroundColor: "var(--theme-primary)",
            color: "white",
            padding: "20px 30px",
            borderRadius: "50px",
            fontWeight: "bold",
            fontSize: "20px",
            zIndex: "10000",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
            animation: "floatUp 2s forwards",
        });
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 2000);
    });

    const style = document.createElement("style");
    style.textContent = `
        @keyframes floatUp {
            0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
            20% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
            80% { opacity: 1; transform: translate(-50%, -150%) scale(1); }
            100% { opacity: 0; transform: translate(-50%, -200%) scale(0.8); }
        }
    `;
    document.head.appendChild(style);
}

function createConfetti() {
    const colors = [
        "var(--theme-primary)",
        "var(--theme-secondary)",
        "var(--theme-accent)",
        "var(--theme-primary-light)",
    ];
    for (let i = 0; i < 150; i++) {
        const confetti = document.createElement("div");
        confetti.style.position = "fixed";
        confetti.style.width = "10px";
        confetti.style.height = "10px";
        confetti.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = "50%";
        confetti.style.top = "0";
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.zIndex = "9999";
        confetti.style.pointerEvents = "none";
        document.body.appendChild(confetti);
        confetti.animate(
            [
                { transform: "translateY(0) rotate(0deg)", opacity: 1 },
                {
                    transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`,
                    opacity: 0,
                },
            ],
            {
                duration: Math.random() * 2000 + 1000,
                easing: "cubic-bezier(0.215,0.610,0.355,1)",
            },
        ).onfinish = () => confetti.remove();
    }
}

function createHeartRain() {
    for (let i = 0; i < 100; i++) {
        const heart = document.createElement("div");
        heart.innerHTML = "❤️";
        heart.style.position = "fixed";
        heart.style.top = "-20px";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.fontSize = Math.random() * 30 + 20 + "px";
        heart.style.zIndex = "9999";
        heart.style.animation = `heartFall ${Math.random() * 2 + 2}s linear forwards`;
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 5000);
    }
    const style = document.createElement("style");
    style.textContent = `
        @keyframes heartFall { to { transform: translateY(110vh); opacity:0; } }
        @keyframes confettiFall {
            0% { opacity: 1; transform: translateY(0) rotate(0deg); }
            100% { opacity: 0; transform: translateY(100vh) rotate(720deg); }
        }
    `;
    document.head.appendChild(style);
    setTimeout(() => style.remove(), 5000);
}

// ==================== XP BOOST ====================
function updateRemainingXP() {
    const span = document.getElementById("remainingXP");
    if (span) span.textContent = (maxXP - totalXP).toLocaleString();
}

let turboActive = false;
let turboCooldown = false;
let turboPressTimer = null;
let turboCdTimer = null;
let repeat = 0;

function initXPBoost() {
    const btn = document.getElementById("xpBoostBtn");
    const countEl = document.getElementById("xpBoostCount");
    const xpEl = document.getElementById("currentXP");
    const turboInd = document.getElementById("turboIndicator");
    const turboCd = document.getElementById("turboCooldown");
    const turboCdSpan = document.getElementById("turboCdTimer");

    btn.addEventListener("mousedown", () => {
        if (turboCooldown) return;
        turboPressTimer = setTimeout(() => {
            if (!turboCooldown) {
                repeat = 0;
                turboActive = true;
                turboInd.style.display = "block";
                turboPressTimer = null;
            }
        }, 5000);
    });
    btn.addEventListener("mouseup", () => {
        if (turboPressTimer) clearTimeout(turboPressTimer);
    });
    btn.addEventListener("mouseleave", () => {
        if (turboPressTimer) clearTimeout(turboPressTimer);
    });

    btn.addEventListener("click", () => {
        playSoundEffect("./audio/boost.opus");
        const badges = document.querySelectorAll(".badge");
        const faded = document.querySelectorAll(".badge.faded");
        if (faded.length >= badges.length) {
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-check-circle"></i> All Clear!';
            return;
        }
        const increment = turboActive ? 500 : 100;
        if (turboActive) {
            xpBoostCount += 5;
        } else {
            xpBoostCount++;
        }
        if (turboActive && repeat == 0) {
            repeat++;
            turboInd.style.display = "none";
            turboCooldown = true;
            turboCd.style.display = "block";
            let cd = 10;
            turboCdSpan.textContent = cd;
            turboCdTimer = setInterval(() => {
                cd--;
                turboCdSpan.textContent = cd;
                if (cd <= 0) {
                    turboActive = false;
                    clearInterval(turboCdTimer);
                    turboCooldown = false;
                    turboCd.style.display = "none";
                }
            }, 1000);
        }
        totalXP += increment;
        document.getElementById("xpBoostCount").textContent = xpBoostCount;
        xpEl.textContent = totalXP.toLocaleString();
        updateRemainingXP();
        const percent = (totalXP / maxXP) * 100;
        const fill = document.getElementById("xp-progress");
        fill.style.width = `${percent}%`;
        fill.querySelector(".progress-text").textContent =
            `${percent.toFixed(2)}%`;

        createXpBoostEffect();

        // Replace the original if-block with this loop
        while (
            fadedBadgesCount < badges.length &&
            xpBoostCount >= (fadedBadgesCount + 1) * 5
        ) {
            fadedBadgesCount++;
            badges[fadedBadgesCount - 1].classList.add("faded");
            initDraggableElements();
            showNotification(`Achievement ${fadedBadgesCount} cleared!`);

            if (fadedBadgesCount === badges.length) {
                playSoundEffect("./audio/maxunblur.opus");
            }
        }
    });
}

function createXpBoostEffect() {
    const effect = document.createElement("div");
    effect.className = "xp-boost-effect";
    effect.style.setProperty("--tx", `${(Math.random() - 0.5) * 100}px`);
    effect.style.setProperty("--ty", `${(Math.random() - 0.5) * 100}px`);
    const btnRect = document
        .getElementById("xpBoostBtn")
        .getBoundingClientRect();
    effect.style.left = `${btnRect.left + btnRect.width / 2}px`;
    effect.style.top = `${btnRect.top + btnRect.height / 2}px`;
    document.body.appendChild(effect);
    setTimeout(() => effect.remove(), 1000);
}

function animateXPProgress() {
    const fill = document.getElementById("xp-progress");
    if (!fill) return;
    fill.style.width = `${(totalXP / maxXP) * 100}%`;
    document.querySelector(".current-xp").textContent =
        totalXP.toLocaleString();
}

// ==================== RESET BOOSTS ====================
function initResetBoosts() {
    const resetBtn = document.getElementById("resetBoostsBtn");
    const confirmDiv = document.getElementById("resetConfirm");
    const confirmBtn = document.getElementById("confirmResetBtn");
    const cancelBtn = document.getElementById("cancelResetBtn");

    resetBtn.addEventListener("click", () => {
        confirmDiv.style.display = "block";
    });

    cancelBtn.addEventListener("click", () => {
        confirmDiv.style.display = "none";
    });

    confirmBtn.addEventListener("click", () => {
        // 1. Reset XP variables
        totalXP = 875067;
        xpBoostCount = 0;
        fadedBadgesCount = 0;

        // 2. Remove all faded classes from badges
        document
            .querySelectorAll(".badge.faded")
            .forEach((b) => b.classList.remove("faded"));

        // 3. Restore the boost button to its original state
        const boostBtn = document.getElementById("xpBoostBtn");
        boostBtn.disabled = false;
        boostBtn.innerHTML =
            '<i class="fas fa-bolt"></i> Boost XP <span class="xp-boost-count" id="xpBoostCount">0</span>';

        // 4. Update XP display
        document.getElementById("currentXP").textContent =
            totalXP.toLocaleString();

        // 5. Reset turbo state
        if (typeof turboCooldown !== "undefined") turboCooldown = false;
        if (typeof turboActive !== "undefined") turboActive = false;
        if (typeof turboCdTimer !== "undefined") {
            clearInterval(turboCdTimer);
            turboCdTimer = null;
        }
        const turboInd = document.getElementById("turboIndicator");
        const turboCd = document.getElementById("turboCooldown");
        if (turboInd) turboInd.style.display = "none";
        if (turboCd) turboCd.style.display = "none";

        // 6. Refresh progress bar and draggable elements
        updateRemainingXP();
        animateXPProgress();
        initDraggableElements();

        // 7. Hide confirmation dialog
        confirmDiv.style.display = "none";
    });
}

// ==================== COPYRIGHT ADVENTURE ====================
function initCopyrightAdventure() {
    const copyright = document.getElementById("copyright");
    const popup = document.getElementById("adventurePopup");
    const closeBtn = document.getElementById("adventureClose");
    const body = document.getElementById("adventureBody");
    const choicesDiv = document.getElementById("adventureChoices");
    let clickCount = 0;
    copyright.addEventListener("click", () => {
        clickCount++;
        if (clickCount === 1)
            copyright.innerHTML = "Y? Y did u click on ts shi ??? 🤏🏼";
        else if (clickCount === 2) copyright.innerHTML = "🤨🤨🤨";
        else if (clickCount === 3) copyright.innerHTML = "Ok fine";
        else if (clickCount >= 4) startAdventure();
    });
    closeBtn.addEventListener("click", () => (popup.style.display = "none"));

    function startAdventure() {
        miniGameFound = true;

        let badge = document.getElementById("lovebadge");
        achievements.forEach((a, i) => {
            if (a.id === 17) {
                if (!miniGameFound) {
                    badge.className = `badge ${a.achieved ? "achieved" : "locked"}`;
                    if (a.achieved && i < fadedBadgesCount)
                        badge.classList.add("faded");
                    badge.innerHTML = `
            <div class="badge-icon"><i class="fas ${a.icon}"></i></div>
            <div class="badge-title">${a.secretDescription}</div>
            <div class="badge-status">${a.achieved ? "ACHIEVED" : "LOCKED"}</div>
            ${!a.achieved ? '<div class="lock-overlay"><i class="fas fa-lock"></i></div>' : ""}
        `;
                } else {
                    a.lockedByDefault = false;
                    a.achieved = "achieved";
                    badge.className = `badge ${a.achieved ? "achieved" : "locked"}`;
                    if (a.achieved && i < fadedBadgesCount)
                        badge.classList.add("faded");
                    badge.innerHTML = `
            <div class="badge-icon"><i class="fas ${a.icon}"></i></div>
            <div class="badge-title">${a.title}</div>
            <div class="badge-status">${a.achieved ? "ACHIEVED" : "LOCKED"}</div>
            ${!a.achieved ? '<div class="lock-overlay"><i class="fas fa-lock"></i></div>' : ""}
            `;
                }
            }
            initDraggableElements();
        });
        popup.style.display = "flex";
        body.innerHTML = `<div class="ascii-art">
  ❤️❤️❤️   ❤️❤️❤️
 ❤️     ❤️ ❤️     ❤️
 ❤️        ❤️        ❤️
  ❤️               ❤️
    ❤️           ❤️
      ❤️       ❤️
        ❤️   ❤️
          ❤️</div><p>U finally found our mini-game🥹🤏🏼!<br>What dy wanna do?</p>`;
        choicesDiv.innerHTML = `
            <button class="adventure-choice-btn" data-action="kiss">Give a kiss 💋</button>
            <button class="adventure-choice-btn" data-action="hug">Warm hug 🫂</button>
            <button class="adventure-choice-btn" data-action="secret">Whisper 🤫</button>
        `;
        document.querySelectorAll(".adventure-choice-btn").forEach((btn) => {
            btn.addEventListener("click", function () {
                handleAdventureChoice(this.dataset.action);
            });
        });
    }

    function handleAdventureChoice(action) {
        if (action === "kiss") {
            body.innerHTML = `<p>U lean in and give a soft kiss on my cheek😝<br>Suddenly the south pole gets hotter <b><i>wink</i></b></p>`;
            choicesDiv.innerHTML = `<button class="adventure-choice-btn" data-action="dance">Bite my cheek 🦷</button>
                                    <button class="adventure-choice-btn" data-action="close">Enough for now ✨</button>`;
        } else if (action === "hug") {
            body.innerHTML = `<p>A warm, tight hug that lasts 4ever🥹<br>U feel smth bothering u down there.</p>`;
            choicesDiv.innerHTML = `<button class="adventure-choice-btn" data-action="pic">Take a selfie with it 📸</button>
                                    <button class="adventure-choice-btn" data-action="close">Blush and run away 🙈</button>`;
        } else if (action === "secret") {
            body.innerHTML = `<p>- "F me daddy" <b><i>whispered</i></b><br>- "What did u say?"</p>`;
            choicesDiv.innerHTML = `<button class="adventure-choice-btn" data-action="laugh">Welllll I saiddd....</button>
                                    <button class="adventure-choice-btn" data-action="close">Nothin bai ✌🏼</button>`;
        } else if (
            action === "dance" ||
            action === "pic" ||
            action === "laugh"
        ) {
            body.innerHTML = `<p>A russian atomic bomb ruined everythin n our love story ends here😔✌️</p>`;
            choicesDiv.innerHTML = `<button class="adventure-choice-btn" data-action="close">The End 💕</button>`;
        } else if (action === "close") {
            popup.style.display = "none";
        }
        document.querySelectorAll(".adventure-choice-btn").forEach((btn) => {
            btn.addEventListener("click", function () {
                handleAdventureChoice(this.dataset.action);
            });
        });
    }
}

// ==================== DRAGGABLE ELEMENTS ====================
function initDraggableElements() {
    document
        .querySelectorAll(".timeline-content:not(.future-card)")
        .forEach((card) => {
            if (!card.hasAttribute("data-draggable")) {
                makeDraggable(card);
                card.setAttribute("data-draggable", "true");
            }
        });
    document.querySelectorAll(".badge.achieved.faded").forEach((badge) => {
        if (!badge.hasAttribute("data-draggable")) {
            makeDraggable(badge);
            badge.setAttribute("data-draggable", "true");
        }
    });
}

function makeDraggable(element) {
    let isDragging = false,
        startX,
        startY;
    element.addEventListener("mousedown", (e) => {
        if (e.button !== 0) return;
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        element.style.position = "relative";
        element.style.zIndex = "9999";
        element.style.cursor = "grabbing";
        element.classList.add("dragging");
        e.preventDefault();
    });
    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        element.style.left = `${e.clientX - startX}px`;
        element.style.top = `${e.clientY - startY}px`;
    });
    document.addEventListener("mouseup", () => {
        if (!isDragging) return;
        isDragging = false;
        element.style.cursor = "grab";
        element.classList.remove("dragging");
        element.style.transition = "all 0.4s cubic-bezier(0.34,1.56,0.64,1)";
        element.style.left = "0";
        element.style.top = "0";
        setTimeout(() => {
            element.style.transition = "";
            element.style.position = "";
            element.style.zIndex = "";
        }, 400);
    });
}

// ==================== TIMELINE ANNIVERSARY SECRET ====================
function initTimelineSecret() {
    const card = document.querySelector(
        "#anniversaryTimelineCard .timeline-content",
    );
    let originalHTML = card.innerHTML;

    card.addEventListener("mousedown", (e) => {
        if (e.target.tagName === "IMG") return;
        card.querySelector("h3").textContent = "Bruh leave me";
    });

    card.addEventListener("mouseup", () => {
        if (card.querySelector("h3").textContent === "Bruh leave me") {
            card.querySelector("h3").textContent = "1 Year Anniversary";
        }
    });
}

// ==================== FULLSCREEN IMAGES ====================
function initFullscreenImages() {
    const overlay = document.getElementById("fullscreenOverlay");
    const img = document.getElementById("fullscreenImg");
    const closeBtn = document.getElementById("fullscreenClose");

    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("timeline-img")) {
            img.src = e.target.src;
            overlay.style.display = "flex";
        }
    });
    closeBtn.addEventListener("click", () => (overlay.style.display = "none"));
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) overlay.style.display = "none";
    });
}

// ==================== VAULT ====================
function initVault() {
    const dials = [
        {
            up: document.querySelector('.vault-dial[data-dial="0"] .dial-up'),
            down: document.querySelector(
                '.vault-dial[data-dial="0"] .dial-down',
            ),
            display: document.querySelector(
                '.vault-dial[data-dial="0"] .dial-display',
            ),
        },
        {
            up: document.querySelector('.vault-dial[data-dial="1"] .dial-up'),
            down: document.querySelector(
                '.vault-dial[data-dial="1"] .dial-down',
            ),
            display: document.querySelector(
                '.vault-dial[data-dial="1"] .dial-display',
            ),
        },
        {
            up: document.querySelector('.vault-dial[data-dial="2"] .dial-up'),
            down: document.querySelector(
                '.vault-dial[data-dial="2"] .dial-down',
            ),
            display: document.querySelector(
                '.vault-dial[data-dial="2"] .dial-display',
            ),
        },
        {
            up: document.querySelector('.vault-dial[data-dial="3"] .dial-up'),
            down: document.querySelector(
                '.vault-dial[data-dial="3"] .dial-down',
            ),
            display: document.querySelector(
                '.vault-dial[data-dial="3"] .dial-display',
            ),
        },
    ];
    const unlockBtn = document.getElementById("vaultUnlockBtn");
    const vaultContent = document.getElementById("vaultContent");
    const fullscreenBtn = document.getElementById("vaultFullscreenBtn");
    const downloadBtn = document.getElementById("vaultDownloadBtn");
    const vaultPhoto = document.getElementById("vaultPhoto");

    const values = [0, 0, 0, 0];
    const combo = [2, 0, 2, 5];

    function updateDial(index) {
        playSoundEffect("./audio/space2.opus");
        dials[index].display.textContent = values[index];
    }
    dials.forEach((dial, i) => {
        dial.up.addEventListener("click", () => {
            values[i] = (values[i] + 1) % 10;
            updateDial(i);
        });
        dial.down.addEventListener("click", () => {
            values[i] = (values[i] - 1 + 10) % 10;
            updateDial(i);
        });
    });

    if (vaultUnlocked) {
        document.getElementById("vaultContainer").style.display = "none";
        vaultContent.style.display = "block";
    }

    unlockBtn.addEventListener("click", () => {
        if (values.every((v, i) => v === combo[i])) {
            document.getElementById("vaultContainer").style.display = "none";
            vaultContent.style.display = "block";
            vaultUnlocked = true;
        } else {
            alert("Wrong combination! Hint: the year we first met 💕");
        }
    });

    fullscreenBtn.addEventListener("click", () => {
        const overlay = document.getElementById("fullscreenOverlay");
        const fullImg = document.getElementById("fullscreenImg");
        fullImg.src = vaultPhoto.src;
        overlay.style.display = "flex";
    });

    downloadBtn.addEventListener("click", () => {
        const a = document.createElement("a");
        a.href = vaultPhoto.src;
        a.download = "our-secret-photo.jpg";
        a.click();
    });
}

// ==================== HACK SYSTEM ====================
function initHackSystem() {
    const hackBtn = document.getElementById("hackSystemBtn");
    const modal = document.getElementById("hackModal");
    const problemDiv = document.getElementById("hackProblem");
    const input = document.getElementById("hackInput");
    const submitBtn = document.getElementById("hackSubmitBtn");
    const closeBtn = document.getElementById("hackCloseBtn");
    const progress = document.getElementById("hackProgress");
    const errorMsg = document.getElementById("hackError");

    let currentProblem = 0;
    let correctAnswers = 0;
    const problems = [
        { q: "12 * 15 = ?", a: 180 },
        { q: "45 + 78 = ?", a: 123 },
        { q: "256 / 8 = ?", a: 32 },
        { q: "(7 * 8) + 14 = ?", a: 70 },
        { q: "square root of 144 = ?", a: 12 },
    ];

    function showProblem() {
        if (currentProblem < problems.length) {
            problemDiv.textContent = problems[currentProblem].q;
            input.value = "";
            errorMsg.style.display = "none";
            progress.textContent = `Problem ${currentProblem + 1} of ${problems.length}`;
        }
    }

    hackBtn.addEventListener("click", () => {
        if (!futureUnlocked) {
            currentProblem = 0;
            correctAnswers = 0;
            modal.style.display = "flex";
            showProblem();
        }
    });

    closeBtn.addEventListener("click", () => (modal.style.display = "none"));

    submitBtn.addEventListener("click", () => {
        const answer = parseInt(input.value);
        if (answer === problems[currentProblem].a) {
            correctAnswers++;
            currentProblem++;
            if (currentProblem === problems.length) {
                modal.style.display = "none";
                playSoundEffect("./audio/error.opus");
                futureUnlocked = true;
                const msgDiv = document.getElementById("futureMessage");
                msgDiv.classList.remove("locked");
                msgDiv.classList.add("unlocked");
                msgDiv.innerHTML =
                    "<h3>Future Message Unlocked!</h3><p>ily even in 2032😭<small><i>ConnerRK900</i></small></p>";
                initDraggableElements();
            } else {
                showProblem();
            }
        } else {
            errorMsg.style.display = "block";
        }
    });
}

// ==================== HUG BUTTON ====================
function initHugButton() {
    const btn = document.getElementById("sendHugBtn");
    const globe = document.getElementById("globeSvg");
    const line = document.getElementById("glowLine");

    btn.addEventListener("click", () => {
        playSoundEffect("./audio/space1.opus");
        globe.classList.add("globe-pulse");
        line.classList.add("glow-line-forward");
        setTimeout(() => {
            globe.classList.remove("globe-pulse");
            line.classList.remove("glow-line-forward");
        }, 500);
    });
}

// ==================== ICON SECRET ====================
function initIconSecret() {
    const cards = document.querySelectorAll(".joke-card[data-icon-card]");
    const secretContainer = document.getElementById("secretIconCard");
    const bbgCard = document.getElementById("bbgCard");
    let clickedCount = new Set();

    cards.forEach((card) => {
        card.addEventListener("click", () => {
            const index = card.getAttribute("data-icon-card");
            clickedCount.add(index);
            if (clickedCount.size === 4) {
                cards.forEach((c) => (c.style.display = "none"));
                secretContainer.style.display = "flex";
            }
        });
    });

    bbgCard.addEventListener("click", () => {
        cards.forEach((c) => (c.style.display = ""));
        secretContainer.style.display = "none";
        clickedCount.clear();
    });
}

// ==================== TYPING ANIMATION ====================
function typeSoulmates() {
    const logo = document.getElementById("typingLogo");
    const text = "Soulmates 4ever";
    let i = 0;
    logo.textContent = "";
    function type() {
        if (i < text.length) {
            logo.textContent += text.charAt(i);
            i++;
            setTimeout(type, 100);
        }
    }
    type();
}

// ==================== RESET ALL DATA ====================
function resetAllData() {
    // Reset theme
    currentTheme = 0;
    applyTheme(themes[0]);
    document.getElementById("themeToggle").innerHTML =
        `<i class="fas fa-palette"></i>`;

    // Reset XP / boosts / badges
    totalXP = 875067;
    xpBoostCount = 0;
    fadedBadgesCount = 0;
    document
        .querySelectorAll(".badge.faded")
        .forEach((b) => b.classList.remove("faded"));
    updateRemainingXP();
    animateXPProgress();
    const boostBtn = document.getElementById("xpBoostBtn");
    boostBtn.disabled = false;
    boostBtn.innerHTML =
        '<i class="fas fa-bolt"></i> Boost XP <span class="xp-boost-count" id="xpBoostCount">0</span>';
    document.getElementById("xpBoostCount").textContent = "0";

    // Reset vault
    vaultUnlocked = false;
    document.getElementById("vaultContainer").style.display = "block";
    document.getElementById("vaultContent").style.display = "none";
    // Reset vault dials to 0
    document
        .querySelectorAll(".dial-display")
        .forEach((d) => (d.textContent = "0"));

    // Reset future message
    futureUnlocked = false;
    const futureMsg = document.getElementById("futureMessage");
    futureMsg.classList.add("locked");
    futureMsg.classList.remove("unlocked");
    futureMsg.innerHTML = `
        <div class="lock-icon"><i class="fas fa-lock"></i></div>
        <h3>Future Message Locked</h3>
        <p id="futureT"></p>
        <div class="unlock-date">Available in <span id="unlockCountdown">...</span></div>
        <button class="hack-btn" id="hackSystemBtn">🔓 Hack the System</button>
    `;
    initFutureMessageCountdown()
    // Re‑init hack system so the new button works
    initHackSystem();

    // Reset mini game
    miniGameFound = false;
    initAchievements();

    // Re‑enable draggable
    initDraggableElements();

    // Reset shuffle/repeat and music (optional: stop)
    shuffleMode = false;
    repeatMode = false;
    document.getElementById("npShuffleBtn").classList.remove("shuffle-active");
    document.getElementById("npRepeatBtn").classList.remove("repeat-active");
    if (playlistPlaying) playlistAudio.pause();
    showSlide(1);
}

function initResetStorage() {
    document.getElementById("resetStorageBtn").addEventListener("click", () => {
        if (
            confirm(
                "Are you sure you want to reset all settings? This cannot be undone.",
            )
        ) {
            resetAllData();
        }
    });
}

// ==================== LOVE QUIZ ====================
const quizQuestions = [
    { question: "What is my favorite color?", options: ["Red", "Blue", "Black", "Grey"], correct: 2 },   // index 1 = Blue
    { question: "Which food could I eat every day?", options: ["Pizza", "Sushi", "Pasta", "Biryani"], correct: 0 },
    { question: "What is my dream vacation destination?", options: ["Paris", "Los Angles", "Tokyo", "New York"], correct: 0 },
    { question: "What is my nickname?", options: ["Jack", "Aiden", "Satan", "Niga"], correct: 1 },
    { question: "Which movie genre do I love most?", options: ["Action", "Thriller", "Drama", "Romance"], correct: 1 },
    { question: "What is my favorite season?", options: ["Spring", "Summer", "Fall", "Winter"], correct: 3 },
    { question: "Which one do I enjoy watching?", options: ["Football", "Basketball", "Tennis", "U"], correct: 3 },
    { question: "What is my HIDDEN talent?", options: ["Coding", "Playing Football", "Meowing", "Drawing"], correct: 2 },
    { question: "Who's my sweetie?", options: ["Bbg", "PC", "PS5", "🤢Lucy🤢"], correct: 0 },
    { question: "What is my phone?", options: ["Apple", "Xiaomi", "Samsung", "Nothing Phone"], correct: 1 }
];

let currentQuizQuestion = 0;
let userQuizAnswers = new Array(quizQuestions.length).fill(-1);
let quizActive = false;

function initQuiz() {
    const nextBtn = document.getElementById("quizNextBtn");
    const retryBtn = document.getElementById("quizRetryBtn");
    nextBtn.addEventListener("click", goToNextQuizQuestion);
    retryBtn.addEventListener("click", resetQuiz);
}

function resetQuiz() {
    currentQuizQuestion = 0;
    userQuizAnswers = new Array(quizQuestions.length).fill(-1);
    document.getElementById("quizQuestionArea").style.display = "block";
    document.getElementById("quizResults").style.display = "none";
    quizActive = true;
    showQuizQuestion(0);
}

function startQuizIfNeeded() {
    if (!quizActive) {
        resetQuiz();
    }
}

function showQuizQuestion(index) {
    const q = quizQuestions[index];
    document.getElementById("questionText").textContent = q.question;
    document.getElementById("quizProgress").textContent = `Question ${index+1} of ${quizQuestions.length}`;
    const optsContainer = document.getElementById("optionsContainer");
    optsContainer.innerHTML = "";
    q.options.forEach((opt, i) => {
        const label = document.createElement("label");
        label.className = "quiz-option";
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "quizOption";
        radio.value = i;
        radio.checked = (userQuizAnswers[index] === i);
        radio.addEventListener("change", () => handleOptionSelect(index, i, label));
        label.appendChild(radio);
        label.appendChild(document.createTextNode(opt));
        optsContainer.appendChild(label);
    });
    // Enable/disable next button
    document.getElementById("quizNextBtn").disabled = (userQuizAnswers[index] === -1);
}

function handleOptionSelect(qIndex, optIndex, labelElement) {
    // Store answer and lock all radio buttons for this question
    userQuizAnswers[qIndex] = optIndex;
    const allOptions = document.querySelectorAll("#optionsContainer .quiz-option");
    allOptions.forEach((opt, idx) => {
        const radio = opt.querySelector("input");
        radio.disabled = true;
        opt.classList.add("feedback-active");
        if (idx === quizQuestions[qIndex].correct) {
            opt.classList.add("correct");
        } else {
            opt.classList.add("incorrect");
        }
    });
    document.getElementById("quizNextBtn").disabled = false;
}

function goToNextQuizQuestion() {
    const nextIndex = currentQuizQuestion + 1;
    if (nextIndex < quizQuestions.length) {
        currentQuizQuestion = nextIndex;
        showQuizQuestion(nextIndex);
    } else {
        showQuizResults();
    }
}

function showQuizResults() {
    document.getElementById("quizQuestionArea").style.display = "none";
    document.getElementById("quizResults").style.display = "block";
    let score = 0;
    userQuizAnswers.forEach((ans, i) => {
        if (ans === quizQuestions[i].correct) score++;
    });
    const total = quizQuestions.length;
    const percent = Math.round((score / total) * 100);
    document.getElementById("scoreValue").textContent = score;
    document.getElementById("totalQuestions").textContent = total;
    document.getElementById("scorePercent").textContent = percent + "%";
    // Animate the circle
    const circle = document.querySelector(".quiz-score-circle");
    circle.style.background = `conic-gradient(var(--theme-accent) ${percent*3.6}deg, var(--theme-gray) 0deg)`;
    let message = "";
    if (percent === 100) message = "Perfect! A true soulmate!🥹🤏🏼💘";
    else if (percent >= 70) message = "Good girlllllll";
    else if (percent >= 40) message = "Not bad, dw i ain cryin! *cryin af*";
    else message = "Liloest lilo🥹🥹🤏🏼😭😭";
    document.getElementById("quizMessage").textContent = message;
    // Build review
    const reviewDiv = document.getElementById("answersReview");
    reviewDiv.innerHTML = "";
    quizQuestions.forEach((q, i) => {
        const div = document.createElement("div");
        const isCorrect = (userQuizAnswers[i] === q.correct);
        div.className = `review-item ${isCorrect ? "correct" : "wrong"}`;
        div.innerHTML = `
            <div class="review-question">${i+1}. ${q.question}</div>
            <div class="review-answer">
                <span>Your answer: <strong>${q.options[userQuizAnswers[i]] ?? "—"}</strong></span>
                <span>Correct: <strong>${q.options[q.correct]}</strong></span>
            </div>
        `;
        reviewDiv.appendChild(div);
    });
    quizActive = false;
}

// ==================== HELPERS ====================
function showNotification(msg) {
    const el = document.createElement("div");
    el.textContent = msg;
    Object.assign(el.style, {
        position: "fixed",
        bottom: "80px",
        right: "30px",
        backgroundColor: "var(--theme-primary)",
        color: "white",
        padding: "10px 20px",
        borderRadius: "10px",
        fontWeight: "600",
        zIndex: "10000",
        boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
        animation: "fadeInOut 3s forwards",
    });
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 3000);
}

const notificationStyle = document.createElement("style");
notificationStyle.textContent = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translateY(20px); }
        20% { opacity: 1; transform: translateY(0); }
        80% { opacity: 1; transform: translateY(0); }
        100% { opacity: 0; transform: translateY(20px); }
    }
`;
document.head.appendChild(notificationStyle);

// ==================== DEBOUNCE SCROLL ====================
window.addEventListener("wheel", () => {}, { passive: true });
