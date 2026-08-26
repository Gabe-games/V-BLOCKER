// ======================================================
// V-BLOCKER
// NO CALLER ID PROTOTYPE
// ======================================================


// ======================================================
// ELEMENTS
// ======================================================

const startScene =
    document.getElementById("startScene");

const trainingScene =
    document.getElementById("trainingScene");

const desktopScene =
    document.getElementById("desktopScene");


const startButton =
    document.getElementById("startButton");

const continueButton =
    document.getElementById("continueButton");

const trainingCard =
    document.getElementById("trainingCard");

const trainingCounter =
    document.getElementById("trainingCounter");


const newThreatAlert =
    document.getElementById("newThreatAlert");

const reviewThreatButton =
    document.getElementById("reviewThreatButton");

const mailIcon =
    document.getElementById("mailIcon");


const threatWindow =
    document.getElementById("threatWindow");

const closeThreatWindow =
    document.getElementById("closeThreatWindow");

const scanButton =
    document.getElementById("scanButton");

const inspectButton =
    document.getElementById("inspectButton");

const scanStatus =
    document.getElementById("scanStatus");


const mediaWindow =
    document.getElementById("mediaWindow");

const mediaViewer =
    document.getElementById("mediaViewer");

const closeMediaButton =
    document.getElementById("closeMediaButton");

const figure =
    document.getElementById("figure");

const corruption =
    document.getElementById("corruption");


const falseWarning =
    document.getElementById("falseWarning");

const warningMessage =
    document.getElementById("warningMessage");


const deskPhone =
    document.getElementById("deskPhone");

const phoneDisplay =
    document.getElementById("phoneDisplay");

const phoneStatus =
    document.getElementById("phoneStatus");

const answerButton =
    document.getElementById("answerButton");


const toast =
    document.getElementById("toast");

const staticOverlay =
    document.getElementById("staticOverlay");

const staticText =
    document.getElementById("staticText");


// ======================================================
// STATE
// ======================================================

let trainingIndex = 0;

let audioContext = null;

let encounterActive = false;

let encounterTimers = [];

let phoneRinging = false;

let phoneAnswered = false;

let ringTimer = null;

let toastTimer = null;


// ======================================================
// TRAINING
// ======================================================

const trainingSlides = [

    {
        title:
            "REMOTE CONTAMINATION RESPONSE",

        html:
        `
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
        title:
            "VISUAL THREAT PROCEDURE",

        html:
        `
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
        title:
            "UNIDENTIFIED FIGURES",

        html:
        `
            <div class="training-warning">

                <h2>
                    DO NOT INTERACT.
                </h2>

                <div class="rule-list">

                    • Do not enlarge the image.

                    <br>

                    • Do not replay the recording.

                    <br>

                    • Do not communicate with the figure.

                    <br>

                    • Observe its behavior carefully.

                </div>

            </div>
        `
    },


    {
        title:
            "IF THE FIGURE NOTICES YOU",

        html:
        `
            <div class="training-warning">

                <div class="important">

                    CLOSE THE TAB IMMEDIATELY.

                </div>

                <br>

                <div class="rule-list">

                    1. Close the affected tab.

                    <br>

                    2. Do not reopen the file.

                    <br>

                    3. Begin a full V-BLOCKER scan.

                    <br>

                    4. Report the incident.

                </div>

            </div>
        `
    },


    {
        title:
            "UNSOLICITED TELEPHONE CONTACT",

        html:
        `
            <div class="training-warning">

                <div class="rule-list">

                    During an active visual threat,
                    employees may receive calls from
                    unidentified numbers.

                    <br><br>

                    V-BLOCKER will never ask an employee
                    to answer an unidentified call.

                    <br><br>

                    Caller information may be inaccurate.

                </div>

            </div>
        `
    },


    {
        title:
            "IMPORTANT",

        html:
        `
            <div class="training-warning">

                <div class="rule-list">

                    DO NOT disconnect the workstation.

                    <br><br>

                    DO NOT relocate the workstation.

                    <br><br>

                    DO NOT permit another individual
                    to complete your shift.

                </div>

            </div>
        `
    },


    {
        title:
            "TRAINING COMPLETE",

        html:
        `
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

                <strong id="virusWord">
                    VIRUS
                </strong>

                OUT.

            </p>
        `
    }

];


// ======================================================
// AUDIO
// ======================================================

