define(["signals/sinusoid"], (Sinusoid, cSinusoid) => {

    function Visualiser(id, type, freq, amp = 1, speed = 1) {
        if(!type || !freq || !id) {
            throw `The id, waveform and frequence are mandatory.`;
        }

        type = type.toLowerCase();

        if(type !== 'sine' && type !== 'triangle' && type != 'square' && type != 'sawtooth') {
            throw `The waveform can be of the following type: sine, square, triangle or sawtooth.`;
        }

        let amplitude = amp;
        let frequency = freq;
        let sine, baseFn;

        switch(type) {
            case 'sine':
                baseFn = function sinusFn(o, t) {
                    return (amplitude * o) * Math.sin(t * frequency);
                } 
                sine = new Sinusoid(id, baseFn, speed);
            break;
        }

        this.setAmplitude = function (amp) {
            amplitude = +amp;
            sine.refresh();
        }
    
        this.setFrequency = function (freq) {
            frequency = +freq;
            sine.refresh();
        }

        this.setSpeed = function (speed) {
            sine.setSpeed(speed);
        }
    
        this.setType = function (type) {
    
        }
    }

    return Visualiser;

});