define(() => {

    const ctx = new (window.AudioContext || window.webkitAudioContext)();

    const masterGain = ctx.createGain();
    masterGain.connect(ctx.destination);

    function Audio(type, freq, amp = 1) {
        const publicApi = {};

        if(!type) {
            throw `The waveform is mandatory.`;
        }

        type = type.toLowerCase();

        if(type === 'global') {
            publicApi.setMasterVolume = function setMasterVolume(vol) {
                if( vol < masterGain.minValue || masterGain.maxValue < vol) {
                    throw `the gain should be in the range [${masterGain.minValue}, ${masterGain.maxValue}].`;
                }
    
                masterGain.gain.setTargetAtTime(vol, ctx.currentTime, 0.015);
            }

            return publicApi;
        }

        if(!freq || !amp) {
            throw `The volume and frequency are mandatory.`;
        }

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

        publicApi.play = function play() {
            if(!isPlaying) {
                gain.gain.setTargetAtTime(volume, ctx.currentTime, 0.015);
                isPlaying = true;
            }
        }

        publicApi.pause = function pause() {
            if(isPlaying) {
                gain.gain.setTargetAtTime(0, ctx.currentTime, 0.015);
                isPlaying = false;
            }
        }

        publicApi.stop = function stop() {
            oscillator.stop(0.0015);
        }

        publicApi.setVolume = function setVolume(vol) {   
            if( vol < gain.minValue || gain.maxValue < vol) {
                throw `the gain should be in the range [${gain.minValue}, ${gain.maxValue}].`;
            }
    
            gain.gain.setTargetAtTime(vol, ctx.currentTime, 0.015);
            volume = vol;
        }

        publicApi.setFrequency = function setFrequency(frequency) {
            oscillator.frequency.value = frequency;
        }

        publicApi.setType = function setType(type) {
            type = type.toLowerCase();

            if(type !== 'sine' && type !== 'triangle' && type != 'square' && type != 'sawtooth') {
                throw `The waveform can be of the following type: sine, square, triangle or sawtooth.`;
            }

            oscillator.type = type;
        }

        return publicApi;
    }

    return Audio;
});