function setupAudio() {

    if (!audioContext) {

        audioContext =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();

    }

}


function beep(
    frequency = 400,
    duration = .08,
    volume = .03,
    type = "square"
) {

    if (!audioContext)
        return;


    const oscillator =
        audioContext.createOscillator();


    const gain =
        audioContext.createGain();


    oscillator.type =
        type;


    oscillator.frequency.value =
        frequency;


    gain.gain.value =
        volume;


    oscillator.connect(
        gain
    );


    gain.connect(
        audioContext.destination
    );


    oscillator.start();


    gain.gain.exponentialRampToValueAtTime(
        .0001,
        audioContext.currentTime + duration
    );


    oscillator.stop(
        audioContext.currentTime + duration
    );

}


function trainingTone() {

    beep(
        730,
        .12,
        .025,
        "square"
    );


    setTimeout(
        () => {

            beep(
                590,
                .18,
                .025,
                "square"
            );

        },
        140
    );

}


function errorTone() {

    beep(
        175,
        .28,
        .045,
        "sawtooth"
    );

}


function notificationTone() {

    beep(
        700,
        .08,
        .02,
        "sine"
    );


    setTimeout(
        () => {

            beep(
                920,
                .1,
                .02,
                "sine"
            );

        },
        110
    );

}


function lowThump() {

    if (!audioContext)
        return;


    const oscillator =
        audioContext.createOscillator();


    const gain =
        audioContext.createGain();


    oscillator.type =
        "sine";


    oscillator.frequency.setValueAtTime(
        85,
        audioContext.currentTime
    );


    oscillator.frequency.exponentialRampToValueAtTime(
        35,
        audioContext.currentTime + .3
    );


    gain.gain.setValueAtTime(
        .11,
        audioContext.currentTime
    );


    gain.gain.exponentialRampToValueAtTime(
        .001,
        audioContext.currentTime + .38
    );


    oscillator.connect(
        gain
    );


    gain.connect(
        audioContext.destination
    );


    oscillator.start();


    oscillator.stop(
        audioContext.currentTime + .4
    );

}


// ======================================================
// BREATHING
// ======================================================

function playBreath(delay = 0) {

    setTimeout(
        () => {

            if (!audioContext)
                return;


            const bufferSize =
                audioContext.sampleRate * 1.2;


            const buffer =
                audioContext.createBuffer(
                    1,
                    bufferSize,
                    audioContext.sampleRate
                );


            const data =
                buffer.getChannelData(0);


            for (
                let i = 0;
                i < bufferSize;
                i++
            ) {

                data[i] =
                    Math.random() * 2 - 1;

            }


            const noise =
                audioContext.createBufferSource();


            noise.buffer =
                buffer;


            const filter =
                audioContext.createBiquadFilter();


            filter.type =
                "lowpass";


            filter.frequency.value =
                520;


            const gain =
                audioContext.createGain();


            gain.gain.setValueAtTime(
                .001,
                audioContext.currentTime
            );


            gain.gain.linearRampToValueAtTime(
                .20,
                audioContext.currentTime + .28
            );


            gain.gain.linearRampToValueAtTime(
                .06,
                audioContext.currentTime + .72
            );


            gain.gain.linearRampToValueAtTime(
                .001,
                audioContext.currentTime + 1.1
            );


            noise.connect(
                filter
            );


            filter.connect(
                gain
            );


            gain.connect(
                audioContext.destination
            );


            noise.start();


            noise.stop(
                audioContext.currentTime + 1.15
            );

        },
        delay
    );

}


function creepyBreathing() {

    playBreath(
        0
    );


    playBreath(
        1150
    );


    playBreath(
        2300
    );

}


// ======================================================
// VOICE
// ======================================================

function speakWatchingYou() {

    if (
        !window.speechSynthesis
    ) {

        phoneDisplay.textContent =
            "CALL ENDED";

        return;

    }


    speechSynthesis.cancel();


    const speech =
        new SpeechSynthesisUtterance(
            "I'm watching you..."
        );


    speech.rate =
        .72;


    speech.pitch =
        .65;


    speech.volume =
        .82;


    const voices =
        speechSynthesis.getVoices();


    const englishVoice =
        voices.find(
            voice =>
                voice.lang
                    .toLowerCase()
                    .startsWith("en")
        );


    if (
        englishVoice
    ) {

        speech.voice =
            englishVoice;

    }


    speech.onend =
        () => {

            setTimeout(
                disconnectCall,
                500
            );

        };


    speechSynthesis.speak(
        speech
    );

}


