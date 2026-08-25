const startScene = document.getElementById("startScene");
const trainingScene = document.getElementById("trainingScene");
const desktopScene = document.getElementById("desktopScene");

const startButton = document.getElementById("startButton");
const continueButton = document.getElementById("continueButton");
const trainingCard = document.getElementById("trainingCard");
const trainingCounter = document.getElementById("trainingCounter");

const newThreatAlert = document.getElementById("newThreatAlert");
const reviewThreatButton = document.getElementById("reviewThreatButton");
const mailIcon = document.getElementById("mailIcon");

const threatWindow = document.getElementById("threatWindow");
const closeThreatWindow = document.getElementById("closeThreatWindow");
const scanButton = document.getElementById("scanButton");
const inspectButton = document.getElementById("inspectButton");
const scanStatus = document.getElementById("scanStatus");

const mediaWindow = document.getElementById("mediaWindow");
const closeMediaButton = document.getElementById("closeMediaButton");
const figure = document.getElementById("figure");
const falseWarning = document.getElementById("falseWarning");
const warningMessage = document.getElementById("warningMessage");
const corruption = document.getElementById("corruption");

const toast = document.getElementById("toast");
const staticOverlay = document.getElementById("staticOverlay");
const staticText = document.getElementById("staticText");

let trainingIndex = 0;
let encounterActive = false;
let encounterStage = 0;
let encounterTimers = [];
let audioContext = null;

const trainingSlides = [
    {
        title: "REMOTE CONTAMINATION RESPONSE",
        html: `
            <p class="training-text">
                Welcome to the
                V-BLOCKER Remote Employee Program.
                <br><br>
                This instructional tape contains
                mandatory procedures for the handling
                of unidentified digital threats.
            </p>
        `
    },
    {
        title: "VISUAL THREAT PROCEDURE",
        html: `
            <p class="training-text">
                Some malicious files may contain
                images or recordings that cannot be
                identified by conventional antivirus
                software.
                <br><br>
                These files require manual review.
            </p>
        `
    },
    {
        title: "UNIDENTIFIED FIGURES",
        html: `
            <div class="training-warning">
                <h2>DO NOT INTERACT.</h2>
                <p class="training-text">
                    If an unidentified figure appears
                    within digital media:
                </p>
                <div class="rule-list">
                    • Do not enlarge the image.<br>
                    • Do not replay the recording.<br>
                    • Do not communicate with the figure.<br>
                    • Observe its behavior carefully.
                </div>
            </div>
        `
    },
    {
        title: "IF THE FIGURE NOTICES YOU",
        html: `
            <div class="training-warning">
                <div class="important">
                    CLOSE THE TAB IMMEDIATELY.
                </div>
                <br>
                <div class="rule-list">
                    1. Close the affected tab.<br>
                    2. Do not reopen the file.<br>
                    3. Begin a full V-BLOCKER scan.<br>
                    4. Report the incident.
                </div>
            </div>
        `
    },
    {
        title: "AUDIO CONTAMINATION",
        html: `
            <p class="training-text">
                During an active visual threat,
                employees may experience:
                <br><br>
                voices from muted speakers,
                <br>
                telephone calls from unidentified sources,
                <br>
                or sounds elsewhere within the residence.
                <br><br>
                These events do not indicate
                equipment malfunction.
            </p>
        `
    },
    {
        title: "IMPORTANT",
        html: `
            <div class="training-warning">
                <div class="rule-list">
                    DO NOT disconnect the workstation.
                    <br><br>
                    DO NOT attempt to relocate it.
                    <br><br>
                    DO NOT allow another individual
                    to perform your shift.
                </div>
            </div>
        `
    },
    {
        title: "TRAINING COMPLETE",
        html: `
            <p class="training-text">
                EMPLOYEE: 047
                <br>
                TERMINAL: HOME-047
                <br>
                SHIFT START: 10:00 PM
                <br><br><br>
                V-BLOCKER KEEPS
                <br>
                THE
                <strong id="virusWord">VIRUS</strong>
                OUT.
            </p>
        `
    }
];

function setupAudio() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
}

function beep(frequency = 400, duration = 0.08, volume = 0.035, type = "square") {
    if (!audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = type;
    oscillator.frequency.value = frequency;
    gain.gain.value = volume;

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start();
    gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);
    oscillator.stop(audioContext.currentTime + duration);
}

