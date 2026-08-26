// ==========================================================
// V-BLOCKER
// NO CALLER ID PROTOTYPE
// ==========================================================


// ==========================================================
// ELEMENTS
// ==========================================================

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


const taskbarStatus =
    document.getElementById("taskbarStatus");


// ==========================================================
// STATE
// ==========================================================

let trainingIndex = 0;

let audioContext = null;

let encounterActive = false;

let encounterTimers = [];

let phoneRinging = false;

let phoneAnswered = false;

let ringTimer = null;

let toastTimer = null;

let voicePlaying = false;


// ==========================================================
// NO CALLER ID REAL VOICE
// ==========================================================

// IMPORTANT:
//
// Your recording is currently here:
//
// assets/im-watching-you.m4a
//
// NOT inside assets/audio/

const watchingYouVoice =
    new Audio(
        "assets/im-watching-you.m4a"
    );


watchingYouVoice.preload =
    "auto";


watchingYouVoice.volume =
    1.0;


// Web Audio nodes for boosting the recording
// above normal HTML audio volume.

let watchingYouVoiceSource = null;

let watchingYouVoiceGain = null;


// ==========================================================
// TRAINING SLIDES
// ==========================================================

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

                Certain submitted images,
                video recordings,
                or surveillance captures

                may contain visual anomalies
                that cannot be identified by
                conventional antivirus software.

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

                    • Do not attempt communication.

                    <br>

                    • Observe the figure carefully.

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

                    2. Do not reopen the media.

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

                    During an active visual incident,

                    employees may receive
                    unidentified telephone calls.

                    <br><br>

                    V-BLOCKER will never instruct
                    an employee to answer
                    an unidentified caller.

                    <br><br>

                    Caller information may be false.

                </div>

            </div>
        `
    },


    {
        title:
            "AUDIO CONTAMINATION",

        html:
        `
            <p class="training-text">

                Employees have reported:

                <br><br>

                breathing,

                <br>

                whispering,

                <br>

                background noise matching
                the employee residence,

                <br>

                and voices addressing
                the employee directly.

                <br><br>

                Do not respond.

            </p>
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

                EMPLOYEE:
                047

                <br>

                TERMINAL:
                HOME-047

                <br>

                SHIFT START:
                10:00 PM

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


// ==========================================================
// AUDIO SETUP
// ==========================================================

function setupAudio() {

    if (!audioContext) {

        audioContext =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();

    }


    if (
        audioContext.state === "suspended"
    ) {

        audioContext.resume();

    }


    // Only create this once.
    // A media element can only be attached
    // to one MediaElementSource.

    if (!watchingYouVoiceSource) {

        watchingYouVoiceSource =
            audioContext.createMediaElementSource(
                watchingYouVoice
            );


        watchingYouVoiceGain =
            audioContext.createGain();


        // ==================================================
        // RECORDING VOLUME BOOST
        //
        // 1.0 = original recording
        // 1.4 = louder
        // 1.7 = current
        // 2.0 = very loud
        // ==================================================

        watchingYouVoiceGain.gain.value =
            1.7;


        watchingYouVoiceSource.connect(
            watchingYouVoiceGain
        );


        watchingYouVoiceGain.connect(
            audioContext.destination
        );

    }

}


// ==========================================================
// BASIC BEEP
// ==========================================================

