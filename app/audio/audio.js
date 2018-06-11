const maxFreq = 3000;
const maxVol = 1;
const initialFreq = 483;
const initialVol = 0.5;

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const osci = audioCtx.createOscillator();
osci.type = 'sine';
osci.frequency.value = initialFreq;
osci.start();

const gain = audioCtx.createGain();
gain.gain.value = initialVol;

osci.connect(gain);
gain.connect(audioCtx.destination);