function trainingTone() {
    beep(730, .18, .035, "square");
    setTimeout(() => beep(590, .25, .03, "square"), 180);
}

function errorTone() {
    beep(180, .25, .05, "sawtooth");
}

function notificationTone() {
    beep(700, .08, .025, "sine");
    setTimeout(() => beep(920, .1, .025, "sine"), 120);
}

function lowThump() {
    if (!audioContext) return;

    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(80, audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(35, audioContext.currentTime + .25);

    gain.gain.setValueAtTime(.12, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(.001, audioContext.currentTime + .35);

    osc.connect(gain);
    gain.connect(audioContext.destination);

    osc.start();
    osc.stop(audioContext.currentTime + .4);
}

function showScene(scene) {
    document.querySelectorAll(".scene").forEach(s => s.classList.remove("active"));
    scene.classList.add("active");
}

startButton.addEventListener("click", () => {
    setupAudio();
    trainingTone();
    trainingIndex = 0;
    showScene(trainingScene);
    showTrainingSlide();
});

function showTrainingSlide() {
    const slide = trainingSlides[trainingIndex];

    trainingCounter.textContent = `TAPE 01 / ${trainingIndex + 1}-${trainingSlides.length}`;

    trainingCard.innerHTML = `
        <h1 class="training-title">${slide.title}</h1>
        ${slide.html}
    `;

    trainingTone();

    if (trainingIndex === trainingSlides.length - 1) {
        continueButton.textContent = "BEGIN SHIFT";

        setTimeout(() => {
            const virusWord = document.getElementById("virusWord");
            if (!virusWord) return;

            virusWord.textContent = "HIM";
            errorTone();

            setTimeout(() => {
                if (virusWord) {
                    virusWord.textContent = "VIRUS";
                }
            }, 160);
        }, 1300);
    } else {
        continueButton.textContent = "CONTINUE";
    }
}

continueButton.addEventListener("click", () => {
    beep(420, .05, .02);

    if (trainingIndex < trainingSlides.length - 1) {
        trainingIndex++;
        showTrainingSlide();
        return;
    }

    beginShift();
});

function beginShift() {
    showScene(desktopScene);

    setTimeout(() => {
        newThreatAlert.classList.remove("hidden");
        notificationTone();
    }, 2200);
}

function openThreatQueue() {
    newThreatAlert.classList.add("hidden");
    threatWindow.classList.remove("hidden");
}

reviewThreatButton.addEventListener("click", openThreatQueue);
mailIcon.addEventListener("click", openThreatQueue);

closeThreatWindow.addEventListener("click", () => {
    threatWindow.classList.add("hidden");
});

scanButton.addEventListener("click", () => {
    scanButton.disabled = true;

    scanStatus.innerHTML = `
        <p>SCANNING...</p>
        <p>0%</p>
    `;

    beep(250, .05, .02);

    let progress = 0;

    const scanner = setInterval(() => {
        progress += Math.floor(Math.random() * 18) + 5;

        if (progress > 100) {
            progress = 100;
        }

        scanStatus.innerHTML = `
            <p>SCANNING...</p>
            <p>${progress}%</p>
        `;

        beep(190 + progress, .025, .007, "square");

        if (progress >= 100) {
            clearInterval(scanner);
            finishScan();
        }
    }, 180);
});

function finishScan() {
    errorTone();

    scanStatus.innerHTML = `
        <strong>SCAN COMPLETE</strong>
        <br><br>
        FILE: IMG_0381.JPG
        <br>
        SIGNATURE: UNKNOWN
        <br>
        THREAT CLASS: UNRESOLVED VISUAL MEDIA
        <br><br>
        MANUAL INSPECTION REQUIRED.
    `;

    inspectButton.disabled = false;
}

inspectButton.addEventListener("click", () => {
    threatWindow.classList.add("hidden");
    mediaWindow.classList.remove("hidden");
    beginEncounter();
});

function clearEncounterTimers() {
    encounterTimers.forEach(timer => clearTimeout(timer));
    encounterTimers = [];
}

function setFigureStage(stage) {
    for (let i = 1; i <= 4; i++) {
        figure.classList.remove(`stage-${i}`);
    }

    if (stage > 0) {
        figure.classList.add(`stage-${stage}`);
    }

    encounterStage = stage;
}

function beginEncounter() {
    clearEncounterTimers();

    encounterActive = true;
    encounterStage = 0;

    figure.classList.remove("noticed");
    setFigureStage(0);

    falseWarning.classList.add("hidden");
    corruption.textContent = "SIGNAL STABLE";

    encounterTimers.push(setTimeout(() => {
        if (!encounterActive) return;

        figure.classList.add("noticed");
        corruption.textContent = "SUBJECT DETECTED";
        lowThump();
    }, 1800));

    encounterTimers.push(setTimeout(() => {
        if (!encounterActive) return;

        setFigureStage(1);
        corruption.textContent = "SUBJECT MOVEMENT DETECTED";
        lowThump();
    }, 3200));

    encounterTimers.push(setTimeout(() => {
        if (!encounterActive) return;

        falseWarning.classList.remove("hidden");
        warningMessage.textContent = "DO NOT CLOSE THIS TAB.";
        errorTone();
    }, 4200));

    encounterTimers.push(setTimeout(() => {
        if (!encounterActive) return;

        setFigureStage(2);
        warningMessage.textContent = "DO NOT INTERRUPT THE CONNECTION.";
        corruption.textContent = "IMAGE CORRUPTION: 17%";
        lowThump();
    }, 6500));

    encounterTimers.push(setTimeout(() => {
        if (!encounterActive) return;

        setFigureStage(3);
        warningMessage.textContent = "CLOSING THIS TAB MAY DAMAGE YOUR SYSTEM.";
        corruption.textContent = "IMAGE CORRUPTION: 54%";
        lowThump();
    }, 9000));

    encounterTimers.push(setTimeout(() => {
        if (!encounterActive) return;

        warningMessage.textContent = "PLEASE REMAIN.";
        corruption.textContent = "SOURCE UNKNOWN";
        errorTone();
    }, 10800));

    encounterTimers.push(setTimeout(() => {
        if (!encounterActive) return;

        setFigureStage(4);
        warningMessage.textContent = "DON'T GO.";
        corruption.textContent = "CONNECTION ACCEPTED";
        lowThump();
    }, 12300));

    encounterTimers.push(setTimeout(() => {
        if (!encounterActive) return;
        encounterFailure();
    }, 14600));
}

closeMediaButton.addEventListener("click", () => {
    if (!encounterActive) {
        mediaWindow.classList.add("hidden");
        return;
    }

    surviveEncounter();
});

function surviveEncounter() {
    encounterActive = false;
    clearEncounterTimers();

    mediaWindow.classList.add("hidden");
    falseWarning.classList.add("hidden");

    figure.classList.remove("noticed");
    setFigureStage(0);

    beep(640, .08, .025, "sine");
    setTimeout(() => beep(820, .12, .025, "sine"), 100);

    showToast("THREAT CONTAINED — FULL SYSTEM SCAN STARTED");

    document.getElementById("taskbarStatus").textContent = "SCANNING SYSTEM...";

    setTimeout(() => {
        showToast("NOTICE: REMOTE CONNECTION CLOSED");
    }, 3800);

    setTimeout(() => {
        document.getElementById("taskbarStatus").textContent = "V-BLOCKER ACTIVE";
    }, 6500);
}

function encounterFailure() {
    encounterActive = false;
    clearEncounterTimers();

    falseWarning.classList.add("hidden");
    staticOverlay.classList.remove("hidden");
    staticText.textContent = "CONNECTION LOST";

    errorTone();

    setTimeout(() => {
        staticText.textContent = "DO NOT LOOK AWAY";
    }, 1500);

    setTimeout(() => {
        lowThump();
    }, 2500);

    setTimeout(() => {
        staticOverlay.classList.add("hidden");
        mediaWindow.classList.add("hidden");
        showToast("V-BLOCKER HAS ENCOUNTERED AN UNKNOWN ERROR");
        document.getElementById("taskbarStatus").textContent = "CONNECTION ERROR";
    }, 3900);
}

let toastTimer = null;

function showToast(message) {
    clearTimeout(toastTimer);

    toast.textContent = message;
    toast.classList.remove("hidden");

    toastTimer = setTimeout(() => {
        toast.classList.add("hidden");
    }, 2800);
}