function beep(
    frequency = 400,
    duration = .08,
    volume = .03,
    type = "square"
) {

    if (!audioContext) {

        return;

    }


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


// ==========================================================
// TRAINING TONE
// ==========================================================

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


// ==========================================================
// ERROR TONE
// ==========================================================

function errorTone() {

    beep(
        175,
        .28,
        .045,
        "sawtooth"
    );

}


// ==========================================================
// NOTIFICATION
// ==========================================================

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


// ==========================================================
// LOW THUMP
// ==========================================================

function lowThump() {

    if (!audioContext) {

        return;

    }


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


// ==========================================================
// PHONE CLICK
// ==========================================================

function phoneClick() {

    beep(
        190,
        .05,
        .025,
        "square"
    );

}


// ==========================================================
// BREATH SOUND
// ==========================================================

function playBreath(
    delay = 0,
    strength = .18
) {

    setTimeout(
        () => {

            if (!audioContext) {

                return;

            }


            const duration =
                1.25;


            const bufferSize =
                Math.floor(
                    audioContext.sampleRate *
                    duration
                );


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


            const lowPass =
                audioContext.createBiquadFilter();


            lowPass.type =
                "lowpass";


            lowPass.frequency.value =
                620;


            const highPass =
                audioContext.createBiquadFilter();


            highPass.type =
                "highpass";


            highPass.frequency.value =
                100;


            const gain =
                audioContext.createGain();


            gain.gain.setValueAtTime(
                .001,
                audioContext.currentTime
            );


            gain.gain.linearRampToValueAtTime(
                strength,
                audioContext.currentTime + .25
            );


            gain.gain.linearRampToValueAtTime(
                strength * .42,
                audioContext.currentTime + .72
            );


            gain.gain.linearRampToValueAtTime(
                .001,
                audioContext.currentTime + 1.18
            );


            noise.connect(
                highPass
            );


            highPass.connect(
                lowPass
            );


            lowPass.connect(
                gain
            );


            gain.connect(
                audioContext.destination
            );


            noise.start();


            noise.stop(
                audioContext.currentTime + duration
            );

        },
        delay
    );

}


// ==========================================================
// BREATHING SEQUENCE
// ==========================================================

function creepyBreathing() {

    playBreath(
        0,
        .22
    );


    playBreath(
        1250,
        .20
    );


    playBreath(
        2550,
        .24
    );

}


// ==========================================================
// PLAY REAL "I'M WATCHING YOU" RECORDING
// ==========================================================

async function playWatchingYouVoice() {

    if (!phoneAnswered) {

        return;

    }


    voicePlaying =
        true;


    watchingYouVoice.pause();


    watchingYouVoice.currentTime =
        0;


    watchingYouVoice.onended =
        () => {

            voicePlaying =
                false;


            setTimeout(
                disconnectCall,
                450
            );

        };


    try {

        await watchingYouVoice.play();

    }


    catch (error) {

        console.warn(
            "No Caller ID voice could not play:",
            error
        );


        // NO GOOFY ROBOT VOICE FALLBACK 💀
        // If the recording fails, he breathes
        // once more and hangs up.

        voicePlaying =
            false;


        playBreath(
            0,
            .26
        );


        setTimeout(
            disconnectCall,
            1750
        );

    }

}


// ==========================================================
// SCENE CONTROL
// ==========================================================

function showScene(
    scene
) {

    document
        .querySelectorAll(
            ".scene"
        )
        .forEach(
            item => {

                item.classList.remove(
                    "active"
                );

            }
        );


    scene.classList.add(
        "active"
    );

}


// ==========================================================
// START
// ==========================================================

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


// ==========================================================
// TRAINING
// ==========================================================

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

                const virusWord =
                    document.getElementById(
                        "virusWord"
                    );


                if (!virusWord) {

                    return;

                }


                virusWord.textContent =
                    "HIM";


                errorTone();


                setTimeout(
                    () => {

                        if (virusWord) {

                            virusWord.textContent =
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


// ==========================================================
// CONTINUE TRAINING
// ==========================================================

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


// ==========================================================
// BEGIN SHIFT
// ==========================================================

function beginShift() {

    showScene(
        desktopScene
    );


    phoneDisplay.textContent =
        "READY";


    phoneStatus.textContent =
        "LINE 1";


    taskbarStatus.textContent =
        "V-BLOCKER ACTIVE";


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


// ==========================================================
// THREAT QUEUE
// ==========================================================

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


// ==========================================================
// CLOSE THREAT WINDOW
// ==========================================================

closeThreatWindow.addEventListener(
    "click",
    () => {

        threatWindow.classList.add(
            "hidden"
        );

    }
);


// ==========================================================
// SCAN
// ==========================================================

scanButton.addEventListener(
    "click",
    () => {

        scanButton.disabled =
            true;


        inspectButton.disabled =
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


// ==========================================================
// SCAN FINISHED
// ==========================================================

function finishScan() {

    errorTone();


    scanStatus.innerHTML =
    `
        <strong>

            SCAN COMPLETE

        </strong>

        <br><br>

        FILE:
        CAM_03_2217.JPG

        <br>

        SIGNATURE:
        UNKNOWN

        <br>

        ORIGIN:
        EXTERIOR CAMERA FEED

        <br>

        THREAT TYPE:
        UNIDENTIFIED VISUAL CONTACT

        <br><br>

        MANUAL INSPECTION REQUIRED.
    `;


    inspectButton.disabled =
        false;

}


// ==========================================================
// VISUAL INSPECTION
// ==========================================================

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


// ==========================================================
// ENCOUNTER TIMER CLEANUP
// ==========================================================

function clearEncounterTimers() {

    encounterTimers.forEach(
        timer => {

            clearTimeout(
                timer
            );

        }
    );


    encounterTimers =
        [];

}


// ==========================================================
// FIGURE STAGE CLEANUP
// ==========================================================

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


// ==========================================================
// GLITCH JUMP
// ==========================================================

function glitchJump(
    stage
) {

    if (!encounterActive) {

        return;

    }


    mediaViewer.classList.add(
        "glitching"
    );


    errorTone();


    setTimeout(
        () => {

            if (!encounterActive) {

                return;

            }


            clearFigureStages();


            figure.classList.add(
                `stage-${stage}`
            );


            lowThump();

        },
        100
    );


    setTimeout(
        () => {

            mediaViewer.classList.remove(
                "glitching"
            );

        },
        360
    );

}


// ==========================================================
// BEGIN NO CALLER ID ENCOUNTER
// ==========================================================

function beginEncounter() {

    clearEncounterTimers();


    clearFigureStages();


    encounterActive =
        true;


    phoneAnswered =
        false;


    phoneRinging =
        false;


    falseWarning.classList.add(
        "hidden"
    );


    corruption.textContent =
        "CAMERA FEED STABLE";


    // ------------------------------------------------------
    // PLAYER HAS TIME TO NOTICE HIM
    // ------------------------------------------------------

    encounterTimers.push(

        setTimeout(
            () => {

                if (!encounterActive) {

                    return;

                }


                corruption.textContent =
                    "MOVEMENT DETECTED";

            },
            2400
        )

    );


    // ------------------------------------------------------
    // FIRST GLITCH JUMP
    // ------------------------------------------------------

    encounterTimers.push(

        setTimeout(
            () => {

                glitchJump(
                    1
                );


                corruption.textContent =
                    "MOVEMENT DETECTED IN FRAME";

            },
            3600
        )

    );


    // ------------------------------------------------------
    // FAKE V-BLOCKER WARNING
    // ------------------------------------------------------

    encounterTimers.push(

        setTimeout(
            () => {

                if (!encounterActive) {

                    return;

                }


                falseWarning.classList.remove(
                    "hidden"
                );


                warningMessage.textContent =
                    "DO NOT CLOSE THIS TAB.";


                errorTone();

            },
            4700
        )

    );


    // ------------------------------------------------------
    // SECOND GLITCH JUMP
    // ------------------------------------------------------

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
            6500
        )

    );


    // ------------------------------------------------------
    // PHONE RINGS
    // ------------------------------------------------------

    encounterTimers.push(

        setTimeout(
            () => {

                if (
                    encounterActive
                ) {

                    startIncomingCall();

                }

            },
            7600
        )

    );


    // ------------------------------------------------------
    // THIRD GLITCH
    // ------------------------------------------------------

    encounterTimers.push(

        setTimeout(
            () => {

                glitchJump(
                    3
                );


                corruption.textContent =
                    "SUBJECT DISTANCE DECREASING";


                warningMessage.textContent =
                    "CLOSING THIS TAB MAY DAMAGE YOUR SYSTEM.";

            },
            9700
        )

    );


    // ------------------------------------------------------
    // WARNING STARTS SOUNDING WRONG
    // ------------------------------------------------------

    encounterTimers.push(

        setTimeout(
            () => {

                if (!encounterActive) {

                    return;

                }


                warningMessage.textContent =
                    "PLEASE REMAIN.";


                corruption.textContent =
                    "SOURCE UNKNOWN";

            },
            11500
        )

    );


    // ------------------------------------------------------
    // FINAL APPROACH
    // ------------------------------------------------------

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
            13200
        )

    );


    // ------------------------------------------------------
    // FAILURE
    // ------------------------------------------------------

    encounterTimers.push(

        setTimeout(
            () => {

                if (
                    encounterActive
                ) {

                    encounterFailure();

                }

            },
            16100
        )

    );

}


// ==========================================================
// PHONE RINGS
// ==========================================================

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
            1550
        );

}


// ==========================================================
// PHONE RING SOUND
// ==========================================================

function playRing() {

    if (!phoneRinging) {

        return;

    }


    beep(
        620,
        .27,
        .055,
        "square"
    );


    setTimeout(
        () => {

            if (!phoneRinging) {

                return;

            }


            beep(
                510,
                .29,
                .055,
                "square"
            );

        },
        330
    );

}


// ==========================================================
// ANSWER PHONE
// ==========================================================

answerButton.addEventListener(
    "click",
    () => {

        if (!phoneRinging) {

            return;

        }


        setupAudio();


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


        phoneClick();


        // --------------------------------------------------
        // LOUD BREATHING FIRST
        // --------------------------------------------------

        creepyBreathing();


        // --------------------------------------------------
        // THEN YOUR REAL RECORDING
        // --------------------------------------------------

        setTimeout(
            () => {

                if (
                    phoneAnswered
                ) {

                    playWatchingYouVoice();

                }

            },
            4100
        );

    }
);


// ==========================================================
// DISCONNECT CALL
// ==========================================================

function disconnectCall() {

    phoneAnswered =
        false;


    phoneRinging =
        false;


    voicePlaying =
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

            if (
                !phoneRinging &&
                !phoneAnswered
            ) {

                phoneDisplay.textContent =
                    "READY";

            }

        },
        1500
    );

}


