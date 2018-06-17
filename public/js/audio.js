define(() => {

    const audio = {};
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillators = {};
    const gains = {};
    const analysers = {};

    function initialize() {
        // Déclaration du gain global
        const masterGain = ctx.createGain();
        masterGain.connect(ctx.destination);
        gains.master = masterGain;

        // Déclaration de l'analyser global
        analysers.master = ctx.createAnalyser();
        gains.master.connect(analysers.master);
    }    

    initialize();

    function isPlaying(analyser) {
        const data = new Uint8Array(analyser.fftSize);
        analyser.getByteTimeDomainData(data);

        const isPlaying = data.some((v) => v !== 128);
        
        return isPlaying;
    }

    function createAnalyser(name, node) {
        const analyser = analysers[name] || ctx.createAnalyser();
        node.connect(analyser);
        analysers[name] = analyser;
    }

    function deleteAnalyser(name, node) {
        node.disconnect(analysers[name]);
        analysers[name] = null;
    }

    audio.isPlaying = function(name) {
        if(!name) {
            throw `The name parameter is mandatory.`;
        }

        name = name.toLowerCase();
        const analyser = analysers[name];
        if(!analyser) {
            throw `No oscillator with this name where found`;
        }

        return isPlaying(analyser);
    }

    audio.createOscillator = function(name, type, freq) {

        if(!name || !type || !freq) {
            throw `The name, waveform and frequence are mandatory.`;
        }

        name = name.toLowerCase();
        type = type.toLowerCase();

        if(type !== 'sine' && type !== 'triangle' && type != 'square' && type != 'sawtooth') {
            throw `The waveform can be of the following type: sine, square, triangle or sawtooth.`;
        }

        const oscillator = oscillators[name] || {};
        oscillator.definition = {type: type, freq: freq};
        const node = ctx.createOscillator();
        node.frequency.value = freq;
        node.type = type;

        node.connect(gains.master);

        oscillator.node = node;
        createAnalyser(name, oscillator.node);

        oscillators[name] = oscillator;
    }

    audio.play = function(name) {
        
        if(!name) {
            throw `The name parameter is mandatory.`;
        }

        name = name.toLowerCase();

        if(!oscillators[name]) {
            throw `The oscillator ${name} does not exist.`;
        }

        if(!oscillators[name].node) {
            const def = oscillators[name].definition;
            audio.createOscillator(name, def.type, def.freq);
        } 

        if(!isPlaying(analysers[name])) {
            oscillators[name].node.start();
        }
    }

    audio.pause = function(name) {

        if(!name) {
            throw `The name parameter is mandatory.`;
        }

        name = name.toLowerCase();

        if(!oscillators[name]) {
            throw `The oscillator ${name} does not exist.`;
        }

        if(!oscillators[name].node) {
            throw `The oscillator ${name} is already paused.`;
        }

        if(isPlaying(analysers[name])) {
            deleteAnalyser(name, oscillators[name].node);
            oscillators[name].node.stop();
            oscillators[name].node = null;            
        }
    }

    audio.setMaster = function(value) {
        const master = gains.master;
        if( value < master.minValue || master.maxValue < value) {
            throw `the gain value ${value} is out of bound.`;
        }

        gains.master.gain.setValueAtTime(value, ctx.currentTime);
    }

    audio.getFloatFrequency = function(name) {
        if(!name) {
            throw `The name parameter is mandatory.`;
        }

        name = name.toLowerCase();
        const analyser = analysers[name];

        if(!analyser) {
            throw `The is no analyser for oscillator ${name}`;
        }

        const array = new Float32Array(analyser.frequencyBinCount);
        analysers[name].getFloatFrequencyData(array);
        return array;
    }

    audio.getFloatTimeData = function(name) {
        if(!name) {
            throw `The name parameter is mandatory.`;
        }

        name = name.toLowerCase();
        const analyser = analysers[name];

        if(!analyser) {
            throw `The is no analyser for oscillator ${name}`;
        }

        const array = new Float32Array(analyser.fftSize);
        analysers[name].getFloatTimeDomainData(array);
        return array;
    }

    return audio;
});