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
            case 'square':
                baseFn = function squareFn(o, t) {
                    const val = Math.sin(t * frequency);

                    return (amplitude * o) * (val > 0 ? 1 : -1);
                } 
                sine = new Sinusoid(id, baseFn, speed);
            break;
            case 'triangle':
                baseFn = function triangleFn(o, t) {
                    return (amplitude * o) * (2 * amplitude / (1 / frequency)) * (Math.abs((t % (1 / frequency)) - (1 / frequency) / 2) - (1 / frequency) / 4);
                } 
                sine = new Sinusoid(id, baseFn, speed);
            break;
            case 'sawtooth':
                baseFn = function sawtoothFn(o, t) {
                    const val = frequency * t;
                    return (amplitude * o) * (val - Math.floor(val));
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