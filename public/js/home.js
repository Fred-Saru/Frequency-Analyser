let audioCtx, masterGain, songPlaying;
const song = document.getElementById('audioSource');
const sliders = document.querySelectorAll('.slider');

// ==============================================
// Setup Context
// ==============================================

function audioSetup() {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const songSource = audioCtx.createMediaElementSource(song);

    masterGain = audioCtx.createGain();
    masterGain.gain.value = 0.3;

    songSource.connect(masterGain);
    masterGain.connect(audioCtx.destination);
}

audioSetup();


// ==============================================
// Sliders Handlers
// ==============================================

sliders.forEach(slider => {
    slider.addEventListener('click', window[slider.dataset.method]);
    slider.addEventListener('mousedown', handleDrag);
});

// Get the coefficient between the width and offset of the slider
function getCoefficient(event) {
    const slider = event.currentTarget;
    const rect = slider.getBoundingClientRect();
    const offset = event.clientX - slider.offsetLeft;
    const width = rect.width;

    return offset / width;
}

// Handle hook and unhook of the drag event
function handleDrag(event) {
    const slider = event.currentTarget;
    const previousState = songPlaying;
    const isPlayback = slider.classList.contains('playback-slider');

    if (previousState && isPlayback) {
        pauseSong(); // If we don't pause here the song continue to play while moving (bad)
    }
    this.addEventListener('mousemove', window[slider.dataset.method], false);
    this.addEventListener('mouseup', function tempCb() {
        this.removeEventListener('mousemove', window[slider.dataset.method], false);
        this.removeEventListener('mouseup', tempCb, false);
        if (previousState && isPlayback) {
            playSong();
        }
    }, false);
}

// Moving the current time of the song to the mouse location
function slideTime(event) {
    const x = event.clientX - event.currentTarget.offsetLeft;
    song.currentTime = song.duration * getCoefficient(event);
}

// Moving the volume to the mouse position
function slideVolume(event) {
    const x = event.clientX - event.currentTarget.offsetLeft;
    song.volume = getCoefficient(event);
    drawVolume();
}


// ==============================================
// Play / Pause Handlers
// ==============================================
const startBtn = document.getElementById('startBtn');

startBtn.addEventListener('click', () => {
    if (songPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

function playSong() {
    if(!songPlaying) {
        song.play();
        drawOscilloscope();
        updateTimeWaveForm();
        updateFreqWaveForm();
        drawPlayback();
        startBtn.innerText = 'Pause';
        songPlaying = true;
    }
}

function pauseSong() {
    if(songPlaying) {
        song.pause();
        drawPlayback();
        startBtn.innerText = 'Start';
        songPlaying = false;
    }
}

// =================================================
// Draw volume
// =================================================
const volumeProgress = document.getElementById('volume-progress');

function drawVolume() {
    const progress = song.volume * 100;
    volumeProgress.style.width = `${progress}%`;
}


// =================================================
// Draw Playback
// =================================================
const playbackProgress = document.getElementById("playback-progress");

function drawPlayback() {
    requestAnimationFrame(drawPlayback);
    const progress = (song.currentTime / song.duration) * 100;
    playbackProgress.style.width = `${progress}%`;
}


// ==============================================
// Create Time Wave Form
// ==============================================
const analyser = audioCtx.createAnalyser();
const timeWaveform = new Float32Array(analyser.frequencyBinCount);

masterGain.connect(analyser);
analyser.getFloatTimeDomainData(timeWaveform);

function updateTimeWaveForm() {
    requestAnimationFrame(updateTimeWaveForm);
    analyser.getFloatTimeDomainData(timeWaveform);
}


// ==============================================
// Create Frequency Wave Form
// ==============================================
const freqWaveform = new Float32Array(analyser.frequencyBinCount);

analyser.getFloatFrequencyData(freqWaveform);

function updateFreqWaveForm() {
    requestAnimationFrame(updateFreqWaveForm);
    analyser.getFloatFrequencyData(freqWaveform);
}


// ==============================================
// Draw Oscilloscope
// ==============================================

function drawOscilloscope() {
    requestAnimationFrame(drawOscilloscope);

    const scopeCanvas = document.getElementById('oscillator');
    const scopeContext = scopeCanvas.getContext('2d');

    scopeCanvas.width = window.innerWidth;
    scopeCanvas.height = scopeCanvas.getBoundingClientRect().height;

    scopeContext.clearRect(0, 0, scopeCanvas.width, scopeCanvas.height);
    scopeContext.beginPath();

    const waveforms = [timeWaveform, freqWaveform];

    waveforms.forEach((waveform, idx) => {
        const delta = window.innerWidth / waveform.length;

        for (let i = 0; i < waveform.length; i++) {
            const x = i * delta;
            let y;

            if(idx === 0) {
                y = (0.5 + (waveform[i])) * scopeCanvas.height;
            } else {
                const j = waveform.length - 1 - i;
                y = Math.abs(waveform[j]);
            }

            if (i == 0) {
                scopeContext.moveTo(x, y);
            } else {
                scopeContext.lineTo(x, y);
            }
        }

        scopeContext.strokeStyle = idx === 0 ? 'red' : 'green';
        scopeContext.lineWidth = 1.5;
        scopeContext.stroke();

        scopeContext.beginPath();
        scopeContext.strokeStyle = 'lightgray';
        scopeContext.moveTo(0, 0.5 * scopeCanvas.height);
        scopeContext.lineTo(scopeCanvas.width, 0.5 * scopeCanvas.height);
        scopeContext.stroke();

        scopeContext.beginPath();
        scopeContext.strokeStyle = 'lightgray';
        scopeContext.moveTo(0, scopeCanvas.height);
        scopeContext.lineTo(scopeCanvas.width, scopeCanvas.height);
        scopeContext.stroke();
    });
}