// ======================================================
// SCENES
// ======================================================

function showScene(scene) {

    document
        .querySelectorAll(
            ".scene"
        )
        .forEach(
            scene =>
                scene.classList.remove(
                    "active"
                )
        );


    scene.classList.add(
        "active"
    );

}


// ======================================================
// START
// ======================================================

startButton.addEventListener(
    "click",
    () => {

        setupAudio();


        trainingIndex =
            0;


        showScene(
            trainingScene
        );


        showTrainingSlide();

    }
);


// ======================================================
// TRAINING SLIDES
// ======================================================

function showTrainingSlide() {

    const slide =
        trainingSlides[
            trainingIndex
        ];


    trainingCounter.textContent =
        `TAPE 01 / ${
            trainingIndex + 1
        }-${trainingSlides.length}`;


    trainingCard.innerHTML =
    `
        <h1 class="training-title">

            ${slide.title}

        </h1>

        ${slide.html}
    `;


    trainingTone();


    if (
        trainingIndex ===
        trainingSlides.length - 1
    ) {

        continueButton.textContent =
            "BEGIN SHIFT";


        setTimeout(
            () => {

                const word =
                    document.getElementById(
                        "virusWord"
                    );


                if (!word)
                    return;


                word.textContent =
                    "HIM";


                errorTone();


                setTimeout(
                    () => {

                        if (
                            word
                        ) {

                            word.textContent =
                                "VIRUS";

                        }

                    },
                    170
                );

            },
            1200
        );

    }

    else {

        continueButton.textContent =
            "CONTINUE";

    }

}


continueButton.addEventListener(
    "click",
    () => {

        beep(
            420,
            .05,
            .02
        );


        if (
            trainingIndex <
            trainingSlides.length - 1
        ) {

            trainingIndex++;


            showTrainingSlide();


            return;

        }


        beginShift();

    }
);


// ======================================================
// SHIFT
// ======================================================

function beginShift() {

    showScene(
        desktopScene
    );


    phoneDisplay.textContent =
        "READY";


    phoneStatus.textContent =
        "LINE 1";


    setTimeout(
        () => {

            newThreatAlert.classList.remove(
                "hidden"
            );


            notificationTone();

        },
        1900
    );

}


// ======================================================
// THREAT WINDOW
// ======================================================

function openThreatQueue() {

    newThreatAlert.classList.add(
        "hidden"
    );


    threatWindow.classList.remove(
        "hidden"
    );

}


reviewThreatButton.addEventListener(
    "click",
    openThreatQueue
);


mailIcon.addEventListener(
    "click",
    openThreatQueue
);


closeThreatWindow.addEventListener(
    "click",
    () => {

        threatWindow.classList.add(
            "hidden"
        );

    }
);


// ======================================================
// SCAN
// ======================================================

scanButton.addEventListener(
    "click",
    () => {

        scanButton.disabled =
            true;


        let progress =
            0;


        scanStatus.innerHTML =
        `
            SCANNING...

            <br><br>

            0%
        `;


        const scanner =
            setInterval(
                () => {

                    progress +=
                        Math.floor(
                            Math.random() * 16
                        ) + 7;


                    if (
                        progress > 100
                    ) {

                        progress =
                            100;

                    }


                    scanStatus.innerHTML =
                    `
                        SCANNING...

                        <br><br>

                        ${progress}%
                    `;


                    beep(
                        180 + progress,
                        .025,
                        .006
                    );


                    if (
                        progress >= 100
                    ) {

                        clearInterval(
                            scanner
                        );


                        finishScan();

                    }

                },
                170
            );

    }
);


function finishScan() {

    errorTone();


    scanStatus.innerHTML =
    `
        <strong>

            SCAN COMPLETE

        </strong>

        <br><br>

        FILE:
        IMG_0381.JPG

        <br>

        SIGNATURE:
        UNKNOWN

        <br>

        THREAT TYPE:
        UNIDENTIFIED VISUAL CONTACT

        <br><br>

        MANUAL INSPECTION REQUIRED.
    `;


    inspectButton.disabled =
        false;

}


// ======================================================
// ENCOUNTER
// ======================================================

