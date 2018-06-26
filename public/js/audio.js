define(() => {

    const ctx = new (window.AudioContext || window.webkitAudioContext)();

    const masterGain = ctx.createGain();
    masterGain.connect(ctx.destination);

    function Audio(type, freq, amp = 1) {
        if(!type || !freq || !amp) {
            throw `The waveform, volume and frequency are mandatory.`;
        }

        type = type.toLowerCase();

        if(type !== 'sine' && type !== 'triangle' && type != 'square' && type != 'sawtooth') {
            throw `The waveform can be of the following type: sine, square, triangle or sawtooth.`;
        }

        const oscillator = ctx.createOscillator();
        oscillator.type = type;
        oscillator.frequency.value = freq;
    
        const gain = ctx.createGain();
        gain.gain.value = amp;
        let volume = gain.gain.value;
    
        
        oscillator.connect(gain);
        gain.connect(masterGain);

        // Avoid the first click when the oscillator start
        gain.gain.value = 0;
        oscillator.start();
        gain.gain.setTargetAtTime(volume, ctx.currentTime, 0.015);

        let isPlaying = true;

        this.play = function() {
            if(!isPlaying) {
                gain.gain.setTargetAtTime(volume, ctx.currentTime, 0.015);
                isPlaying = true;
            }
        }

        this.pause = function() {
            if(isPlaying) {
                gain.gain.setTargetAtTime(0, ctx.currentTime, 0.015);
                isPlaying = false;
            }
        }

        this.setVolume = function(volume) {   
            if( volume < gain.minValue || gain.maxValue < volume) {
                throw `the gain should be in the range [${gain.minValue}, ${gain.maxValue}].`;
            }
    
            gain.gain.setTargetAtTime(volume, ctx.currentTime, 0.015);
            volume = volume;
        }

        this.setFrequency = function(frequency) {
            oscillator.frequency.value = frequency;
        }
    }

    return Audio;
});