// ==========================================================
// CLOSE MEDIA TAB
// ==========================================================

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


// ==========================================================
// SURVIVE ENCOUNTER
// ==========================================================

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


    taskbarStatus.textContent =
        "SCANNING SYSTEM...";


    showToast(
        "THREAT CONTAINED — FULL SYSTEM SCAN STARTED"
    );


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


    setTimeout(
        () => {

            taskbarStatus.textContent =
                "V-BLOCKER ACTIVE";

        },
        6200
    );

}


// ==========================================================
// STOP PHONE
// ==========================================================

function stopPhone() {

    phoneRinging =
        false;


    phoneAnswered =
        false;


    voicePlaying =
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


    watchingYouVoice.pause();


    watchingYouVoice.currentTime =
        0;

}


// ==========================================================
// FAILURE
// ==========================================================

function encounterFailure() {

    encounterActive =
        false;


    clearEncounterTimers();


    stopPhone();


    falseWarning.classList.add(
        "hidden"
    );


    mediaViewer.classList.remove(
        "glitching"
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
                "CAMERA 03 OFFLINE";

        },
        1200
    );


    setTimeout(
        () => {

            staticText.textContent =
                "NO SIGNAL";

        },
        2200
    );


    setTimeout(
        () => {

            lowThump();

        },
        2900
    );


    setTimeout(
        () => {

            staticOverlay.classList.add(
                "hidden"
            );


            mediaWindow.classList.add(
                "hidden"
            );


            taskbarStatus.textContent =
                "CONNECTION ERROR";


            showToast(
                "V-BLOCKER HAS ENCOUNTERED AN UNKNOWN ERROR"
            );

        },
        3900
    );

}


// ==========================================================
// TOAST
// ==========================================================

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