inspectButton.addEventListener(
    "click",
    () => {

        threatWindow.classList.add(
            "hidden"
        );


        mediaWindow.classList.remove(
            "hidden"
        );


        beginEncounter();

    }
);


function clearEncounterTimers() {

    encounterTimers.forEach(
        timer =>
            clearTimeout(
                timer
            )
    );


    encounterTimers =
        [];

}


function clearFigureStages() {

    for (
        let i = 1;
        i <= 4;
        i++
    ) {

        figure.classList.remove(
            `stage-${i}`
        );

    }

}


// ======================================================
// GLITCH MOVEMENT
// ======================================================

function glitchJump(stage) {

    if (
        !encounterActive
    ) {

        return;

    }


    mediaViewer.classList.add(
        "glitching"
    );


    errorTone();


    setTimeout(
        () => {

            clearFigureStages();


            figure.classList.add(
                `stage-${stage}`
            );


            lowThump();

        },
        110
    );


    setTimeout(
        () => {

            mediaViewer.classList.remove(
                "glitching"
            );

        },
        350
    );

}


// ======================================================
// BEGIN ENCOUNTER
// ======================================================

function beginEncounter() {

    clearEncounterTimers();


    clearFigureStages();


    encounterActive =
        true;


    phoneAnswered =
        false;


    falseWarning.classList.add(
        "hidden"
    );


    corruption.textContent =
        "SIGNAL STABLE";


    encounterTimers.push(

        setTimeout(
            () => {

                if (
                    !encounterActive
                )
                    return;


                corruption.textContent =
                    "FIGURE DETECTED";

            },
            1800
        )

    );


    encounterTimers.push(

        setTimeout(
            () => {

                glitchJump(
                    1
                );


                corruption.textContent =
                    "SUBJECT MOVEMENT DETECTED";

            },
            3200
        )

    );


    encounterTimers.push(

        setTimeout(
            () => {

                if (
                    !encounterActive
                )
                    return;


                falseWarning.classList.remove(
                    "hidden"
                );


                warningMessage.textContent =
                    "DO NOT CLOSE THIS TAB.";


                errorTone();

            },
            4300
        )

    );


    encounterTimers.push(

        setTimeout(
            () => {

                glitchJump(
                    2
                );


                corruption.textContent =
                    "VISUAL LINK ACTIVE";


                warningMessage.textContent =
                    "DO NOT INTERRUPT THE CONNECTION.";

            },
            6200
        )

    );


    encounterTimers.push(

        setTimeout(
            () => {

                if (
                    encounterActive
                ) {

                    startIncomingCall();

                }

            },
            7200
        )

    );


    encounterTimers.push(

        setTimeout(
            () => {

                glitchJump(
                    3
                );


                corruption.textContent =
                    "SOURCE UNKNOWN";


                warningMessage.textContent =
                    "CLOSING THIS TAB MAY DAMAGE YOUR SYSTEM.";

            },
            9000
        )

    );


    encounterTimers.push(

        setTimeout(
            () => {

                if (
                    !encounterActive
                )
                    return;


                warningMessage.textContent =
                    "PLEASE REMAIN.";

            },
            10800
        )

    );


    encounterTimers.push(

        setTimeout(
            () => {

                glitchJump(
                    4
                );


                corruption.textContent =
                    "CONNECTION ACCEPTED";


                warningMessage.textContent =
                    "DON'T GO.";

            },
            12400
        )

    );


    encounterTimers.push(

        setTimeout(
            () => {

                if (
                    encounterActive
                ) {

                    encounterFailure();

                }

            },
            15100
        )

    );

}


// ======================================================
// PHONE RINGING
// ======================================================

function startIncomingCall() {

    if (
        phoneRinging ||
        phoneAnswered
    ) {

        return;

    }


    phoneRinging =
        true;


    deskPhone.classList.add(
        "ringing"
    );


    phoneDisplay.textContent =
        "NO CALLER ID";


    phoneStatus.textContent =
        "INCOMING CALL";


    answerButton.disabled =
        false;


    playRing();


    ringTimer =
        setInterval(
            playRing,
            1500
        );

}


function playRing() {

    if (
        !phoneRinging
    ) {

        return;

    }


    beep(
        620,
        .28,
        .055,
        "square"
    );


    setTimeout(
        () => {

            beep(
                510,
                .3,
                .055,
                "square"
            );

        },
        330
    );

}


// ======================================================
// ANSWER PHONE
// ======================================================

