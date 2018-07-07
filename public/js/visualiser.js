define(["signals/sinusoid", "signals/circularSinusoid"], (Sinusoid, cSinusoid) => {

    function Visualiser(id, type, frequency, amplitude = 1, speed = 1) {
        if(!type || !frequency || !id) {
            throw `The id, waveform and frequence are mandatory.`;
        }

        type = type.toLowerCase();

        if(type !== 'sine' && type !== 'triangle' && type != 'square' && type != 'sawtooth') {
            throw `The waveform can be of the following type: sine, square, triangle or sawtooth.`;
        }

        let sine, circle;

        switch(type) {
            case 'sine': 
                sine = new Sinusoid(id, frequency, amplitude, speed);
                //circle = new cSinusoid(id, frequency, amplitude, speed);
            break;
        }

        this.setAmplitude = function (amplitude) {
            sine.setAmplitude(amplitude);
            //circle.setAmplitude(amplitude);
        }
    
        this.setFrequency = function (frequency) {
            sine.setFrequency(frequency);
            //circle.setFrequency(frequency);
        }

        this.setSpeed = function (speed) {
            sine.setSpeed(speed);
        }
    
        this.setType = function (type) {
    
        }
    }

    return Visualiser;

});