answerButton.addEventListener(
    "click",
    () => {

        if (
            !phoneRinging
        ) {

            return;

        }


        phoneRinging =
            false;


        phoneAnswered =
            true;


        clearInterval(
            ringTimer
        );


        deskPhone.classList.remove(
            "ringing"
        );


        answerButton.disabled =
            true;


        phoneDisplay.textContent =
            "NO CALLER ID";


        phoneStatus.textContent =
            "CALL CONNECTED";


        creepyBreathing();


        setTimeout(
            () => {

                if (
                    phoneAnswered
                ) {

                    speakWatchingYou();

                }

            },
            3600
        );

    }
);


// ======================================================
// DISCONNECT CALL
// ======================================================

function disconnectCall() {

    phoneAnswered =
        false;


    phoneRinging =
        false;


    clearInterval(
        ringTimer
    );


    deskPhone.classList.remove(
        "ringing"
    );


    answerButton.disabled =
        true;


    phoneDisplay.textContent =
        "CALL ENDED";


    phoneStatus.textContent =
        "LINE 1";


    beep(
        210,
        .2,
        .025,
        "sine"
    );


    setTimeout(
        () => {

            phoneDisplay.textContent =
                "READY";

        },
        1500
    );

}


// ======================================================
// CLOSE TAB
// ======================================================

closeMediaButton.addEventListener(
    "click",
    () => {

        if (
            encounterActive
        ) {

            surviveEncounter();

        }

        else {

            mediaWindow.classList.add(
                "hidden"
            );

        }

    }
);


// ======================================================
// SURVIVE
// ======================================================

function surviveEncounter() {

    encounterActive =
        false;


    clearEncounterTimers();


    stopPhone();


    mediaWindow.classList.add(
        "hidden"
    );


    falseWarning.classList.add(
        "hidden"
    );


    mediaViewer.classList.remove(
        "glitching"
    );


    clearFigureStages();


    showToast(
        "THREAT CONTAINED — FULL SYSTEM SCAN STARTED"
    );


    document.getElementById(
        "taskbarStatus"
    ).textContent =
        "SCANNING SYSTEM...";


    beep(
        640,
        .08,
        .025,
        "sine"
    );


    setTimeout(
        () => {

            beep(
                820,
                .1,
                .025,
                "sine"
            );

        },
        100
    );


    setTimeout(
        () => {

            showToast(
                "NOTICE: VISUAL CONNECTION CLOSED"
            );

        },
        3500
    );

}


// ======================================================
// STOP PHONE
// ======================================================

function stopPhone() {

    phoneRinging =
        false;


    phoneAnswered =
        false;


    clearInterval(
        ringTimer
    );


    deskPhone.classList.remove(
        "ringing"
    );


    answerButton.disabled =
        true;


    phoneDisplay.textContent =
        "READY";


    phoneStatus.textContent =
        "LINE 1";


    if (
        window.speechSynthesis
    ) {

        speechSynthesis.cancel();

    }

}


// ======================================================
// FAILURE
// ======================================================

function encounterFailure() {

    encounterActive =
        false;


    clearEncounterTimers();


    stopPhone();


    falseWarning.classList.add(
        "hidden"
    );


    staticOverlay.classList.remove(
        "hidden"
    );


    staticText.textContent =
        "CONNECTION LOST";


    errorTone();


    setTimeout(
        () => {

            staticText.textContent =
                "VISUAL CONTACT FAILED";

        },
        1300
    );


    setTimeout(
        () => {

            staticText.textContent =
                "CHECK YOUR FRONT DOOR";

        },
        2500
    );


    setTimeout(
        () => {

            staticOverlay.classList.add(
                "hidden"
            );


            mediaWindow.classList.add(
                "hidden"
            );


            showToast(
                "V-BLOCKER HAS ENCOUNTERED AN UNKNOWN ERROR"
            );


            document.getElementById(
                "taskbarStatus"
            ).textContent =
                "CONNECTION ERROR";

        },
        3900
    );

}


// ======================================================
// TOAST
// ======================================================

function showToast(
    message
) {

    clearTimeout(
        toastTimer
    );


    toast.textContent =
        message;


    toast.classList.remove(
        "hidden"
    );


    toastTimer =
        setTimeout(
            () => {

                toast.classList.add(
                    "hidden"
                );

            },
            2800
        );

}
